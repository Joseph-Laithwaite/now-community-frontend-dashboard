<template>
  <edit-item-card
    icon="storefront"
    :newItem="true"
    :item="brand"
    :itemInfo="brandInfo"
    itemType="Brand"
  ></edit-item-card>
</template>

<script>
  // import EditItemCard from './EditItemCard.vue';
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
  
  // import EditItemCard from '../components/EditItemCard.vue';
  
  export default {
    name: 'edit-brand-card',
    // component: EditItemCard,
    data: () => ({
      brand:{
        name:'',
        slug:'',
        independent_id: '',
        // owner: false
      },
      brandInfo:[
        {
          label: "ID",
          id: "id",
          fieldType: 'input',
          fieldOptions:{
            hideForNew: true,
            type: 'number',
            required: true,
            disabled: true,
          },
          validationsFunctions: {required, decimal},
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
          label: "Do you own/ manage this brand?",
          id: "independent_id",
          fieldType: 'independentOwnerSwitch',
          validationsFunctions: {},
          fieldOptions:{
            type: 'text',
            required: true,
          }
        },
        // {
        //   label: "Independent id",
        //   id: "independent_id",
        //   fieldType: 'independentSelect',
        //   validationsFunctions: {},
        //   fieldOptions:{
        //     type: 'text',
        //     required: true,
        //   }
        // },
      ]
    }),

    async mounted(){
      let currentPermission = await this.$store.getters["profile/currentPermissions"];
      console.log(currentPermission);
      this.brand.independent_id = currentPermission.independent_id;
    }
  }
</script>

