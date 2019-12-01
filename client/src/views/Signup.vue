<template>
  <div class="wrapper">
    <div class="logo" />
    <div class="absolute inset-0 m-auto flex justify-center items-center">
      <div class="w-1/3">
        <h1 class="text-4xl text-gray-800 font-bold">Create Account</h1>
        <div class="mt-16">
          <div class="input-section" :class="{ invalid: !isUsernameUnique }">
            <label class="input-label" for="username">username</label>
            <p v-show="!isUsernameUnique" class="input-warn">
              This username has been used.
            </p>
            <div class="input-icon">
              <img src="@/assets/icon/avatar.png" />
            </div>
            <input
              class="input-field"
              type="text"
              v-model="username"
              v-debounce:300ms="checkUsername"
            />
          </div>
          <div class="input-section" :class="{ invalid: !isEmailUnique }">
            <label class="input-label" for="email">email</label>
            <p v-show="!isEmailUnique" class="input-warn">
              This email has been used.
            </p>
            <div class="input-icon">
              <img src="@/assets/icon/envelope.png" />
            </div>
            <input
              class="input-field"
              type="email"
              v-model="email"
              v-debounce:300ms="checkEmail"
            />
          </div>
          <div class="input-section" :class="{ invalid: !isPasswordValid }">
            <label class="input-label" for="password">password</label>
            <p v-show="!isPasswordValid" class="input-warn">
              Password must be more than 8 characters.
            </p>
            <div class="input-icon">
              <img src="@/assets/icon/padlock.png" />
            </div>
            <input
              class="input-field"
              :type="isShowPassword ? 'text' : 'password'"
              v-model="password"
              v-debounce:300ms="checkPassword"
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
          <div class="input-section no-focus border-none justify-center">
            <button
              @click="signUp"
              class="bg-app-accent hover:bg-app-main px-8 py-2 rounded shadow-md hover:shadow outline-none"
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
</style>

<script>
import axios from "axios";
export default {
  name: "signup",
  data: () => ({
    isShowPassword: false,
    username: "",
    email: "",
    password: "",
    isUsernameUnique: true,
    isEmailUnique: true,
    isPasswordValid: true,
    signingUp: false
  }),
  computed: {
    valid() {
      return (
        this.username &&
        this.email &&
        this.password &&
        this.isUsernameUnique &&
        this.isEmailUnique &&
        this.isPasswordValid
      );
    }
  },
  methods: {
    toggleShowPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
    async checkUsername() {
      if (!this.username) return;
      try {
        await axios.get(`/api/users?username=${this.username}`);
        this.isUsernameUnique = false;
      } catch (error) {
        this.isUsernameUnique = true;
      }
    },
    async checkEmail() {
      if (!this.email) return;
      try {
        await axios.get(`/api/users?email=${this.email}`);
        this.isEmailUnique = false;
      } catch (error) {
        this.isEmailUnique = true;
      }
    },
    checkPassword() {
      this.isPasswordValid = this.password.length >= 8;
    },
    signUp() {
      if (this.valid) {
        this.$emit("loading");
        this.$store
          .dispatch("register", {
            username: this.username,
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.$emit("toast", true, "Registration Success.");
            this.$router.push({ name: "login" });
          })
          .catch(() => {
            this.$emit("loaded");
            this.$emit(
              "toast",
              false,
              "Registration failed. Please try again."
            );
          });
      }
    }
  }
};
</script>
