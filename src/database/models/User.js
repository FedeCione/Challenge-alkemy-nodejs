module.exports = (sequelize, dataTypes) => {
    let alias = "Users";

    let cols = {

        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        email: {
            type: dataTypes.STRING(70),
            allowNull: false
        },
        contraseña: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    }
    let config = {
        tableName: "usuarios",
        timestamps: false
    }

    let User = sequelize.define(alias,cols,config);

    return User;
}
