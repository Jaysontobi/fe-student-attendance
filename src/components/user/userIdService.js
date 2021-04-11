import BaseService from '../../baseService';
class UserIdService extends BaseService {
  constructor() {
    super('');
  };

  getGenIdNumber = (role) => {
     return this.axiosInstance.get('/generate-user-id/' + role);
  };
}

export default new UserIdService();
