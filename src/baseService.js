import axios from 'axios';
import { ENVIRONMENT, LOCAL_BE, PRODUCTION_BE } from './config';
class BaseService {
  constructor(moduleUrl) {
    this.URL = (ENVIRONMENT === 'PRODUCTION') ?
      PRODUCTION_BE + "/" + moduleUrl :
      LOCAL_BE + "/" + moduleUrl;
    this.axiosInstance = axios.create({
      baseURL: (ENVIRONMENT === 'PRODUCTION') ?
        PRODUCTION_BE + "/" + moduleUrl :
        LOCAL_BE + "/" + moduleUrl
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
