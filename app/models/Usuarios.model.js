import { DataTypes } from 'sequelize';
import sequelize from '../db/db.config.js';

const Usuarios = sequelize.define(
    "Usuarios",
    {
        nombre: {
            type: DataTypes.STRING(60),
            allowNull: true,
        },
        balance:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue:0,
            validate:{
                min:0
            }
        }
    },
    {
        tableName:'Usuarios',
        timestamps: false
    },
);

export default Usuarios;