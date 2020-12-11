<template>
  <div
    class="wrapper md-scrollbar"
    :class="[
      { 'nav-open': $sidebar.showSidebar },
    ]"
  >
    <notifications></notifications>
    <side-bar
      :active-color="sidebarBackground"
      :background-image="sidebarBackgroundImage"
      :data-background-color="sidebarBackgroundColor"
      
    >
      <!-- <user-menu></user-menu> -->
      
      <mobile-menu></mobile-menu>
      <template slot="links">
        
        <independent-selector-menu></independent-selector-menu>
        
        <sidebar-item
          :link="{ name: 'Dashboard', icon: 'dashboard', path: '/dashboard' }"
        />
        
        <sidebar-item
          :link="{
            name: 'Users',
            icon: 'people',
            path: {name:'Users'},
            isRoute: true,
          }"
        />
        
        <sidebar-item
          :link="{
            name: 'Products',
            icon: 'shopping_bag',
            path: {name:'Products'},
            isRoute: true,
          }"
        />

        <sidebar-item
          :link="{
            name: 'Product Stock List',
            icon: 'shopping_bag',
            path: {name:'Product Stock'},
            isRoute: true,
          }"
        />

        <sidebar-item
          :link="{
            name: 'Orders',
            icon: 'receipt_long',
            path: {name:'Orders'},
            isRoute: true,
          }"
        />

        <sidebar-item
          :link="{
            name: 'Point of Sale',
            icon: 'computer',
            path: {name:'Orders'},
            isRoute: true,
          }"
        />


        <sidebar-item
          :link="{
            name: 'Independent Profile',
            icon: 'storefront',
            path: {name:'Independent Profile'},
            isRoute: true,
          }"
        />
        <sidebar-item closed :link="{ name: 'Settings', icon: 'settings' }">
          
          <sidebar-item
            :link="{
              name: 'Location',
              icon: 'location_on',
              path: {name:'Locations'},
            }"
          />

          <!-- <sidebar-item
            :link="{
              name: 'Table Lists',
              icon: 'content_paste',
              path: '/dashboard/table',
            }"
          />

          <sidebar-item
            :link="{
              name: 'Icons',
              icon: 'bubble_chart',
              path: '/dashboard/icons',
            }"
          />

          <sidebar-item
            :link="{ 
              name: 'Locations', 
              icon: 'place', 
              path: '/dashboard/locations' }"
          />

          <sidebar-item
            :link="{
              name: 'Notifications',
              icon: 'notifications',
              path: '/dashboard/notifications',
            }"
          /> -->
        </sidebar-item> -->  
        
      <li>
        <a class="nav-link sidebar-menu-item"
          @click="sidebarMini=!sidebarMini">
          <i class="md-icon md-icon-font">
            <md-switch
              :value="!sidebarMini"
              @change="sidebarMini=!sidebarMini"
            ></md-switch> 
          </i>
          <p>Sidbar Mini</p>
        </a>
      </li>

    </template>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <!-- <fixed-plugin
        :color.sync="sidebarBackground"
        :colorBg.sync="sidebarBackgroundColor"
        :sidebarMini.sync="sidebarMini"
        :sidebarImg.sync="sidebarImg"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin> -->

      <div :class="{ content: !$route.meta.hideContent }">
        <zoom-center-transition :duration="200" mode="out-in" v-on:side_bar_toggle="console.log('sideBarToggle Caught')">
          <!-- your content here -->
          
          <router-view 
            v-on:side_bar_mini="sidebarMini=false"
          />
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
    document.getElementsByClassName(className)[0].scrollTop = 0;
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

function reinitScrollbar() {
  let docClasses = document.body.classList;
  let isWindows = navigator.platform.startsWith("Win");
  if (isWindows) {
    // if we are on windows OS we activate the perfectScrollbar function
    initScrollbar("sidebar");
    initScrollbar("sidebar-wrapper");
    initScrollbar("main-panel");

    docClasses.add("perfect-scrollbar-on");
  } else {
    docClasses.add("perfect-scrollbar-off");
  }
}

import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import MobileMenu from "./Extra/MobileMenu.vue";
// import FixedPlugin from "../../FixedPlugin.vue";
// import UserMenu from "./Extra/UserMenu.vue";
import IndependentSelectorMenu from "./Extra/IndependentSelectorMenu.vue";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    // FixedPlugin,
    MobileMenu,
    // UserMenu,
    IndependentSelectorMenu,
  },
  data() {
    return {
      sidebarBackgroundColor: "black",
      sidebarBackground: "green",
      sidebarBackgroundImage:
        process.env.VUE_APP_APP_BASE_URL + "/img/sidebar-2.jpg",
      sidebarMini: true,
      sidebarImg: true,
      image: process.env.VUE_APP_APP_BASE_URL + "/img/laravel-vue.svg",
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    },
  },
  updated() {
    reinitScrollbar();
  },
  mounted() {
    reinitScrollbar();
  },
  watch: {
    sidebarMini() {
      this.minimizeSidebar();
    },
  },
};
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}
.main-panel .zoomIn {
  animation-name: zoomIn95;
}
@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}
.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>
