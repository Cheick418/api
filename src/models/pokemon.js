/* L’API Rest et la Base de données : Créer un modèle Sequelize */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique:{
          msg:'Il existe dejà un pokemon avec ce nom'
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt:{msg:' les pv doivent etre des entier non null'},
          min:{
            args:[1],
            msg:'la valeur minimun doit etre superieur a 0'
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue('types').split(',')
        },
        set (types){
          this.setDataValue('types',types.join())
        },
        validate:{
          isValideValue(value){
            if(!value)
              throw new Error('le pokememon doit avoir au mon un type')
            if(value.split(',').length>3)
              throw new Error('Un pokememon ne doit pas avoir plus de 3 type')
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }