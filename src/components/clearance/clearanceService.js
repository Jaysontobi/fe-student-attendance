import BaseService from '../../baseService';
class ClearanceService extends BaseService {
  constructor() {
    super('clearance');
  };

  addUpdateClearance = obj => {
    return this.axiosInstance.post('/save', obj);
  };

  getClearance = level => {
    return this.axiosInstance.get('/level/' + level);
  };
}

export default new ClearanceService();
