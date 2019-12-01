<template>
  <div class="wrapper">
    <div class="logo" />
    <div class="absolute inset-0 m-auto flex justify-center items-center">
      <div class="w-1/3">
        <h1 class="text-4xl text-gray-800 font-bold">Login</h1>
        <p>Please Login to Continue</p>
        <div class="mt-16">
          <div class="input-section">
            <label class="input-label" for="username">username</label>
            <div class="input-icon">
              <img src="@/assets/icon/avatar.png" />
            </div>
            <input class="input-field" type="text" v-model="username" />
          </div>
          <div class="input-section">
            <label class="input-label" for="password">password</label>
            <div class="input-icon">
              <img src="@/assets/icon/padlock.png" />
            </div>
            <input
              class="input-field"
              :type="isShowPassword ? 'text' : 'password'"
              v-model="password"
            />
            <a class="input-addon">
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
            </a>
          </div>
          <div class="input-section no-focus border-none justify-center">
            <button
              class="bg-app-accent hover:bg-app-main px-8 py-2 rounded shadow-md hover:shadow outline-none"
              @click="signIn"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
      <div class="absolute inset-x-0 bottom-0 mb-8 text-center">
        <span class="text-sm">
          Don't have an account?
        </span>
        <router-link :to="{ name: 'signup' }" class="font-bold text-app-accent">
          Sign up
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
  right: 0;
  top: 0;
  opacity: 30%;
}
</style>

<script>
export default {
  name: "login",
  data: () => ({
    username: "",
    password: "",
    isShowPassword: false,
    isLoggingIn: false
  }),
  methods: {
    toggleShowPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
    signIn() {
      if (this.username && this.password) {
        this.isLoggingIn = true;
        this.$store
          .dispatch("login", {
            username: this.username,
            password: this.password
          })
          .then(() => {
            this.$router.push({ name: "dashboard" });
          })
          .catch(error => {
            console.error(error);
          })
          .finally(() => {
            this.isLoggingIn = false;
          });
      }
    }
  }
};
</script>
