import { useEffect, useState } from 'react'
import Profile from './Profile'

function App() {
  const [city, setCity] = useState()
  const [weatherInfo, setWeatherInfo] = useState()
  const [isC, setC] = useState(true)
  const [isKph, setKph] = useState(true)
  const tempUnit_c = '°C'
  const tempUnit_f = '°F'
  const windUnit_kph = 'км/ч'
  const windUnit_mph = 'мили/ч'

  const [weatherInfoActual, setWeatherInfoActual] = useState()

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
       console.log(json)
        setWeatherInfo({
          temp_c: `${json.current.temp_c} ${tempUnit_c}`,
          temp_f: `${json.current.temp_f} ${tempUnit_f}`,
          feelslike_c: `${json.current.feelslike_c} ${tempUnit_c}`,
          feelslike_f: `${json.current.feelslike_f} ${tempUnit_f}`,
          desc: json.current.condition.text,
          icon: json.current.condition.icon,
          humidity: json.current.humidity,
          wind_kph: `${json.current.wind_kph} ${windUnit_kph}`,
          wind_mph: `${json.current.wind_mph} ${windUnit_mph}`
        })
        setWeatherInfoActual({
          temp: `${json.current.temp_c} ${tempUnit_c}`,
          feelslike: `${json.current.feelslike_c} ${tempUnit_c}`,
          desc: json.current.condition.text,
          humidity: json.current.humidity,
          wind: `${json.current.wind_kph} ${windUnit_kph}`,
          icon: json.current.condition.icon
        })
      })
      .catch(err => {
        console.error(err.message);
        setWeatherInfo({})
      });
  }

  useEffect(() => {
    setWeatherInfoActual({
      temp: !weatherInfo ? '' : isC ? weatherInfo.temp_c : weatherInfo.temp_f,
      feelslike: !weatherInfo ? '' : isC ? weatherInfo.feelslike_c : weatherInfo.feelslike_f,
      desc: !weatherInfo ? '' : weatherInfo.desc,
      humidity: !weatherInfo ? '' : weatherInfo.humidity,
      wind: !weatherInfo ? '' : isKph ? weatherInfo.wind_kph : weatherInfo.wind_mph,
      icon: !weatherInfo ? '' : weatherInfo.icon,
    })
  }, [isC, isKph])
  return (
    <>
      <Profile></Profile>
      <header>
        <h1> Погода! </h1>
      </header>

      <div className='main-block'>
        <div className='input-wrapper'>
          <input className='input-city' type='text' onChange={e => setCity(e.target.value)} placeholder='введите город..'/>
          <button className='submit-btn' onClick={getWeatherInfoClick}>показать!</button>
        </div>

        <div className='weather-info-wrapper'>
          <div className='weather-info'>
            <p className='weather-prop'>иконка погоды:</p> <img src={weatherInfoActual ? weatherInfoActual.icon : ''}></img>
            <p className='weather-prop'>температура:</p> <p>{ weatherInfoActual ? weatherInfoActual.temp : '' }</p>
            <p className='weather-prop'>ощущается как:</p> <p>{ weatherInfoActual ? weatherInfoActual.feelslike : '' }</p>
            <p className='weather-prop'>описание погоды:</p> <p>{ weatherInfoActual ? weatherInfoActual.desc : '' }</p>
            <p className='weather-prop'>влажность:</p> <p>{ weatherInfoActual ? weatherInfoActual.humidity : '' }</p> 
            <p className='weather-prop'>скорость ветра:</p> <p>{ weatherInfoActual ? weatherInfoActual.wind : '' }</p>
          </div>

          <div className='conversion-wrapper'>
            <p className='conversion' onClick={() => setC(!isC)}>Перевести в {isC ? tempUnit_f : tempUnit_c}</p>
            <p className='conversion' onClick={() => setKph(!isKph)}>Перевести в {isKph ? windUnit_mph : windUnit_kph}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
