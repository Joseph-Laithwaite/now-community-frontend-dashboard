<template>
    <div class="section section-contacts">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">
                <slot name="title">
                  Contact Us
                </slot>
              </h2>
              <h4 class="text-center description">
                <slot name="description">

                </slot>
              </h4>
              <form class="contact-form">
                <div class="md-layout">
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Your Name</label>
                      <md-input v-model="name" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Your Email</label>
                      <md-input v-model="email" type="email"></md-input>
                    </md-field>
                  </div>
                </div>
                <md-field maxlength="5">
                  <label>Your Message</label>
                  <md-textarea v-model="message"></md-textarea>
                </md-field>
                <div class="md-layout">
                  <div class="md-layout-item md-size-33 mx-auto text-center">
                    <md-button class="md-success">Send Message</md-button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: "contact-us",
  props: {
  },
  data() {
    return {
        name: null,
        email: null,
        message: null, 
    }
  },
  computed: {
  }
};
</script>

<style lang="scss" scoped>
    .md-card-actions.text-center {
    display: flex;
    justify-content: center !important;
    }
    
</style>