
const formWeather = document.querySelector('form');
const search =document.querySelector('input');

const messageOne =document.querySelector("#message_1");
const messageTwo =document.querySelector("#message_2");
const messageThree =document.querySelector("#message_3");



formWeather.addEventListener('submit',(e)=>{

    e.preventDefault();
    
    const location = search.value;

        fetch(`http://localhost:3000/weather?search=${location}`).then(response=>{
            response.json().then(data=>{

                if(data.error)
                {
                    messageOne.textContent=data.error;
                }
                else
                {
                    messageOne.textContent=data.location;
                    messageTwo.textContent=data.Weather;
                    messageThree.textContent=data.Temperature;
                }
               
            });

        });
});