import BaseService from '../../baseService';
class TeacherService extends BaseService {
  constructor() {
    super('teacher');
  }

  add = teacherObj => {
    return this.axiosInstance.post('/create-teacher', teacherObj);
  };

  update = teacherObj => {
    return this.axiosInstance.put('/update-teacher/' + teacherObj._id, teacherObj);
  };
  
  findyById = (id) => {
    return this.axiosInstance.get('/edit-teacher/' + id);
  };

  findAllTeacher = () => {
    return this.axiosInstance.get('/');
  };

}

export default new TeacherService();
