<template>
  <div id="app">
    <router-view />
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
</style>
