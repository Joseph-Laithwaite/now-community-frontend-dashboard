<template>
    <div>
        <div>
            <label :for="itemID">
            <img 
                id=image 
                :src="url" 
                :height="height" 
                :width="width"
                style="
                cursor:pointer;
                display: block;
                margin-left: auto;
                margin-right: auto; "
            />
            </label>
            <input 
                :id="itemID" 
                type=file 
                accept="image/*"
                :name="itemID"
                @change="changeFile"
                style="display: none;"
            >
        </div>
        <span class="md-error" v-if="fileOversized">
            file too large.
            <br>
        </span>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    props:{
        itemID: { 
            type: String,
            default: "product_image",
        },
        imageURL: {default:null},
        placeholderURL: {default: "https://wolper.com.au/wp-content/uploads/2017/10/image-placeholder.jpg"},
        maxFileSize: { default:296960 },
        height:{ default:100} ,
        width:{ default:100}
    },
    
    data: () => ({
        fileOversized: false,
        selectedFile: null,
        url: "",
    }),

    methods: {
        changeFile(event){
            // var file = document.getElementById(this.itemID).files[0];
            this.selectedFile = event.target.files[0];
            console.log(this.selectedFile);
            if(this.selectedFile.size <= this.maxFileSize){
                var reader  = new FileReader();
                reader.onload = (e) => {
                //   var image = document.getElementById('image');
                  this.url = e.target.result;
                }
                reader.readAsDataURL(this.selectedFile);
                this.$emit('new-file', this.selectedFile);
            }else{
                this.$store.dispatch("alerts/error", "The image you're trying to upload must be under " + this.maxFileSize/1000 + "kb")
                // image.src = this.placeholderURL;
            }
        },
        fileFromUrl(url){
            fetch(url, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                    'Access-Control-Allow-Origin':'*'
                // 'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                })
                .then(res => res.blob()) // Gets the response and returns it as a blob
                .then(blob => {
                    console.log(blob);
                    this.$emit('new-file', blob);
                });
            }
        },
        created(){
            if(typeof this.imageURL == 'null' || this.imageURL == ''){
                this.url = this.placeholderURL;
            }
            else{
                this.url = this.imageURL;
            }
        }
    }
</script>

<style scoped>

</style>