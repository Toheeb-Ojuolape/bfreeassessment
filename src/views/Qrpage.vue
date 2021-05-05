<template>
  <v-app>
    <v-main style="text-align: center; background: #fbe4c4; padding-top: 100px">
      <v-btn text @click="goBack()"
        ><v-icon>mdi-chevron-left</v-icon> Go Back</v-btn
      >
      <p class="font-weight-bold" style="font-size: 19px">
        Here are your previously <br />generated QR codes:
      </p>
      <v-card
        color="#fbe4c4"
        class="mx-3 d-flex flex-wrap justify-start mb-6"
        flat
      >
        <div v-for="(url, i) in urls" :key="i">
          <img
            style="text-align: center; margin: 10px"
            :src="`https://www.qrtag.net/api/qr_4.png?url=https://${url.link}`"
          />
        </div>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "QrPage",

  computed: {
    urls() {
      let theLinks = JSON.parse(localStorage.getItem("urls"));
      return theLinks;
    },
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
