import React, { useState, useEffect } from 'react';
import userService from '../user/userService';
const UserAction = (initial = { searchRequest: {} }) => {
  let [userDetails, setUserDetails] = useState( 
      {numberOfStudents : 0, 
      numberOfTeachers: 0,
      numberOfParents : 0}
      );

  const getListOfUsers = async () => {
    let response = await userService.findAllUser();
    let parent = response.data.filter(user => user.role === "Parent");
    let student = response.data.filter(user => user.role === "Student");
    let teacher = response.data.filter(user => user.role === "Teacher");
    setUserDetails({
        numberOfParents: parent.length,
        numberOfStudents : student.length, 
        numberOfTeachers: teacher.length
    })
  };

  useEffect(() => {
    getListOfUsers();
  }, []);


  return {
    userDetails
  }
};

export default UserAction;