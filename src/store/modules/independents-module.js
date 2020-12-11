import service from '@/store/services/independents-service';

const state = {
  list: {},
  pagination: {},
  independent: {},
};

const mutations = {
  SET_LIST: (state, list) => {
    state.list = list;
  },
  SET_INDEPENDENT: (state, independent) => {
    state.independent = independent;
  },
  SET_PAGINATE: (state, pagination) => {
    state.pagination = pagination;
  }
};

const actions = {
  list({commit, dispatch}, params='') {
    return service.list(params)
      .then(({list, meta, pagination}) => {
        commit('SET_LIST', list);
        commit('SET_PAGINATE', pagination);
      });
  },
 
  get({commit, dispatch}, params) {
    console.log('in independents/get')
    console.log(params);
    return service.get(params)
      .then((independent) => { commit('SET_INDEPENDENT', independent); });
  },

  add({commit, dispatch}, params) {
    return service.add(params)
      .then((independent) => { commit('SET_INDEPENDENT', independent); });
  },

  update({commit, dispatch}, params) {
    return new Promise((resolve, reject) => {
      service.update(params)
      .then((independent) => { 
        console.log("independent Module success response");
        commit('SET_INDEPENDENT', independent);
        return resolve(independent);
      })
      .catch((error)=>{
        console.log("independent Module error response");
        return reject(error);
      });
    })
  },

  destroy({commit, dispatch}, params) {
    return new Promise((resolve, reject) => {
      service.destroy(params)
      .then((independent) => { 
        return resolve(independent);
      })
      .catch((error)=>{
        return reject(error);
      });
    })
  },

  upload({commit, dispatch}, params) {
    return service.upload(params)
      .then((independent) => { alert("upload complete")});
  },

  independent({commit, dispatch}, independent){
    console.log("In independents/independent")
    console.log(independent);
    commit('SET_INDEPENDENT', independent);
  }
};

const getters = {
  list: state => state.list,
  pagination:  state => state.pagination,
  independent: state => state.independent,
};

const independents = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default independents;
