const { Pokemon } = require('../db/Sequileze')
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
      if(pokemon==null){
        res.status(404).json({message:"Aucun pokemon ne possaide ce id"})
        return;
      }
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.json({message, data: pokemonDeleted })
      })
    })
    .catch(error =>res.status(500).json({message:"le pokemon n'a pas pu etre supprimer",error}))
  })
} 