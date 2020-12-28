const express = require('express');
const path= require('path');
const hbs =require('hbs');
const geoCode =require('../src/util/geoCode');
const foreCast =require('../src/util/foreCast');
const app =express();
const PORT =process.env.PORT || 3000;

const pathDir =path.join(__dirname,'../views');
const partialPath =path.join(__dirname,'../templates/partials');
const publicPath =path.join(__dirname,'../public');

app.use(express.static(publicPath));

app.set('view engine','hbs');
app.set('views',pathDir);
hbs.registerPartials(partialPath);


app.get('/',(req,res)=>{

    res.render('index',{
        title:"Weather App",
        name:"Abhishek"
    });

});
app.get('/weather',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
                error:"Please Provide the location"
        });
    }
    else
    {
        geoCode(req.query.search,(error,data)=>{
        
            if(error)
            {
                return console.log(error);
            }
            foreCast(data.latitude,data.longitude,(error,foreCastdata)=>{

                res.send({
                    location:data.location,
                    Weather:foreCastdata.weather,
                    Temperature:foreCastdata.current_temperature + " Deg" 
                })
                // console.log(`Location=${data.location}`);
                // console.log(`Data=${foreCastdata.weather}`);
                // console.log(`Temperature=${foreCastdata. current_temperature}`);
            });
            
        });

    }
    
});
app.get('/help',(req,res)=>{

    res.render('help',{
        title:"Help Page",
        name:"Abhishek"
    });
});

app.get('/about',(req,res)=>{

    res.render('about',{
        title:"About Page",
        name:"Abhishek"
    });
});

app.get('/help/*',(req,res)=>{

    res.render('error',{
        title:"Help 404",
        error_message:"Help Article Not Found",
        name:"Abhishek"
    })
});

app.get('*',(req,res)=>{

    res.render('error',{
        title:"404",
        error_message:"404 Page Not Found",
        name:"ABhishek"
    });
});

app.listen(PORT,()=>{
    console.log(`Listening to the Port ${PORT}`);
});