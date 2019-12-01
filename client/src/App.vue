<template>
  <div id="app" class="w-screen h-screen">
    <transition name="slide">
      <div
        v-show="toast.display"
        class="toast"
        :class="toast.isSuccess ? 'success' : 'fail'"
      >
        {{ toast.message }}
      </div>
    </transition>
    <transition name="fade">
      <div v-show="isLoading" class="loading">
        <img
          class="logo"
          src="https://image.flaticon.com/icons/png/512/628/628283.png"
          alt="logo"
        />
        <h1>Loading</h1>
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view
        @loading="isLoading = true"
        @loaded="isLoading = false"
        @toast="displayToast"
      />
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    toast: {
      isSuccess: true,
      display: false,
      message: ""
    }
  }),
  methods: {
    displayToast(isSuccess, message) {
      this.toast = {
        isSuccess,
        display: true,
        message
      };
      setTimeout(() => {
        this.toast.display = false;
      }, 3000);
    }
  }
};
</script>

<style lang="postcss">
@import "assets/styles/tailwind.postcss";
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,600|Solway:400,700&display=swap");

.toast {
  @apply z-50 absolute inset-x-0 m-auto w-1/4 text-center p-4 rounded shadow-md text-gray-100;
  top: 40px;
  &.success {
    @apply bg-green-400;
  }
  &.fail {
    @apply bg-red-400;
  }
}

.loading {
  @apply absolute inset-0 m-auto w-screen h-screen flex flex-col justify-center items-center z-50;
  .logo {
    @apply mb-4;
    width: 200px;
    height: 200px;
    animation: spin 4s infinite;
  }
  background: rgba(255, 255, 255, 0.9);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(360deg);
  }
}

.text-primary {
  font-family: "Solway", serif;
}

.text-secondary {
  font-family: "Montserrat", sans-serif;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(-40px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  @apply text-primary;
}

a,
p,
span,
div,
body {
  @apply text-secondary;
}

.input-section {
  @apply flex flex-wrap p-2 mt-6 border-b border-gray-400 items-center;
  &.invalid {
    @apply border-red-400;
  }
  &.no-focus {
    &:focus-within {
      @apply shadow-none;
    }
  }
  &:focus-within {
    @apply shadow-xl border-transparent;
  }
  .input-label {
    @apply text-xs uppercase font-bold ml-12 text-gray-700;
    flex-basis: 100%;
  }
  .input-warn {
    @apply text-xs text-red-400 ml-12;
    flex-basis: 100%;
  }
  .input-icon {
    @apply mr-3 my-3;
    height: 20px;
    width: 20px;
    img {
      @apply w-full h-full;
    }
  }

  .input-field {
    @apply ml-2 p-2 outline-none flex-grow bg-transparent;
  }
  .input-addon {
    @apply text-sm my-3 text-app-accent font-bold;
    .input-addon-icon {
      @apply w-5;
    }
  }
}
</style>
