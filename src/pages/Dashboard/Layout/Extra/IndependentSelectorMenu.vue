<template>
  <div>
    <sidebar-item 
      v-if="typeof selectedIndependent.independent !== 'undefined'"

      :link="{ 
        name:  selectedIndependent.independent.name,
        image: '' ,
        icon: 'storefront'
      }"
    >
      <span v-if="permissionCount>1">
        <sidebar-item
          v-for="permission in independentPermissions"
          :key="permission.id"
          :link="{
            id: permission.id,
            name: permission.independent.name,
            image: permission.independent.logo,
            icon: 'storefront',
            path: '',
            emit: 'select_independent'
          }"
          @select_independent="selectIndependent(permission)"
        />
      </span>

      <sidebar-item
        :link="{
          id: 'addNewIndependent',
          name: 'Add Independent',
          image: '',
          icon: 'add_business',
          path: {name:'Register Business', hash:'#basicDetails'},
          emit: 'add_new_independent'
        }"
      />
    </sidebar-item>
  </div>
  <!-- <div class="user">
    <div class="photo"
      v-if="typeof selectedIndependent.logo == undefined"
    >
      <img 
        :src="selectedIndependent.logo"
        :alt="selectedIndependent.independent.name + ' logo'" />
    </div>
    <a
      v-else
      class="nav-link sidebar-menu-item"
    >
      <md-icon>
        storefront
      </md-icon>
    </a>
    <div class="user-info">
      <a
        data-toggle="collapse"
        :aria-expanded="!isClosed"
        @click.stop="toggleMenu"
        @click.capture="clicked"
      >
        <span>
          {{ selectedIndependent.independent.name }}
          <b v-if="!singleindependentPermissions" class="caret"></b>
        </span>
      </a>

      <collapse-transition v-if="!singleindependentPermissions">
        <div v-show="!isClosed">
          <ul class="nav">
              <li v-for="independentPermissions in independentPermissions" :key=independentPermissions.id>
                  <div class="photo">
                    <img :src="independentPermissions.logo" :alt="independentPermissions.independent.name + ' logo'" />
                  </div>
                  <div class="user-info">
                    <a>
                      <span>
                        {{ independentPermissions.independent.name }}
                      </span>
                    </a>
                  </div>
              </li>
          </ul>
        </div>
      </collapse-transition>
    </div>
  </div> -->
</template>
<script>
export default {
  name: 'independentPermissionselector',
  data() {
    return {
      isClosed: true,
      independentPermissions: [],
      selectedIndependent: {},
      permissionCount: 0,
    };
  },

  async beforeCreate() {
    
    // await this.$store.dispatch("profile/myPermissions");
    this.independentPermissions =  await this.$store.getters["profile/myPermissions"];
    this.selectedIndependent =  await this.$store.getters["profile/currentPermissions"];
    this.permissionCount =  this.independentPermissions.length;
  },

  computed:{
    singleindependentPermissions(){
      if(this.permissionCount>1){
        return false;
      }else{
        return true;
      }
    },
  },

  methods: {
    async selectIndependent(permission){
      // this.selectedIndependent = permission
      console.log("About to call setCurrentPermissions from async selectIndependent");
      console.log(permission);
      await this.$store.dispatch("profile/setCurrentPermissions", permission);
      this.selectedIndependent = await this.$store.getters["profile/currentPermissions"]
      console.log("Newly set current permissions is: ");
      console.log(this.selectedIndependent);
    },
    clicked: function(e) {
      e.preventDefault();
    },
    toggleMenu: function() {
      this.isClosed = !this.isClosed;
    },
    goToProfile() {
      this.$router.push({name: "independentPermissions Profile"})
    },
  }
}
</script>
<style>
.collapsed {
  transition: opacity 1s;
}
</style>
