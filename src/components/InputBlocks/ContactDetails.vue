<template>
<span>
    <nc-form
        :newItem="true"
        :itemInfo="contactDetailsFields"
        :validate="validateNow"
        @validation-success="validateNow=false"
        @validation-failed="validateNow=false"
    ></nc-form>
    <md-button @click="validateNow=true">
        Validate Now
    </md-button>
</span>
</template>

<script>
import ncForm from './ncForm'
import { validationMixin } from 'vuelidate'
  import {
    helpers,
    required,
    email,
  } from 'vuelidate/lib/validators'

  const tel = helpers.regex('alpha', /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)

export default {
    components: { ncForm },
    name:'contact-details',
    data(){
        return{
            validateNow: false,
            contactDetailsFields:
            [
                {
                    label: "Business Phone Number",
                    id: "businessTel",
                    fieldType: 'input',
                    fieldOptions:{
                        // helperText:'This number will be available to customers',
                        autocomplete:'on',
                        type: 'tel',
                    },
                    validationsFunctions: {tel},
                },
                {
                    label: "Business Email",
                    id: "businessEmail",
                    fieldType: 'input',
                    fieldOptions:{
                        // helperText:'This email will be available to customers',
                        autocomplete:'on',
                        type: 'email',
                    },
                    validationsFunctions: {email},
                },
                {
                    label: "Personal Phone Number",
                    id: "personalTel",
                    fieldType: 'input',
                    fieldOptions:{
                        // helperText:'This will not be public but can be the same as your business tel',
                        autocomplete:'on',
                        type: 'tel',
                    },
                    validationsFunctions: {tel},
                },
                {
                    label: "Personal Email",
                    id: "personalEmail",
                    fieldType: 'input',
                    fieldOptions:{
                        // helperText:'This will not be public but can be the same as your business email',
                        autocomplete:'on',
                        type: 'email',
                    },
                    validationsFunctions: {email},
                },
            ]
        }
    }
}
</script>