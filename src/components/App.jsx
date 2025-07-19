import { useEffect, useState } from 'react'
import Profile from './Profile'

function App() {
  const [city, setCity] = useState()
  const [weatherInfo, setWeatherInfo] = useState()

  const API_KEY = '6bfe0aae5d914111b0090214251507';
  let url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`

  const getWeatherInfoClick = (e) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Такого города  нет');
        }
        return response.json();
      })
      .then(json => {
       setWeatherInfo({
        temp_c: json.current.temp_c,
        temp_f: json.current.temp_f,
        feelslike_c: json.current.feelslike_c,
        feelslike_f: json.current.feelslike_f,
        desc: json.current.condition.text,
        icon: json.current.condition.icon,
        humidity: json.current.humidity,
        wind_kph: json.current.wind_kph,
        wind_mph: json.current.wind_mph
       })
      })
      .catch(err => {
        console.error(err.message);
        setWeatherInfo({})
      });
  }

  return (
    <>
      <Profile></Profile>
      <header>
        <h1> Прогноз погоды! </h1>
      </header>

      <div className='main-block'>
        <div className='input-wrapper'>
          <input className='input-city' type='text' onChange={e => setCity(e.target.value)} placeholder='введите город..'/>
          <button className='submit-btn' onClick={getWeatherInfoClick}>показать!</button>
        </div>

        <div className='weather-info'>
          <p className='current-temp'>температура:</p> <p>{weatherInfo ? weatherInfo.temp_c : ''}</p>
          <p className='feelslike-temp'>ощущается как:</p> <p>{weatherInfo ? weatherInfo.feelslike_c : ''}</p>
          <p className='condition-desc'>описание погоды:</p> <p>{weatherInfo ? weatherInfo.desc : ''}</p>
          <p className='humidity'>влажность:</p> <p>{weatherInfo ? weatherInfo.humidity : ''}</p> 
          <p className='wind-speed'>скорость ветра:</p> <p>{weatherInfo ? weatherInfo.wind_kph : ''}</p>
        </div>
      </div>
    </>
  )
}

export default App
