import React, { useState, useEffect } from 'react';
import userService from '../user/userService';
import teacherService from '../grade/teacherService';
const TeacherAction = (initial = { searchRequest: {} }) => {
  let [selectedTeacher, setSelectedTeacher] = useState([]);
  let [selectedTeacherAssgined, setSelectedTeacherAssgined] = useState({});
  let [selectedTeacherAssignedGrade1, setSelectedTeacherAssignedGrade1] = useState([]);
  let [selectedTeacherAssignedGrade2, setSelectedTeacherAssignedGrade2] = useState([]);
  let [selectedTeacherAssignedGrade3, setSelectedTeacherAssignedGrade3] = useState([]);
  let [selectedTeacherAssignedGrade4, setSelectedTeacherAssignedGrade4] = useState([]);
  let [selectedTeacherAssignedGrade5, setSelectedTeacherAssignedGrade5] = useState([]);
  let [selectedTeacherAssignedGrade6, setSelectedTeacherAssignedGrade6] = useState([]);
  let [selectedTeacherAssignedGrade7, setSelectedTeacherAssignedGrade7] = useState([]);
  let [selectedTeacherAssignedGrade8, setSelectedTeacherAssignedGrade8] = useState([]);
  let [selectedTeacherAssignedGrade9, setSelectedTeacherAssignedGrade9] = useState([]);
  let [selectedTeacherAssignedGrade10, setSelectedTeacherAssignedGrade10] = useState([]);
  let [showTeacherVisible, setShowTeacherVisible] = useState(false);

  const add = async (values, gradeLevel) => {
    let English = await userService.findyById(values.english)
    let Filipino = await userService.findyById(values.filipino)
    let Science = await userService.findyById(values.science)
    let Math = await userService.findyById(values.math)
    let Values = await userService.findyById(values.values)
    let Mapeh = await userService.findyById(values.mapeh)
    let finalAddValue = {
        gradeLevel : gradeLevel,
        subjects: [{
            subjectName: "English",
            teacher: English.data
            },
            {
            subjectName: "Filipino",
            teacher: Filipino.data
            },
            {
            subjectName: "Science",
            teacher: Science.data
            },   
            {
            subjectName: "Math",
            teacher: Math.data
            },   
            {
            subjectName: "Values",
            teacher: Values.data
            },     
            {
            subjectName: "Mapeh",
            teacher: Mapeh.data
            },                                                    
        ]
    }
    let response = teacherService.add(finalAddValue)
    window.location.reload()
  };

  const getListOfTeacher = async () => {
    let response = await userService.findAllUser();
    let result = response.data.filter(user => user.role === "Teacher");
    setSelectedTeacher(result)
  };

  const getListOfAssignedTeacherGrade1 = async () => {
    let response = await teacherService.findAllTeacher();
    let result = response.data.filter(user => user.gradeLevel === "1");
    setSelectedTeacherAssignedGrade1(result[0])
  };

  const getListOfAssignedTeacherGrade2 = async () => {
    let response = await teacherService.findAllTeacher();
    let result = response.data.filter(user => user.gradeLevel === "2");
    setSelectedTeacherAssignedGrade2(result[0])
  };

  const getListOfAssignedTeacherGrade3 = async () => {
    let response = await teacherService.findAllTeacher();
    let result = response.data.filter(user => user.gradeLevel === "3");
    setSelectedTeacherAssignedGrade3(result[0])
  };

  const getListOfAssignedTeacherGrade4 = async () => {
    let response = await teacherService.findAllTeacher();
    let result = response.data.filter(user => user.gradeLevel === "4");
    setSelectedTeacherAssignedGrade4(result[0])
  };

  const getListOfAssignedTeacherGrade5 = async () => {
    let response = await teacherService.findAllTeacher();
    let result = response.data.filter(user => user.gradeLevel === "5");
    setSelectedTeacherAssignedGrade5(result[0])
  };

  const getListOfAssignedTeacherGrade6 = async () => {
    let response = await teacherService.findAllTeacher();
    let result = response.data.filter(user => user.gradeLevel === "6");
    setSelectedTeacherAssignedGrade6(result[0])
  };

  const getListOfAssignedTeacherGrade7 = async () => {
    let response = await teacherService.findAllTeacher();
    let result = response.data.filter(user => user.gradeLevel === "7");
    setSelectedTeacherAssignedGrade7(result[0])
  };

  const getListOfAssignedTeacherGrade8 = async () => {
    let response = await teacherService.findAllTeacher();
    let result = response.data.filter(user => user.gradeLevel === "8");
    setSelectedTeacherAssignedGrade8(result[0])
  };

  const getListOfAssignedTeacherGrade9 = async () => {
    let response = await teacherService.findAllTeacher();
    let result = response.data.filter(user => user.gradeLevel === "9");
    setSelectedTeacherAssignedGrade9(result[0])
  };

  const getListOfAssignedTeacherGrade10 = async () => {
    let response = await teacherService.findAllTeacher();
    let result = response.data.filter(user => user.gradeLevel === "10");
    setSelectedTeacherAssignedGrade10(result[0])
  };

  const hideTeacher = async () => {
    setShowTeacherVisible(false)
  };

  const showTeacher = async (gradeLevel) => {
    let response = await teacherService.findAllTeacher();
    let result = response.data.filter(user => user.gradeLevel === gradeLevel);
    if(result.length >= 1){
        setSelectedTeacherAssgined(result[0].subjects)
    } else {
        setSelectedTeacherAssgined({})
    }
    setShowTeacherVisible(true)
  };

  useEffect(() => {
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
  }, []);


  return {
    selectedTeacher,
    showTeacherVisible,
    hideTeacher,
    showTeacher,
    add,
    selectedTeacherAssignedGrade1,
    selectedTeacherAssignedGrade2,
    selectedTeacherAssignedGrade3,
    selectedTeacherAssignedGrade4,
    selectedTeacherAssignedGrade5,
    selectedTeacherAssignedGrade6,
    selectedTeacherAssignedGrade7,
    selectedTeacherAssignedGrade8,
    selectedTeacherAssignedGrade9,
    selectedTeacherAssignedGrade10,
    selectedTeacherAssgined
  }
};

export default TeacherAction;
