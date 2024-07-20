import sequelize from "../db/db.config.js";
import Usuarios from "../models/Usuarios.model.js";

const addUsuario = async (req,res)=>{
    try {
        let {nombre, balance}=req.body;
        if(!nombre ||!balance){
            return res.status(400).json({
                msg:"Debe ingresar los datos solicitado para realizar registro de usuario"
            })
        };

        balance = Number(balance);

        if(isNaN(balance)){
            return res.status(400).json({
                msg:"Debe proporcionar un valor válido para balance (numerico)"
            });
        };

        let usuario = await Usuarios.create({nombre, balance});

        res.status(201).json({
            msg:"ruta agregar usuarios",
            usuario
        });
    } catch (error) {
        let msg;
        if(error.original.code == "23505"){
            msg="El dato ingresado ya se encuentra registrado"
        };
        res.status(500).json({
            msg: msg || "error al procesar dato"
        });
    }
};

const getAllUsuarios = async (req,res)=>{
    try {

        let usuarios = await Usuarios.findAll();

        res.status(201).json({
            msg:"Usuarios encontrados con éxito",
            usuarios
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Ha ocurrido un error al intentar acceder a resgisto de usuarios"
        })
    }
};

const deleteUsuario = async (req,res)=>{
    try {
       
        let {id} = req.params;

        let usuarioEliminado = await Usuarios.destroy({
            where:{
                id,
            }
        });
    
        if(usuarioEliminado){
            res.status(201).json({
            msg:`Ùsuario con id: ${id} eliminado con éxito`,
        })
        }else {
            return res.status(400).json({
                msg:`No se encuentra registrado usuario con ${id}`
            });
        };

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"No se puede eliminar registro de usuario por estar vinculado a transferencias realizadas"
        });
    }
};

const updateUsuario = async (req,res)=>{
    try {
        let {id,} = req.params;
        

        let nuevosDatos = req.body;


        if(!nuevosDatos.nombre , !nuevosDatos.balance ){
            return res.status(400).json({
                msg:"Debe proporcionar los datos solicitados"
            });
        }      

        let usuarioById = await Usuarios.findByPk(id);

        usuarioById.nombre = nuevosDatos.nombre;
        usuarioById.balance = nuevosDatos.balance;

        await usuarioById.save();

        res.status(201).json({
            msg:"Usuario actualizado con éxito",
            usuarioById
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Error al intentar realizar cambios en registro de usuario"
        });
    }
}

let controllUsuarios = {
    addUsuario,
    getAllUsuarios,
    deleteUsuario,
    updateUsuario
};

export default controllUsuarios;