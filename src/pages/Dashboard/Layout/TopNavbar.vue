<template>
  <md-toolbar
      md-elevation="0"
      class="md-transparent"
      :class="{
      'md-toolbar-absolute md-white md-fixed-top': $route.meta.navbarAbsolute
    }"
  >
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
            class="md-just-icon md-round md-simple md-toolbar-toggle"
            :class="{ toggled: $sidebar.showSidebar }"
            @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-autocomplete">
            <md-autocomplete
                class="search"
                v-model="selectedEmployee"
                :md-options="employees"
                :md-open-on-focus="false"
            >
              <label>Search...</label>
            </md-autocomplete>
          </div>
          <md-list>
            <li class="md-list-item">
              <a
                  class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down direction="down">
                    <md-button
                        slot="title"
                        class="md-button md-just-icon md-simple"
                        data-toggle="dropdown"
                    >
                      <md-icon>notifications</md-icon>
                      <span class="notification">5</span>
                      <p class="hidden-lg hidden-md">Notifications</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li><a href="#">Mike John responded to your email</a></li>
                      <li><a href="#">You have 5 new tasks</a></li>
                      <li><a href="#">You're now friend with Andrew</a></li>
                      <li><a href="#">Another Notification</a></li>
                      <li><a href="#">Another One</a></li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>

            <li class="md-list-item">
              <a
                  class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down direction="down">
                    <md-button
                        slot="title"
                        class="md-button md-just-icon md-simple"
                        data-toggle="dropdown"
                    >
                      <md-icon v-if="!avatar">person</md-icon>
                      <md-icon v-else>
                        <md-avatar style="height: auto; width: auto; min-width: auto">
                          <img :src="avatar" alt="Avatar">
                        </md-avatar>
                      </md-icon>
                      <p class="small"> {{ firstName }} </p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li>
                        <router-link :to="{name:'User Profile'}">
                            My Profile
                        </router-link>
                      </li>
                      <li>
                        <router-link :to="{name:'Logout'}">
                          <span class="sidebar-normal">Logout</span>
                        </router-link>
                      </li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
  export default {
    data() {
      return {
        selectedEmployee: "",
        employees: [
          "Jim Halpert",
          "Dwight Schrute",
          "Michael Scott",
          "Pam Beesly",
          "Angela Martin",
          "Kelly Kapoor",
          "Ryan Howard",
          "Kevin Malone"
        ],
        firstName: 'Profile',
        avatar: null
      };
    },

    async created() {
      this.$store.watch(() => this.$store.getters["profile/me"], (me) => {
        this.firstName = me.first_name
        if(me.profile_picture){
          this.avatar = process.env.VUE_APP_APP_BASE_URL + me.profile_picture
        }
        
      })
      await this.$store.dispatch("profile/me")
    },

    methods: {
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      minimizeSidebar() {
        if (this.$sidebar) {
          this.$sidebar.toggleMinimize();
        }
      },
    }
  };
</script>
