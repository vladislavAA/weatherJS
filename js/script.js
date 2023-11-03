const checkTheme = () => {
    if (localStorage.getItem('theme') == 0) {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

const checkPressure = (pressureValue) => {
    if (pressureValue >= 770) {
        return 'высокое';
    } else if (pressureValue <= 750) {
        return 'низкое';
    } else {
        return 'нормальное';
    }
}

const receptionPrecipitation = (precipitationValue) => {
    if (!precipitationValue) return precipitationValue;

    return precipitationValue[0].toUpperCase() + precipitationValue.slice(1);
}

const getCardinalDirection = (angle) => {
    const directions = ['северный', 'северо-восточный', 'восточный', 'юго-восточный', 'южный', 'юго-западный', 'западный', 'северо-западный'];
    return directions[Math.round(angle / 45) % 8];
}

const getDescriptionWind = (speed) => {
    switch (speed) {
        case 0:
            return 'штиль';
            break;
        case 1:
            return 'тихий';
            break;
        case 2: case 3: 
            return 'легкий';
            break;
        case 4: case 5:
            return 'слабый';
            break;
        case 6: case 7:
            return 'умеренный';
            break;
        case 8: case 9: case 10:
            return 'свежий';
            break;
        case 11: case 12: case 13:
            return 'cильный';
            break;
        case 14: case 15: case 16:
            return 'крепкий';
            break;
        case 17: case 18: case 19: case 20:
            return 'очень крепкий';
            break;
        case 21: case 22: case 23: case 24:
            return 'шторм';
            break;
        case 25: case 26: case 27: case 28:
            return 'сильный шторм';
            break;
        case 29: case 30: case 31: case 32:
            return 'жестокий шторм';
            break;
        case 33: case 34: case 35: case 36:
            return 'ураган';
            break;

    }
}

const time = () => {
    let date = new Date(),
        hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
        minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
        document.querySelector('.left-block__timer').innerHTML = hours + ':' + minutes;
}

const getApiWeather = async (key, idCity) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?id=${idCity}&units=metric&lang=ru&appid=${key}`;
    let response = await fetch(url);

    let commits = await response.json();

    document.querySelector('.left-block__degree-value').innerHTML = Math.round(commits.main.temp);
    document.querySelector('.left-block__icon-weather').src = `https://openweathermap.org/img/wn/${commits.weather[0].icon}@2x.png`;
    document.querySelector('.right-block__text-temp-value').innerHTML = Math.round(commits.main.temp);
    document.querySelector('.right-block__text-temp-feels-like-value').innerHTML = Math.round(commits.main.feels_like);
    document.querySelector('.right-block__text-pressure-value').innerHTML = Math.round(commits.main.pressure / 1.333);
    document.querySelector('.right-block__text-pressure-property').innerHTML = checkPressure(Math.round(commits.main.pressure / 1.333));
    document.querySelector('.right-block__text-precipitation-value').innerHTML = receptionPrecipitation(commits.weather[0].description);
    document.querySelector('.right-block__text-wind-value').innerHTML = Math.round(commits.wind.speed);
    document.querySelector('.right-block__text-wind-direction').innerHTML = getCardinalDirection(Math.round(commits.wind.deg));
    document.querySelector('.right-block__text-wind-description').innerHTML = getDescriptionWind(4);


    console.log(commits);
    console.log(Math.round(commits.main.temp_max));
}

localStorage.getItem('theme')
    ? checkTheme()
    : localStorage.setItem('theme', 0)

const key = '13249f386f20c9987a4ae351d0a81873';
const idCityDefault = '498698';
document.querySelector('.left-block__city-name').innerHTML = 'Саранск';

//------------- Кнопка темы ----------------
const buttonTheme = document.querySelector('.main-section__btn-theme');

buttonTheme.addEventListener('click', () => {
    if (localStorage.getItem('theme') == 0) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 1);
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 0);
    }
});

//------------- Выпадающий список ----------

const selectCity = document.querySelector('.main-section__select-city');

selectCity.addEventListener('change', () => {
    getApiWeather(key, document.querySelector('.main-section__select-city').value);
    document.querySelector('.left-block__city-name').innerHTML = document.querySelector('.main-section__select-city').options[document.querySelector('.main-section__select-city').selectedIndex].text;
})

getApiWeather(key, idCityDefault);

setInterval(time, 1000);
time();

