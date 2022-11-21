<template>
  <AuthPage v-if="!$store.state.userStore.authentication"/>
  <MainPage v-if="$store.state.userStore.authentication"/>
</template>

<script>


import AuthPage from "@/components/UI/AuthPage/AuthPage";
import MainPage from "@/components/UI/MainPage/MainPage";

export default {
  name: 'App',
  components: {
    MainPage,
    AuthPage,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

body {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
