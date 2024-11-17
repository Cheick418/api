/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const pokemons = require('./mock-pokemon')


const sequelize = new Sequelize(
    'sql8744032',//nom de la base de donnée
    'sql8744032', //nom de l'utilisateur
    'smd4MzGRzG',  //mot de passe de la base de donné
    {
      host: 'sql8.freesqldatabase.com',
      dialect: 'mysql', //base de donnée utiliser
      dialectOptions:{
          connectTimeout : 60000
      },
      logging: false
})
  
const Pokemon = PokemonModel(sequelize, DataTypes)

  
const initDb = () => {
  /*return sequelize.sync({}).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      })
    })
    console.log('La base de donnée a bien été initialisée !')
  })*/
}
  
module.exports = { 
  initDb, Pokemon}