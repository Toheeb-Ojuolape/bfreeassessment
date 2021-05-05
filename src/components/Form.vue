<template>
  <div>
    <v-form ref="form" v-model="valid" @submit.prevent="addUrl(link)">
      <v-text-field
        v-model="link"
        :rules="urlRules"
        prepend-inner-icon="mdi-map-marker"
        label="Enter URL here"
        solo
        style="width: 80%; margin: 0px auto 0px auto"
        prefix="https://"
      />
    </v-form>
    <v-btn
      color="#1877f2"
      @click="addUrl(link)"
      elevation="24"
      class="white--text mb-4"
      :disabled="!valid"
    >
      Generate QR Code
    </v-btn>

    <div
      style="
        text-align: center;
        margin: 20px auto 20px auto;
        padding: 0px 20px 0px 20px;
      "
      v-if="linkEntered"
    >
      <p>
        Congratulations, you have successfully generated a QR code for
        https://{{ link }}. Here it is:
      </p>
      <img
        height="100px"
        width="100px"
        style="text-align: center"
        :src="`https://www.qrtag.net/api/qr_4.png?url=https://${link}`"
      />
      <p>
        Click
        <router-link to="/qrpage" class="orange--text">here</router-link> to
        view all your previously generated QR codes
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      link: "",
      valid: true,
      storeData: "",
      linkEntered: false,
      urlRules: [
        (v) => !!v || "URL is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s"]+(\.[^<>()[\]\\.,;:\s"]+)*)|(".+"))((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "Please enter a valid URL",
      ],
    };
  },

  methods: {
    //emit function from Child component to fire adding link and displaying Qr code
    addUrl(link) {
      this.$emit("addUrl", link);
      this.storeData = JSON.parse(localStorage.getItem("urls"));
      if (this.storeData != null && this.storeData.length < 10) {
        this.linkEntered = true;
      }
      // don't show QR code upon change to link
      window.addEventListener("keydown", () => {
        this.linkEntered = false;
      });
    },
  },
};
</script>
