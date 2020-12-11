<template>
  <form>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Email Address</label>
              <md-input v-model="emailadress" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Name</label>
              <md-input v-model="name" type="text"></md-input>
            </md-field>
          </div>

          <!-- <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Adress</label>
              <md-input v-model="address" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>City</label>
              <md-input v-model="city" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Country</label>
              <md-input v-model="country" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Postal Code</label>
              <md-input v-model="code" type="number"></md-input>
            </md-field>
          </div> -->

          <div class="md-layout-item md-size-100">
            <edit-address-card 
                :v-for="adress in addresses" 
                :adress=adress
            ></edit-address-card>
          </div>

          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>About Me</label>
              <md-textarea v-model="aboutme"></md-textarea>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success">Update Profile</md-button>
          </div>
        </div>
      
  </form>
</template>
<script>

import EditAdressCard from "./EditAdressCard"

export default {
  name: "edit-profile-form",
  components:{
    EditAdressCard,
  },
  props: {
    user:{type: Object},
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      name: null,
      emailadress: null,
      // lastname: null,
      // firstname: null,
      addresses: Array(),
      // city: null,
      // country: null,
      // code: null,
      aboutme:
        "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
    };
  },
  mounted(){
    this.username = (this.user.name ? this.user.name : '')
    this.emailadress = (this.user.email ? this.user.email : '')
    this.lastname = (this.user.name ? this.user.name : '')
    this.firstname = (this.user.name ? this.user.name : '')
    this.address = (this.user.address ? this.user.address : null)
      // this.city = (this.user.name ? this.user.name : '')
      // this.country = (this.user.name ? this.user.name : '')
      // this.code = (this.user.name ? this.user.name : '')
      // this.aboutme = (this.user.name ? this.user.name : '')
  }
};
</script>
<style></style>
