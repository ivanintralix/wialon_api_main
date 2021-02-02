import W from 'wialonjs-api/dist/wialon-src'
export default class wialon {
    session = null;
    constructor(token){
        this.token = token;
        this.usaurio = null;
        this.unidades = null;
    }
    login(callback){
        let iniciar = new Promise((resolve, reject) => {
            W.debug = true;
            var self = this;
            let session = self.session;
            session = new W.Session('https://hst-api.wialon.com', {
                eventsTimeout: 5
            });

            session.execute('token/login', {token: this.token}, function(data) {
                console.log('login callback', data);
                self.usaurio = data;
                /**inicio */
                var params = {spec:[{'type': 'type', 'data': 'avl_unit', 'flags': 0x411, 'mode': 0}]};
                // load items to current session
                session.execute('core/update_data_flags', params, function () {
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

        iniciar.then(() => {
            console.log(this.session);
        });
    }
    showUnits(){
        // get loaded 'avl_units's items
        this.unidades = this.session.getItems();
    }
    
}