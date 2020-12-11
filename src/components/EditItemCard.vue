<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateItem">
      <md-empty-state
        v-if="loading" 
        :md-description="'Trying to load your ' + this.itemType">
        <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        <!-- <br>
        <md-button class="md-primary md-raised">Create New {{itemType}}</md-button> -->
      </md-empty-state>
      <md-card v-else class="md-layout-item">
        <md-card-header class="md-card-header-icon">
          <div class="card-icon">
            <md-icon>{{icon}}</md-icon>
          </div>
          <div class="md-title" v-if="newItem">
            Create New {{itemType}}
          </div>
          <div class="md-title" v-else>
            Edit {{itemType}}
          </div>
        </md-card-header>
        <md-card-content>
            <!-- md-description="Creating project, you'll be able to upload your design and collaborate with people."> -->
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100"
              v-for="field in itemInfo"
              :key="field.id"
            >
              <!-- typeof field.fieldOptions.hideForNew !== 'undefined' && -->
              <span v-if="!((field.fieldOptions.hideForNew === true && newItem))">
                <md-field :class="getValidationClass(field.id)">
                  <label 
                    v-if="field.fieldOptions.hideLabel===false || typeof field.fieldOptions.hideLabel === 'undefined'"
                    :for="field.id" 
                    class="md-layout md-alignment-center-left">
                    {{field.label}}
                  </label>
                  <md-input
                    v-if="field.fieldType==='input'"
                    :name="field.id" 
                    :id="field.id" 
                    :required="field.fieldOptions.required"
                    :disabled="field.fieldOptions.disabled || sending"
                    :readonly="field.fieldOptions.readonly"
                    :type="field.fieldOptions.type !== null ? field.fieldOptions.type : 'text'"
                    @input="serverValidationErrors[field.id] = null" 
                    v-model="form[field.id]" 
                  />

                  <md-textarea 
                    md-autogrow
                    v-if="field.fieldType==='textarea'"
                    :name="field.id" 
                    :id="field.id" 
                    :required="field.fieldOptions.required"
                    :disabled="field.fieldOptions.disabled || sending"
                    :readonly="field.fieldOptions.readonly"
                    :type="field.fieldOptions.type !== null ? field.fieldOptions.type : 'text'"
                    @input="serverValidationErrors[field.id] = null" 
                    v-model="form[field.id]" 
                  ></md-textarea>

                  <md-select 
                    style="z-index:11;"
                    v-if="field.fieldType==='brandSelect'"
                    :name="field.id" 
                    :id="field.id" 
                    :placeholder="field.label"  
                    v-model="form[field.id]" 
                    md-dense 
                    :disabled="field.fieldOptions.disabled || sending"
                    :required="field.fieldOptions.required"
                    :readonly="field.fieldOptions.readonly"
                    :type="field.fieldOptions.type !== null ? field.fieldOptions.type : 'text'"
                    @input="serverValidationErrors[field.id] = null" 
                    @md-selected="makeNew('brand')"
                  >
                    <md-option key="new" value="new">
                      Add new Brand
                    </md-option>
                    <md-option 
                      v-for="option in brands" 
                      :key="option.id" 
                      :value="option.id"
                    >
                      {{option.name}}
                    </md-option>
                  </md-select>
                  <edit-brand-card v-if="createNewBrand"></edit-brand-card>
                  
                  <md-select 
                    style="z-index:11;"
                    v-if="field.fieldType==='independentSelect'"
                    :name="field.id" 
                    :id="field.id" 
                    :placeholder="field.label"  
                    v-model="form[field.id]" 
                    md-dense 
                    :disabled="field.fieldOptions.disabled || sending"
                    :required="field.fieldOptions.required"
                    :readonly="field.fieldOptions.readonly"
                    :type="field.fieldOptions.type !== null ? field.fieldOptions.type : 'text'"
                    @input="serverValidationErrors[field.id] = null" 
                    @md-selected="makeNew(field.id)"
                  >
                    <md-option key="new" value="new">
                      Add new {{field.label}}
                    </md-option>
                    <md-option 
                      v-for="option in independents" 
                      :key="option.id" 
                      :value="option.id"
                    >
                      {{option.name}}
                    </md-option>
                  </md-select>

                  <md-select 
                    style="z-index:11;"
                    v-if="field.fieldType==='dynamicSelect'"
                    :name="field.id" 
                    :id="field.id" 
                    :placeholder="field.label"  
                    v-model="form[field.id]" 
                    md-dense 
                    :disabled="field.fieldOptions.disabled || sending"
                    :required="field.fieldOptions.required"
                    :readonly="field.fieldOptions.readonly"
                    :type="field.fieldOptions.type !== null ? field.fieldOptions.type : 'text'"
                    @input="serverValidationErrors[field.id] = null" 
                  >
                    <md-option 
                      v-for="option in dynamicOptions[field.id]" 
                      :key="option.id" 
                      :value="option.id"
                    >
                      {{option.name}}
                    </md-option>
                  </md-select>

                  <md-autocomplete 
                    style="z-index:11;"
                    v-if="field.fieldType==='autoComplete'"
                    v-model="form[field.id]" 
                    :md-options="brands" 
                    @md-changed="getBrands" 
                    @md-opened="getBrands"
                  >
                    <!-- <label>Brand</label> -->

                    <template 
                      slot="md-autocomplete-item" 
                      slot-scope="{ item }"
                    >
                      {{ item.name }}
                    </template>
                  </md-autocomplete>

                  <md-file 
                    v-if="field.fieldType==='file'"
                    :placeholder="field.label"  
                    :name="field.id" 
                    :id="field.id" 
                    :required="field.fieldOptions.required"
                    :disabled="field.fieldOptions.disabled || sending"
                    :readonly="field.fieldOptions.readonly"
                    :type="field.fieldOptions.type !== null ? field.fieldOptions.type : 'file'"
                    :accept="field.fieldOptions.accept"
                    @input="serverValidationErrors[field.id] = null" 
                    v-model="form[field.id]" 
                  />

                    <!-- class="md-layout md-alignment-center-right" -->
                  <md-switch 
                    style="padding-top: 20px;"
                    v-if="field.fieldType==='switch'"
                    :placeholder="field.label"  
                    :name="field.id" 
                    :id="field.id" 
                    :required="field.fieldOptions.required"
                    :disabled="field.fieldOptions.disabled || sending"
                    :readonly="field.fieldOptions.readonly"
                    :type="field.fieldOptions.type !== null ? field.fieldOptions.type : 'checkbox'"
                    @input="serverValidationErrors[field.id] = null" 
                    v-model="form[field.id]"
                  >
                  </md-switch>
                  <md-switch 
                    style="padding-top: 20px;"
                    v-if="field.fieldType==='independentOwnerSwitch'"
                    :placeholder="field.label"  
                    :name="field.id" 
                    :id="field.id" 
                    :required="field.fieldOptions.required"
                    :disabled="field.fieldOptions.disabled || sending"
                    :readonly="field.fieldOptions.readonly"
                    :type="field.fieldOptions.type !== null ? field.fieldOptions.type : 'checkbox'"
                    @input="serverValidationErrors[field.id] = null" 
                    :value="item[field.id]"
                    v-model="form[field.id]"
                  >
                    <!-- @change="independentOwnerSwitch" -->
                  </md-switch>

                    <!-- :onclick="alert('hello there')" -->
                  <!-- <span 
                    id="attach-button"
                    v-if="field.fieldType==='image'"
                    @click="alert('clicked')"
                    >
                    <md-icon class="md-layout md-alignment-center-left">attach_file</md-icon>
                    <md-select 
                      class="md- md-layout md-alignment-center-right"
                      :placeholder="field.label"
                      @md-opened="alert('clicked')"
                    ></md-select>
                  </span> -->

                  <!-- Image uploader -->
                    <md-icon
                      v-if="field.fieldType==='image'"
                      @click.native="showImageDialog[field.id]=!showImageDialog[field.id]">
                        attach_file
                    </md-icon>
                    <label 
                      v-if="field.fieldType==='image'"
                      :for="field.id" v-text="field.label">
                    </label>
                    <md-input
                      v-if="field.fieldType==='image'"
                      readonly
                      :placeholder="field.label"
                      :name="field.id" 
                      :id="field.id" 
                      :required="field.fieldOptions.required"
                      :disabled="field.fieldOptions.disabled || sending"
                      @click="showImageDialog[field.id]=!showImageDialog[field.id]"
                      v-model="image[field.id]"
                    />
                    <image-dialog
                      v-if="field.fieldType==='image'"
                      :showDialog="showImageDialog[field.id]"
                      @close-image-dialog="showImageDialog[field.id]=false"
                      :imageID="form[field.id]"
                      :label="field.label"
                      :id="field.id"
                      model="App\\Models\\Independent"
                      @file-uploaded="setImage"
                    ></image-dialog>
                  
                  <!-- <span class="md-error" v-text="getErrors(field)[0]"></span> -->
                  <span class="md-error" v-if="hasValidation(field, 'required')">
                    <!-- <span v-if="this.$v.form[field.id][type] === false"> -->
                      The {{field.label}} is required <br>
                    <!-- </span> -->
                  </span>
                  <span class="md-error" v-if="hasValidation(field, 'minLength')">
                    The {{field.label}} must be longer than {{$v.form[field.id].$params.minLength.min}} characters <br>
                  </span>
                  <span class="md-error" v-if="hasValidation(field, 'decimal')">
                    The {{field.label}} must be a valid decimal number  <br>
                  </span>
                  <span class="md-error" v-if="hasValidation(field, 'integer')">
                    The {{field.label}} must be a valid whole number  <br>
                  </span>
                  <span class="md-error" v-if="hasValidation(field, 'alphaNum')">
                    The {{field.label}} must contain only Alpha Numeric characters with no spaces  <br>
                  </span>
                  <span class="md-error" v-if="hasValidation(field, 'url')">
                    The {{field.label}} must be URL with no spaces  <br>
                  </span>
                  <span class="md-error" v-if="hasValidation(field, 'slug')">
                    The {{field.label}} must contain alpha numeric characters and hyphen (-) only <br>
                  </span>
                </md-field>
                <span v-if="serverValidationErrors[field.id]">
                  <span 
                    class="md-error" 
                    v-for="error in serverValidationErrors[field.id]"
                    :key="error"                    
                  >
                    {{error}}
                    <br>
                  </span>
                </span>
              </span>            
            </div>
          </div>
        </md-card-content>
        
        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">
            <span v-if="newItem">Create {{itemType}}</span>
            <span v-else>Update {{itemType}}</span>
          </md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
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

  const slug = helpers.regex('alpha', /^[-a-zA-Z0-9_]+$/)
  import ImageDialog from './ImageDialog.vue'
  import EditBrandCard from './EditBrandCard.vue'
  
  export default {
    name: 'edit-item-card',
    mixins: [validationMixin],
    components: {
      'edit-brand-card': EditBrandCard,
      ImageDialog,
    },
    props: {
      item: {type: Object, required: false},
      icon: {
        default:"shopping_bag", 
        required: false
        },
      newItem: {
        type:Boolean, 
        required: true
      },
      itemType: {
        default:'Product',
        required: false
        },
      itemInfo: {
        required: false,
        type: [Array, Object], 
        default:()=>
        [
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
            label: "Price",
            id: "price",
            fieldType: 'input',
            validationsFunctions: {required,decimal},
            fieldOptions: {
              type: 'number',
              required: true,  
              min: 0,
              max: null,
            }
          },
          {
            label: "VAT",
            id: "vat",
            fieldType: 'input',
            validationsFunctions: {required,decimal},
            fieldOptions: {
              type: 'number',
              required: true,  
              min: 0,
              max: null,
            }
          },
          {
            label: "Deposit",
            id: "deposit",
            fieldType: 'input',
            validationsFunctions: {decimal},
            fieldOptions: {
              type: 'number',
              required: false,  
              min: 0,
              max: null,
            }
          }, 
          {
            label: "Brand",
            id: "brand_id",
            fieldType: 'brandSelect',
            validationsFunctions: {required},
            fieldOptions: {
              required: true,  
            }
          },
          // {
          //   label: "Independent",
          //   id: "independent_id",
          //   fieldType: 'independentSelect',
          //   validationsFunctions: {required},
          //   fieldOptions: {
          //     required: true,  
          //   }
          // }
            // acOptions: {},

            // dynamicSelect: true,
            // options:[
            //   {value:'1', label:'Essential'},
            //   {value:'2', label:'Ecover'},
            //   {value:'200', label:'Meridian'},
            // ],
            // dynamicSelectSettings:{
            //   model: 'brands',
            //   value: 'id',
            //   label: 'name',
            // },
        ]
      }
    },

    data: () => ({
      form: {},
      serverValidationErrors: {},
      itemSaved: false,
      sending: false,
      dynamicOptions: {},

      value: null,

      brands:[],
      createNewBrand:false,

      independents:[],
      createNewIndependent:false,

      image:{},
      showImageDialog:{},
    }),
    
    
    validations(){
      var form = new Object();
      for (let i = 0; i < this.itemInfo.length; i++) {
        let field = this.itemInfo[i].id
        if(!(typeof this.itemInfo[i].fieldOptions.hideForNew !== 'undefined' && this.itemInfo[i].fieldOptions.hideForNew == true && this.newItem)){
          form[field] = this.itemInfo[i].validationsFunctions
        }
      }
      return {form};
    },
   
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },

      hasValidation(field, type){
        if (typeof this.$v.form[field.id] != "undefined"){
          if (typeof this.$v.form[field.id][type] != "undefined"){
            if(this.$v.form[field.id][type] === false){
              return true
            }
          }
        }
        return false
      },

      // getErrors(field){
      //   let errors = new Array()
      //   if (typeof this.$v.form[field.id] != "undefined" && $error === true){
      //     switch(this.$v.form[field.id].$params){
      //       case "required":
      //         if(this.$v.form[field.id].required === false){
      //           errors.push(`The ${field.label} is required`)
      //         }
      //       break;
      //       case "minLength":
      //         if(this.$v.form[field.id].minLength === false){
      //           errors.push(`The ${field.label} must be longer than ${$v.form[field.id].$params.minLength.min} characters`)
      //         }
      //       break;
      //     }
      //   }
      //   console.log(errors);
      //   return errors
      // },

      // clearForm() {
      //   this.$v.$reset()
      //   for (let i = 0; i < this.itemInfo.length; i++) {
      //     let field = this.itemInfo[i].id
      //     switch(this.itemInfo[i].fieldOptions.type){
      //       case 'text':
      //         this.form[field] = ''
      //         break;
      //       case 'number':
      //         this.form[field] = 0.00
      //         break;
      //     } 
      //   }
      // },
      
      setForm () {
        for (let i = 0; i < this.itemInfo.length; i++) {
          if(typeof this.itemInfo[i] !== 'undefined'){
            let field = this.itemInfo[i].id
            try{
              this.$set(this.form, field, this.item[field]);
              if(this.itemInfo[i].fieldType==='image'){
                // showImageDialog[field.id]
                this.$set(this.showImageDialog, field, false);
              }
              // Vue.set( this.form, field, this.item[field] )
              // this.form[field] = this.item[field]
            }
            catch{
              console.log('set form error');
            }
          }
        }
      },

      validateItem() {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.saveItem()
        }
      },

      saveItem () {
        this.sending = true
        if(this.newItem){
          this.createItem();
        }else{
          this.updateItem();
        }
      },

      updateItem() {
        this.$store.dispatch(this.vueStoreModule + "/update", this.form)
        .then(response =>{
          console.log("Edit Item Card Update success response");
          this.$store.dispatch("alerts/success", `${this.itemType} updated successfully.`)
          this.itemSaved = true
          this.sending = false
          let item = this.$store.getters[this.vueStoreModule + "/" +this.itemType.toLowerCase()]
          this.$emit('item-updated', item)
        })
        .catch (e=>{
          console.log("Edit Item Card Update error response");
          this.$store.dispatch("alerts/error", "Oops, something went wrong! " + e.message)
          this.sending = false
          for (let i = 0; i < this.itemInfo.length; i++) 
          {
            let field = this.itemInfo[i].id
            if(e.errors[field]){
              this.serverValidationErrors[field] = e.errors[field]
            }
          }
        })
      },

      createItem() {
        this.$store.dispatch(this.vueStoreModule + "/add", this.form)
        .then(response =>{
          this.$store.dispatch("alerts/success", `${this.itemType} created successfully.`)
          this.itemSaved = true
          this.sending = false
          let item = this.$store.getters[this.vueStoreModule + "/" + this.itemType.toLowerCase()]
          this.$emit('item-created', item)
        })
        .catch (e=>{
          this.$store.dispatch("alerts/error", "Oops, something went wrong! " + e.message)
          this.sending = false
          for (let i = 0; i < this.itemInfo.length; i++) 
          {
            let field = this.itemInfo[i].id
            if(e.errors[field]){
              this.serverValidationErrors[field] = e.errors[field]
            }
          }
        })
      },


      // async getDynamicOptions() {
      //   let options = new Array
        
      //   for (let i = 0; i < this.itemInfo.length; i++){
      //     if(typeof this.itemInfo[i].dynamicSelect !== "undefined" && this.itemInfo[i].dynamicSelect === true){
      //       let storeModule = this.itemInfo[i].dynamicSelectSettings.model
      //       await this.$store.dispatch(storeModule + "/list", '')
      //       this.dynamicOptions[this.itemInfo[i].id] = await this.$store.getters[storeModule + "/list"]
      //     }
      //   }
      //   return options
      // },

      // getBrands(searchTerm) {
      //   if (!searchTerm) {
      //     this.brands = new Promise(resolve => {
      //       this.$store.dispatch("brands/list")
      //         .then(response =>{
      //           resolve(this.$store.getters["brands/list"])
      //         })
      //       })
      //   }else{
      //       const term = searchTerm.toLowerCase()
      //       resolve(this.brandList.filter(({ name }) => name.toLowerCase().includes(term)))
      //   }
      // },

      async setSelectOptions(model, forceUpdate=false) {
        console.log('set Select options');
        if(typeof this.$store.getters[model + "/list"].length == 'undefined' || forceUpdate === true){
          await this.$store.dispatch(model + "/list")
            // .then(response =>{
              this[model] = await this.$store.getters[model + "/list"]
              console.log(this[model])
            // })
        }else{
          this[model] =  this.$store.getters[model + "/list"]
        }
      },

      makeNew(model){
        if(this.form[model + '_id'] === 'new'){
          let variable = 'createNew' +  model.charAt(0).toUpperCase() + model.slice(1);;
          this[variable] = true;
          // alert("create new brand!");
        }
      },

      setImage(image){
        this.$set(this.form, image.id, image.file.id);
        // this.form[image.id] = image.file.id; 
        this.$set(this.image, image.id, image.file.name);
        // this.image[image.id] = image.file.name;
      }
    },

    computed:{
      vueStoreModule(){
        return this.itemType.toLowerCase() + "s"
      },
      loading(){
        if(this.newItem === false){
          if(this.item.id == null || typeof this.item.id == 'undefined'){
            return true;
          }
        }
        return false;
      }
    },

    created(){
      
      // if(!this.newItem){
      //   console.log('not new item');
        // if(typeof this.item !== 'undefined'){
        //   this.form = this.item;
        // }
        // else{
          // let permission =  await this.$store.getters["profile/currentPermissions"];
          // this.form = permission.independent
        // }
        // this.setForm()
      // }
    },

    mounted(){
      let brandSet = false;
      let independentSet = false;
      for (let i = 0; i < this.itemInfo.length; i++){
        // console.log('Looping through item info in mounted');
        // console.log(this.itemInfo[i]);
        if(this.itemInfo[i].fieldType == "brandSelect" && brandSet === false){
          console.log('setting up brands array in mounted');
          this.setSelectOptions('brands');
          brandSet = true;
        }
        if(this.itemInfo[i].fieldType == "independentSelect" && independentSet === false){
          console.log('setting up independents array in mounted');
          this.setSelectOptions('independents');
          independentSet = true;
        }
      }
    },
    watch: {
      loading(loading){
        if(loading===false){
          this.setForm();
        }
      },
      item(item){
        this.setForm()
      }

    }

  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .md-error{
    bottom: -8px;
    color: red;
    font-size: smaller;
  }
  >>>.md-menu-content{
        z-index: 60;;
      }
  
  
</style>

<style lang="scss">
    #attach-button {
      .md-ripple{
        background-color: white ;
        color:black;
      }
    }

// .my-image {
//     display: flex;
//     flex: 1;

//     input[type="file"] {
//       width: 1px;
//       height: 1px;
//       margin: -1px;
//       padding: 0;
//       overflow: hidden;
//       position: absolute;
//       clip: rect(0 0 0 0);
//       border: 0;
//     }

//     .md-file-icon {
//       &:not(.md-disabled) {
//         cursor: pointer;
//       }

//       &.md-disabled {
//         pointer-events: none;
//       }
//     }
//   }
</style>