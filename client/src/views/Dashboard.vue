<template>
  <div class="w-full h-full bg-gray-200 flex flex-col">
    <dash-header @loading="$emit('loading')" @toast="toast" />
    <div class="content flex w-full h-full p-4">
      <div
        v-if="greenhousesCount <= 0"
        class="no-content w-full flex flex-col justify-center items-center"
      >
        <h1>You currently have no greenhouse</h1>
        <router-link class="text-app-accent" :to="{ name: 'create' }"
          >create</router-link
        >
      </div>
      <div v-else class="w-full">
        <div class="greenhouses p-3 m-1 bg-white shadow-md">
          <div class="flex justify-center items-center">
            <p class="text-sm text-gray-600">
              {{ index + 1 }} of {{ greenhousesCount }}
            </p>
          </div>
          <div class="flex justify-center items-center">
            <button
              @click="change(-1)"
              class="text-sm text-gray-600 no-outline"
            >
              Prev
            </button>
            <h1 class="mx-4 text-app-main">
              {{ greenhouses[index].name.toUpperCase() }}
            </h1>
            <button @click="change(1)" class="text-sm text-gray-600 no-outline">
              Next
            </button>
          </div>
        </div>
        <div class="flex">
          <tracking v-if="greenhousesCount >= 0" :id="greenhouses[index].id" />
          <fact
            v-if="greenhousesCount >= 0"
            :plant="greenhouses[index].plant"
          />
        </div>
        <div v-if="greenhousesCount >= 0" class="statistics flex">
          <temperature :id="greenhouses[index].id" />
          <brightness :id="greenhouses[index].id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import dashHeader from "@/components/header.vue";
import temperature from "@/components/temperature.vue";
import brightness from "@/components/brightness.vue";
import fact from "@/components/fact.vue";
import tracking from "@/components/track.vue";
export default {
  name: "dashboard",
  components: {
    dashHeader,
    temperature,
    brightness,
    fact,
    tracking
  },
  data: () => ({
    index: 0
  }),
  computed: {
    ...mapGetters(["greenhouses", "greenhousesCount", "greenhouse"])
  },
  methods: {
    change(factor) {
      if (this.index + factor < 0) {
        this.index = this.greenhousesCount - 1;
      } else if (this.index + factor >= this.greenhousesCount) {
        this.index = 0;
      } else {
        this.index += factor;
      }
    },
    toast(isSuccess, message) {
      this.$emit("toast", isSuccess, message);
    },
    ...mapActions(["fetchGreenhouse"])
  },
  created() {
    this.fetchGreenhouse().then(() => {
      setTimeout(() => {
        this.$emit("loaded");
      }, 800);
    });
  }
};
</script>
