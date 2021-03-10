import React, { useState, useEffect } from 'react';
import TimekeepingService from './timeKeepingService';
import moment from 'moment';
const UserAction = (initial = { searchRequest: {} }) => {
  let [userDetails, setUserDetails] = useState( {list : [], credentials: []});
  let [timeIn, setTimeIn] = useState(new Date());
  let [timeOut, setTimeOut] = useState(new Date())

  const filterUsers = async (date) => {
    if(date){
      let response = await TimekeepingService.findAllTimekeeping();
      let result = await response.data.filter(user =>moment(user.timeIn).format('MMMM Do YYYY') === moment(date).format('MMMM Do YYYY'));
      let newArray = await result.map((user) => {
        return {
          key: user._id,
          id: user._id,
          name: user.student.firstName + " " + user.student.lastName,
          idNumber: user.student.idNumber,
          timeIn: moment(user.timeIn).format('MMMM Do YYYY, h:mm:ss a'),
          timeOut: moment(user.timeOut).format('MMMM Do YYYY, h:mm:ss a'),
      }
      })
      setUserDetails({list: newArray});
    } else {
      let response = await TimekeepingService.findAllTimekeeping();
      let newArray = await response.data.map((user) => {
        return {
          key: user._id,
          id: user._id,
          name: user.student.firstName + " " + user.student.lastName,
          idNumber: user.student.idNumber,
          timeIn: moment(user.timeIn).format('MMMM Do YYYY, h:mm:ss a'),
          timeOut: moment(user.timeOut).format('MMMM Do YYYY, h:mm:ss a'),
      }
      })
      setUserDetails({list: newArray});
    } 

  }

const loadUsers = async () => {
    let response = await TimekeepingService.findAllTimekeeping();
    let newArray = response.data.map((user) => {
      return {
        key: user._id,
        id: user._id,
        name: user.student.firstName + " " + user.student.lastName,
        idNumber: user.student.idNumber,
        timeIn: moment(user.timeIn).format('MMMM Do YYYY, h:mm:ss a'),
        timeOut: moment(user.timeOut).format('MMMM Do YYYY, h:mm:ss a'),
    }
    })
    setUserDetails({list: newArray});
  }

  useEffect(() => {
    loadUsers();
}, []);


  return {
    userDetails,
    filterUsers
  }
};

export default UserAction;