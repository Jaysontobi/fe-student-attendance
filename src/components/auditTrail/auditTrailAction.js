import React, { useState, useEffect } from 'react';
import auditTrailService from '../auditTrail/auditTrailService';
import { Button} from 'antd';
import moment from 'moment';
const AuditTrailAction = (initial = { searchRequest: {} }) => {
  let [auditTrailDetails, setAuditTrailDetails] = useState( {list : []});

    const addAudit = async values => {
    let finalAudit = {
        user : values.user,
        activity: values.activity,
        date: values.date,
    }
    let response = auditTrailService.add(finalAudit)
    };
    
    const getListOfAudit = async () => {
      let response = await auditTrailService.findAllAudit();
      let newArray = response.data.map((user) => {
        return {
          key: user._id,
          id: user._id,
          name: user.user.firstName + " " + user.user.lastName,
          date: moment(user.date).format('MMMM Do YYYY'),
          activity: user.activity,
        }
      })
      setAuditTrailDetails({list: newArray})
    };

  useEffect(() => {
    getListOfAudit();
  }, []);


  return {
    addAudit,
    auditTrailDetails
  }
};

export default AuditTrailAction;