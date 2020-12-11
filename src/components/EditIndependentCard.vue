<template>
  <edit-item-card
    icon="storefront"
    :newItem="false"
    :item="independent"
    :itemInfo="independentInfo"
    itemType="Independent"
    @item-updates="updateIndependentStore"
  ></edit-item-card>
</template>

<script>
  import { validationMixin } from 'vuelidate';
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
  } from 'vuelidate/lib/validators';

  const slug = helpers.regex('alpha', /^[-a-zA-Z0-9_]+$/);
    
  export default {
    name: 'edit-independent-card',
    computed: {
      independentLoaded(){
        if(this.independent.id == null || typeof this.independent.id == 'undefined'){
          return false
        }else{
          return true
        }
      }
    },
    data: () => ({
      independent:{},
      independentInfo:[
        {
          label: "ID",
          id: "id",
          fieldType: 'input',
          validationsFunctions: {},
          fieldOptions: {
            type: 'text',
            hideForNew: 'true',
            readonly:true,
            // required: true,
          }
        },
        {
          label: "Name",
          id: "name",
          fieldType: 'input',
          validationsFunctions: {required, minLength:minLength(3)},
          fieldOptions: {
            type: 'text',
            required: true,
          }
        },
        {
          label: "Slug",
          id: "slug",
          fieldType: 'input',
          validationsFunctions: {required, minLength:minLength(3), slug},
          fieldOptions: {
            type: 'text',
            required: true,
          }
        },
        {
          label: "Business Structure",
          id: "structure",
          fieldType: 'input',
          validationsFunctions: {},
          fieldOptions: {
            type: 'text',
            required: false,
          }
        },
        {
          label: "Business Email",
          id: "email",
          fieldType: 'input',
          validationsFunctions: {required, email},
          fieldOptions: {
            type: 'text',
            required: true,
          }
        },
        {
          label: "About Us",
          id: "about_us",
          fieldType: 'textarea',
          validationsFunctions: {},
          fieldOptions: {
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
      ],
    }),
    methods:{
     updateIndependentStore(updatedIndependent){
        this.$store.dispatch("independents/set", updatedIndependent);
      }
    },

    created(){
      // console.log("edit independent card created" );
      let independent_id = this.$store.getters["profile/currentPermissions"].independent_id;
      // console.log('Independent ID: ' + independent_id);
      // await this.$store.dispatch["independents/get", independent_id];
      this.$store.dispatch("independents/get", independent_id)
        .then(response=>{
          console.log(this.$store.getters["independents/independent"]);
          this.independent = this.$store.getters["independents/independent"];
        });
      // let independent = await this.$store.getters["independents/independent"];

    },

    watch:{
      '$store.state.profile.currentPermissions.independent_id': function (){
        console.log('In Store Watch');
        let independent_id = this.$store.getters["profile/currentPermissions"].independent_id;
        this.$store.dispatch("independents/get", independent_id)
        .then(response=>{
          // console.log(this.$store.getters["independents/independent"]);
          this.independent = this.$store.getters["independents/independent"];
        });
      }
    }
  }
</script>