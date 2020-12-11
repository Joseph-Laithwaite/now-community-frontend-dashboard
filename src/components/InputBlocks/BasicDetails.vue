<template>
<span>
    <nc-form
        :newItem="true"
        :item="businessDetails"
        :itemInfo="basicDetailsFields"
        :validate="validateNow"
        @validation-success="validateNow=false"
        @validation-failed="validateNow=false"
    ></nc-form>
    <md-chips 
      class="md-primary md-layout-item md-xsmall-size-100 md-small-size-80 md-medium-size-65 md-large-size-55"
      v-model="businessTags" 
      :md-limit="5"
      md-input-type="text"
      :md-check-duplicated="true"
      md-placeholder="Add Business key Words..." 
      type="text"
    >
      <label >Business key Words...</label>
      <div class="md-helper-text">Add up to 5</div> 
    </md-chips>

    <md-button @click="validateNow=true">
        Validate Now
    </md-button>
   <!-- <form id="basics" class="md-layout md-gutter md-alignment-center-center md-scrollbar" @submit.prevent="">
              
                <md-field class="md-layout-item md-xsmall-size-100 md-small-size-80 md-medium-size-65 md-large-size-55 md-primary">
                  <label>Business name...</label>
                  <md-input v-model="name"></md-input>
                </md-field>
                
                <md-field class="md-layout-item md-xsmall-size-100 md-small-size-80 md-medium-size-65 md-large-size-55">
                  <label>About your Business...</label>
                  <md-textarea md-autogrow v-model="aboutUs"></md-textarea>
                </md-field>

                <md-chips 
                  class="md-primary md-layout-item md-xsmall-size-100 md-small-size-80 md-medium-size-65 md-large-size-55"
                  v-model="businessTags" 
                  :md-limit="5"
                  md-input-type="text"
                  :md-check-duplicated="true"
                  md-placeholder="Add Business key Words..." 
                  type="text"
                >
                  <label >Business key Words...</label>
                  <div class="md-helper-text">Add up to 5</div> 
                </md-chips>

                

              </form> -->
</span>
</template>

<script>
import ncForm from './ncForm'
import { validationMixin } from 'vuelidate'
  import {
    helpers,
    required,
    email,
    minLength,
    maxLength,
    alphaNum,
    decimal,
    integer,
    url,
  } from 'vuelidate/lib/validators'

export default {
  components: { ncForm },
    name:'basic-details',
    data(){
        return{
            validateNow:false,
            businessTags:[],
            businessDetails:{
              name:'',
              aboutUs:'',
              logo:'',
              profile_picture:'',
              cover_photo:''
            },
            basicDetailsFields:
            [
                {
                    label: "Business Name",
                    id: "name",
                    fieldType: 'input',
                    fieldOptions:{
                        autocomplete:'on',
                        spellcheck:false,
                        type: 'text',
                        required: true,
                        disabled: false,
                    },
                    validationsFunctions: {required},
                },
                {
                    label: "About your Business",
                    id: "aboutUs",
                    fieldType: 'input',
                    fieldOptions:{
                        type: 'textarea',
                        spellcheck:false,
                        required: false,
                        disabled: false,
                    },
                    validationsFunctions: {}, 
                },
                {
                  label: "Logo",
                  id: "logo",
                  fieldType: 'image',
                  validationsFunctions: {},
                  fieldOptions: {
                    hideLabel:true,
                    type: 'text',
                    required: false,
                  }
                },
                {
                  label: "Profile Picture",
                  id: "profile_picture",
                  fieldType: 'image',
                  validationsFunctions: {},
                  fieldOptions: {
                    hideLabel:true,
                    type: 'text',
                    required: false,
                  }
                },
                {
                  label: "Cover Photo",
                  id: "cover_photo",
                  fieldType: 'image',
                  validationsFunctions: {},
                  fieldOptions: {
                    hideLabel:true,
                    type: 'text',
                    required: false,
                  }
                }
            ]
        }
    }
}
</script>