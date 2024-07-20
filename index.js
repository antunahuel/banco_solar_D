import sequelize from "./app/db/db.config.js";
import app from "./app/server.js";

import "./app/models/index.js";

const main = async ()=>{
    try {
        // await sequelize.authenticate();
        // console.log("Conectado a DB");
        await sequelize.sync({force:false, alter:true});

        app.listen(3000, ()=>{
            console.log("Servidor corriendo en puerto http://localhost:3000");
        })
    } catch (error) {
        console.log(error);
        let msg;
        if (error.original.code == "3D000"){
            msg = "No existe base datos";
            console.log(msg);
        };
    }
};

main();