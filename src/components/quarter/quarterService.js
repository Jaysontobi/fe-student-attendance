import BaseService from '../../baseService';
class TimeKeepingService extends BaseService {
  constructor() {
    super('quarter');
  }

  add = quarterObj => {
    return this.axiosInstance.post('/create-quarter', quarterObj);
  };

  update = quarterObj => {
    return this.axiosInstance.put('/update-quarter/' + quarterObj._id, quarterObj);
  };

  findAllQuarter = () => {
    return this.axiosInstance.get('/');
  };

  findyById = (id) => {
    return this.axiosInstance.get('/edit-quarter/' + id);
  };

}

export default new TimeKeepingService();
