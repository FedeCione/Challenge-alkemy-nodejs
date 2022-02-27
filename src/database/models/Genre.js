module.exports = (sequelize, dataTypes) => {
    let alias = "Genres";

    let cols = {

        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        nombre: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        imagen_genero: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    }
    let config = {
        tableName: "generos",
        timestamps: false
    }

    let Genre = sequelize.define(alias,cols,config);

    Genre.associate = models => {
        Genre.hasMany(models.Movies, {
            as: "genre_movie",
            foreignKey: "id_genero"
        })
    }

    return Genre;
}

