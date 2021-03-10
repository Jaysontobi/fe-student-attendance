import BaseService from '../../baseService';
class TimeKeepingService extends BaseService {
  constructor() {
    super('timekeeping');
  }

  add = timekeepingObj => {
    return this.axiosInstance.post('/create-timekeeping', timekeepingObj);
  };

  update = timekeepingObj => {
    return this.axiosInstance.put('/update-timekeeping/' + timekeepingObj._id, timekeepingObj);
  };

  findAllTimekeeping = () => {
    return this.axiosInstance.get('/');
  };

  findyById = (id) => {
    return this.axiosInstance.get('/edit-timekeeping/' + id);
  };

}

export default new TimeKeepingService();
