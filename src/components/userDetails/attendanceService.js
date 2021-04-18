import BaseService from '../../baseService';
class AttendanceService extends BaseService {
  constructor() {
    super('attendance');
  }

  getAttendance = id => {
    return this.axiosInstance.get('/' + id);
  };
}

export default new AttendanceService();
