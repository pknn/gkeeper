<template>
  <div class="wrapper" :class="{ wooshIn: beginWoosh }">
    <div class="logo" />
    <div class="absolute inset-0 m-auto flex justify-center items-center">
      <div class="w-1/3">
        <h1 class="text-4xl text-gray-800 font-bold">Create Account</h1>
        <div class="mt-16">
          <div class="input-section invalid">
            <label class="input-label" for="username">username</label>
            <p class="input-warn">Username has been used.</p>
            <div class="input-icon">
              <img src="@/assets/icon/avatar.png" />
            </div>
            <input class="input-field" type="email" />
          </div>
          <div class="input-section">
            <label class="input-label" for="email">email</label>
            <div class="input-icon">
              <img src="@/assets/icon/envelope.png" />
            </div>
            <input class="input-field" type="email" />
          </div>
          <div class="input-section">
            <label class="input-label" for="password">password</label>
            <div class="input-icon">
              <img src="@/assets/icon/padlock.png" />
            </div>
            <input
              class="input-field"
              :type="isShowPassword ? 'text' : 'password'"
            />
            <a class="input-addon" @click="toggleShowPassword">
              <img
                v-if="isShowPassword"
                class="input-addon-icon"
                src="@/assets/icon/hide.png"
              />
              <img
                v-else
                class="input-addon-icon"
                src="@/assets/icon/eye.png"
              />
            </a>
          </div>
          <div class="input-section border-none justify-center">
            <button
              class="bg-app-accent hover:bg-app-main px-8 py-2 rounded shadow-md hover:shadow"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div class="absolute inset-x-0 bottom-0 mb-8 text-center">
        <span class="text-sm">
          Already have an account?
        </span>
        <router-link :to="{ name: 'login' }" class="font-bold text-app-accent">
          Sign In
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.wrapper {
  @apply bg-white w-screen;
}

.logo {
  @apply p-4 rounded-full absolute;
  background: url("https://image.flaticon.com/icons/png/512/628/628283.png");
  background-size: contain;
  background-position: left;
  height: 500px;
  width: 500px;
  left: 0;
  top: 0;
  opacity: 30%;
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
  name: "signup",
  data: () => ({
    beginWoosh: false,
    isShowPassword: false
  }),
  mounted() {
    setTimeout(() => {
      this.beginWoosh = true;
    }, 800);
  },
  methods: {
    toggleShowPassword() {
      this.isShowPassword = !this.isShowPassword;
    }
  }
};
</script>
