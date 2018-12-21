// console.log("sanity check")

$('#weather-form').submit((e)=>{
    e.preventDefault();
    // console.log("User submitted!")
    const zip = $('.zip-code').val();
    // console.log(zip);
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=imperial`;
    // we got the zip code
    // we built the URL.
    // GO GET THE JSON
    // $.getJSON, is shorthand for $.ajax
    // it expects 2 args:
    // 1. URL to fetch the JSON from
    // 2. the callback to run when the AJAX is back
    $.getJSON(weatherUrl,(weatherData)=>{
        console.log(weatherData);
        const currTemp = weatherData.main.temp;
        $(".thermometer").html(currTemp)
        const temps = {
            curr: weatherData.main.temp,
            max: weatherData.main.temp_max,
            min: weatherData.main.temp_min
        }
        const newHTML = `<img src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" />
        <div>The temp in ${weatherData.name} is currently ${temps.curr} &deg;
        `
        $('.weather-data').html(newHTML);

        // const newHTML = `<img src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" />
        // <div>The temp in ${weatherData.name} is currently ${temps.curr} &deg;
        // `
        // $('.weather-data').html(newHTML);
        animateTemp(0, currTemp);
    });
});

const canvas = document.getElementById('weather-canvas');
let context = canvas.getContext('2d');
let currentPercent = 0;
console.log(context)

function animateTemp(currentArc, currTemp){
    context.lineWidth = 5;
    context.strokeColor = "#ffff00";
    context.beginPath();
    // Full, inner circle
    context.fillStyle = "#ccc";
    context.arc(155,75,70,0,Math.PI*2);
    context.closePath();
    context.fill();

    // Outer line
    context.beginPath();
    context.arc(155, 75, 75, Math.PI * 1.5, Math.PI * 2 * currentArc + Math.PI * 1.5);
    context.stroke();

    // update the arc percentage, until we hit currentTemp
    currentPercent++;
    if(currentPercent < currentTemp){
        // we need to keep drawing
        // requestAnimation
        requestAnimationFrame(()=>{
            animateTemp(currentPercent/100, currentTemp)
       });
    }
};