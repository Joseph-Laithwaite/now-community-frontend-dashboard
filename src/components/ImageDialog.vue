<template>
<md-dialog 
  :md-active=showDialog
  @md-clicked-outside="$emit('close-image-dialog')"
  :md-click-outside-to-close="false"
  >
    <md-dialog-title>{{label}}</md-dialog-title>
    <md-dialog-content class="md-scrollbar">
      <div class="md-layout md-alignment-top-center">
        <div>
          <image-upload 
            @new-file="SetFile"
            :imageURL="info.url"
          ></image-upload>
        </div>
      </div>
      <form @submit.prevent="ImageUpload">
        <div v-for="fileInput in fileInputs" :key="fileInput.id">
          <md-field  v-if="fileInput.fieldOptions.disabled !== true || typeof fileInput.fieldOptions.disabled == 'undefined'">
            <label :for="id + '_' + fileInput.id" v-text="fileInput.label"></label>
            <md-input 
              :id="id + '_' + fileInput.id" 
              :name="id + ' ' + fileInput.label"
              :type="fileInput.fieldOptions.type"
              :disabled="fileInput.fieldOptions.disabled"
              :required="fileInput.fieldOptions.required"
              v-model="form[fileInput.id]"
            />
          </md-field>
        </div>
        <div v-if="form.file!==undefined">
          <md-list :md-expand-single="true">
            <md-list-item md-expand>
              <md-icon >info</md-icon>
              <div class="md-list-item-text">
              Info
              </div>
              <md-list slot="md-expand">

                <div v-for="fileInput in fileInputs" :key="fileInput.id">
                  <div v-if="form[fileInput.id] !== '' && fileInput.fieldOptions.disabled === true">
                    <md-list-item class="md-inset">
                      <md-field>
                        <label :for="id + '_' + fileInput.id" v-text="fileInput.label"></label>
                        <md-input 
                          :id="id + '_' + fileInput.id" 
                          :name="id + ' ' + fileInput.label"
                          :type="fileInput.fieldOptions.type"
                          :disabled="fileInput.fieldOptions.disabled"
                          :required="fileInput.fieldOptions.required"
                          v-model="form[fileInput.id]"
                        />
                      </md-field>
                    </md-list-item>              
                  </div>
                </div>

                <div v-for="infoField in fileInfo" :key="infoField.id">
                  <md-list-item class="md-inset" v-if="info[infoField.id] !== ''">
                    <md-field>
                      <label :for="infoField.id" v-text="infoField.label"></label>
                      <md-input
                        :id="infoField.id" 
                        :name="infoField.label"
                        :type="infoField.fieldOptions.type"
                        :disabled="true"
                        :required="false"
                        v-model="info[infoField.id]"
                      />
                    </md-field>
                  </md-list-item>              
                </div>    
              </md-list>
            </md-list-item>
          </md-list>
        </div>
        </form>
  </md-dialog-content>
  <md-dialog-actions>
    <div class="md-layout md-alignment-top-center md-gutter" style="margin-right: 0px;">
      <md-button class="md-primary md-layout-item md-size-45" 
        @click="UploadFile"
      >
        {{`${newImage ? 'Upload':'Update'}`}}
      </md-button>
      <md-button class="md-accent md-layout-item md-size-45" 
        @click="$emit('close-image-dialog')"
      >
        Close
      </md-button>
    </div>
  </md-dialog-actions>
</md-dialog>
  
</template>

<script>
import ImageUpload from './ImageUpload.vue'

import Axios from 'axios';

