import BaseService from '../../baseService';
class UserService extends BaseService {
  constructor() {
    super('user');
  }

  add = userObj => {
    return this.axiosInstance.post('/create-user', userObj);
  };

  update = userObj => {
    return this.axiosInstance.put('/update-user/' + userObj._id, userObj);
  };

  findAllUser = () => {
    return this.axiosInstance.get('/');
  };

  findyById = (id) => {
    return this.axiosInstance.get('/edit-user/' + id);
  };

  getGenIdNumber = (role) => {
     return this.axiosInstance.get('/generate-user-id/' + role);
  };
}

export default new UserService();
