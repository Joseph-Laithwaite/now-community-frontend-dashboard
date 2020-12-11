<template>
  <form novalidate @submit.prevent="validateItem" class="md-layout md-alignment-top-center">
    <!-- class="md-layout md-gutter" -->
      <div
        v-for="field in itemInfo"
        :key="field.id"
        class="md-layout-item md-size-100"
      >
        <!-- typeof field.fieldOptions.hideForNew !== 'undefined' && -->
        <span v-if="!((field.fieldOptions.hideForNew === true && newItem))">

          <md-field :class="getValidationClass(field.id)">
            <md-icon v-if="typeof field.fieldOptions.md_icon !== 'undefined'" v-text="field.fieldOptions.md_icon"></md-icon>
            <md-icon v-if="typeof field.fieldOptions.fa_icon !== 'undefined'" :class="field.fieldOptions.fa_icon"></md-icon>
            <span v-if="typeof field.fieldOptions.prefix !== 'undefined'" class="md-prefix" v-text="field.fieldOptions.prefix"></span>

              <!-- class="md-layout md-alignment-center-left"> -->
            <label 
              v-if="field.fieldOptions.hideLabel===false || typeof field.fieldOptions.hideLabel === 'undefined'"
              :for="field.id"> 
              {{field.label}}
            </label>

            <span 
              v-if="typeof field.fieldOptions.helperText !== 'undefined'" 
              class="md-helper-text"
              >
              {{field.fieldOptions.helperText}}
            </span>
            
            <md-input
              v-if="field.fieldType==='input'"
              :name="field.id" 
              :id="field.id" 
              :placeholder="field.fieldOptions.placeholder"
              :autocomplete="field.fieldOptions.autocomplete"
              :spellcheck="field.fieldOptions.spellcheck"
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

            <span 
              v-if="typeof field.fieldOptions.suffix !== 'undefined'" 
              class="md-suffix"
              v-text="field.fieldOptions.suffix"
            ></span>

            <!-- <span class="md-error" v-text="getErrors(field)[0]"></span> -->
            <span class="md-error" v-if="hasValidation(field, 'required')">
              <!-- <span v-if="this.$v.form[field.id][type] === false"> -->
                The {{field.label}} is required <br>
              <!-- </span> -->
            </span>
            <span class="md-error" v-if="hasValidation(field, 'minLength')">
              The {{field.label}} must be longer than {{$v.form[field.id].$params.minLength.min}} characters <br>
            </span>
            <span class="md-error" v-if="hasValidation(field, 'maxLength')">
              The {{field.label}} must be less than {{$v.form[field.id].$params.maxLength.max}} characters <br>
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
            <span class="md-error" v-if="hasValidation(field, 'handle')">
              The {{field.label}} handle must contain alpha numeric characters and hyphens (-) only <br>
            </span>
            <span class="md-error" v-if="hasValidation(field, 'email')">
              The {{field.label}} must be a valid email<br>
            </span>
            <span class="md-error" v-if="hasValidation(field, 'tel')">
              The {{field.label}} must be a valid landline or mobile telephone number<br>
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
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  // import {
  //   helpers,
  //   required,
  //   email,
  //   minLength,
  //   maxLength,
  //   alphaNum,
  //   decimal,
  //   integer,
  //   url,
  // } from 'vuelidate/lib/validators'

  // const slug = helpers.regex('alpha', /^[-a-zA-Z0-9_]+$/)
  import ImageDialog from '../ImageDialog.vue'
  import EditBrandCard from '../EditBrandCard.vue'
  
  export default {
    name: 'nc-form',
    mixins: [validationMixin],
    components: {
      'edit-brand-card': EditBrandCard,
      ImageDialog,
    },
    props: {
      item: {type: Object, required: false},
      validate: {type: Boolean, required: true, default:false},
      newItem: {
        type:Boolean, 
        default: true
      },
      itemInfo: {
        required: true,
        type: [Array, Object], 
        // default:()=>
        // [
        //   {
        //     label: "ID",
        //     id: "id",
        //     fieldType: 'input',
        //     fieldOptions:{
        //       hideForNew: true,
        //       type: 'number',
        //       required: true,
        //       disabled: true,
        //     },
        //     validationsFunctions: {required, decimal},
        //   },
        //   {
        //     label: "Name",
        //     id: "name",
        //     fieldType: 'input',
        //     validationsFunctions: {required, minLength:minLength(3)},
        //     fieldOptions: {
        //       type: 'text',
        //       required: true,
        //     }
        //   },
        //   {
        //     label: "Slug",
        //     id: "slug",
        //     fieldType: 'input',
        //     validationsFunctions: {required, minLength:minLength(3), slug},
        //     fieldOptions: {
        //       type: 'text',
        //       required: true,
        //     }
        //   },          
        //   {
        //     label: "Price",
        //     id: "price",
        //     fieldType: 'input',
        //     validationsFunctions: {required,decimal},
        //     fieldOptions: {
        //       type: 'number',
        //       required: true,  
        //       min: 0,
        //       max: null,
        //     }
        //   },
        //   {
        //     label: "VAT",
        //     id: "vat",
        //     fieldType: 'input',
        //     validationsFunctions: {required,decimal},
        //     fieldOptions: {
        //       type: 'number',
        //       required: true,  
        //       min: 0,
        //       max: null,
        //     }
        //   },
        //   {
        //     label: "Deposit",
        //     id: "deposit",
        //     fieldType: 'input',
        //     validationsFunctions: {decimal},
        //     fieldOptions: {
        //       type: 'number',
        //       required: false,  
        //       min: 0,
        //       max: null,
        //     }
        //   }, 
        //   {
        //     label: "Brand",
        //     id: "brand_id",
        //     fieldType: 'brandSelect',
        //     validationsFunctions: {required},
        //     fieldOptions: {
        //       required: true,  
        //     }
        //   },
        // ]
      }
    },

    data: () => ({
      form: {},
      serverValidationErrors: {},
      itemSaved: false,
      sending: false,

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
    
      setForm () {
        // console.log("In set form");
        for (let i = 0; i < this.itemInfo.length; i++) {
          if(typeof this.itemInfo[i] !== 'undefined'){
            let field = this.itemInfo[i].id
            // console.log("Current Field ID: " + field);
            try{
              this.$set(this.form, field, this.item[field]);
              // console.log("Current Item Value: " + this.item[field]);
              // console.log("Set form Value: " + this.form[field]);
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
          this.$emit('validation-success',this.form);
        }else{
          this.$emit('validation-failed',this.form);
        }
      },

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
      loading(){
        // return typeof this.item.length;
        if(this.newItem === false){
          if(this.item[Object.keys(this.item)[0]] == null || this.item[Object.keys(this.item)[0]] == 'undefined'){
            return true;
          }
        }
        return false;
      }
    },

    mounted(){
      if(this.loading===false){
          this.setForm();
      }
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
      validate(validate){
        if(validate===true){
          this.validateItem();
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  .md-error{
    bottom: -8px;
    color: red;
    font-size: smaller;
  }
</style>

<style lang="scss">
    .md-layout-item{
      padding-left: 0px;
      padding-right: 0px;
    }
</style>