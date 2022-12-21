var curr = {}
var loc = {}
var forecast = []
var city = document.getElementsByName('city')[0]
var find = document.getElementsByClassName("btn")[0]
async function getData() {
    let httpObj = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city.value == "" ? "cairo" : city.value}&days=3`)
    let data = await httpObj.json()
    curr = data.current
    loc = data.location
    forecast = data.forecast.forecastday
    displayData()

}
find.addEventListener('click', getData)
getData()
function displayData() {
    let temp = ''


    forecast.forEach((element, i) => {
        const date = new Date(element.date);
        let day = date.getDay()
        let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        if (i == 0) {
            temp += `<div  class="col-4 bg-dark text-white text-start p-3 my-5">
    <h3 class="fs-6">${weekday[day]}<span class="float-end">${element.date}</span></h3>
    <div class="clear-fix"></div>
    <h3>${loc.name}</h3>
    <h1>${element.day.maxtemp_c}°c
        <img src="https:${element.day.condition.icon}" alt="">
    </h1>
    <h4 class="text-primary">${element.day.condition.text}</h4>
    <div class="text-muted d-flex justify-content-around">
        <span id="rain">
            <img src="icon-umberella.png" alt="">
            ${curr.cloud}%
        </span>
        <span>
            <img src="icon-wind.png" alt="">
            ${element.day.maxwind_mph}km/h
        </span>
        <span>
            <img src="icon-compass.png" alt="">
            ${curr.wind_dir}
        </span>
    </div>
</div>
`}
        else {
            temp += `<div class="col-4  text-white text-center p-3 my-5 daytwo" >
    <h3 class="fs-6">${weekday[day]}</h3>
    <div class="clear-fix"></div>
    <img src="https:${element.day.condition.icon}" alt="">

    <h2 class='mt-3'>
        ${element.day.maxtemp_c}°c
    </h2>
    <h3 class='fs-5 mb-3'>${element.day.mintemp_c}°</h3>
    <h4 class="text-primary">${element.day.condition.text}</h4>
</div>`
        }

    });
    document.querySelector('.row').innerHTML = temp
}

