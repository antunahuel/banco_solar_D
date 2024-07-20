import sequelize from "../db/db.config.js";
import Transferencias from "../models/Transfrencias.model.js";
import Usuarios from "../models/Usuarios.model.js";


const transferir = async (req,res)=>{
    const t = await sequelize.transaction();
    try {
        let {emisor, receptor, monto} = req.body;
        
        //1.- descontar
        let usuarioEmisor = await Usuarios.findByPk(emisor);
        usuarioEmisor.balance = Number(usuarioEmisor.balance) - Number(monto);
        await usuarioEmisor.save({
            transaction: t
        });
       //2.-agregar
        let usuarioReceptor = await Usuarios.findByPk(receptor);
        usuarioReceptor.balance = Number(usuarioReceptor.balance) + Number(monto);
        await usuarioReceptor.save({
            transaction: t
        });

        //3.Registro de transferencia

        const tranferencia = await Transferencias.create(
            {emisor, receptor, monto},
            {transaction: t},
        );

        await t.commit();
        res.status(201).json({
            msg:"Datos ingresados correctamente",
            tranferencia
        });
    } catch (error) {
        console.log(error);
    }
}

const getTransaction = async (req,res)=>{
    try {

        let transferencias = await Transferencias.findAll();
        res.status(201).json({
            msg:"Consulta de moviminetos (transferencias) realizada con éxito",
            transferencias
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Error al intentar realizar consulta de transferencias realizadas"
        });
    }
};

const deleteTrans = async(req,res)=>{
    try {
        let {id}=req.params;

        let movimiento = await Transferencias.findByPk(id);

        if(!movimiento){
            return res.status(400).json({
                msg:`No esxisten transferencias registradas con ${id}`
            });
        }

        let deleteTransferencia = await Transferencias.destroy({
            where:{
                id
            }
        });

        res.status(201).json({
            msg:"transacción eleminada con éxito",
            deleteTransferencia
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"No fue posible eliminar transacción"
        });
    }
}

let controllTrans = {
    transferir,
    getTransaction,
    deleteTrans
}

export default controllTrans;