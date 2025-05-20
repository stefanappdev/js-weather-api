const express=require('express');
const path=require('path');
const dotenv=require("dotenv")

dotenv.config();
const app=express();
const apikey=process.env.API_KEY;

//access public folders 
app.use(express.static('public'));


//  set view engine
app.set('view engine','ejs');
app.set('views',__dirname)




//routes

app.get('/',function(request,response){

    response.render('index',{title:"My weather App",key:apikey});
})



app.use('/404',function(request,response){
    response.status(404).render('404',{title:"404 page"});
})

app.listen(parseInt(process.env.PORT),()=>{

console.log(`App listening on port ${process.env.PORT}`)
//console.log(process.env.WEATHER_API_KEY)
})
