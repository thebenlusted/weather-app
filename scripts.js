

const overcast_bg = 'https://images.hdqwalls.com/download/cloudy-evening-montreal-skycrapper-building-km-1920x1080.jpg';
const light_rain_bg = 'https://wallpaperaccess.com/full/1379504.png';
const partly_cloudy_bg = 'https://i.pinimg.com/originals/43/42/bb/4342bb920a45369761ff9e21ffacd437.jpg';
const clear_bg = 'https://wallpaperaccess.com/full/4130573.jpg';

const api_key = '941471bf9ff9410ab2264817212511';

function getLocation() {
    fetch('https://ip-api.com/json/')
    .then(res => res.json())
    .then(response => {
        console.log("Country: " + response.country + ', ' + response.city);

        setPage(response.city);
    })
    .catch((data, status) => {
        console.log('Request Failed');
    })
};

let data;
function setPage(city) {
let request = new XMLHttpRequest();
request.open('GET', `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=Summerland&days=3`);
request.send();
request.onload = () => {
        if(request.status === 200) {
            data = JSON.parse(request.response);
            console.log(data);
        } else {
            console.log(`error ${request.status} ${request.statusText}`);
        }

        if(data) {
            let dcct = data.current.condition.text;
            if(dcct === 'Overcast') {
                document.body.style.backgroundImage = `url(${overcast_bg})`;
            } else if(dcct === 'Light rain') {
                document.body.style.backgroundImage = `url(${light_rain_bg})`;
            } else if(dcct === 'Partly cloudy') {
                document.body.style.backgroundImage = `url(${partly_cloudy_bg})`;
            } else if(dcct === 'Clear') {
                document.body.style.backgroundImage = `url(${clear_bg})`;
            }
            console.log(data.current.condition.text);

            const time_date_text = document.getElementById('town');
            time_date_text.innerHTML = data.location.name + ', ' + data.location.region;

            const current_tempC = document.getElementById('current-c');
            current_tempC.innerHTML = "<i class='bi bi-thermometer-low'></i><br>" + data.current.temp_c + '°C';

            const wind_speed = document.getElementById('wind-speed');
            wind_speed.innerHTML = '<i class="bi bi-wind"></i><br>' + data.current.wind_kph
            + '<small> kph</small>';

            const cloud_cov = document.getElementById('cloud-coverage');
            cloud_cov.innerHTML = '<i class="bi bi-cloud"></i><br>' + data.current.cloud + '%';
        }

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", 
        "Aug", "Sep", "Oct", "Nov", "Dec"];
        function createForecastDay(fd) {
            const targetEl = document.getElementById('forecast');
            const fd_ = document.createElement('div');
            fd_.className = 'col forecast-day';
            targetEl.append(fd_);

            let newMon = fd.date.split('-');
            newMon.splice(0,1);
            newMon.splice(1,1);
            console.log('Month ' + newMon);
            let newDate = fd.date.split('-');
            newDate.splice(0,1);
            newDate.splice(0,1);
            console.log('Day ' + newDate);
            //splitting the days and months numbers 

            let newStr = months[newMon-1] + ', ' + newDate;

            const fd_date = document.createElement('h2');
            fd_date.innerHTML = newStr;
            fd_.append(fd_date);

            const cond_img = document.createElement('img');
            cond_img.src = fd.day.condition.icon;
            fd_.append(cond_img);

            const temperature = document.createElement('p');
            temperature.innerHTML = fd.day.maxtemp_c + '/' + fd.day.mintemp_c;
            fd_.append(temperature);

            const cond_text = document.createElement('p');
            cond_text.innerHTML = fd.day.condition.text;
            fd_.append(cond_text);
        }
        function setForecast() {
            const forecastDays = data.forecast.forecastday;
            forecastDays.forEach(e => createForecastDay(e));
        }
        setForecast();
    }
}

function setClock() {
    let d = new Date();
    let t = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true});
    document.getElementById('clock').innerHTML = t;
}

getLocation();
setInterval(setClock,100);