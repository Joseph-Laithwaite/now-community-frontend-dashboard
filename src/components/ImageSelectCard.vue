<template>
  <div>
    <form class="md-layout" @submit.prevent="validateItem">
      <md-card class="md-layout-item">
        <md-card-header class="md-card-header-icon">
          <div class="md-title" v-if="newItem">
            Upload New {{itemType}}
          </div>
          <div class="md-title" v-else>
            Replace {{itemType}}
          </div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <div class="image-upload md-layout md-alignment-top-center">
                <label for="file-input" class="md-layout-item md-size-20 ">
                  <img src="https://wolper.com.au/wp-content/uploads/2017/10/image-placeholder.jpg" id='image'/>
                </label>
                <input 
                  required
                  id="file-input" 
                  type="file"
                  ref="image"
                  name="image" 
                  @change="UpdateFile"
                />
            </div>

                  <!-- <md-file 
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
                  /> -->
                  <!-- <span class="md-error" v-if="fileTooLarge">
                      The image has a maxFileSize of <br>
                  </span>
                  <span class="md-error" v-if="!$v.image.required">
                      The image is required <br>
                  </span> -->
                <!-- </md-field> -->
                <span v-if="serverValidationErrors.length > 0">
                  <span 
                    class="md-error" 
                    v-for="error in serverValidationErrors"
                    :key="error"                    
                  >
                    {{error}}
                    <br>
                  </span>
                </span>
            </div>
          </div>
        </md-card-content>
        
        <md-progress-bar md-mode="buffer" :md-value="uploadProgress" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">
            <span v-if="newItem">Upload {{itemType}}</span>
            <span v-else>Replace {{itemType}}</span>
          </md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import {
    required,
  } from 'vuelidate/lib/validators';
  
  const maxFileSize = (param) => (value) => {
    console.log('MaxFileSize type of value: ' + typeof value);
    if(typeof value === "object"){
      console.log('MaxFileSize type of value size: ' + typeof value.size);
      // value.size <= param;
    }
  }

  import axios from 'axios';

  export default {
    name: 'image-select-card',
    mixins: [validationMixin],
    props: {
      item: {type: Object, required: false},
      maxFileSize: {default: 1000000},
      newItem: {type:Boolean, },
      itemType: {type: String, required: false, default: 'Profile Picture'},
    },

    data: () => ({
      image:null,
      url: 'https://wolper.com.au/wp-content/uploads/2017/10/image-placeholder.jpg',
      model:'App\\Models\\Independent',
      id:'1',
      name:'imageName',
      serverValidationErrors: [],
      itemSaved: false,
      sending: false,
      fileTooLarge: false,
      uploadProgress: 0,
    }),
    
    validations:{
      image: {
        required,
        // maxFileSize : maxFileSize(16320)
      },
    },
   
    methods: {
      validateItem() {
        console.log('validate item image: ' + typeof this.image);
        if(typeof this.image !== "undefined"){
          // this.$v.$touch();
          // if (!this.$v.$invalid) {
            this.saveItem();
          // }
        }
      },

      UpdateFile(){
        // console.log(this.$refs.image.files[0]);
        let reader  = new FileReader();
        this.image = this.$refs.image.files[0]; 
        
        reader.readAsDataURL(this.image);
        reader.onload = function(e)  {
            var image = document.getElementById('image');
            image.src = reader.result;
            document.body.appendChild(image);
         }
         reader.onerror = function(e){

         }

        // function() {
        //     // console.log(reader.result);
        //     var image = document.getElementById('image');
        //     image.src = reader.result;
        //     document.body.appendChild(image);
        //     // this.url = reader.result;
        // };

        // }
        // if(this.$refs.image.files[0].size <= this.maxFileSize){
          // this.fileTooLarge = false;
        // }else{
        //   this.fileTooLarge = true;
        // }
        // console.log(this.$refs.image.files[0].size);
      },

      saveItem () {
        this.sending = true;
        if(this.newItem){
          this.createItem()
            .then(response=>{
              this.$store.dispatch("alerts/success", `${this.itemType} uploaded successfully. `);
              this.url = 'http://nowcommunity.test' + response.data.url;
              this.itemSaved = true;
              this.sending = false;
            })
            .catch(error => {
              this.serverValidationErrors = error.image;
              this.$store.dispatch("alerts/error", `${this.itemType} uploaded unsuccessful. `);
              this.sending = false;
            })
        }else{
          this.updateItem();
        }
      },

      updateItem() {
        this.$store.dispatch(this.vueStoreModule + "/upload", this.form)
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
        const config = {
          headers: {
          'content-type': 'multipart/form-data',
          // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
          }
        }
        const url = process.env.VUE_APP_API_BASE_URL;

        const bodyFormData = new FormData();
        bodyFormData.append('image', this.image);
        bodyFormData.append('name', this.name);
        bodyFormData.append('imageable_type', this.model);
        bodyFormData.append('imageable_id', this.id);

        // return axios.post(`${url}/uploads/independents/${independent.id}/profile-image`, bodyFormData, config)
        return new Promise((resolve, reject) => {
          axios.post(`${url}/images`, bodyFormData, {
            onUploadProgress: progressEvent => {
              this.uploadProgress = progressEvent.loaded / progressEvent.total;
              console.log(progressEvent.loaded / progressEvent.total)
            }
          })
          // axios.post(`${url}/images`, bodyFormData, config)
            .then(response => {
              resolve(response.data);
            })
            .catch(errors => {
              // if(typeof)
              console.log("axios error recieved");
              console.log(errors);
              reject(errors);
            });
        });
      },
    },
    
    computed:{
      vueStoreModule(){
        return this.itemType.toLowerCase() + "s"
      }
    },    
  }
</script>

<style lang="scss" scoped>
  .image-upload > input
  {
    display: none;
  }
  .image-upload img
  {
    // width: 80px;
    cursor: pointer;
  }
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
  >>>.md-menu-content {
        z-index: 60;
  }
</style>