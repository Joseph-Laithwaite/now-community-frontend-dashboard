import service from '@/store/services/users-service';

const state = {
  list: {},
  pagination: {},
  user: {},
  //meta: {}
};

const mutations = {
  SET_LIST: (state, list) => {
    state.list = list;
  },
  SET_USER: (state, user) => {
    state.user = user;
  },
  SET_PAGINATE: (state, pagination) => {
    state.pagination = pagination;
  }
};

const actions = {
  list({commit, dispatch}, params) {
    return service.list(params)
      .then(({list, meta, pagination}) => {
        commit('SET_LIST', list);
        commit('SET_PAGINATE', pagination);
      });
  },

  get({commit, dispatch}, params) {
    return service.get(params)
      .then((user) => { commit('SET_USER', user); });
  },

  add({commit, dispatch}, params) {
    return service.add(params)
      .then((user) => { commit('SET_USER', user); });
  },

  update({commit, dispatch}, params) {
    return new Promise((resolve, reject) => {
      service.update(params)
      .then((user) => { 
        commit('SET_USER', user);
        return resolve(user);
      })
      .catch((error)=>{
        return reject(error);
      });
    })
  },

  destroy({commit, dispatch}, params) {
    return new Promise((resolve, reject) => {
      service.destroy(params)
      .then((user) => { 
        return resolve(user);
      })
      .catch((error)=>{
        return reject(error);
      });
    })
  }
};

const getters = {
  list: state => state.list,
  pagination:  state => state.pagination,
  // currentPage: state => state.meta.current_page,
  // perPage: state => state.meta.per_page,
  // listTotal: state => state.meta.total,
  // pageCount: state => state.meta.to,
  user: state => state.user,
};

const users = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default users;
