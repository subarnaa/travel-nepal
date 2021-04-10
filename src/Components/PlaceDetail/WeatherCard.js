import React, { useState } from 'react';
import { Paper,Typography, makeStyles } from '@material-ui/core';
import { toast } from 'react-toastify'
import { useQuery } from 'react-query'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  container: {
    margin: '1rem 0',
    padding: '1rem 0.8rem',
    textAlign: 'left'
  },
  weatherLabel: {
    fontSize: '1rem',
    fontWeight: '600',
  },
  weatherContent: {
    fontWeight: 400,
  },
}));

const WeatherCard = ({lat, lon}) => {
  const [weatherInfo, setWeatherInfo] = useState([]);
  const getWeatherInfo = async () => {
    console.log(lat, lon, '-->>>')
    const response = await axios.post(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`);
    return response;
  }

  const {data} = useQuery("weather", () => getWeatherInfo, {
    onError: () => {
      toast.error("Weather Information could not be loaded.")
    }
  });

  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      {console.log(data, 'data')}
      <Typography className={classes.weatherLabel}>Sunrise: <span className={classes.weatherContent}>{new Date(data.sys.sunrise).toLocaleTimeString}</span></Typography>
      <Typography className={classes.weatherLabel}>Sunset: <span className={classes.weatherContent}>{new Date(data.sys.sunset).toLocaleTimeString}</span></Typography>
      <Typography className={classes.weatherLabel}>Average Temperature: <span className={classes.weatherContent}></span></Typography>
    </Paper>
  )
}

export default WeatherCard
