<template>
  <div>
    <md-dialog 
      :md-click-outside-to-close="false"
      :md-active.sync="showDialog"
      @md-clicked-outside="$emit('close-user-dialog')"
      style="z-index:10000;"
    > 
      <!-- <md-dialog-title>New User</md-dialog-title> -->
      <md-dialog-content class="md-scrollbar">
        <edit-user-card 
          @user-created="userCreated"
          ></edit-user-card>
      </md-dialog-content>
      <!-- <md-dialog-actions>
        <md-button class="md-primary" @click="$emit('close-user-dialog')">Close</md-button>
        <md-button class="md-primary" @click="$emit('save-user-dialog')">Save</md-button>
      </md-dialog-actions> -->
    </md-dialog>
  </div>
  
</template>

<script>
import EditUserCard from "../pages/Dashboard/Examples/UserProfile/EditUserCard.vue"

  export default {
    name: 'CreateUserDialog',
    components: {EditUserCard},
    props: {
      showDialog: {default:false},
    },
    methods:{
      userCreated(user){
        this.$emit('user-created', user);
        this.$emit('close-user-dialog');
      }

    }
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


  // .md-dialog ::v-deep.md-dialog-container {
  //   max-width: 768px;
  // }
    .md-tabs-content {
    max-height: 80% !important;
    overflow: auto;
  }

</style>