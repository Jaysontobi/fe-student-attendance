import React, { useState, useEffect } from 'react';
import userService from '../user/userService';
import AdditionalService from '../user/additionalService';
import advisoryService from '../grade/advisoryService';
import auditTrailService from '../auditTrail/auditTrailService';
import UserAction from '../user/userAction';

const TeacherAction = (initial = { searchRequest: {} }) => {
  let [selectedTeacher, setSelectedTeacher] = useState([]);
  let [selectedAdvisoryAssgined, setselectedAdvisoryAssgined] = useState({});
  let [selectedAdvisoryAssignedGrade1, setselectedAdvisoryAssignedGrade1] = useState([]);
  let [selectedAdvisoryAssignedGrade2, setselectedAdvisoryAssignedGrade2] = useState([]);
  let [selectedAdvisoryAssignedGrade3, setselectedAdvisoryAssignedGrade3] = useState([]);
  let [selectedAdvisoryAssignedGrade4, setselectedAdvisoryAssignedGrade4] = useState([]);
  let [selectedAdvisoryAssignedGrade5, setselectedAdvisoryAssignedGrade5] = useState([]);
  let [selectedAdvisoryAssignedGrade6, setselectedAdvisoryAssignedGrade6] = useState([]);
  let [selectedAdvisoryAssignedGrade7, setselectedAdvisoryAssignedGrade7] = useState([]);
  let [selectedAdvisoryAssignedGrade8, setselectedAdvisoryAssignedGrade8] = useState([]);
  let [selectedAdvisoryAssignedGrade9, setselectedAdvisoryAssignedGrade9] = useState([]);
  let [selectedAdvisoryAssignedGrade10, setselectedAdvisoryAssignedGrade10] = useState([]);
  let [showAdvisorVisible, setshowAdvisorVisible] = useState(false);
  let [studentAdvisor, setStudentAdvisor] = useState({});
  let [advisoryStudents, setAdvisoryStudents] = useState([]);
  let [availableAdvisors, setAvailableAdvisors] = useState([]);
  
  let {
    buildStudentList
  } = UserAction({});

  const addAdvisor = async (values, gradeLevel) => {
    let auditTrailObj = {
      user: JSON.parse(sessionStorage.user),
      activity : "Added Advisor",
      date:new Date()}
    let advisorTeacher = await userService.findyById(values.advisor)
    let finalAddValue = {
      gradeLevel: gradeLevel,
      teacher: advisorTeacher.data
    }
    try {
      let response = await advisoryService.add(finalAddValue);
      console.log(response);
       window.location.reload();
    } catch (error) {
      console.log(error);
    };
  };
  
  const getAvailableAdvisors = async () => {
    let advisors = await advisoryService.getAvailableAdvisors();
    setAvailableAdvisors(advisors.data);
  };

  const getListOfTeacher = async () => {
    let response = await userService.findAllUser();
    let result = response.data.filter(user => user.role === "Teacher");
    setSelectedTeacher(result);
  };

  const getListOfAssignedTeacherGrade1 = async () => {
    let response = await advisoryService.findAllAdvisory();
    let result = response.data.filter(user => user.gradeLevel === "1");
    setselectedAdvisoryAssignedGrade1(result[0])
  };

  const getListOfAssignedTeacherGrade2 = async () => {
    let response = await advisoryService.findAllAdvisory();
    let result = response.data.filter(user => user.gradeLevel === "2");
    setselectedAdvisoryAssignedGrade2(result[0])
  };

  const getListOfAssignedTeacherGrade3 = async () => {
    let response = await advisoryService.findAllAdvisory();
    let result = response.data.filter(user => user.gradeLevel === "3");
    setselectedAdvisoryAssignedGrade3(result[0])
  };

  const getListOfAssignedTeacherGrade4 = async () => {
    let response = await advisoryService.findAllAdvisory();
    let result = response.data.filter(user => user.gradeLevel === "4");
    setselectedAdvisoryAssignedGrade4(result[0])
  };

  const getListOfAssignedTeacherGrade5 = async () => {
    let response = await advisoryService.findAllAdvisory();
    let result = response.data.filter(user => user.gradeLevel === "5");
    setselectedAdvisoryAssignedGrade5(result[0])
  };

  const getListOfAssignedTeacherGrade6 = async () => {
    let response = await advisoryService.findAllAdvisory();
    let result = response.data.filter(user => user.gradeLevel === "6");
    setselectedAdvisoryAssignedGrade6(result[0])
  };

  const getListOfAssignedTeacherGrade7 = async () => {
    let response = await advisoryService.findAllAdvisory();
    let result = response.data.filter(user => user.gradeLevel === "7");
    setselectedAdvisoryAssignedGrade7(result[0])
  };

  const getListOfAssignedTeacherGrade8 = async () => {
    let response = await advisoryService.findAllAdvisory();
    let result = response.data.filter(user => user.gradeLevel === "8");
    setselectedAdvisoryAssignedGrade8(result[0])
  };

  const getListOfAssignedTeacherGrade9 = async () => {
    let response = await advisoryService.findAllAdvisory();
    let result = response.data.filter(user => user.gradeLevel === "9");
    setselectedAdvisoryAssignedGrade9(result[0])
  };

  const getListOfAssignedTeacherGrade10 = async () => {
    let response = await advisoryService.findAllAdvisory();
    let result = response.data.filter(user => user.gradeLevel === "10");
    setselectedAdvisoryAssignedGrade10(result[0])
  };

  const hideAdvisor = async () => {
    setshowAdvisorVisible(false)
  };

  const showAdvisor = async (gradeLevel) => {
    let response = await advisoryService.findAllAdvisory();
    let result = response.data.filter(user => user.gradeLevel === gradeLevel);
    if(result.length >= 1){
        setselectedAdvisoryAssgined(result[0].subjects)
    } else {
        setselectedAdvisoryAssgined({})
    }
    setshowAdvisorVisible(true)
  };

  const getStudentAdvisor = async () => {
    let response = await advisoryService.findAllAdvisory();
    let result = response.data.filter(user => user.gradeLevel === JSON.parse(sessionStorage.user).gradeLevel);
    setStudentAdvisor(result[0]);
  };
  
   const loadAdvisoryStudents = async () => {
     let user = JSON.parse(sessionStorage.user);
     const userData = {
       firstName: user.firstName,
       lastName: user.lastName,
       middleName: user.middleName
     };
     try {
       let advisory = await AdditionalService.getAdvisory(userData);
   
       if (!advisory) return;
     
       const students = await AdditionalService.getAdvisoryStudents(advisory.data.gradeLevel);
       let list = buildStudentList(students.data);
       await setAdvisoryStudents(list);
       console.log('YHVH is great', students.data);
       return list;
     } catch (error) {
       return [];
     };
    
  };
  
  const deleteAdvisory = async (id) => {
    let response = await advisoryService.deleteAdvisory(id);
    window.location.reload();
  };

  useEffect(() => {
    getStudentAdvisor();
    getListOfTeacher();
    getListOfAssignedTeacherGrade1();
    getListOfAssignedTeacherGrade2();
    getListOfAssignedTeacherGrade3();
    getListOfAssignedTeacherGrade4();
    getListOfAssignedTeacherGrade5();
    getListOfAssignedTeacherGrade6();
    getListOfAssignedTeacherGrade7();
    getListOfAssignedTeacherGrade8();
    getListOfAssignedTeacherGrade9();
    getListOfAssignedTeacherGrade10();
    loadAdvisoryStudents();
    getAvailableAdvisors();
  }, []);


  return {
    showAdvisorVisible,
    hideAdvisor,
    showAdvisor,
    addAdvisor,
    selectedAdvisoryAssignedGrade1,
    selectedAdvisoryAssignedGrade2,
    selectedAdvisoryAssignedGrade3,
    selectedAdvisoryAssignedGrade4,
    selectedAdvisoryAssignedGrade5,
    selectedAdvisoryAssignedGrade6,
    selectedAdvisoryAssignedGrade7,
    selectedAdvisoryAssignedGrade8,
    selectedAdvisoryAssignedGrade9,
    selectedAdvisoryAssignedGrade10,
    selectedAdvisoryAssgined,
    studentAdvisor,
    advisoryStudents,
    loadAdvisoryStudents,
    availableAdvisors,
    deleteAdvisory
  }
};

export default TeacherAction;
