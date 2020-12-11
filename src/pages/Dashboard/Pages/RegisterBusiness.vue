<template>
  <div class="text-center login-fix-page">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <md-card  :class="{ 'md-card-hidden': cardHidden }" class="md-xsmall-size-100 md-small-size-90">
      <md-card-header class="md-card-header-green">
        <h3 class="title medium">Register a business account</h3>
      </md-card-header>
        <md-card-content>
          <md-steppers
            :md-vertical="useVertical"
            :md-active-step.sync="currentStep" 
            md-linear
            md-sync-route 
          >
            <md-step 
              id="basicDetails" 
              :to="{name:'Register Business',hash:'#basicDetails'}" 
              md-label="The Basics" 
              md-description="" 
              :md-errors="stepInfo.basicDetails.errors" 
              :md-done.sync="stepInfo.basicDetails.complete"
            >
              <span id="basicDetails" class="md-layout md-gutter md-alignment-center-center md-scrollbar">
                <h3 class="subheading md-layout-item md-size-100">The Basics</h3>
                <basic-details 
                  class="md-layout-item md-xsmall-size-100 md-small-size-80 md-medium-size-65 md-large-size-55"></basic-details>
                <trading-type
                  class="md-primary md-layout-item md-xsmall-size-100 md-small-size-80 md-medium-size-65 md-large-size-55"
                ></trading-type>
              </span>
            </md-step>

            <md-step 
              id="location" 
              :to="{name:'Register Business',hash:'#location'}" 
              md-label="Location" 
              :md-errors="stepInfo.location.errors" 
              :md-done.sync="stepInfo.location.complete"
            >
              <span id="location" class="md-layout md-gutter md-alignment-center-center md-scrollbar">
                <h3 class="subtitle md-layout-item md-size-100">Where does your business operate?</h3>
                <address-lookup class="md-layout-item md-xsmall-size-100 md-small-size-90 md-medium-size-75 md-large-size-65" ></address-lookup>
                <md-checkbox class="md-layout-item md-xsmall-size-100 md-small-size-80 md-medium-size-65 md-large-size-55">
                  Is this Address open to the pulic?
                </md-checkbox>
                <md-checkbox class="md-layout-item md-xsmall-size-100 md-small-size-80 md-medium-size-65 md-large-size-55">
                  Is this Address a studio space?
                </md-checkbox>
                <md-checkbox class="md-layout-item md-xsmall-size-100 md-small-size-80 md-medium-size-65 md-large-size-55">
                  Is this Address a residential property?
                </md-checkbox>
              </span>
            </md-step>

            <md-step 
              id="openingTimes" 
              :to="{name:'Register Business',hash:'#openingTimes'}" 
              md-label="Opening times" 
              :md-errors="stepInfo.openingTimes.errors" 
              :md-done.sync="stepInfo.openingTimes.complete"
            >
              <span id="openingTimes" class="md-layout md-gutter md-alignment-center-center md-scrollbar">
                <h3 class="subtitle md-layout-item md-size-100">What are your Opening hours?</h3>
                <openingTimes :initialOpeningTimes="openHours" class="md-layout-item md-xsmall-size-100 md-small-size-90 md-medium-size-75 md-large-size-65"></openingTimes>
              </span>
            </md-step>

            <md-step 
              id="contactDetails" 
              :to="{name:'Register Business',hash:'#contactDetails'}" 
              md-label="Contact Details" 
              :md-errors="stepInfo.contactDetails.errors" 
              :md-done.sync="stepInfo.contactDetails.complete"
            >
                <span id="contactDetails" class="md-layout-item md-layout md-gutter md-alignment-center-center md-scrollbar">
                  <h3 class="subtitle md-layout-item md-size-100">What Social Media Platforms are you on?</h3>
                  <social-links 
                    class="md-layout-item md-xsmall-size-100 md-small-size-80 md-medium-size-65 md-large-size-55"
                  ></social-links>
                  <h3 class="subtitle md-layout-item md-size-100">How do we get in contact?</h3>
                  <contactDetails
                  ></contactDetails>
                </span>
            </md-step>

            <md-step 
              id="bankDetails" 
              :to="{name:'Register Business',hash:'#bankDetails'}"  
              md-label="Bank Details" 
              md-description="Getting Paid!" 
              :md-errors="stepInfo.bankDetails.errors" 
              :md-done.sync="stepInfo.bankDetails.complete"
            >
                <span id="bankDetails" class="md-layout md-gutter md-alignment-center-center md-scrollbar">
                  <h3 class="subheading md-layout-item md-size-100">Bank or building society account details</h3>
                  <bankDetails class="md-layout-item md-xsmall-size-100 md-small-size-80 md-medium-size-65 md-large-size-55"></bankDetails>
                </span>
            </md-step>

          </md-steppers>
        </md-card-content>
        <md-card-actions>
          <md-button
            v-if="hasPreviousStep"
            class="md-simple md-layout md-alignment-bottom-left"
            @click="goBack"
          >
            Go Back
          </md-button>
          <md-button
            v-if="hasNextStep"
            type="submit"
            class="md-simple md-success md-lg md-layout md-alignment-bottom-right"
            @click="setDone"
          >
            Continue
          </md-button>
          <md-button
            v-if="!hasNextStep"
            type="submit"
            class="md-simple md-success md-lg md-layout md-alignment-bottom-center"
            @click="registerBusiness"
          >
            Register
          </md-button>
        </md-card-actions>
      </md-card>
  </div>
