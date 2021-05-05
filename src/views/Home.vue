<template>
  <v-app>
    <v-main
      style="
        background: #fbe4c4;
        padding: 150px 00px 0px 0px;
        text-align: center;
      "
    >
      <h1 class="mb-4">Hello There 👋</h1>
      <p
        class="animate__animated animate__fadeInDown animate__delay-2s"
        style="font-size: 17px; padding: 0px 20px 0px 20px"
      >
        Please enter a website link below to generate a QR Code 😀
      </p>
      <Form @addUrl="addUrl" />
      <v-dialog v-model="dialog" max-width="500">
        <v-card elevation="24" color="red" class="pa-7 text-center">
          <v-icon size="100px" color="white">mdi-close-circle</v-icon>
          <h1
            style="font-size: 23px; padding: 10px; color: white"
            class="font-weight-black"
          >
            Maximum QR Codes generated
          </h1>
          <p style="font-size: 15px; color: white">
            Hey there, you have reached the maximum number of QR codes you can
            create during this session. Please refresh to be able to generate
            new ones
          </p>
          <v-btn @click="dialog = false" elevation="24"> Ok</v-btn>
        </v-card>
      </v-dialog>

      <v-dialog v-model="empty" max-width="500">
        <v-card elevation="24" color="red" class="pa-7 text-center">
          <v-icon size="100px" color="white">mdi-link</v-icon>
          <p
            style="font-size: 25px; padding: 10px; color: white"
            class="font-weight-black"
          >
            You need to enter a link!
          </p>
          <p style="font-size: 15px; color: white">
            Hey buddy 👋. Sorry but you need to enter link to generate a QR
            code.
          </p>
          <v-btn @click="empty = false" elevation="24"> Ok</v-btn>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import Form from "@/components/Form";
export default {
  name: "Home",
  components: {
    Form,
  },
  data() {
    return {
      link: "",

      dialog: false,
      empty: false,
      storeData: "",
    };
  },

  created() {
    this.clearLocal();
  },

  beforeDestroy() {
    localStorage.clear();
  },

  methods: {
    addUrl(link) {
      this.link = link;
      this.storeData = JSON.parse(localStorage.getItem("urls"));
      if (this.storeData != null && this.storeData.length == 10) {
        this.dialog = true;
        return;
      } else if (link != "") {
        let payload = {
          id: parseInt(Math.random() * 200),
          link: "https://" + this.link,
        };
        this.$store.dispatch("addUrl", payload);
      } else {
        this.empty = true;
      }
    },

    clearLocal() {
      this.storeData = JSON.parse(localStorage.getItem("urls"));
      if (this.storeData != null && this.storeData.length >= 10) {
        localStorage.clear();
        location.reload();
      }

      // window.addEventListener("beforeunload", () => {
      //   localStorage.clear();
      // });
    },
  },
};
</script>

<style>
body,
h1,
h2,
h3,
p {
  font-family: "Poppins";
}
.v-btn {
  text-transform: none !important;
}
</style>
