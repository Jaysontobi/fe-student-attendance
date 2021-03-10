import BaseService from '../../baseService';
class AuditTrailService extends BaseService {
  constructor() {
    super('auditTrail');
  }

  add = auditTrailObj => {
    return this.axiosInstance.post('/create-autditrail', auditTrailObj);
  };

  update = auditTrailObj => {
    return this.axiosInstance.put('/update-autditrail/' + auditTrailObj._id, auditTrailObj);
  };

  findAllAudit = () => {
    return this.axiosInstance.get('/');
  };

  findyById = (id) => {
    return this.axiosInstance.get('/edit-autditrail/' + id);
  };

}

export default new AuditTrailService();
