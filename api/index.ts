//https://vercel.com/guides/using-express-with-vercel
const express = require('express');
const bodyParser=require('body-parser');



const app = express();
const port = process.env.PORT|| 3306;

app.use(bodyParser.json())


app.get('/',(req,res)=>{
    res.json('gooood work');
})


app.use((req,res)=>{
    res.status(404).json({message:"la ressource demander n'existe pas"})
})

app.listen(port,()=>console.log(`notre app a demarer sur http://localhost:${port}`));

module.exports = app;