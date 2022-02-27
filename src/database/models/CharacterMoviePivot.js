module.exports = (sequelize, dataTypes) => {
    let alias = "CharacterMoviePivots";

    let cols = {

        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        id_personaje: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        id_pelicula_serie: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    }
    let config = {
        tableName: "personajes_peliculas_series_pivot",
        timestamps: false
    }

    let CharacterMoviePivot = sequelize.define(alias,cols,config);

    CharacterMoviePivot.associate = models => {
        CharacterMoviePivot.belongsTo(models.Characters, {
            as: "pivot_characters",
            foreignKey: "id_personaje",
            otherKey: "id_pelicula_serie",
            timestamps: false
        })
        CharacterMoviePivot.belongsTo(models.Movies, {
            as: "pivot_movies",
            foreignKey: "id_pelicula_serie",
            otherKey: "id_personaje",
            timestamps: false
        })
    }

    return CharacterMoviePivot;
}