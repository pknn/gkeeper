<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="postcss">
@import "assets/styles/tailwind.postcss";
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,600|Solway:400,700&display=swap");

.text-primary {
  font-family: "Solway", serif;
}

.text-secondary {
  font-family: "Montserrat", sans-serif;
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
