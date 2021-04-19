import BaseService from '../../baseService';
class AttendanceService extends BaseService {
  constructor() {
    super('attendance');
  }

  getAttendance = id => {
    return this.axiosInstance.get('/' + id);
  };

  getSchooldays = () => {
    return this.axiosInstance.get('/');
  };

  saveSchoolDays = obj => {
    return this.axiosInstance.post('/attendance-table-days', obj)
  };
}

export default new AttendanceService();
