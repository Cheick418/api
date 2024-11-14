const { Pokemon } = require('../db/Sequileze')


module.exports=(app)=>{
    app.get('/api/pokemons/:id',(req,res)=>{
        Pokemon.findByPk(req.params.id)
            .then(result=>{
                if(result==NULL){
                    res.status(404).json({message:"Aucun pokemon ne possaide ce id "})
                    return;
                }
                res.json({message:"good work",data:result})
            })
            .catch(error =>res.status(500).json({message:"le pokemon n'a pas pu etre recuperer",error}))
    })
}; 