<template>
    <div class="text-center md-layout">
        <span class="md-layout-item md-size-100">
            <md-checkbox v-model="hasSocialLinks.website">
                Website
            </md-checkbox>
            <md-checkbox v-model="hasSocialLinks.facebook">
                Facebook
            </md-checkbox>
            <md-checkbox v-model="hasSocialLinks.instagram">
                Instagram
            </md-checkbox>
            <md-checkbox v-model="hasSocialLinks.twitter">
                Twitter
            </md-checkbox>
        </span>
        <nc-form
            :validate="validateNow"
            :item="socialLinks"
            :newItem="SocialFieldInfo.length==0"
            :itemInfo="SocialFieldInfo"
        ></nc-form>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
  import {
    helpers,
    required,
    minLength,
    maxLength,
    alphaNum,
  } from 'vuelidate/lib/validators'

  const handle = helpers.regex('alpha', /^[-a-zA-Z0-9_]+$/)
  const url = helpers.regex('alpha',/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/ );


import ncForm from './ncForm.vue'

export default {
  components: { ncForm },
    name:'social-links',
    data(){
        return{
            validateNow:false,
            hasSocialLinks:{
                website:false,
                facebook:false,
                instagram:false,
                twitter:false,
            },
            socialLinks:{
                website:null,
                facebook:null,
                instagram:null,
                twitter:null,
            },
        }
    },
    computed:{
        SocialFieldInfo(){
            let requiredLinks = new Array;
            if(this.hasSocialLinks.website){
                let websiteInfo = 
                {
                    label: "Website",
                    id: "website",
                    fieldType: 'input',
                    fieldOptions:{
                        prefix:"https://",
                        md_icon:'language',
                        type: 'url',
                        required: true,
                        disabled: false,
                    },
                    validationsFunctions: {required, url},
                }
                requiredLinks.push(websiteInfo);
            }
            if(this.hasSocialLinks.facebook){
                requiredLinks.push(
                    {
                        label: "Facebook",
                        id: "facebook",
                        fieldType: 'input',
                        fieldOptions:{
                            prefix:"@",
                            md_icon:'facebook',
                            spellcheck:false,
                            type: 'text',
                            required: true,
                            disabled: false,
                        },
                        validationsFunctions: {required, handle},
                    }
                );
            }
            if(this.hasSocialLinks.instagram){
                requiredLinks.push(
                    {
                        label: "Instagram",
                        id: "instagram",
                        fieldType: 'input',
                        fieldOptions:{
                            prefix:"@",
                            fa_icon:'fa fa-instagram',
                            type: 'text',
                            spellcheck:false,
                            required: true,
                            disabled: false,
                        },
                        validationsFunctions: {required, handle},
                    }
                );
            }
            if(this.hasSocialLinks.twitter){
                requiredLinks.push(
                    {
                        label: "Twitter",
                        id: "twitter",
                        fieldType: 'input',
                        fieldOptions:{
                            prefix:"@",
                            fa_icon:'fa fa-twitter',
                            type: 'text',
                            spellcheck:false,
                            required: true,
                            disabled: false,
                        },
                        validationsFunctions: {required, handle},
                    }
                );
            }
            return requiredLinks
        }
    }
}
</script>