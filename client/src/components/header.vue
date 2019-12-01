<template>
  <div class="header p-4">
    <div class="flex justify-center items-center">
      <div v-if="currentWeatherInfo" class="weather flex">
        <h1>{{ currentWeatherInfo.weather.main }}</h1>
        <div>
          <h1>{{ currentWeatherInfo.info.temp }}</h1>
          <h1>{{ currentWeatherInfo.info.humidity }}</h1>
        </div>
      </div>
      <div class="flex-1 flex justify-center">
        <img
          class="ml-20 w-16"
          src="https://image.flaticon.com/icons/png/512/628/628283.png"
          alt="logo"
        />
      </div>
      <button
        @click="$router.push({ name: 'create' })"
        class="px-8 py-2 bg-app-main rounded hover:bg-app-accent shadow-md text-gray-100"
      >
        New Greenhouse
      </button>
      <button
        @click="logout"
        class="px-8 py-2 text-red-400 rounded hover:text-red-600"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "dashHeader",
  data: () => ({
    currentWeatherInfo: null
  }),
  created() {
    window.navigator.geolocation.getCurrentPosition(
      data => {
        const { latitude, longitude } = data.coords;
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
