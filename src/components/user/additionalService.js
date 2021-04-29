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

  getAdvisoryStudents = level => {
    return this.axiosInstance.get('/advisory-students/' + level);
  };

  uploadProfile = file => {
    return this.axiosInstance.post('/upload-profile', file);
  };

}

export default new AdditionalService();
