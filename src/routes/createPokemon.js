const { Pokemon } = require('../db/Sequileze')
const {ValidationError,UniqueConstraintError}=require('sequelize')

module.exports = (app) => {
  app.post('/api/pokemons', (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
      .catch(error =>{
        if(error instanceof ValidationError){
          return res.status(400).json({message:error.message,data:error})
        }
        if(error instanceof UniqueConstraintError){
          return res.status(400).json({message:"Element existant deja dans la base de donne"})
        }
        const message="le pokemon n'a pas pu etre ajouter";
        res.status(500).json({message,error})
      })
  })
} 