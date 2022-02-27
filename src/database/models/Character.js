module.exports = (sequelize, dataTypes) => {
    let alias = "Characters";

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
        edad: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        peso: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        historia: {
            type: dataTypes.TEXT('medium'),
            allowNull: false
        },
        imagen_personaje: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    }
    let config = {
        tableName: "personajes",
        timestamps: false
    }

    let Character = sequelize.define(alias,cols,config);

    Character.associate = models => {
        Character.belongsToMany(models.Movies, {
          as: "movies",
          through: "personajes_peliculas_series_pivot",
          foreignKey: "id_personaje",
          otherKey: "id_pelicula_serie",
          timestamps: false
        })
      }

    return Character;
}

