<template>
  <div class="splash">
    <img
      class="logo"
      src="https://image.flaticon.com/icons/png/512/628/628283.png"
      alt="logo"
    />
    <h1 class="brand-name">
      Green Keeper
    </h1>
  </div>
</template>

<style lang="postcss" scoped>
.splash {
  @apply flex flex-col justify-center items-center bg-white h-screen w-screen;
}
.logo {
  @apply p-4 rounded-full;
  float: left;
  height: 300px;
  overflow: hidden;
}

.brand-name {
  @apply m-2 text-4xl text-app-main;
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
  mounted() {
    this.$emit("loaded");
    setTimeout(() => {
      this.$router.push({ name: "login" });
    }, 2300);
  }
};
</script>
