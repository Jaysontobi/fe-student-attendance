import axios from 'axios';
class BaseService {
  constructor(moduleUrl) {
    this.URL = "http://localhost:4000" + "/" + moduleUrl;
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:4000" + "/" + moduleUrl
    })
    
    // this.axiosInstance.interceptors.request.use(function (config) {
    //   const token = sessionStorage.getItem('token');
    //   config.headers["x-authorization"] = token;
    //   return config;
    // });
  }

  edit = newObj => {
    return this.axiosInstance.put('', newObj);
  };

  add = newObj => {
    return this.axiosInstance.post('', newObj);
  };

  getById = id => {
    return this.axiosInstance.get('/' + id);
  };

  delete = crudId => {
    return this.axiosInstance.delete('/' + crudId);
  };
  softDelete = crudId => {
    return this.axiosInstance.delete('/soft-delete/' + crudId);
  };
}
export default BaseService;
