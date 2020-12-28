const request =require('request');
const foreCast = (latitude,longitude,callback)=>{

    const url=`http://api.weatherstack.com/current?access_key=745d658eb1991c16e0ac4339d90f46e9&query=${latitude},${longitude}`;

    request({url:url,json:true},(error,response)=>{

       

        if(error)
        {
            callback("Unable to Connect with the API",undefined);
        }
        else{

            callback(undefined,{
                    weather:response.body.current.weather_descriptions[0],
                    current_temperature:response.body.current.temperature,
                    feel_weather:response.body.current.feelslike
                
            });

        }
    });
        

};

module.exports=foreCast;