</template>

<script>
import AddressLookup from '../../../components/InputBlocks/AddressLookup.vue';
import BankDetails from '../../../components/InputBlocks/BankDetails.vue';
import ContactDetails from '../../../components/InputBlocks/ContactDetails.vue';
import OpeningTimes from '../../../components/InputBlocks/Time/OpeningTimes.vue';

import SocialLinks from "../../../components/InputBlocks/SocialLinks.vue";
import TradingType from '../../../components/InputBlocks/TradingType.vue';
import BasicDetails from '../../../components/InputBlocks/BasicDetails.vue';

export default {
  components: { SocialLinks, BankDetails, AddressLookup, TradingType, ContactDetails, OpeningTimes, BasicDetails },
  name:'register-business',
  data: () => ({
    cardHidden: false,
    currentStep: '',
    useVertical: true,
    businessType:{
      maker:false,
      trader:false,
      retailer:false
    },
    name:null,
    aboutUs:null,
    businessTags:[],
    stepInfo: {
      basicDetails:{
        id:'basicDetails',
        complete: false,
        data:{},
        errors: null,
        nextStep:'location',
      },
      location:{
        id:'location',
        complete: false,
        data:{},
        errors: null,
        nextStep:'openingTimes',
        previousStep:'basicDetails',
      },
      openingTimes:{
        id:'openingTimes',
        complete: false,
        data:{},
        errors: null,
        nextStep:'contactDetails',
        previousStep:'location',
      },
      contactDetails:{
        id:'contactDetails',
        complete: false,
        data:{},
        errors: null,
        nextStep:'bankDetails',
        previousStep:'openingTimes',
      },
      bankDetails:{
        id:'bankDetails',
        complete: false,
        data:{},
        errors: null,
        previousStep:'contactDetails',
      },
    },
    openHours:{
      monday:[],
      tuesday:[],
      wednesday:[],
      thursday:[],
      friday:[],
      saturday:[],
      sunday:[],
      bankHolidays:[],
    }
  }),

  methods: {
    setDone () {
        this.stepInfo[this.currentAnchor.substring(1)].complete = true
        this.stepInfo[this.currentAnchor.substring(1)].errors = null
        if (this.hasNextStep) {
          this.$router.push({name:'Register Business',hash:'#'+this.stepInfo[this.currentAnchor.substring(1)].nextStep})
          }
      },
    goBack(){
      if (this.hasPreviousStep) {
        this.$router.push({name:'Register Business',hash:'#'+this.stepInfo[this.currentAnchor.substring(1)].previousStep})
        }
    },
    setError(error){
      this.stepInfo[this.currentAnchor.substring(1)].errors = error;
    },
    registerBusiness(){

    },
    resizeEventHandler(event){
      if(window.innerWidth<1279){
        this.useVertical=true;
      }else{
        this.useVertical=false;
      }
    }
  },
  computed:{
    currentAnchor:  function() {
      return this.$route.hash;
    },
    hasNextStep(){
      if (typeof this.stepInfo[this.currentAnchor.substring(1)].nextStep !== 'undefined') {
        return true
      }
      return false
    },
    hasPreviousStep(){
      if (typeof this.stepInfo[this.currentAnchor.substring(1)].previousStep !== 'undefined') {
        return true
      }
      return false
    },
  },
  created(){
    window.addEventListener("resize", this.resizeEventHandler);
    this.resizeEventHandler();
    if(this.$route.hash === null || this.$route.hash === '' || typeof this.$route.hash == 'null'){
      this.$router.push({name:'Register Business',hash:'#basicDetails'})
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeEventHandler);
  },
  watch:{
    currentAnchor(currentAnchor){
      console.log('current anchor changed to: ' + currentAnchor);
      this.currentStep=currentAnchor.substring(1);
    }
  }
};
</script>

<style lang="scss" >
  .md-stepper-header {
    .md-ripple{
            background-color: white ;
    }
  }
</style>

