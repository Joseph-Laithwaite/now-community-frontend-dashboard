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

function list(params) {
  return axios.get(`${url}/independents` + params)
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
  console.log('In service.get id: ' + id)

  return axios.get(`${url}/independents/${id}`, options)
    .then(response => {
      let independent = response.data.data;
      delete independent.links;
      return independent;
    });
}

function add(independent) {
  const options = {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  
  };
  
  return new Promise((resolve, reject) => {
    axios.post(`${url}/independents`, independent, options)
      .then(response => {
        // console.log('CREATE NEW independent RESPONSE:')
        // console.log(response);
        resolve(response.data)
      }).catch(function (error) {
        // console.log(error);
        if(error.status==201){
          // console.log('CREATED NEW independent RESPONSE with 201:')
          // console.log(error);
          resolve(error.data);
        }else{
          // console.log(error.response.data);
          reject(error.response.data);
        }
      });
    })
}

function update(independent) {
  independent._method='PATCH';

  const options = {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  };

  return new Promise((resolve, reject) => {
    axios.post(`${url}/independents/${independent.id}`, independent, options)
      .then(response => {
        console.log("independent Service success response");
        resolve(response.data)
      }).catch(function (error) {
        let e = error.response.data
        console.log("independent Service error response");
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
    axios.post(`${url}/independents/${id}`, options)
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

function upload(params) {
  const config = {
    headers: {
    'content-type': 'multipart/form-data',
    // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
    }
  }
  const bodyFormData = new FormData();
  bodyFormData.append('image', params.image);
  bodyFormData.append('name', params.name);

  // return axios.post(`${url}/uploads/independents/${independent.id}/profile-image`, bodyFormData, config)
  return axios.post(`${url}/file-upload`, bodyFormData, config)
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

