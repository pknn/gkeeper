<template>
  <div class="flex flex-col justify-center items-center bg-white">
    <img
      class="logo"
      :class="{ wooshIn: beginWooshIn, wooshOut: beginWooshOut }"
      src="https://image.flaticon.com/icons/png/512/628/628283.png"
      alt="logo"
    />
    <h1 class="brand-name" :class="{ wooshOut: beginWooshOut }">
      Green Keeper
    </h1>
  </div>
</template>

<style lang="postcss" scoped>
.logo {
  @apply p-4 rounded-full;
  transition: transform 800ms ease-out;
  float: left;
  height: 300px;
  overflow: hidden;
  &.wooshIn {
    transform: scale(6);
  }
  &.wooshOut {
    transform: scale(0.01);
  }
}

.brand-name {
  @apply m-2 text-4xl text-app-main;
  &.wooshOut {
    display: none;
  }
}

.button {
  @apply text-lg px-10 py-3 m-2 font-bold rounded-full shadow-md;
  &.primary {
    @apply bg-app-accent text-gray-100;
  }
  &.secondary {
    @apply bg-gray-100;
  }
}
</style>

<script>
export default {
  name: "splash",
  data: () => ({
    beginWooshIn: false,
    beginWooshOut: false
  }),
  mounted() {
    setTimeout(() => {
      this.beginWooshIn = true;
    }, 1000);
    setTimeout(() => {
      this.beginWooshOut = true;
    }, 2700);
    setTimeout(() => {
      this.$router.push({ name: "home" });
    }, 3500);
  }
};
</script>
