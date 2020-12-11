<template>
    <form @submit.prevent="lookUpAdress">
        <md-field>
            <label>Postcode</label>
            <md-input 
                type="text" 
                :required="true"
                id="postcode"
                name="postcode"
                autocomplete="on"
                v-model="postcode"
            ></md-input>
        </md-field>
        <md-field>
            <label>Building name or number</label>
            <md-input 
                type="text"
                :required="false" 
                id="street-address"
                name="street-address"
                autocomplete="on"
                v-model="house"
                ></md-input>
        </md-field>
        <span class="md-layout-item md-size-100">
            <md-button class="md-primary" type=submit>
                Lookup your address
            </md-button>
            <md-button @click="showInputs=true">
                Or enter manually
            </md-button>
        </span>
        <md-field v-if="addressOptions.length>1">
            <md-select v-model="selectedAddress">
                <md-option 
                    v-for="addressOption in addressOptions" 
                    :key="addressOption" 
                    :value="addressOption" 
                    v-text="addressOption.substring(0, addressOption.indexOf(', ,'))"
                ></md-option>
            </md-select>
        </md-field>
        <span v-if="showInputs">
            <nc-form 
                :newItem="fullAddress.line1===''"
                :item="fullAddress"
                :itemInfo="addressFieldInfo"
                :validate="validateNow"
                @validation-success="validateNow=false"
                @validation-failed="validateNow=false"
            ></nc-form>
        </span>
        <full-screen-location v-if="showMap" :point=latLong></full-screen-location>
    </form>
</template>

<script>
import Axios from 'axios';
import ncForm from './ncForm.vue';

import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength,
  } from 'vuelidate/lib/validators'

import FullScreenLocation from '../../pages/Dashboard/Locations/FullScreenLocation.vue';

const api = process.env.ADDRESS_LOOKUP_API_KEY;
const url = process.env.ADDRESS_LOOKUP_BASE_URL;

export default {
  components: { ncForm, FullScreenLocation },
    name:'address-lookup',
    
    props:{
        lookupApi:{default:'BIK77c9oQk6D6iLaeVxF9Q29351'},
        lookupBaseUrl:{default:'https://api.getaddress.io/find/'},
    },
    data(){
        return{
            validateNow:false,
            postcode:null,
            house:null,
            addressOptions:[],
            selectedAddress:null,
            showInputs:false,
            fullAddress:{
                line1:'',
                line2:'',
                line3:'',
                townCity:'',
                county:'',
            },
            latLong:{
                lat:null,
                lng:null,
            },
            showMap:false,
            addressFieldInfo:[
                {
                    label: "Line 1",
                    id: "line1",
                    fieldType: 'input',
                    fieldOptions:{
                        autocomplete:'on',
                        spellcheck:'off',
                        type:'text',
                        required: true,
                        disabled: false,
                    },
                    validationsFunctions: {required},
                },
                {
                    label: "Line 2",
                    id: "line2",
                    fieldType: 'input',
                    fieldOptions:{
                        autocomplete:'on',
                        spellcheck:'off',
                        type:'text',
                        required: false,
                        disabled: false,
                    },
                    validationsFunctions: {},
                },
                {
                    label: "Line 3",
                    id: "line3",
                    fieldType: 'input',
                    fieldOptions:{
                        autocomplete:'on',
                        spellcheck:'off',
                        type:'text',
                        required: false,
                        disabled: false,
                    },
                    validationsFunctions: {},
                },
                {
                    label: "Town or City",
                    id: "townCity",
                    fieldType: 'input',
                    fieldOptions:{
                        autocomplete:'on',
                        spellcheck:'off',
                        type:'text',
                        required: true,
                        disabled: false,
                    },
                    validationsFunctions: {required},
                },
                {
                    label: "County",
                    id: "county",
                    fieldType: 'input',
                    fieldOptions:{
                        autocomplete:'on',
                        spellcheck:'off',
                        type:'text',
                        required: true,
                        disabled: false,
                    },
                    validationsFunctions: {required},
                }
            ],
        }
    },
    methods:{
        async lookUpAdress(){
            if(this.postcode!==null && this.postcode!==''){
                let lookupURL = '/' +  this.postcode.replace(/\s/g, "");
                if(this.house!==null && this.house!==''){
                    lookupURL = lookupURL + '/' +  encodeURI(this.house);
                }
                try{
                    const response = await Axios({
                        baseURL: this.lookupBaseUrl,
                        url: lookupURL,
                        params: {
                            'api-key': this.lookupApi
                        },
                        method: 'get',
                    })
                    console.log(response.data);
                    console.log(response.status);
                    console.log(response.statusText);
                    this.addressOptions = await response.data.addresses.filter((x, i, a) => a.indexOf(x) == i);
                    console.log('Adress options array length is: '+this.addressOptions.length)
                    this.latLong.lat = response.data.latitude;
                    this.latLong.lng = response.data.longitude;
                    if(this.addressOptions.length == 1){
                        this.selectedAddress = await this.addressOptions[0];
                    }
                } catch (error) {
                    console.log("Error caught");
                    console.log(error);
                    console.log(error.response);
                    this.$store.dispatch("alerts/error", 'Sorry no addresses found with the given combination');
                }

                // Axios.get(lookupURL + query)
                //     .then(response=>{
                //     this.addressOptions = response.data.addresses;
                //     })
                //     .catch(error=>{
                //         console.log(error.data);
                //         console.log(error.status);
                //         console.log(error.statusText);
                //         console.log(error.headers);
                //         console.log(error.config);

                //     })
            }else{
                this.$store.dispatch("alerts/error", 'Sorry no valid postcode has been given, try again or enter manually bellow');
            }
            // return "?perPagePaginate=" + this.perPageSelected + '&page=' + this.currentSelectedPage + '&nameQuery=' + this.search
        },
        setAddress(selectedAddress){
            let spitAddress = selectedAddress.split(',');
            this.fullAddress.line1=spitAddress[0].trim();
            this.fullAddress.line2=spitAddress[1].trim();
            this.fullAddress.line3=spitAddress[2].trim();
            // this.fullAddress.locality=spitAddress[4];
            this.fullAddress.townCity=spitAddress[5].trim();
            this.fullAddress.county=spitAddress[6].trim();
            this.showInputs=true;
        }
    },
    watch:{
        selectedAddress(selectedAddress){
            if(selectedAddress!==null && selectedAddress!==''){
                this.setAddress(selectedAddress)
                this.showMap=true;
            }
        }
    }
}
</script>