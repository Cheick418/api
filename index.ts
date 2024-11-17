//https://vercel.com/guides/using-express-with-vercel
const express = require('express');
const bodyParser=require('body-parser');
const Sequelize=require('../src/db/Sequileze');



const app = express();
const port = process.env.PORT|| 3306;

app.use(bodyParser.json())

Sequelize.initDb();

app.get('/',(req,res)=>{
    res.json('gooood work');
})
require('./src/routes/finAllPokemon')(app);
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)


app.use((req,res)=>{
    res.status(404).json({message:"la ressource demander n'existe pas"})
})

app.listen(port,()=>console.log(`notre app a demarer sur http://localhost:${port}`));

module.exports = app;