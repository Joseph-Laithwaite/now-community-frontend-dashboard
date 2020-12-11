import axios from 'axios';

axios.interceptors.response.use(function (response) {
  if (response.statusText !== 'OK') {
      return Promise.reject(response);
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

const url = process.env.VUE_APP_API_BASE_URL;

function list(params="") {
  return axios.get(`${url}/brands` + params)
    .then(response => {
      return {
        list: response.data.data,
        pagination: {
          current_page: response.data.data.current_page,
          first_page_url: response.data.data.first_page_url,
          from: response.data.data.from,
          last_page: response.data.data.last_page,
          last_page_url: response.data.data.last_page_url,
          next_page_url: response.data.data.next_page_url,
          path: response.data.data.path,
          per_page: parseInt(response.data.data.per_page),
          prev_page_url: response.data.data.prev_page_url,
          to: response.data.data.to,
          total: response.data.data.total
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

  return axios.get(`${url}/brands/${id}`, options)
    .then(response => {
      let brand = response.data;
      delete brand.links;
      return brand;
    });
}

function add(brand) {
  const options = {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  
  };
  
  return new Promise((resolve, reject) => {
    axios.post(`${url}/brands`, brand, options)
      .then(response => {
        // console.log('CREATE NEW PRODUCT RESPONSE:')
        // console.log(response);
        resolve(response.data)
      }).catch(function (error) {
        // console.log(error);
        if(error.status==201){
          // console.log('CREATED NEW PRODUCT RESPONSE with 201:')
          // console.log(error);
          resolve(error.data);
        }else{
          // console.log(error.response.data);
          reject(error.response.data);
        }
      });
    })
}

function update(brand) {
  brand._method='PATCH';

  const options = {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  };

  return new Promise((resolve, reject) => {
    axios.post(`${url}/brands/${brand.id}`, brand, options)
      .then(response => {
        console.log("brand Service success response");
        resolve(response.data)
      }).catch(function (error) {
        let e = error.response.data
        console.log("brand Service error response");
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
    axios.post(`${url}/brands/${id}`, options)
    .then(response => {
        // console.log(response);
        resolve(response.data)
    })
    .catch(function (error) {
        let e = error.response.data
        // console.log(error.response.data);
        reject(e);
    });
  });
}

function upload(brand, image) {
  const bodyFormData = new FormData();
  bodyFormData.append('attachment', image);

  return axios.post(`${url}/uploads/brands/${brand.id}/profile-image`, bodyFormData)
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

