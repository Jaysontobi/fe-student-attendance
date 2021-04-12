import BaseService from '../../baseService';
class AdditionalService extends BaseService {
  constructor() {
    super('');
  };

  getGenIdNumber = role => {
     return this.axiosInstance.get('/generate-user-id/' + role);
  };

  getAdvisory = teacher => {
    return this.axiosInstance.post('/teacher-advisory', teacher);
  };

}

export default new AdditionalService();
