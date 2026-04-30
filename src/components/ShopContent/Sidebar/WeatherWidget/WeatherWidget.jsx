import { useState, useEffect, useRef } from 'react';
import styles from './WeatherWidget.module.css';

const WeatherWidget = ({ onClose }) => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [cityInput, setCityInput] = useState('');
  const [geoError, setGeoError] = useState('');
  const [weatherError, setWeatherError] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const abortControllerRef = useRef(null);
  const failedCitiesRef = useRef(new Set());

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // Отмена запросов при размонтировании
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const fetchWithAbort = async (url) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response;
  };

  const fetchCoordinates = async (cityName) => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${apiKey}`;
    const res = await fetchWithAbort(url);
    const data = await res.json();
    if (!data.length) throw new Error('City not found');
    return { lat: data[0].lat, lon: data[0].lon, name: data[0].name };
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const res = await fetchWithAbort(url);
    const data = await res.json();
    if (data.cod !== 200) throw new Error(data.message);
    return data;
  };

  const loadWeatherForCity = async (cityName, preserveOldWeather = false) => {
    setGeoError('');
    setWeatherError('');
    setIsFetching(true);

    // Проверерка, не было ли уже ошибки геокодинга для города
    if (failedCitiesRef.current.has(cityName.toLowerCase())) {
      setGeoError(`Не удалось получить данные для города ${cityName}`);
      setIsFetching(false);
      if (!preserveOldWeather) setWeatherData(null);
      return false;
    }

    try {
      const { lat, lon, name } = await fetchCoordinates(cityName);
      failedCitiesRef.current.delete(cityName.toLowerCase());

      const weather = await fetchWeatherByCoords(lat, lon);
      setWeatherData(weather);
      setCityInput(name);
      return true;
    } catch (err) {
      if (err.name === 'AbortError') return false;
      if (err.message === 'City not found') {
        failedCitiesRef.current.add(cityName.toLowerCase());
        setGeoError(`Не удалось получить данные для города ${cityName}`);
        if (!preserveOldWeather) setWeatherData(null);
        setCityInput('');
      } else {
        setWeatherError('Не удалось получить данные');
        if (!preserveOldWeather) setWeatherData(null);
      }
      return false;
    } finally {
      setIsFetching(false);
    }
  };

  // Первая загрузка
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const position = await new Promise((resolve, reject) => {
          if (!navigator.geolocation) reject(new Error('Geolocation not supported'));
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        const weather = await fetchWeatherByCoords(latitude, longitude);
        setWeatherData(weather);
        setCityInput(weather.name)
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        try {
          const { lat, lon, name } = await fetchCoordinates('Tyumen');
          const weather = await fetchWeatherByCoords(lat, lon);
          setWeatherData(weather);
          setCityInput(name);
        } catch (fallbackErr) {
          if (fallbackErr.name !== 'AbortError') {
            setGeoError('Не удалось получить данные для города Тюмень');
            setCityInput('');
          }
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetWeather = () => {
    if (!cityInput.trim() || isFetching) return;
    loadWeatherForCity(cityInput.trim(), true); // preserveOldWeather = true
  };

  const handleInputChange = (e) => {
    setCityInput(e.target.value);
    setGeoError(''); // очисика ошибки геокодинга при изменении текста
  };

  if (loading) {
    return (
      <div className={styles.widget}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <div className={styles.skeleton}>Загрузка погоды...</div>
      </div>
    );
  }

  return (
    <div className={styles.widget}>
      <button className={styles.close} onClick={onClose}>✕</button>
      <div className={styles.weatherInfo}>
        {weatherData ? (
          <>
            <div className={styles.city}>{weatherData.name}</div>
            <div className={styles.temp}>{Math.round(weatherData.main.temp)}°C</div>
            <div className={styles.description}>{weatherData.weather[0].description}</div>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
          </>
        ) : (
          <div className={styles.emptyWeather}>Нет данных о погоде</div>
        )}
        {weatherError && <div className={styles.errorMsg}>{weatherError}</div>}
      </div>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={cityInput}
          onChange={handleInputChange}
          placeholder="Введите город"
          disabled={isFetching}
        />
        <button onClick={handleGetWeather} disabled={isFetching}>
          {isFetching ? 'Загрузка...' : 'Получить погоду'}
        </button>
      </div>
      {geoError && <div className={styles.geoError}>{geoError}</div>}
    </div>
  );
};

export default WeatherWidget;