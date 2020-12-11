import qs from 'qs';
import axios from 'axios';
import Jsona from 'jsona';

axios.interceptors.response.use(function (response) {
  if (response.statusText !== 'OK') {
      return Promise.reject(response);
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});


const url = process.env.VUE_APP_API_BASE_URL;
const jsona = new Jsona();

function list(params) {
  // const options = {
  //   params: params,
  //   paramsSerializer: function (params) {
  //     return qs.stringify(params, {encode: false});
  //   }
  // };

  return axios.get(`${url}/users` + params)
    .then(response => {
      return {
        list: response.data.data,
        meta: response.data,
        pagination: {
          current_page: response.data.current_page,
          first_page_url: response.data.first_page_url,
          from: response.data.from,
          last_page: response.data.last_page,
          last_page_url: response.data.last_page_url,
          next_page_url: response.data.next_page_url,
          path: response.data.path,
          per_page: parseInt(response.data.per_page),
          prev_page_url: response.data.prev_page_url,
          to: response.data.to,
          total: response.data.total
        }
      };
    });
}

function get(id) {
  const options = {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  };

  return axios.get(`${url}/users/${id}`, options)
    .then(response => {
      let user = response.data;
      delete user.links;
      return user;
    });
}

function add(user) {
  // const payload = jsona.serialize({
  //   stuff: user,
  //   includeNames: null
  // });

  const options = {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  
  };
  
  return new Promise((resolve, reject) => {
    axios.post(`${url}/users`, user, options)
      .then(response => {
        console.log('CREATE NEW USER RESPONSE:')
        console.log(response);
        resolve(response.data)
      }).catch(function (error) {
        console.log(error);
        if(error.status==201){
          console.log('CREATED NEW USER RESPONSE with 201:')
          console.log(error);
          resolve(error.data);
        }else{
          console.log(error.response.data);
          reject(error.response.data);
        }
      });
    })
}

function update(user) {
  user._method='PATCH';

  const options = {
    // _method: 'PATCH',
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  };

  return new Promise((resolve, reject) => {
    axios.post(`${url}/users/${user.id}/edit`, user, options)
      .then(response => {
        console.log(response);
        resolve(response.data)
      }).catch(function (error) {
        let e = error.response.data
        console.log(error.response.data);
        reject(e);
      });
    })
}

function destroy(id) {
  const options = {
    _method: 'DELETE',
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  };
  return new Promise((resolve, reject) => {
    axios.post(`${url}/users/${id}`, options)
    .then(response => {
        console.log(response);
        resolve(response.data)
    })
    .catch(function (error) {
        let e = error.response.data
        console.log(error.response.data);
        reject(e);
    });
  });
}

function upload(user, image) {
  const bodyFormData = new FormData();
  bodyFormData.append('attachment', image);

  return axios.post(`${url}/uploads/users/${user.id}/profile-image`, bodyFormData)
    .then(response => {
      return response.data.url;
    });
}

export default {
  list,
  get,
  add,
  update,
  destroy,
  upload
};

