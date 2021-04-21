import BaseService from '../../baseService';
class GradesService extends BaseService {
  constructor() {
    super('grades');
  }

  add = gradesObj => {
    return this.axiosInstance.post('/create-grades', gradesObj);
  };

  update = gradesObj => {
    return this.axiosInstance.put('/update-grades/' + gradesObj._id, gradesObj);
  };
  
  findyById = (id) => {
    return this.axiosInstance.get('/edit-grades/' + id);
  };

  findAllGrades = (level ='') => {
    return (level !== '') ? this.axiosInstance.get('/' + level) : this.axiosInstance.get('/');
  };

  addUpdateObservedValues = valuesObj => {
    return this.axiosInstance.post('/observed-values', valuesObj);
  };

}

export default new GradesService();
