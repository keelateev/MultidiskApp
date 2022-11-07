<template>
  <div class="auth-page__wrapper">
    <GeneralButton @click="getYandexKey" :button="{text:'Yandex.Disk'}"/>
  </div>
</template>

<script>
import GeneralButton from "@/components/GeneralComponents/GeneralButtom/GeneralButton";

export default {
  name: "AuthPage",
  components: {GeneralButton},
  methods: {
    getYandexKey() {
      window.location.href = "https://oauth.yandex.ru/authorize?response_type=token&client_id=b81d324fedb341438bb6f7f22749b376&redirect_uri=" + process.env.VUE_APP_LOCALHOST + "?disk=yandex";
    }
  },
  created() {
    this.$store.dispatch('CHECK_AUTH')
  },
  mounted() {
    let searchParams = window
        .location
        .search
        .replace('?', '')
        .split('&')
        .reduce(
            function (p, e) {
              var a = e.split('=');
              p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
              return p;
            },
            {}
        );
    let hashParams = window
        .location
        .hash
        .replace('#', '')
        .split('&')
        .reduce(
            function (p, e) {
              var a = e.split('=');
              p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
              return p;
            },
            {}
        );

    if (searchParams.disk === 'yandex') {
      if (typeof hashParams.access_token !== 'undefined') {
        this.$store.dispatch('LOGIN', {disk: 'yandex', token: hashParams.access_token})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.auth-page {
  &__wrapper {
    position: fixed;
    flex-direction: column;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
}
</style>