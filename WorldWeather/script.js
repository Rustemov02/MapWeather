let aTag = document.querySelectorAll('a')

let name = document.querySelector('#name')
let temp = document.querySelector('#temp_h3')
let celcius = document.querySelector('.celcius')
let fahren = document.querySelector('.fahren')

let wind = document.querySelector('#wind')
let humidity = document.querySelector('#humidity')
let clouds = document.querySelector('#clouds')

let modal = document.querySelector('.modal')
let modalContent = document.querySelector('.modalContent')
let icon = document.querySelectorAll('.icon')
celcius.innerHTML = '°C|'
fahren.innerHTML = '°F'
 

 

aTag.forEach((item) => {
    item.addEventListener('click', function () {
        modal.style.display = "block"
        getData(this.id)
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    })

    for (let i = 0; i < icon.length; i++) {
        icon[i].style.display = 'none'
    }
})

function getData(id) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${id}&appid=9448fda7ca9edc482555b1d285e142db`)
        .then(res => res.json())
        .then(data => {
            const celc = Math.floor(data.main.temp) - 273.5  //from kelvin to celcius
            const temp = celc
            const name = data.name
            const windSpeed = data.wind.speed
            const humidity = data.main.humidity
            const clouds = data.clouds.all
            
            general({
                temp: temp,
                name: name,
                wind: windSpeed,
                humidity: humidity,
                clouds: clouds
            })
        })
}

function general(data) {
    let fahrenDeg = (data.temp * 9 / 5) + 32
    temp.innerHTML = celcDeg = data.temp
    name.innerHTML = data.name 
    wind.innerHTML = "Külək " + data.wind + ' m/san'  //  m/san
    humidity.innerHTML = "Rütubət " + data.humidity + " %"
    clouds.innerHTML = "Yağıntı " + data.clouds + " %"

    celcius.style.color = 'white'
    fahren.style.color = 'gray'

    modal.onclick = function (event) {
        if (event.target == fahren) {
            fahren.style.color = 'white'
            celcius.style.color = 'gray'
            data.temp = fahrenDeg
            temp.innerHTML = fahrenDeg
        } else if (event.target == celcius) {
            fahren.style.color = 'gray'
            celcius.style.color = 'white'
            data.temp = celcDeg
            temp.innerHTML = celcDeg
        }
    }  
     
        if (data.temp < 10 ) { //snowy 
            icon[2].style.display = 'block' 
            icon[1].style.display = 'none'
            icon[0].style.display = 'none'
            console.log('snowy') 
        } else if ( data.temp >= 10 && data.temp < 15 ) { //rainy
            icon[1].style.display = 'block'
            icon[2].style.display = 'none'
            icon[0].style.display = 'none'
            console.log('rainy' ) 
        } else if ((data.temp >= 15)) {   // sunny
            icon[0].style.display = 'block'
            icon[1].style.display = 'none'
            icon[2].style.display = 'none'
            console.log('sunny')  
        }}
         


