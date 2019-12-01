<template>
  <div class="wrapper">
    <div class="logo" />
    <div class="absolute inset-0 m-auto flex justify-center items-center">
      <div class="w-1/3">
        <h1 class="text-4xl text-gray-800 font-bold">Create Greenhouse</h1>
        <div class="mt-16">
          <div class="input-section">
            <label class="input-label" for="username">greenhouse name</label>
            <div class="input-icon">
              <img src="@/assets/icon/name.png" />
            </div>
            <input class="input-field" type="text" v-model="name" />
          </div>
          <div class="input-section">
            <label class="input-label" for="username">plant type</label>
            <div class="input-icon">
              <img src="@/assets/icon/growth.png" />
            </div>
            <input class="input-field" type="text" v-model="plant" />
          </div>
          <div class="input-section no-focus border-none justify-center">
            <button
              class="bg-app-accent hover:bg-app-main px-8 py-2 rounded shadow-md hover:shadow outline-none"
              @click="create"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.wrapper {
  @apply bg-white w-screen;
}

.logo {
  @apply p-4 rounded-full absolute inset-x-0 m-auto;
  background: url("https://image.flaticon.com/icons/png/512/628/628283.png");
  background-size: contain;
  background-position: left;
  height: 500px;
  width: 500px;
  top: 0;
  opacity: 30%;
}
</style>

<script>
import { mapGetters } from "vuex";
export default {
  name: "login",
  data: () => ({
    name: "",
    plant: "",
    ...mapGetters(["greenhouses"])
  }),
  computed: {
    isUnique() {
      return !this.greenhouses.find(v => v.name === this.name);
    }
  },
  methods: {
    async create() {
      await this.$store.dispatch("createGreenhouse", {
        name: this.name,
        plant: this.plant
      });
      await this.$store.dispatch("fetchGreenhouse");
      this.$router.push({ name: "dashboard" });
    }
  }
};
</script>
