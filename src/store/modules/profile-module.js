import service from '@/store/services/profile-service';

const state = {
  me: null,
  myPermissions: null,
  // localStorage.getItem('myPermissions') || null,
  currentPermissions: null,
  // localStorage.getItem('currentPermission') || null,
};

const mutations = {
  SET_CURRENT_PERMISSIONS: (state, currentPermissions) =>{
    console.log("in SET_CURRENT_PERMISSIONS mutations");
    console.log(currentPermissions);
    console.log(JSON.stringify(currentPermissions))
    // localStorage.setItem("currentPermission", JSON.stringify(currentPermissions));
    state.currentPermissions = currentPermissions;
  },
  SET_ME: (state, me) =>{
    state.me = me;
  },
  SET_PERMISSIONS: (state, myPermissions) =>{
    // localStorage.setItem('myPermissions', JSON.stringify(myPermissions));
    state.myPermissions = myPermissions;
  },
};

const actions = {
  me({commit, dispatch}, params) {
    service.getMe(params)
      .then((profile) => {
        commit('SET_ME', profile.me);
      });
  },

  myPermissions({commit, dispatch}, params) {
    return service.getMyPermissions(params)
      .then((profile) => {
        console.log("in myPermissions actions");
        commit('SET_CURRENT_PERMISSIONS', profile.currentPermissions);
        commit('SET_PERMISSIONS', profile.list);
      });
  },

  setCurrentPermissions({commit, dispatch}, currentPermissions) {
    console.log("in profile-module setCurrentPermissions")
    console.log(currentPermissions);
    commit('SET_CURRENT_PERMISSIONS', currentPermissions);
  },

  update({commit, dispatch}, params) {
    return service.update(params)
      .then((profile) => {
        commit('SET_ME', profile);
      });
  },
};

const getters = {
  me: state => state.me,
  myPermissions: state => state.myPermissions,
  // JSON.parse(state.myPermissions),
  currentPermissions: state => state.currentPermissions,
  // JSON.parse(state.currentPermissions),
};

const profile = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default profile;
