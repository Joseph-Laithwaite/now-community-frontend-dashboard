import service from '@/store/services/brands-service';

const state = {
  list: {},
  pagination: {},
  brand: {},
};

const mutations = {
  SET_LIST: (state, list) => {
    state.list = list;
  },
  SET_RESOURCE: (state, brand) => {
    state.brand = brand;
  },
  SET_PAGINATE: (state, pagination) => {
    state.pagination = pagination;
  }
};

const actions = {
  list({commit, dispatch}, params='') {
    return new Promise((resolve, reject) => {
    service.list(params)
      .then(({list, meta, pagination}) => {
        commit('SET_LIST', list);
        commit('SET_PAGINATE', pagination);
        return resolve(list);
      })
      .catch((error)=>{
        console.log("brand Module error response");
        return reject(error);
      });
    })
  },

  get({commit, dispatch}, params='') {
    return new Promise((resolve, reject) => {
       service.get(params)
      .then((brand) => {
        commit('SET_RESOURCE', brand);
        return resolve(brand);
      })
      .catch((error)=>{
        console.log("brand Module error response");
        return reject(error);
      });
    })
  },

  add({commit, dispatch}, params) {
    return service.add(params)
      .then((brand) => { commit('SET_RESOURCE', brand); });
  },

  update({commit, dispatch}, params) {
    return new Promise((resolve, reject) => {
      service.update(params)
      .then((brand) => { 
        console.log("brand Module success response");
        commit('SET_RESOURCE', brand);
        return resolve(brand);
      })
      .catch((error)=>{
        console.log("brand Module error response");
        return reject(error);
      });
    })
  },

  destroy({commit, dispatch}, params) {
    return new Promise((resolve, reject) => {
      service.destroy(params)
      .then((brand) => { 
        return resolve(brand);
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
  brand: state => state.brand,
};

const brands = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default brands;
