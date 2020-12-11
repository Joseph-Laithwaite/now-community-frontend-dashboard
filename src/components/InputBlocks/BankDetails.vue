<template>
<span>
    <nc-form
        :newItem="true"
        :itemInfo="bankDetailsFields"
        :validate="validateNow"
        @validation-success="validateNow=false"
        @validation-failed="validateNow=false"
    ></nc-form>
    <md-button @click="validateNow=true">
        Validate Now
    </md-button>
    <!-- <form class="md-layout md-alignment-top-center">
        <md-field>
            <label for="name-on-the-account">
                Name on the account
            </label>
            <md-input 
                v-model="nameOnAccount"
                :required="true"
                id="name-on-the-account" 
                name="name-on-the-account" 
                type="text" 
                spellcheck="false"
                autocomplete="name"
            />
        </md-field>

        <md-field>
            <md-icon>facebook</md-icon>
            <label for="sort-code">
                Sort code
            </label>
            <span class="md-helper-text">
                Must be 6 digits long
            </span>
            <md-input 
                v-model="sortCode"
                required
                id="sort-code" 
                name="sort-code" 
                type="text" 
                spellcheck="false" 
                pattern="[0-9]*" 
                inputmode="numeric"
                autocomplete="sort code"
            />
        </md-field>

        <md-field>
            <label class="govuk-label" for="account-number">
                Account number
            </label>
            <span class="md-helper-text">
                Must be between 6 and 8 digits long
            </span>
            <md-input 
                v-model="accountNumber"
                required
                id="account-number" 
                name="account-number" 
                type="text" 
                spellcheck="false" 
                pattern="[0-9]*" 
                inputmode="numeric"
                autocomplete="account number"
            />
        </md-field>

        <md-field>
            <label class="govuk-label" for="roll-number">
                Building society roll number (if you have one)
            </label>
            <span class="md-helper-text">
                You can find it on your card, statement or passbook
            </span>
            <md-input 
                v-model="rollNumber"
                id="roll-number" 
                name="roll-number" 
                type="text" 
                autocomplete="roll-number"
            />
        </md-field> 
    </form>-->
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
    name:'bank-details',
    data(){
        return{
            validateNow:false,
            // nameOnAccount:'',
            // sortCode:'',
            // accountNumber:'',
            // rollNumber:'',
            bankDetailsFields:
            [
                {
                    label: "Name On Account",
                    id: "nameOnAccount",
                    fieldType: 'input',
                    fieldOptions:{
                        autocomplete:'name',
                        spellcheck:false,
                        type: 'text',
                        required: true,
                        disabled: false,
                    },
                    validationsFunctions: {required, minLength:minLength(3)},
                },
                {
                    label: "Sort Code",
                    id: "sortCode",
                    fieldType: 'input',
                    fieldOptions:{
                        // helperText:'Must be 6 digits long',
                        type: 'text',
                        spellcheck:false,
                        required: true,
                        disabled: false,
                    },
                    validationsFunctions: {required, maxLength:maxLength(6)}, 
                    // minLength:minLength(6)},
                },
                {
                    label: "Account Number",
                    id: "accountNumber",
                    fieldType: 'input',
                    required:true,
                    fieldOptions:{
                        // helperText:'Must be between 6 and 8 digits long',
                        type: 'text',
                        spellcheck:false,
                        required: true,
                        disabled: false,
                    },
                    validationsFunctions: {required,  maxLength:maxLength(8), minLength:minLength(6)},
                },
                {
                    label: "Building Society Roll Number (if you have one)",
                    id: "rollNumber",
                    fieldType: 'input',
                    required:true,
                    fieldOptions:{
                        // helperText:'You can find it on your card, statement or passbook',
                        type: 'text',
                        spellcheck:false,
                        disabled: false,
                    },
                    validationsFunctions: {},
                }
            ]
        }
    }
}
</script>