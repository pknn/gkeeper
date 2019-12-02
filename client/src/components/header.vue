<template>
  <div class="header p-4">
    <div class="flex justify-center items-center">
      <div v-if="currentWeatherInfo" class="weather flex items-center flex-1">
        <div class="flex flex-col items-center">
          <img
            :src="
              `${publicPath}icon/${this.currentWeatherInfo.weather.icon}@2x.png`
            "
            class="w-10 bg-white rounded-full"
            :alt="currentWeatherInfo.weather.icon"
          />
        </div>
        <div class="ml-2">
          <h1>{{ currentWeatherInfo.info.temp }} °C</h1>
          <h1>{{ currentWeatherInfo.info.humidity }} g/‎cm<sup>3</sup></h1>
        </div>
      </div>
      <div class="absolute">
        <img
          class="w-16"
          src="https://image.flaticon.com/icons/png/512/628/628283.png"
          alt="logo"
        />
      </div>
      <div class="absolute right-0">
        <button
          @click="$router.push({ name: 'create' })"
          class="px-8 py-2 bg-app-main rounded hover:bg-app-accent shadow-md"
        >
          New Greenhouse
        </button>
        <button
          @click="logout"
          class="px-8 py-2 text-red-400 rounded hover:text-red-600 outline-none"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "dashHeader",
  data: () => ({
    currentWeatherInfo: null,
    publicPath: process.env.BASE_URL
  }),
  created() {
    window.navigator.geolocation.getCurrentPosition(
      data => {
        const { latitude, longitude } = data.coords;
        axios
          .get(
            `/api/weather/current?latitude=${latitude}&longitude=${longitude}`
          )
          .then(response => {
            const { data } = response;
            this.currentWeatherInfo = {
              weather: data.weather[0],
              info: data.main
            };
          });
      },
      () => {
        this.$emit("toast", false, "Cannot get location information.");
      }
    );
  },
  methods: {
    logout() {
      this.$emit("loading");
      this.$store.dispatch("logout");
      setTimeout(() => {
        this.$router.push("/");
      }, 800);
    }
  }
};
</script>
