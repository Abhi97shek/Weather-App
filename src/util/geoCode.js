const request =require('request');

const geoCode = (address,callback)=>{

    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWJoaS1zaGVrMSIsImEiOiJja2l1M2lva2wxMXNyMnluNGpjemFodDNoIn0.7dKzAUzwe8G7qWSdii2OBw`;

    request({url:url,json:true},(error,response)=>{

            if(error)
            {
                callback("Unable to Connect with the API",undefined);
            }
            else
            {
               callback(undefined,{

                    latitude: response.body.features[0].center[1],
                    longitude:response.body.features[0].center[0],
                    location:response.body.features[0].place_name
               })

            }

    })

};


module.exports=geoCode;