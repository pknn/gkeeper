<template>
  <div class="wrapper bg-white w-screen">
    <div class="logo" />
    <div class="mt-48 mx-8">
      <h1 class="text-4xl text-gray-800 font-bold">Login</h1>
      <p>Please Login to Continue</p>
      <div class="mt-16">
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
          <input class="input-field" type="password" />
          <a class="input-addon">Forgot</a>
        </div>
      </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 mb-8 text-center">
      <p class="text-sm">
        Don't have an account? <a class="font-bold text-app-accent">Sign up</a>
      </p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.logo {
  @apply p-4 rounded-full absolute;
  background: url("https://image.flaticon.com/icons/png/512/628/628283.png");
  background-size: contain;
  background-position: left;
  height: 300px;
  width: 300px;
  right: 0;
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

.input-section {
  @apply flex flex-wrap p-2 mt-6 border-b border-gray-400;
  &:focus-within {
    @apply shadow-xl border-transparent;
  }
  .input-label {
    @apply text-xs uppercase font-bold ml-12 text-gray-700;
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
    @apply ml-2 p-2 outline-none;
  }
  .input-addon {
    @apply text-sm my-3 text-app-accent font-bold;
  }
}
</style>

<script>
export default {
  name: "home"
};
</script>
