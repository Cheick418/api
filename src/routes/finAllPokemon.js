const { Pokemon } = require('../db/Sequileze')
const {Op}=require('sequelize')


  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    const name=req.query.name;
    if(name &&name.length<2){
      const message='le terme de recherche  doit comptenir au moin deux caracteres';
      return res.status(400).json({message});
    }
    const limit=parseInt(req.query.limit)||5;
    if(name){
      return Pokemon.findAndCountAll(
        {
          where:{
          name:{[Op.like]:`%${name}%`}
          },
          order:['name'],
          limit:limit
        }

      )
      .then(({count,rows}) => {//les params count et row doivent avoir obligatoirement ce nom
      const message = `La liste des pokémons a bien été récupérée.il ya ${count} avec le nom ${name}`
      res.status(200).json({ message, data: rows })
      })
      .catch(error =>res.status(500).json({message:"la liste des pokemons n'a pas pu etre recuperer",error}))
    }
    else{
      Pokemon.findAll({order:['name']})
        .then(pokemons => {
          const message = 'La liste des pokémons a bien été récupérée.'
          res.json({ message, data: pokemons })
        })
        .catch(error =>res.status(500).json({message:"la liste des pokemons n'a pas pu etre recuperer",error}))
    }
  })
} 