<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item">
              <md-card-header class="md-card-header-icon">
        <div class="card-icon">
          <md-icon>perm_identity</md-icon>
        </div>
        <div class="md-title" v-if="newUser">
          Create New User
        </div>
        <div class="md-title" v-else>
          Edit User
        </div>
      </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('first_name')">
                <label for="first-name">First Name</label>
                <md-input name="first-name" id="first-name" 
                  @input="serverValidationErrors.first_name=null" 
                  v-model="form.first_name" 
                  :disabled="sending" />
                <span class="md-error" v-if="!$v.form.first_name.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.first_name.minlength">First name must be longer than 3 characters</span>
              </md-field>
              <span v-if="serverValidationErrors.first_name">
                  <span 
                      class="md-error" 
                      v-for="error in serverValidationErrors.first_name"
                      :key="error"                    
                    >
                    {{error}}
                    <br>
                  </span>
                </span>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('last_name')">
                <label for="last-name">Last Name</label>
                <md-input name="last-name" id="last-name" 
                  @input="serverValidationErrors.last_name=null" 
                  autocomplete="family-name" 
                  v-model="form.last_name" 
                  :disabled="sending" />
                <span class="md-error" v-if="!$v.form.last_name.required">The last name is required</span>
                <span class="md-error" v-else-if="!$v.form.last_name.minlength">Last name must be longer than 3 characters</span>
              </md-field>
              <span v-if="serverValidationErrors.last_name">
                  <span 
                      class="md-error" 
                      v-for="error in serverValidationErrors.last_name"
                      :key="error"                    
                    >
                    {{error}}
                    <br>
                  </span>
                </span>
            </div>
          

          <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('username')">
                <label for="username">Username</label>
                <md-input name="username" id="username" 
                  @input="serverValidationErrors.username=null" 
                  v-model="form.username" 
                  :disabled="sending" />
                <span class="md-error" v-if="!$v.form.username.required">The username is required</span>
                <span class="md-error" v-if="!$v.form.username.alphaNum">The username must be made of alpha numeric characters with no special characters or spaces</span>
              </md-field>
              <span v-if="serverValidationErrors.username">
                  <span 
                      class="md-error" 
                      v-for="error in serverValidationErrors.username"
                      :key="error"                    
                    >
                    {{error}}
                    <br>
                  </span>
                </span>
            </div>

          </div>
          <div class="md-layout md-gutter">
            <!-- <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="dob">Date of Birth</label>
                <md-input type="date" id="dob" name="dob" autocomplete="dob" v-model="form.dob" placeholder="Date of Birth" :disabled="sending" />
                <md-datepicker v-model="form.dob" :disabled="sending" id="dob" name="dob">
                  <label>Date of Birth</label>
                </md-datepicker>
              </md-field>
            </div> -->
            
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input 
                  @input="serverValidationErrors.email=null" 
                  type="email" name="email" id="email" 
                  autocomplete="email" 
                  v-model="form.email" 
                  :disabled="sending" 
                />
                <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
              </md-field>
              <!-- <validation-error :errors="serverValidationErrors.email"/> -->
                <span v-if="serverValidationErrors.email">
                  <span 
                      class="md-error" 
                      v-for="error in serverValidationErrors.email"
                      :key="error"                    
                    >
                    {{error}}
                    <br>
                  </span>
                </span>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">
            <span v-if="newUser">Create user</span>
            <span v-else>Update user</span>
          </md-button>
        </md-card-actions>
      </md-card>

      <!-- <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar> -->
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength,
    alphaNum
  } from 'vuelidate/lib/validators'

  // import {ValidationError} from "@/components";

  export default {
    name: 'edit-user-card',
    mixins: [validationMixin],
    // components: {ValidationError},
   
    props: {
      user: {type: Object, default: null}
    },

    data: () => ({
      form: {
        id: null,
        first_name: null,
        last_name: null,
        username: null,
        dob: null,
        email: null,
      },
      serverValidationErrors: {
          email: [],
          first_name: [],
          last_name: [],
          username: [],
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),

    validations() {
      var form = new Object();

      form = {
        first_name: {
          required,
          minLength: minLength(3)
        },
        last_name: {
          required
          ,minLength: minLength(3)
        },
        email: {
          required,email
        },
        username: {
          required
          ,alphaNum
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

      clearForm () {
        this.$v.$reset()
        this.form.first_name = null
        this.form.last_name = null
        this.form.username = null
        this.form.dob = null
        this.form.email = null
      },

      saveUser () {
        this.sending = true
        if(this.newUser){
          this.createUser();
        }else{
          this.updateUser();
        }
      },
      validateUser () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.saveUser()
        }
      },
      
      updateUser() {
        this.$store.dispatch("users/update", this.form)
        .then(response =>{
          this.$store.dispatch("alerts/success", "Profile updated successfully.")
          this.userSaved = true
          this.sending = false
          //Emit with new user for prop to be re established
          //this.user = await this.$store.getters["users/user"]
        })
        .catch (e=>{
          console.log(e);
          this.$store.dispatch("alerts/error", "Oops, something went wrong! " + e.message);
          this.sending = false;
          if(e.errors.email){this.serverValidationErrors.email = e.errors.email;};
          if(e.errors.first_name){this.serverValidationErrors.first_name=e.errors.first_name;};
          if(e.errors.last_name){this.serverValidationErrors.first_name=e.errors.last_name;};
          if(e.errors.username){this.serverValidationErrors.username=e.errors.username;};
        })
      },
      createUser() {
        this.$store.dispatch("users/add", this.form)
        .then(response =>{
          console.log('success');
          this.$store.dispatch("alerts/success", "User created successfully.")
          this.userSaved = true
          this.sending = false
          let user = this.$store.getters["users/user"]
          console.log(user);
          this.$emit('user-created', user)
        })
        .catch (e=>{
          console.log(e);
          this.$store.dispatch("alerts/error", "Oops, something went wrong! " + e.message)
          this.sending = false
          if(e.errors.email){this.serverValidationErrors.email=e.errors.email;};
          if(e.errors.first_name){this.serverValidationErrors.first_name=e.errors.first_name;};
          if(e.errors.last_name){this.serverValidationErrors.first_name=e.errors.last_name;};
          if(e.errors.username){this.serverValidationErrors.username=e.errors.username;};
          //this.setApiValidation(e.errors.email)
        })
      }
    },
    computed:{
      newUser(){
       if(this.user==null){
          return true;
        }
        return false;
      }
    },
    created(){
        if(!this.newUser){
          this.form.id = this.user.id
          this.form.username = this.user.username
          this.form.first_name = this.user.first_name
          this.form.last_name = this.user.last_name
          this.form.dob = null
          this.form.email = this.user.email
        }else{
          this.clearForm()
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
</style>