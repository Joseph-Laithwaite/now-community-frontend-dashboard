import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from "vuex-persistedstate";

import auth from "./modules/auth";
import alerts from "./modules/alerts-module";
import profile from "./modules/profile-module";
import users from "./modules/users-module";
import products from "./modules/products-module";
import independents from "./modules/independents-module";
import brands from "./modules/brands-module";

Vue.use(Vuex);

const dataState = createPersistedState({
  paths: ['profile','products','users','brands']
})

export default new Vuex.Store({
  modules: {
    auth,
    alerts,
    profile,
    users,
    products,
    independents,
    brands
  },
  plugins: [dataState] 

});
