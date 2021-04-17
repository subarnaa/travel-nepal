import React, { useEffect, useState } from 'react';
import { Paper,Typography, makeStyles, Grid } from '@material-ui/core';
import axios from 'axios';
import weatherBackgroud from '../../statics/weather.png'

const useStyles = makeStyles(theme => ({
  container: {
    margin: '1rem 0',
    padding: '1rem 0.8rem',
    textAlign: 'left',
    background: `url(${weatherBackgroud})`,
    backgroundSize: 'cover',
  },
  weatherLabel: {
    fontSize: '1rem',
    fontWeight: '600',
  },
  weatherContent: {
    fontWeight: 400,
  },
  weatherData: {
    '& > *': {
      textShadow: '0px 0px 2px rgba(0,0,0,0.25)',
    },
  },
  loading:{
    marginTop: '1rem'
  }
}));

const capitalize = (input) => {
  const arr = input.split('');
  const result = arr[0].toUpperCase().concat(arr.splice(1).join(''));
  return result;
}

const WeatherCard = ({lat, lon}) => {
  const classes = useStyles();
  const [weather, setWeather] = useState();

  /* eslint-disable */
  useEffect(() => {
    const getWeatherInfo = async () => {
      const response = await axios.post(`https://api.opnweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`);
      setWeather(response);
    };
    getWeatherInfo();
  }, [])

  let weatherData = null

  weather && weather.data ?
    weatherData =
    (
      <div className={classes.weatherData}>
        <Typography variant="h5" color="secondary" style={{marginBottom: '10px'}}>Today's Weather Report</Typography>
        <Typography className={classes.weatherLabel}>Sunrise: <span className={classes.weatherContent}>{new Date(weather.data.sys.sunrise).toLocaleTimeString()}</span></Typography>
        <Typography className={classes.weatherLabel}>Sunset: <span className={classes.weatherContent}>{new Date(weather.data.sys.sunset).toLocaleTimeString()}</span></Typography>
        <Typography className={classes.weatherLabel}>Average Temperature: <span className={classes.weatherContent}>{weather.data.main.temp}</span></Typography>
        <Typography className={classes.weatherLabel}>Current Weather Condition: <span className={classes.weatherContent}>{capitalize(weather.data.weather[0].description)}</span></Typography>
        <Typography className={classes.weatherLabel}>Wind Speed: <span className={classes.weatherContent}>{weather.data.wind.speed} Km/hr</span></Typography>
      </div>
    ) : weatherData = <div className={classes.loading}>Loading Weather Information...</div>;

  return (
    <Grid item xs={12} sm={6}>
      <Paper className={classes.container}>
        {weatherData}
      </Paper>
    </Grid>
  )
}

export default WeatherCard;
