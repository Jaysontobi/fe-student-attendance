import BaseService from '../../baseService';
class AdvisoryService extends BaseService {
  constructor() {
    super('advisory');
  }

  add = advisoryObj => {
    return this.axiosInstance.post('/create-advisory', advisoryObj);
  };

  update = advisoryObj => {
    return this.axiosInstance.put('/update-advisory/' + advisoryObj._id, advisoryObj);
  };
  
  findyById = (id) => {
    return this.axiosInstance.get('/edit-advisory/' + id);
  };

  findAllAdvisory = () => {
    return this.axiosInstance.get('/');
  };

  getAvailableAdvisors = () => {
    return this.axiosInstance.get('/available-advisors');
  };
}

export default new AdvisoryService();
