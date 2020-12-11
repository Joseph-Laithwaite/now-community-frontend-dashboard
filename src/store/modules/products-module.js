import service from '@/store/services/products-service';

const state = {
  list: {},
  pagination: {},
  product: {},
  independent_stock_list: {},
};

const mutations = {
  SET_LIST: (state, list) => {
    state.list = list;
  },
  SET_STOCK_LIST: (state, independent_stock_list) => {
    state.independent_stock_list = independent_stock_list;
  },
  SET_RESOURCE: (state, product) => {
    state.product = product;
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

  independent_stock_list({commit, dispatch}, params) {
    return service.independent_stock_list(params)
      .then(({independent_stock_list, meta, pagination}) => {
        // console.log(independent_stock_list);
        commit('SET_STOCK_LIST', independent_stock_list);
        commit('SET_PAGINATE', pagination);
      });
  },

  get({commit, dispatch}, params) {
    return service.get(params)
      .then((product) => { commit('SET_RESOURCE', product); });
  },

  add({commit, dispatch}, params) {
    return service.add(params)
      .then((product) => { commit('SET_RESOURCE', product); });
  },

  update({commit, dispatch}, params) {
    return new Promise((resolve, reject) => {
      service.update(params)
      .then((product) => { 
        console.log("product Module success response");
        commit('SET_RESOURCE', product);
        return resolve(product);
      })
      .catch((error)=>{
        console.log("product Module error response");
        return reject(error);
      });
    })
  },

  destroy({commit, dispatch}, params) {
    return new Promise((resolve, reject) => {
      service.destroy(params)
      .then((product) => { 
        return resolve(product);
      })
      .catch((error)=>{
        return reject(error);
      });
    })
  }
};

const getters = {
  list: state => state.list,
  independent_stock_list:  state => state.independent_stock_list,
  pagination:  state => state.pagination,
  // currentPage: state => state.meta.current_page,
  // perPage: state => state.meta.per_page,
  // listTotal: state => state.meta.total,
  // pageCount: state => state.meta.to,
  product: state => state.product,
  
};

const products = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default products;
