<template>
  <div>
    <md-dialog 
      :md-click-outside-to-close="false"
      :md-active.sync="showDialog"
      @md-clicked-outside="$emit('close-user-dialog')"
      style="z-index:10000;"
    > 
      <md-dialog-title  v-text="newUser ? 'New User' : (user.first_name + ' ' + user.last_name)"></md-dialog-title>
      <md-dialog-content >
      <!-- class="md-scrollbar"> -->
      <md-tabs 
        md-dynamic-height md-primary 
        md-alignment="fixed"
        :md-active-tab="desiredTab"
        >
        <!-- @md-changed="desiredTab=item" -->
        <md-tab v-if="!newUser" id="activity" md-label="Activity">
          <h2>Orders</h2>
        </md-tab>
        <md-tab id="edit" md-label="info"> <!--  md-icon="account_circle" -->
          <edit-user-card 
            :user=user
            @user-updated="updateUser"
            @user-created="createUser"
          ></edit-user-card>
        </md-tab>
        <md-tab v-if="!newUser" class='hide' id="permissions" md-label="Permissions">
          <h3>User Roles</h3>
        </md-tab>
        <md-tab v-if="!newUser" id="delete" md-label="Delete">
          <h3>Are you sure you delete this account?</h3>
          <md-button
            v-on:click="deleteUser()"
          >
            DELETE
          </md-button>
        </md-tab>
      </md-tabs>
    </md-dialog-content>
      <!-- <md-dialog-actions>
        <md-button class="md-primary" @click="$emit('close-user-dialog')">Close</md-button>
        <md-button class="md-primary" @click="$emit('save-user-dialog')">Save</md-button>
      </md-dialog-actions> -->
    </md-dialog>
  </div>
  
</template>

<script>
//import EditProfileForm from "../pages/Dashboard/Examples/UserProfile/EditProfileForm.vue"
import EditUserCard from "../pages/Dashboard/Examples/UserProfile/EditUserCard.vue"

  export default {
    name: 'UserDialog',
    components: {EditUserCard},
    props: {
      showDialog: {default:false},
      user: {type: Object, default: null},
      desiredTab: {default:"activity"},
    },
    methods:{
      deleteUser(){
        this.$store.dispatch("users/destroy", this.user.id)
        .then(response=>{
          this.$store.dispatch("alerts/success", "Profile successfully deleted.")
          this.$emit('user-deleted');
          this.$emit('close-user-dialog');
        })
        .catch(error=>{
          this.$store.dispatch("alerts/error", "Oops, something went wrong! " + error.error);
        });
      },
      updateUser(user){
        this.$emit('user-updated',user);
      },
      createUser(user){
        this.$emit('user-created',user);
      }
    },
    computed:{
      newUser(){
       if(this.user.first_name=='' || this.user.first_name==null){
          return true;
        }
        return false;
      }
    },
    data: () => ({
      
    })
  }
</script>

<style lang="scss" >
.md-dialog-content{
  padding-top:50px;
}
.md-tabs-navigation{
  // display: none;
  background-color:#c8c8c8 !important ;
}


@media (max-width: 768px){
  .md-tabs-content   {
    height: 100% !important;
    overflow: hidden;
    }  
}
</style>