const url = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "ImageDialog",
  components: {
    ImageUpload,
  },
  data: () => ({
    newImage:true,
    form: {
      file: undefined,
      fileName:'',
      fileDescription:'',
      fileSize: '',
      fileType: '',
    },
    info: {
      id: '',
      url: '',
      addedBy: '',
      dateAdded: '',
    },
    uploadProgress:0,
  }),
  props:{
    label: {default:'Image'},
    id: {default:'image'},
    showDialog: {default:false},
    passedFile: {default: undefined},
    imageID: {default: undefined},
    model: {default:'App\\Models\\Independent'},
    fileInputs:{
      type: [Array, Object], 
        default:()=>
        [
          {
            label: "File Name",
            id: "fileName",
            fieldOptions:{
              type: 'text',
              required: true,
            },
            // validationsFunctions: {required, text},
          },
          {
            label: "File Description",
            id: "fileDescription",
            fieldOptions:{
              type: 'text',
            },
            // validationsFunctions: {text},
          },
          {
            label: "File Size",
            id: "fileSize",
            fieldOptions:{
              type: 'text',
              required: true,
              disabled: true,
              fileSize: true
            },
            // validationsFunctions: {required, integer},
          },
          {
            label: "File Type",
            id: "fileType",
            fieldType: 'input',
            fieldOptions:{
              type: 'text',
              required: true,
              disabled: true,
            },
            // validationsFunctions: {required, text},
          },
        ]
    },
    fileInfo: {
        type: [Array, Object], 
        default:()=>
        [
          {
            label: "URL",
            id: "url",
            fieldType: 'input',
            fieldOptions:{
              type: 'text',
              // required: true,
              disabled: true,
            },
            // validationsFunctions: {required, text},
          },
          {
            label: "Added By",
            id: "addedBy",
            fieldType: 'input',
            fieldOptions:{
              type: 'text',
              // required: true,
              disabled: true,
            },
            // validationsFunctions: {required, text},
          },
          {
            label: "Date Added",
            id: "dateAdded",
            fieldType: 'input',
            fieldOptions:{
              type: 'text',
              // required: true,
              disabled: true,
            },
            // validationsFunctions: {required, text},
          },
          {
            label: "ID",
            id: "id",
            fieldType: 'input',
            fieldOptions:{
              type: 'text',
              // required: true,
              disabled: true,
            },
            // validationsFunctions: {required, text},
          },
        ]
      }
  },
  methods:{
    SetFile(file){
      this.ClearForm();
      this.form.file = file;
      this.form.fileSize = (file.size/1000) + ' kb';
      this.form.fileType = file.type;
      try{
        this.form.fileName = file.name.replace(/\.[^/.]+$/, "");
      }
      catch{

        console.log('no file name found');
      }
    },

    SetPassedFile(file){
      try{
        this.form.file=file;
        this.form.fileName = file.name;
        this.form.fileDescription = file.description;
        this.form.fileSize = file.size;
        this.form.fileType = file.type;
        this.info.id = file.id;
        this.info.addedBy = file.first_name + ' ' + file.last_name;
        this.info.url = file.url;
        this.info.dateAdded = file.created_at;
        this.newImage=false;
        let fileToReturn = new Object;
        fileToReturn.file = file;
        fileToReturn.id = this.id;
        this.$emit('file-uploaded', fileToReturn);
      }
      catch{
        this.$store.dispatch("alerts/error", 'passed file not found');
        this.newImage=true;
      }
    },

    SetFileFromID(imageID){
      if(typeof imageID!=='null' && imageID!==null){
        Axios.get(`${url}/images/${imageID}`)
        .then(response => {
          console.log("Response from image get");
          console.log(response);
          let file= response.data.message;
          this.form.file = file;
          this.form.fileName = file.name;
          this.form.fileDescription = file.description;
          this.form.fileSize = (file.size/1000) + ' kb';
          this.form.fileType = file.type;
          this.info.id = file.id;
          this.info.addedBy = file.user.first_name + ' ' + file.user.last_name;
          this.info.url = 'http://nowcommunity.test' + file.url;
          this.info.dateAdded = file.created_at;
          this.newImage=false;
          // this.$emit('file-set', file.name);
          let fileToReturn = new Object;
          fileToReturn.file = file;
          fileToReturn.id = this.id;
          this.$emit('file-uploaded', fileToReturn);
        })
        .catch(error=>{
          this.$store.dispatch("alerts/error", error.message);
          this.newImage = true;
        })
      }else{
        this.newImage = true;
      }
    },

    UploadFile(){
      // console.log('Upload file independent id: ' + this.$store.getters["profile/currentPermissions"].independent.id);
      const bodyFormData = new FormData();
        bodyFormData.append('image', this.form.file);
        bodyFormData.append('name', this.form.fileName);
        bodyFormData.append('imageable_type', this.model);
        bodyFormData.append('imageable_id', this.$store.getters["profile/currentPermissions"].independent.id);
        bodyFormData.append('description', this.form.fileDescription);
        bodyFormData.append('size', parseInt(Number(this.form.fileSize.split(" kb")[0])*1000));
        bodyFormData.append('type', this.form.fileType);

      Axios.post(`${url}/images`, bodyFormData, {
        onUploadProgress: progressEvent => {
          this.uploadProgress = progressEvent.loaded / progressEvent.total;
          console.log(progressEvent.loaded / progressEvent.total)
        }
      })
      .then(response => {
        console.log("Response from image post");
        console.log(response);
        let file= response.data.data;
        this.form.file = file;
        // this.form.fileName = file.name;
        // this.form.description = file.description;
        // this.form.fileSize = (file.size/1000).toFixed(1) + ' kb';
        // this.form.fileType = file.type;
        this.info.id = file.id;
        this.info.addedBy = file.user.first_name + ' ' + file.user.last_name;
        this.info.url = 'http://nowcommunity.test' + file.url;
        this.info.dateAdded = file.created_at;
        this.newImage = false;
        let fileToReturn = new Object;
        fileToReturn.file = file;
        fileToReturn.id = this.id;
        this.$emit('file-uploaded', fileToReturn);
      })
      .catch(error=>{
        this.$store.dispatch("alerts/error", error.message);
        this.ClearForm
      })
    },

    ClearForm(){
      this.form.file = undefined;
      this.form.fileName = '';
      this.form.fileDescription = '';
      this.form.fileSize = '';
      this.form.fileType = '';
      this.info.id = '';
      this.info.addedBy = '';
      this.info.url = '';
      this.info.dateAdded = '';
    }
  },
  mounted(){
    if(typeof this.passedFile !== 'undefined' && this.passedFile !== null){
      this.SetPassedFile(this.passedFile);
    }
    else if(typeof this.imageID !== 'undefined'&& this.imageID !== null){
      this.SetFileFromID(this.imageID);
    }
    else{
      this.ClearForm();
    }
  },
  watch:{
    passedFile(passedFile){
      this.SetPassedFile(passedFile);
    },
    imageID(imageID){
      this.SetFileFromID(imageID);
    }
  }
};
</script>

<style lang="scss" scoped>
.viewport {
  width: 320px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  overflow: auto;
  border: 1px solid rgba(#000, 0.12);
}
.md-dialog-container{
  min-width:80%;
}
.md-dialog-content{
  margin-top:-50px;
}
.md-dialog-actions{
  padding-left: 8px;
}
</style>
