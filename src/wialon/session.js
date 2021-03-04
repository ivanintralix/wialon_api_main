import W from 'wialonjs-api/dist/wialon-src'
export default class wialon {
    session = null;
    constructor(token){
        this.token = token;
        this.usuario = null;
        this.unidades = [];
        this.grupos = [];
        this.sid = null;
    }
    login(callback){
        let iniciar = new Promise((resolve, reject) => {
            W.debug = true;
            var self = this;
            let session = self.session;
            session = new W.Session('http://gps.intralix.com', {
                eventsTimeout: 5
            });
            session
                .on('lastMessageChanged', function() {
                    //console.log('lastMessageChanged', arguments);
                })
                .on('positionChanged', function() {
                    //console.log('positionChanged', arguments);
                })
                .on('itemChanged', function() {
                    //console.log('itemChanged', arguments);
                })
                .on('itemDeleted', function() {
                    //console.log('itemDeleted', arguments);
                });
            const StorageSID = localStorage.getItem('sid');
            if (!StorageSID) {
                session.execute('core/use_auth_hash', {authHash: this.token}, function(data) {
                    var params = {
                        params:{"operateAs":"",continueCurrentSession:true,checkService:"auto.wialon_web.0",restore:1,appName:"myApp"},
                        sid:  session.getSid()
                    }
                    session.execute('core/duplicate', params, function(data) {
                        //{"operateAs":"","continueCurrentSession":true,"checkService":"auto.wialon_web.0","restore":1,"appName":"myApp"}
                        localStorage.setItem('sid', session.getSid());
                        self.sid = session.getSid();
                        self.usuario = data;
                        /**inicio */
                        var params = {spec:[{'type': 'type', 'data': 'avl_unit', 'flags': 0x401, 'mode': 0}]};
                        // load items to current session
                        session.execute('core/update_data_flags', params, function (data) {
                            self.session = session;
                            if (data.error) {
                                reject("¡Error");
                                callback(data);
                            } else {
                                resolve("¡Éxito!");
                                callback(data);
                            }
                        });
                    });
                });
            }else{
                self.sid = StorageSID;
                var params = {
                    params:{
                        "operateAs":"",
                        "continueCurrentSession":true,
                        "checkService":"auto.wialon_web.0",
                        "restore":1,
                        "appName":"myApp"
                    },
                    sid: self.sid
                }
                session.execute('core/duplicate', params, function(data) {
                    localStorage.setItem('sid', session.getSid());
                    self.sid = session.getSid();
                    self.usuario = data;
                    /**inicio */
                    var params = {spec:[{'type': 'type', 'data': 'avl_unit', 'flags': 0x401, 'mode': 0}]};
                    // load items to current session
                    session.execute('core/update_data_flags', params, function (data) {
                        self.session = session;
                        if (data.error) {
                            reject("¡Error");
                            callback(data);
                        } else {
                            resolve("¡Éxito!");
                            callback(data);
                        }
                    });
                });
            }

        });

        iniciar.then(() => {
            //console.log(this.session);
        });
    }
    showUnits(){
        this.unidades = this.session.getItems() === undefined ? [] : this.session.getItems();
        this.unidades.filter(unidad => (unidad.lmsg !== null || unidad.lmsg !== undefined))
    }
    getCMDS(callback){
        //obtener lista de comandos
        const self = this;
        new Promise(()=>{
            var params = {
                "params" : [],
                "sid": self.sid
            }
            self.unidades.forEach(unidad => {
                params.params.push(
                {
                    "svc":"core/search_item",
                    "params":{
                        "id":unidad.id,
                        "flags":4294967295
                    }
                })
            });
            self.session.execute('core/batch&sid=' + self.sid, params, function(data) {
                console.log("cmds");
                console.log(data);
                if (data.error) {
                    callback(data);
                } else {
                    const unidadesCMDS = [];
                    data.forEach(unidad => {
                        if (unidad.item.cmds !== undefined) {
                            const fecha = ( unidad.item.pos !== null ? obtenerFecha(unidad.item.pos.t) : "00/00/0000");
                            unidadesCMDS.push({
                                fecha:fecha,
                                pos: unidad.item.pos,
                                id:unidad.item.id,
                                n:unidad.item.nm,
                                cmds:unidad.item.cmds
                            });
                            /*
                            unidad.item.cmds.forEach(comando => {
                                if (comando.n === "Posición") {unidadesCMDS
                                    console.log(unidad);
                                    //console.log(unidad.item.nm);
                                    console.log(comando);
                                }
                            });
                            */
                        }
                    });
                    callback(unidadesCMDS);
                }
            });
        })
    }
    //
    getJobs(callback){
        const self = this;
        new Promise(() => {
            var params = {
                params:{
                    "itemId":105
                }
            };
            self.session.execute('resource/get_job_data', params, function (data) {
                if (data.error) {
                    callback(data);
                } else {
                    const reglasArray = [];
                    data = data.filter( job => job.act.t === "exec_unit_cmd" )
                    data.forEach(tarea => {
                        const id = tarea.id;
                        const dias = obtenerDias(tarea.sch.w);
                        const nombre = tarea.n;
                        const comando = tarea.act.p.cmd_name;
                        const comandoTipo = tarea.act.p.cmd_type;
                        const unidades = obtenerUnidades(tarea.act.p.units);
                        const hora = obtenerHora(tarea.r);
                        const fecha = obtenerFecha(tarea.at);
                        const estado = tarea.st.e;
                        reglasArray.push({dias,nombre,comando,hora,unidades,estado,id,fecha,comandoTipo})
                    });
                    callback(reglasArray);
                }
            });
        });
    }
    editUnitsJob(id,unidades,callback){
        const self = this;
        new Promise(()=>{
            //obtener la tarea
            var params = {
                params:{
                    "itemId":105,
                    "col":[id]
                }
            };
            self.session.execute('resource/get_job_data', params, function (data) {
                console.log(data);
                if (data.error) {
                    callback(data);
                } else {
                    //editar tarea
                    data=data[0];
                    const creatorId = self.usuario.user.id
                    data.act.p.units = unidades;
                    Object.assign(data, {itemId: 105,callMode:"update"});
                    var params = {
                        params:data
                    };
                    self.session.execute('resource/update_job', params, function (data) {
                        console.log(data);
                        if (data.error) {
                            callback(data);
                        } else {
                            var params = {
                                params:{
                                    "itemId":105,
                                    "col":[7,8]
                                }
                            };
                            self.session.execute('resource/get_job_data', params, function (data) {
                                if (data.error) {
                                    callback(data);
                                } else {
                                    const reglasArray = [];
                                    data.forEach(tarea => {
                                        const id = tarea.id;
                                        const dias = obtenerDias(tarea.sch.w);
                                        const nombre = tarea.n;
                                        const comando = tarea.act.p.cmd_name;
                                        const comandoTipo = tarea.act.p.cmd_type;
                                        const unidades = obtenerUnidades(tarea.act.p.units);
                                        const hora = obtenerHora(tarea.r);
                                        const fecha = obtenerFecha(tarea.at);
                                        const estado = tarea.st.e;
                                        reglasArray.push({dias,nombre,comando,hora,unidades,estado,id,fecha,comandoTipo})
                                    });
                                    callback(reglasArray);
                                }
                            });
                        }
                    });
                }
            });
        });
    };
    editJob(id,nuevaTarea,callback){
        const self = this;
        new Promise(()=>{
            //obtener la tarea
            var params = {
                params:{
                    "itemId":105,
                    "col":[id]
                }
            };
            self.session.execute('resource/get_job_data', params, function (data) {
                console.log(data);
                if (data.error) {
                    callback(data);
                } else {
                    //editar tarea
                    data=data[0];
                    const creatorId = self.usuario.user.id;
                    //data.act.p.units = unidades;
                    console.log(nuevaTarea);
                    Object.assign(data, {itemId: 105,callMode:"update"});
                    data.n = nuevaTarea.nombreTarea;
                    data.r = "1 " + nuevaTarea.Hora;
                    if (nuevaTarea.fecha !== null) data.at = nuevaTarea.fecha;
                    if (nuevaTarea.arrayNuevosDias !== null) {
                        const dias = formatoDiasTarea(nuevaTarea.arrayNuevosDias);
                        data.sch.w = dias;
                    }
                    var params = {
                        params:data
                    };
                    self.session.execute('resource/update_job', params, function (data) {
                        console.log(data);
                        if (data.error) {
                            callback(data);
                        } else {
                            var params = {
                                params:{
                                    "itemId":105
                                }
                            };
                            self.session.execute('resource/get_job_data', params, function (data) {
                                if (data.error) {
                                    callback(data);
                                } else {
                                    data = data.filter( job => job.act.t === "exec_unit_cmd" )
                                    const reglasArray = [];
                                    data.forEach(tarea => {
                                        const id = tarea.id;
                                        const dias = obtenerDias(tarea.sch.w);
                                        const nombre = tarea.n;
                                        const comando = tarea.act.p.cmd_name;
                                        const comandoTipo = tarea.act.p.cmd_type;
                                        const unidades = obtenerUnidades(tarea.act.p.units);
                                        const hora = obtenerHora(tarea.r);
                                        const fecha = obtenerFecha(tarea.at);
                                        const estado = tarea.st.e;
                                        reglasArray.push({dias,nombre,comando,hora,unidades,estado,id,fecha,comandoTipo})
                                    });
                                    callback(reglasArray);
                                }
                            });
                        }
                    });
                }
            });
        });
    }
    createNewJob(nuevaTarea,callback){
        const self = this;
        new Promise(()=>{
            var data = armarTarea(nuevaTarea);
            console.log(data)
            var params = {
                params:data
            };
            self.session.execute('resource/update_job', params, function (data) {
                console.log(data);
                if (data.error) {
                    callback(data);
                } else {
                    var params = {
                        params:{
                            "itemId":105
                        }
                    };
                    self.session.execute('resource/get_job_data', params, function (data) {
                        if (data.error) {
                            callback(data);
                        } else {
                            data = data.filter( job => job.act.t === "exec_unit_cmd" )
                            const reglasArray = [];
                            data.forEach(tarea => {
                                const id = tarea.id;
                                const dias = obtenerDias(tarea.sch.w);
                                const nombre = tarea.n;
                                const comando = tarea.act.p.cmd_name;
                                const comandoTipo = tarea.act.p.cmd_type;
                                const unidades = obtenerUnidades(tarea.act.p.units);
                                const hora = obtenerHora(tarea.r);
                                const fecha = obtenerFecha(tarea.at);
                                const estado = tarea.st.e;
                                reglasArray.push({dias,nombre,comando,hora,unidades,estado,id,fecha,comandoTipo});
                            });
                            callback(reglasArray);
                        }
                    });
                }
            });
        });
    }
    deleteJob(idJob,callback){
        const self = this;
        new Promise(()=>{
            var params = {
                params:{
                    "id": idJob,
                    "itemId": 105,
                    "callMode": "delete"
                }
            };
            self.session.execute('resource/update_job', params, function (data) {
                console.log(data);
                if (data.error) {
                    callback(data);
                } else {
                    callback(data);
                }
            });
        });
    }
    deactivateJob(idJob,callback){
        const self = this;
        new Promise(()=>{
            var params = {
                params:{
                    "id":idJob,
                    "e":0,
                    "itemId":105,
                    "callMode":"enable"
                }
            };
            self.session.execute('resource/update_job', params, function (data) {
                console.log(data);
                if (data.error) {
                    callback(data);
                } else {
                    callback(data);
                }
            });
        });
    }
    activateJob(idJob,callback){
        const self = this;
        new Promise(()=>{
            var params = {
                params:{
                    "id":idJob,
                    "e":1,
                    "itemId":105,
                    "callMode":"enable"
                }
            };
            self.session.execute('resource/update_job', params, function (data) {
                console.log(data);
                if (data.error) {
                    callback(data);
                } else {
                    callback(data);
                }
            });
        });
    }
    //
    showGroups(callback){
        const self = this;
        new Promise(() => {
            var params = {spec:[{'type': 'type', 'data': 'avl_unit_group', 'flags': 0x411, 'mode': 1}]};
            this.session.execute('core/update_data_flags', params, function (data) {
                self.grupos = data;
                if (data.error) {
                    callback(data);
                } else {
                    callback(data);
                }
            });
        });
    }
    addUnitsGroup(units,IdGroup,callback){
        new Promise(() => {
            const self = this;
            var req = new W.Request('http://gps.intralix.com');
            var params = {
                "params":{
                    "itemId": IdGroup, 
                    "units": units
                },
                "sid":self.sid
            };
            req.api('unit_group/update_units&sid=' + self.sid, params, function(data) {
                if (data.error) {
                    callback(data);
                } else {
                    let groups = self.session.getItems("avl_unit_group");
                    groups = groups.filter(grupo => (grupo.nm === "Admin" || grupo.nm === "Grupo Desarrollo") );
                    callback(groups);
                }
            });
        });
    }
    createGroup(units,name,callback){
        new Promise(() => {
            const self = this;
            console.log(self.usuario.user.id);
            const creatorId = self.usuario.user.id
            var req = new W.Request('http://gps.intralix.com');
            var params = {
                "params":{
                    "creatorId": creatorId, 
                    "name": name,
                    "dataFlags": 1
                },
                "sid":self.sid
            };
            req.api('core/create_unit_group&sid=' + self.sid, params, function(data) {
                if (data.error) {
                    callback(data);
                } else {
                    callback(data);
                }
            });
        });
    }
    addUnitsNewGroup(units,IdGroup,callback){
        new Promise(() => {
            const self = this;
            var req = new W.Request('http://gps.intralix.com');
            var params = {
                "params":{
                    "itemId": IdGroup, 
                    "units": units
                },
                "sid":self.sid
            };
            req.api('unit_group/update_units&sid=' + self.sid, params, function(data) {
                if (data.error) {
                    callback(data);
                } else {
                    callback(data);
                }
            });
        });
    }
    deleteGroup(IdGroup,callback){
        new Promise(() => {
            const self = this;
            var req = new W.Request('http://gps.intralix.com');
            var params = {
                "params":{
                    'itemId': IdGroup
                },
                "sid":self.sid
            };
            req.api('item/delete_item&sid=' + self.sid, params, function(data) {
                if (data.error) {
                    callback(data);
                } else {
                    callback(data);
                }
            });
        });
    }
    enviarComando(unidades,comandoString,callback){
        const self = this;
        new Promise(() => {
            var params = {
                "params" : [],
                "sid": self.sid
            }
            unidades.forEach(unidad => {
                params.params.push(
                    {
                        "svc":"unit/exec_cmd",
                        "params":{
                            "itemId":unidad,
                            "commandName":comandoString,
                            "linkType" : "",
                            "param" : "",
                            "timeout":0,
                            "flags":1
                        }
                    })
            });
            self.session.execute('core/batch&sid=' + self.sid, params, function(data) {
                const arrayError = [];
                for (let i = 0; i < data.length; i++) {
                    const respuesta = data[i];
                    const unidad = unidades[i];
                    if(respuesta.error){
                        arrayError.push(unidad);
                    }
                }
                if (data.error) {
                    callback(data,arrayError);
                } else {
                    callback(data,arrayError);
                }
            });
        });
    }
}
const armarTarea = (tarea) => {
    let dias = 0;
    if (tarea.arrayNuevosDias.length > 0) {
        dias = formatoDiasTarea(tarea.arrayNuevosDias);
    }
    var local = new Date();
    var utc = Date.UTC(local.getFullYear(), local.getMonth(), local.getDate(), local.getHours(), local.getMinutes(), local.getSeconds(), local.getMilliseconds());
    var tz = (utc - local.getTime());
    //console.log(utc - local.getTime());
    const tareaNueva = {
        "n": tarea.nombreTarea,
        "d": tarea.nombreTarea + " creada desde portal de chapas",
        "r": "1 "+tarea.Hora,
        "at": tarea.fecha,
        "tz": tz,       //verificar
        "l": "es",
        "e": 1,
        "m": 0,
        "sch": {
            "f1": 0,
            "f2": 0,
            "t1": 0,
            "t2": 0,
            "m": 0,
            "y": 0,
            "w": dias          //dias a la semana que se repite
        },
        "act": {
            "t": "exec_unit_cmd",
            "p": {
                "units": tarea.unidades.join(),
                "cmd_name": tarea.cmd.cmd_name,
                "cmd_type": tarea.cmd.cmd_type,
                "cmd_param": tarea.cmd.cmd_param,
                "link_type": "",
                "timeout": 60
            }
        },
        "id": 0,
        "itemId": 105,
        "callMode": "create"
    };
    return tareaNueva;
}
const obtenerFecha = (fecha) => {
    var a = new Date(fecha * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    return time;
}

const obtenerUnidades = (unidades) => {
    var unidadesArr = unidades.split(',');
    const unidadesR = [];
    unidadesArr.forEach(element => {
        unidadesR.push(parseInt(element))
    });
    return unidadesR;
}
const obtenerHora = (hora) => {
    var date = hora.substr(2, hora.length);
    return date;
}
const obtenerDias = (diasJob) => {
    const arrayDias = [];
    arrayDiasJobs.forEach(dia => {
        const diaTemp = diasJob - dia[1];
        if (diaTemp >= 0) {
            arrayDias.push(dia[0]);
            diasJob = diaTemp;
        }
    });
    return arrayDias;
}
const formatoDiasTarea = (diasJob) => {
    let contadorDias = 0;
    diasJob.forEach(dia => {
        arrayDiasJobs.forEach(DJ => {
            if (dia === DJ[0]) {
                contadorDias += DJ[1];
            }
        });
    });
    return contadorDias;
}
const arrayDiasJobs = [
    ["Domingo",64],
    ["Sabado",35],
    ["Viernes",16],
    ["Jueves",8],
    ["Miercoles",4],
    ["Martes",2],
    ["Lunes",1]
]


//Invoke-WebRequest -Uri "http://gps.intralix.com/wialon/ajax.html?svc=resource/update_job&sid=1f7b5888b31f65221c3ff2a37d9a6243" `
//-Method "POST" `
//-Headers @{
//"User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"
//  "Accept"="*/*"
//  "Origin"="http://gps.intralix.com"
//  "Referer"="http://gps.intralix.com/wialon/post.html"
//  "Accept-Encoding"="gzip, deflate"
//  "Accept-Language"="es-419,es;q=0.9,en;q=0.8"
//  "Cookie"="_gcl_au=1.1.1601771906.1607701582; _ym_d=1611953260; _ym_uid=1611953260214380465; lang=es; _ga=GA1.1.1504113298.1607701583; _ga_KGT7H4QD6P=GS1.1.1613601284.4.0.1613601291.53; wwp=; _ym_isad=2; sessions=888eeae6ad0ca653329fe58520245d5b%2C44c7832d07bce0ab9e7f57129fc45544%2C1f7b5888b31f65221c3ff2a37d9a6243"
//} `
//-ContentType "application/x-www-form-urlencoded" `
//-Body "params=%7B%22n%22%3A%22Posici%C3%B3n%20Desarrollo%22%2C%22d%22%3A%22tarea%20prueba%20desarrollo%22%2C%22r%22%3A%222%2018000%22%2C%22at%22%3A1613714400%2C%22tz%22%3A-100160608%2C%22l%22%3A%22es%22%2C%22e%22%3A1%2C%22m%22%3A0%2C%22sch%22%3A%7B%22f1%22%3A0%2C%22f2%22%3A0%2C%22t1%22%3A0%2C%22t2%22%3A0%2C%22m%22%3A0%2C%22y%22%3A0%2C%22w%22%3A0%7D%2C%22act%22%3A%7B%22t%22%3A%22exec_unit_cmd%22%2C%22p%22%3A%7B%22units%22%3A%221734%22%2C%22cmd_name%22%3A%22Posici%C3%B3n%22%2C%22cmd_type%22%3A%22custom_msg%22%2C%22cmd_param%22%3A%22AT%2BGTRTO%3Dgv55w%2C1%2C%2C0%2C%2C%2C%2CFFFF%24%22%2C%22link_type%22%3A%22%22%2C%22timeout%22%3A60%7D%7D%2C%22id%22%3A0%2C%22itemId%22%3A105%2C%22callMode%22%3A%22create%22%7D&sid=1f7b5888b31f65221c3ff2a37d9a6243"

/*
request
{
    "n": "Posición Desarrollo",
    "d": "tarea prueba desarrollo",
    "r": "2 18000",
    "at": 1613714400,
    "tz": -100160608,
    "l": "es",
    "e": 1,
    "m": 0,
    "sch": {
      "f1": 0,
      "f2": 0,
      "t1": 0,
      "t2": 0,
      "m": 0,
      "y": 0,
      "w": 0
    },
    "act": {
      "t": "exec_unit_cmd",
      "p": {
        "units": "1734",
        "cmd_name": "Posición",
        "cmd_type": "custom_msg",
        "cmd_param": "AT+GTRTO=gv55w,1,,0,,,,FFFF$",
        "link_type": "",
        "timeout": 60
      }
    },
    "id": 0,
    "itemId": 105,
    "callMode": "create"
  }
*/  
/**
 * response
[
  7,
  {
    "id": 7,
    "n": "Posición Desarrollo",
    "d": "tarea prueba desarrollo",
    "m": 0,
    "st": {
      "e": 1,
      "c": 0,
      "l": 0
    },
    "act": "exec_unit_cmd",
    "ct": 1613757698,
    "mt": 1613757698
  }
]
 */

 /**varios dias (lunes, miercoles, jueves)
  * request
{
  "n": "Posición desarrollo 2",
  "d": "Tarea desarrollo 2 unidades",
  "r": "1 12:00",
  "at": 1613714400,
  "tz": -100160608,
  "l": "es",
  "e": 1,
  "m": 0,
  "sch": {
    "f1": 0,
    "f2": 0,
    "t1": 0,
    "t2": 0,
    "m": 0,
    "y": 0,
    "w": 13
  },
  "act": {
    "t": "exec_unit_cmd",
    "p": {
      "units": "1028,1447",
      "cmd_name": "Posición",
      "cmd_type": "query_pos",
      "cmd_param": "AT+GTRTO=gv55w,1,,0,,,,FFFF$",
      "link_type": "",
      "timeout": 60
    }
  },
  "id": 0,
  "itemId": 105,
  "callMode": "create"
}
  */
 /**
  * response
[
  8,
  {
    "id": 8,
    "n": "Posición desarrollo 2",
    "d": "Tarea desarrollo 2 unidades",
    "m": 0,
    "st": {
      "e": 1,
      "c": 0,
      "l": 0
    },
    "act": "exec_unit_cmd",
    "ct": 1613774353,
    "mt": 1613774353
  }
]
  */