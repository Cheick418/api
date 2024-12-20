const { Pokemon } = require('../db/Sequileze')
const {ValidationError,UniqueConstraintError}=require('sequelize')
  
module.exports = (app) => {
  app.put('/api/pokemons/:id', (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Pokemon.findByPk(id).then(pokemon => {
        if(pokemon==null){
          res.status(404).json({message:"Aucun pokemon ne possaide ce id"})
          return;
        }
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
    })
    .catch(error =>{
      if(error instanceof ValidationError){
        return res.status(400).json({message:error.message,data:error})
      }
      if(error instanceof UniqueConstraintError){
        return res.status(400).json({message:"Element existant deja dans la base de donne"})
      }
      res.status(500).json({message:"le pokemon n'a pas pu etre modifier",error})
  })
    
  })
} 
