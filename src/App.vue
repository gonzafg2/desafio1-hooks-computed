<template>
  <div id="app">
    <NavBar />
    <PokeGuia />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import PokeGuia from "./components/PokeGuia.vue";

export default {
  name: "App",
  components: {
    NavBar,
    PokeGuia
  }
};
</script>

<style lang="scss"></style>
