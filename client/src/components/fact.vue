<template>
  <div class="bg-white p-3 m-1 shadow-md w-2/3">
    <h1 class="uppercase text-app-main text-xl">General Information</h1>
    <div v-if="loaded" class="flex">
      <img class="w-64 h-64 mr-4 my-4 shadow-md" :src="imageURL" :alt="plant" />
      <div class="my-4">
        <h2 class="capitalize text-2xl">{{ plant }}</h2>
        <p class="text-sm">{{ plantData.description || "No data" }}</p>
        <p class="text-sm">
          <b>Optimal Sun:</b> {{ plantData.optimal_sun || "No data" }}
        </p>
        <p class="text-sm">
          <b>Optimal Soil:</b> {{ plantData.optimal_soil || "No data" }}
        </p>
        <p class="text-sm"><b>Pests:</b> {{ plantData.pests || "None" }}</p>
        <p class="text-sm">
          <b>Disease:</b> {{ plantData.diseases || "None" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "fact",
  props: {
    plant: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loaded: false,
    imageURL: "",
    plantData: null
  }),
  mounted() {
    this.fetchData().then(() => {
      this.loaded = true;
    });
  },
  methods: {
    async fetchData() {
      const {
        VUE_APP_IMAGE_API_KEY,
        VUE_APP_IMAGE_API_ENDPOINT,
        VUE_APP_PLANT_API_ENDPOINT
      } = process.env;
      const imageResponse = await axios.get(
        `${VUE_APP_IMAGE_API_ENDPOINT}?key=${VUE_APP_IMAGE_API_KEY}&q=${this.plant}%20plant`
      );
      this.imageURL = imageResponse.data.hits[0].largeImageURL;
      const infoResponse = await axios.get(
        `${VUE_APP_PLANT_API_ENDPOINT}?term=${this.plant}`,
        {
          headers: {
            Accept: "application/json"
          }
        }
      );
      this.plantData = infoResponse.data[0];
    }
  }
};
</script>
