module.exports = (sequelize, dataTypes) => {
    let alias = "Movies";

    let cols = {

        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        titulo: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        fecha_creacion: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        calificacion: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        imagen_pelicula_serie: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        id_genero: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    }
    let config = {
        tableName: "pelicula_serie",
        timestamps: false
    }

    let Movie = sequelize.define(alias,cols,config);

    Movie.associate = models => {
        Movie.belongsTo(models.Genres, {
            as:"movie_genre",
            foreignKey:"id_genero"
        })
        Movie.belongsToMany(models.Characters, {
            as: "characters",
            through: "personajes_peliculas_series_pivot",
            foreignKey: "id_pelicula_serie",
            otherKey: "id_personaje",
            timestamps: false
          })
    }

    return Movie;
}
