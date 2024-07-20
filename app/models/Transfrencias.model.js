import { DataTypes } from 'sequelize';
import sequelize from '../db/db.config.js';

import Usuarios from './Usuarios.model.js';

const Transferencias = sequelize.define(
    "Transferencias",
    {
        emisor:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: Usuarios,
                key:'id'
            }
        },
        receptor:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: Usuarios,
                key:'id'
            }
        },
        monto:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            validate:{
                min:0
            }
        },
    },
    {
        tableName:'Transferencias',
        timestamps: true,
    }
);


export default Transferencias;