<template>
  <div class="bg-white p-4 shadow-lg">
    <h1>Weather</h1>
    <div v-if="currentWeatherInfo" class="info">
      <div class="icon">
        {{ currentWeatherInfo.weather.main }}
      </div>
      <div class="current-info">
        <p>Temperature: {{ currentWeatherInfo.info.temp }} Celsius</p>
        <p>Min Temperature: {{ currentWeatherInfo.info.temp_min }} Celsius</p>
        <p>MaxTemperature: {{ currentWeatherInfo.info.temp_max }} Celsius</p>
        <p>Humidity: {{ currentWeatherInfo.info.humidity }} Celsius</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "weather",
  data: () => ({
    currentWeatherInfo: null,
    isLoading: false
  }),
  created() {
    window.navigator.geolocation.getCurrentPosition(
      data => {
        const { latitude, longitude } = data.coords;
        this.isLoading = true;
        axios
          .get(`/weather/current?latitude=${latitude}&longitude=${longitude}`)
          .then(response => {
            const { data } = response;
            this.currentWeatherInfo = {
              weather: data.weather[0],
              info: data.main
            };
          });
      },
      error => {
        console.error(error);
      }
    );
  }
};
</script>
