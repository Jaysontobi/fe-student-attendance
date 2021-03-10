import React, { useState, useEffect } from 'react';
import gradesService from './gradesService';
import userService from '../user/userService';
import advisoryService from '../grade/advisoryService';
import auditTrailService from '../auditTrail/auditTrailService';
import { Button} from 'antd';
import moment from 'moment';
const Grade1Action = (initial = { searchRequest: {} }) => {
  let [studentAdvisor, setStudentAdvisor] = useState({});
  let [selectedUserGrade, setSelectedUserGrade] = useState([]);
  let [loading, setLoading] = useState(false);
  let [selectedGradeUser, setSelectedGradeUser] = useState([]);
  let [gradeDetails, setGradeDetails] = useState( {list : []});
  let [grade1Details, setGrade1Details] = useState( {list : []});
  let [grade2Details, setGrade2Details] = useState( {list : []});
  let [grade3Details, setGrade3Details] = useState( {list : []});
  let [grade4Details, setGrade4Details] = useState( {list : []});
  let [grade5Details, setGrade5Details] = useState( {list : []});
  let [grade6Details, setGrade6Details] = useState( {list : []});
  let [grade7Details, setGrade7Details] = useState( {list : []});
  let [grade8Details, setGrade8Details] = useState( {list : []});
  let [grade9Details, setGrade9Details] = useState( {list : []});
  let [grade10Details, setGrade10Details] = useState( {list : []});

  let [showGradeVisible, setShowGradeVisible] = useState(false);
  let [selectedGrade, setSelectedGrade] = useState({});
  let [selectedTeacher, setSelectedTeacher] = useState([]);
  let [showAllGradeVisible, setShowAllGradeVisible] = useState(false);
  let [selectedUser, setSelectedUser] = useState({});

  let [selectedListOfStudent, setSelectedListOfStudent] = useState([]);

  const upgradeStudent = async values => {
    let auditTrailObj = {
    user: JSON.parse(sessionStorage.user),
    activity : "Upgrade Student",
    date:new Date()}
    auditTrailService.add(auditTrailObj)
    let ctr = 0;
    await selectedListOfStudent.map(async student => {
    setLoading(true)
    let result = await gradesService.findyById(student.id);

    let userCurrentGrade = (parseInt(result.data.gradeLevel))


    if(userCurrentGrade < 10) {
      let currentUser = result.data
      let allStudent = await userService.findAllUser();
      let result1 = allStudent.data.filter(user => user.idNumber === student.idNumber);
      let currentStudent = result1[0]
      currentStudent.gradeLevel = (userCurrentGrade + 1).toString()
      let response = await userService.update(currentStudent)

      currentUser.status = false;
      let response1 = await gradesService.update(currentUser)

      let gradeObj = {
        status: true,
        student: currentUser.student,
        gradeLevel: (userCurrentGrade + 1).toString(),
        section: currentUser.student.section,
        schoolYear : currentStudent.schoolYear,
        subjects: [{
            subjectName: "English",
            subjectGrade: {
              firstQuarter: 0,
              secondQuarter: 0,
              thirdQuarter: 0,
              fourthQuarter: 0
          }
        },
        {
          schoolYear : currentUser.schoolYear,
            subjectName: "Filipino",
            subjectGrade: {
              firstQuarter: 0,
              secondQuarter: 0,
              thirdQuarter: 0,
              fourthQuarter: 0
          }
        },
        {
          schoolYear : currentUser.schoolYear,
            subjectName: "Science",
              subjectGrade: {
              firstQuarter: 0,
              secondQuarter: 0,
              thirdQuarter: 0,
              fourthQuarter: 0
          }
        },
        {
          schoolYear : currentUser.schoolYear,
            subjectName: "Math",
              subjectGrade: {
              firstQuarter: 0,
              secondQuarter: 0,
              thirdQuarter: 0,
              fourthQuarter: 0
          }
        },
        {
          schoolYear : currentUser.schoolYear,
            subjectName: "MAPEH",
              subjectGrade: {
              firstQuarter: 0,
              secondQuarter: 0,
              thirdQuarter: 0,
              fourthQuarter: 0
          }
        },
        {
          schoolYear : currentUser.schoolYear,
            subjectName: "Values",
              subjectGrade: {
              firstQuarter: 0,
              secondQuarter: 0,
              thirdQuarter: 0,
              fourthQuarter: 0
          }
        }]
    }

    let response2 = gradesService.add(gradeObj)
  

    } else {
      let currentUser = result.data
      let allStudent = await userService.findAllUser();
      let result1 = allStudent.data.filter(user => user.idNumber === student.idNumber);
      let currentStudent = result1[0]
      currentStudent.gradeLevel = "Graduate"
      let response = await userService.update(currentStudent)

      currentUser.status = false;
      let response1 = await gradesService.update(currentUser)
    }
    ctr= ctr+1
    if(ctr === selectedListOfStudent.length) {
      setLoading(false)
      window.location.reload(false)
    }
    })

  };

  const editGrade = async values => {
    let result = await gradesService.findyById(values._id);
    let grade = result.data

    if(values.English) {
      let firstQuarter = 0;
      let secondQuarter = 0;
      let thirdQuarter = 0;
      let fourthQuarter = 0;

      if(values.English.firstQuarter) {
        firstQuarter = values.English.firstQuarter
      } else {
        firstQuarter = grade.subjects[0].subjectGrade.firstQuarter
      }

      if(values.English.secondQuarter) {
        secondQuarter = values.English.secondQuarter
      } else {
        secondQuarter = grade.subjects[0].subjectGrade.secondQuarter
      }

      if(values.English.thirdQuarter) {
        thirdQuarter = values.English.thirdQuarter
      } else {
        thirdQuarter = grade.subjects[0].subjectGrade.thirdQuarter
      }

      if(values.English.fourthQuarter) {
        fourthQuarter = values.English.fourthQuarter
      } else {
        fourthQuarter = grade.subjects[0].subjectGrade.fourthQuarter
      }      

      let newEnglishGrade = {
        firstQuarter: firstQuarter,
        secondQuarter:secondQuarter,
        thirdQuarter:thirdQuarter,
        fourthQuarter:fourthQuarter
      }
      grade.subjects[0].subjectGrade = newEnglishGrade;
    }    

    if(values.Filipino) {
      let firstQuarter = 0;
      let secondQuarter = 0;
      let thirdQuarter = 0;
      let fourthQuarter = 0;

      if(values.Filipino.firstQuarter) {
        firstQuarter = values.Filipino.firstQuarter
      } else {
        firstQuarter = grade.subjects[1].subjectGrade.firstQuarter
      }

      if(values.Filipino.secondQuarter) {
        secondQuarter = values.Filipino.secondQuarter
      } else {
        secondQuarter = grade.subjects[1].subjectGrade.secondQuarter
      }

      if(values.Filipino.thirdQuarter) {
        thirdQuarter = values.Filipino.thirdQuarter
      } else {
        thirdQuarter = grade.subjects[1].subjectGrade.thirdQuarter
      }

      if(values.Filipino.fourthQuarter) {
        fourthQuarter = values.Filipino.fourthQuarter
      } else {
        fourthQuarter = grade.subjects[1].subjectGrade.fourthQuarter
      }      

      let newFilipinoGrade = {
        firstQuarter: firstQuarter,
        secondQuarter:secondQuarter,
        thirdQuarter:thirdQuarter,
        fourthQuarter:fourthQuarter
      }
      grade.subjects[1].subjectGrade = newFilipinoGrade;
    }

    if(values.Science) {
      let firstQuarter = 0;
      let secondQuarter = 0;
      let thirdQuarter = 0;
      let fourthQuarter = 0;

      if(values.Science.firstQuarter) {
        firstQuarter = values.Science.firstQuarter
      } else {
        firstQuarter = grade.subjects[2].subjectGrade.firstQuarter
      }

      if(values.Science.secondQuarter) {
        secondQuarter = values.Science.secondQuarter
      } else {
        secondQuarter = grade.subjects[2].subjectGrade.secondQuarter
      }

      if(values.Science.thirdQuarter) {
        thirdQuarter = values.Science.thirdQuarter
      } else {
        thirdQuarter = grade.subjects[2].subjectGrade.thirdQuarter
      }

      if(values.Science.fourthQuarter) {
        fourthQuarter = values.Science.fourthQuarter
      } else {
        fourthQuarter = grade.subjects[2].subjectGrade.fourthQuarter
      }      

      let newScienceGrade = {
        firstQuarter: firstQuarter,
        secondQuarter:secondQuarter,
        thirdQuarter:thirdQuarter,
        fourthQuarter:fourthQuarter
      }
      grade.subjects[2].subjectGrade = newScienceGrade;
    }

    if(values.Math) {
      let firstQuarter = 0;
      let secondQuarter = 0;
      let thirdQuarter = 0;
      let fourthQuarter = 0;

      if(values.Math.firstQuarter) {
        firstQuarter = values.Math.firstQuarter
      } else {
        firstQuarter = grade.Math[3].subjectGrade.firstQuarter
      }

      if(values.Math.secondQuarter) {
        secondQuarter = values.Math.secondQuarter
      } else {
        secondQuarter = grade.subjects[3].subjectGrade.secondQuarter
      }

      if(values.Math.thirdQuarter) {
        thirdQuarter = values.Math.thirdQuarter
      } else {
        thirdQuarter = grade.subjects[3].subjectGrade.thirdQuarter
      }

      if(values.Math.fourthQuarter) {
        fourthQuarter = values.Math.fourthQuarter
      } else {
        fourthQuarter = grade.subjects[3].subjectGrade.fourthQuarter
      }      

      let newMathGrade = {
        firstQuarter: firstQuarter,
        secondQuarter:secondQuarter,
        thirdQuarter:thirdQuarter,
        fourthQuarter:fourthQuarter
      }
      grade.subjects[3].subjectGrade = newMathGrade;
    }

    if(values.MAPEH) {
      let firstQuarter = 0;
      let secondQuarter = 0;
      let thirdQuarter = 0;
      let fourthQuarter = 0;

      if(values.MAPEH.firstQuarter) {
        firstQuarter = values.MAPEH.firstQuarter
      } else {
        firstQuarter = grade.subjects[4].subjectGrade.firstQuarter
      }

      if(values.MAPEH.secondQuarter) {
        secondQuarter = values.MAPEH.secondQuarter
      } else {
        secondQuarter = grade.subjects[4].subjectGrade.secondQuarter
      }

      if(values.MAPEH.thirdQuarter) {
        thirdQuarter = values.MAPEH.thirdQuarter
      } else {
        thirdQuarter = grade.subjects[4].subjectGrade.thirdQuarter
      }

      if(values.MAPEH.fourthQuarter) {
        fourthQuarter = values.MAPEH.fourthQuarter
      } else {
        fourthQuarter = grade.subjects[4].subjectGrade.fourthQuarter
      }      

      let newMAPEHGrade = {
        firstQuarter: firstQuarter,
        secondQuarter:secondQuarter,
        thirdQuarter:thirdQuarter,
        fourthQuarter:fourthQuarter
      }
      grade.subjects[4].subjectGrade = newMAPEHGrade;
    }

    if(values.Values) {
      let firstQuarter = 0;
      let secondQuarter = 0;
      let thirdQuarter = 0;
      let fourthQuarter = 0;

      if(values.Values.firstQuarter) {
        firstQuarter = values.Values.firstQuarter
      } else {
        firstQuarter = grade.subjects[5].subjectGrade.firstQuarter
      }

      if(values.Values.secondQuarter) {
        secondQuarter = values.Values.secondQuarter
      } else {
        secondQuarter = grade.subjects[5].subjectGrade.secondQuarter
      }

      if(values.Values.thirdQuarter) {
        thirdQuarter = values.Values.thirdQuarter
      } else {
        thirdQuarter = grade.subjects[5].subjectGrade.thirdQuarter
      }

      if(values.Values.fourthQuarter) {
        fourthQuarter = values.Values.fourthQuarter
      } else {
        fourthQuarter = grade.subjects[5].subjectGrade.fourthQuarter
      }      

      let newValuesGrade = {
        firstQuarter: firstQuarter,
        secondQuarter:secondQuarter,
        thirdQuarter:thirdQuarter,
        fourthQuarter:fourthQuarter
      }
      grade.subjects[5].subjectGrade = newValuesGrade;
    }



    let updateResult = await gradesService.update(grade);
    window.location.reload();
  };

  const showGrade = () => {
    setSelectedGrade({
        schoolYear: "",
        subjects: {},
        grade: "",
        student: {},
        gradeLevel: "",
        section: "",
      })
    setShowGradeVisible(true)
  };

  const loadGrade = (gradeObj, idNumber) => {
    getCurrentGradeUser(idNumber)
    setSelectedGrade({...gradeObj});
    setShowGradeVisible(true);
  };

  const loadSelectedGrade = async (gradeId) => {
    let response = await gradesService.findyById(gradeId);
    setSelectedGrade({...response.data});
    setShowGradeVisible(true);
  };

  const getListOfTeacher = async () => {
    let response = await userService.findAllUser();
    let result = response.data.filter(user => user.role === "Teacher");
    setSelectedTeacher(result)
  };

  const filterCurrentGradeUser = async (gradeLevel) => {
    setLoading(true)
    let response = await gradesService.findAllGrades();
    let result = [];
    result = response.data.filter(user => user.student.idNumber === JSON.parse(sessionStorage.user).idNumber && user.gradeLevel === gradeLevel)
    if(result.length >=1 && result[0].subjects && result[0].subjects.length >= 1) {
      let newArray = result[0].subjects.map((subject) => {
        let remarks = "";
        if((subject.subjectGrade.firstQuarter + subject.subjectGrade.secondQuarter + subject.subjectGrade.thirdQuarter + subject.subjectGrade.fourthQuarter)/4 >=75){
          remarks = "Passed"
        } else {
          remarks = "Failed"
        }
        return {
          key: subject._id,
          id: subject._id,
          subject: subject.subjectName,
          Quarter1st: subject.subjectGrade.firstQuarter,
          Quarter2nd: subject.subjectGrade.secondQuarter,
          Quarter3rd: subject.subjectGrade.thirdQuarter,
          Quarter4th: subject.subjectGrade.fourthQuarter,
          FinalGrade: (subject.subjectGrade.firstQuarter + subject.subjectGrade.secondQuarter + subject.subjectGrade.thirdQuarter + subject.subjectGrade.fourthQuarter)/4,
          Remarks : remarks
        }
      })
      
      let response = await advisoryService.findAllAdvisory()
      let result1=[];
      result1 = response.data.filter(user => user.gradeLevel === gradeLevel);
    
      setSelectedUser(result[0].student)
      setStudentAdvisor(result1[0]);
      setSelectedUserGrade(newArray);
   
    } else {
      setSelectedUser({})
      setSelectedUserGrade([])
    }
    setLoading(false)
  }

  const currentGradeUser = async () => {
    let response = await gradesService.findAllGrades();
    let result = [];
    if(JSON.parse(sessionStorage.user).gradeLevel === "Graduate") {
      result = response.data.filter(user => user.student.idNumber === JSON.parse(sessionStorage.user).idNumber && user.student.gradeLevel === "1")
    } else {
      result = response.data.filter(user => user.student.idNumber === JSON.parse(sessionStorage.user).idNumber && user.student.gradeLevel === JSON.parse(sessionStorage.user).gradeLevel)
    }
    if(result.length >=1 && result[0].subjects && result[0].subjects.length >= 1) {
      setSelectedUser(result[0].student)
      let newArray = result[0].subjects.map((subject) => {
        let remarks = "";
        if((subject.subjectGrade.firstQuarter + subject.subjectGrade.secondQuarter + subject.subjectGrade.thirdQuarter + subject.subjectGrade.fourthQuarter)/4 >=75){
          remarks = "Passed"
        } else {
          remarks = "Failed"
        }
        return {
          key: subject._id,
          id: subject._id,
          subject: subject.subjectName,
          Quarter1st: subject.subjectGrade.firstQuarter,
          Quarter2nd: subject.subjectGrade.secondQuarter,
          Quarter3rd: subject.subjectGrade.thirdQuarter,
          Quarter4th: subject.subjectGrade.fourthQuarter,
          FinalGrade: (subject.subjectGrade.firstQuarter + subject.subjectGrade.secondQuarter + subject.subjectGrade.thirdQuarter + subject.subjectGrade.fourthQuarter)/4,
          Remarks : remarks
        }
      })
      
      let response = await advisoryService.findAllAdvisory()
      let result1=[];
      if(JSON.parse(sessionStorage.user).gradeLevel === "Graduate") {
        result1 = response.data.filter(user => user.gradeLevel === "1");
      } else {
        result1 = response.data.filter(user => user.gradeLevel === JSON.parse(sessionStorage.user).gradeLevel);
      }
      setStudentAdvisor(result1[0]);
      setSelectedUserGrade(newArray);
   
    } else {
      setSelectedUser({})
      setSelectedUserGrade([])
    }

  }

  const getCurrentGradeUser = async (idNumber) => {
    let response = await gradesService.findAllGrades();
    let result = response.data.filter(user => user.student.idNumber === idNumber)
    if(result.length >=1 && result[0].subjects && result[0].subjects.length >= 1) {
      setSelectedUser(result[0].student)
      let newArray = result[0].subjects.map((subject) => {
        let remarks = "";
        if((subject.subjectGrade.firstQuarter + subject.subjectGrade.secondQuarter + subject.subjectGrade.thirdQuarter + subject.subjectGrade.fourthQuarter)/4 >=75){
          remarks = "Passed"
        } else {
          remarks = "Failed"
        }
        return {
          key: subject._id,
          id: subject._id,
          subject: subject.subjectName,
          Quarter1st: subject.subjectGrade.firstQuarter,
          Quarter2nd: subject.subjectGrade.secondQuarter,
          Quarter3rd: subject.subjectGrade.thirdQuarter,
          Quarter4th: subject.subjectGrade.fourthQuarter,
          FinalGrade: (subject.subjectGrade.firstQuarter + subject.subjectGrade.secondQuarter + subject.subjectGrade.thirdQuarter + subject.subjectGrade.fourthQuarter)/4,
          Remarks : remarks
        }
      })
      setSelectedGradeUser(newArray);
   
    } else {
      setSelectedUser({})
      setSelectedGradeUser([])
    }

    
   

  }

  const loadGrades = async () => {
    let finalOffspring = [];
    let response = await gradesService.findAllGrades();
    let parent = await userService.findAllUser();
    let result = parent.data.filter(user => user.parent);
    let offspring = result.filter(user => user.parent._id === JSON.parse(sessionStorage.user).id);
    response.data.map((user) => {
      offspring.map((off) => {
        if(user.student.idNumber === off.idNumber){
          finalOffspring.push(user)
        }
      })
    })
    let newArray = finalOffspring.map((user) => {
      console.log(user)
        return {
          key: user._id,
          id: user._id,
          firstName: user.student.firstName,
          lastName: user.student.lastName,
          middleName: user.student.middleName,
          idNumber: user.student.idNumber,
          contactNumber: user.student.contactNumber,
          email: user.student.email,
          section: user.section,
          gradeLevel: user.gradeLevel,
          action: 
            <Button onClick={() => loadGrade(user,user.student.idNumber)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
        }
      })
  
      setGradeDetails({
        list: newArray
      })
  }

const loadGrades1 = async () => {
    let response = await gradesService.findAllGrades();
    let result = response.data.filter(user => user.gradeLevel === "1" && user.status)
        let newArray = result.map((user ) => {
            return {
              key: user._id,
              id: user._id,
              firstName: user.student.firstName,
              lastName: user.student.lastName,
              middleName: user.student.middleName,
              idNumber: user.student.idNumber,
              contactNumber: user.student.contactNumber,
              email: user.student.email,
              section: user.student.section,
              action: 
                <Button onClick={() => loadGrade(user,user.student.idNumber)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
            }
          })
      
          setGrade1Details({
            list: newArray
          })
  }

  const loadGrades2 = async () => {
    let response = await gradesService.findAllGrades();
    let result = response.data.filter(user => user.gradeLevel === "2" && user.status)
        let newArray = result.map((user ) => {
            return {
              key: user._id,
              id: user._id,
              firstName: user.student.firstName,
              lastName: user.student.lastName,
              middleName: user.student.middleName,
              idNumber: user.student.idNumber,
              contactNumber: user.student.contactNumber,
              email: user.student.email,
              section: user.student.section,
              action: 
                <Button onClick={() => loadGrade(user,user.student.idNumber)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
            }
          })
      
          setGrade2Details({
            list: newArray
          })
  }

  const loadGrades3 = async () => {
    let response = await gradesService.findAllGrades();
    let result = response.data.filter(user => user.gradeLevel === "3" && user.status)
        let newArray = result.map((user ) => {
            return {
              key: user._id,
              id: user._id,
              firstName: user.student.firstName,
              lastName: user.student.lastName,
              middleName: user.student.middleName,
              idNumber: user.student.idNumber,
              contactNumber: user.student.contactNumber,
              email: user.student.email,
              section: user.student.section,
              action: 
                <Button onClick={() => loadGrade(user,user.student.idNumber)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
            }
          })
      
          setGrade3Details({
            list: newArray
          })
  }

  const loadGrades4 = async () => {
    let response = await gradesService.findAllGrades();
    let result = response.data.filter(user => user.gradeLevel === "4" && user.status)
        let newArray = result.map((user ) => {
            return {
              key: user._id,
              id: user._id,
              firstName: user.student.firstName,
              lastName: user.student.lastName,
              middleName: user.student.middleName,
              idNumber: user.student.idNumber,
              contactNumber: user.student.contactNumber,
              email: user.student.email,
              section: user.student.section,
              action: 
                <Button onClick={() => loadGrade(user,user.student.idNumber)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
            }
          })
      
          setGrade4Details({
            list: newArray
          })
  }

  const loadGrades5 = async () => {
    let response = await gradesService.findAllGrades();
    let result = response.data.filter(user => user.gradeLevel === "5" && user.status)
        let newArray = result.map((user ) => {
            return {
              key: user._id,
              id: user._id,
              firstName: user.student.firstName,
              lastName: user.student.lastName,
              middleName: user.student.middleName,
              idNumber: user.student.idNumber,
              contactNumber: user.student.contactNumber,
              email: user.student.email,
              section: user.student.section,
              action: 
                <Button onClick={() => loadGrade(user,user.student.idNumber)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
            }
          })
      
          setGrade5Details({
            list: newArray
          })
  }

  const loadGrades6 = async () => {
    let response = await gradesService.findAllGrades();
    let result = response.data.filter(user => user.gradeLevel === "6" && user.status)
        let newArray = result.map((user ) => {
            return {
              key: user._id,
              id: user._id,
              firstName: user.student.firstName,
              lastName: user.student.lastName,
              middleName: user.student.middleName,
              idNumber: user.student.idNumber,
              contactNumber: user.student.contactNumber,
              email: user.student.email,
              section: user.student.section,
              action: 
                <Button onClick={() => loadGrade(user,user.student.idNumber)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
            }
          })
      
          setGrade6Details({
            list: newArray
          })
  }

  const loadGrades7 = async () => {
    let response = await gradesService.findAllGrades();
    let result = response.data.filter(user => user.gradeLevel === "7" && user.status)
        let newArray = result.map((user ) => {
            return {
              key: user._id,
              id: user._id,
              firstName: user.student.firstName,
              lastName: user.student.lastName,
              middleName: user.student.middleName,
              idNumber: user.student.idNumber,
              contactNumber: user.student.contactNumber,
              email: user.student.email,
              section: user.student.section,
              action: 
                <Button onClick={() => loadGrade(user,user.student.idNumber)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
            }
          })
      
          setGrade7Details({
            list: newArray
          })
  }

  const loadGrades8 = async () => {
    let response = await gradesService.findAllGrades();
    let result = response.data.filter(user => user.gradeLevel === "8" && user.status)
        let newArray = result.map((user ) => {
            return {
              key: user._id,
              id: user._id,
              firstName: user.student.firstName,
              lastName: user.student.lastName,
              middleName: user.student.middleName,
              idNumber: user.student.idNumber,
              contactNumber: user.student.contactNumber,
              email: user.student.email,
              section: user.student.section,
              action: 
                <Button onClick={() => loadGrade(user,user.student.idNumber)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
            }
          })
      
          setGrade8Details({
            list: newArray
          })
  }

  const loadGrades9 = async () => {
    let response = await gradesService.findAllGrades();
    let result = response.data.filter(user => user.gradeLevel === "9" && user.status)
        let newArray = result.map((user ) => {
            return {
              key: user._id,
              id: user._id,
              firstName: user.student.firstName,
              lastName: user.student.lastName,
              middleName: user.student.middleName,
              idNumber: user.student.idNumber,
              contactNumber: user.student.contactNumber,
              email: user.student.email,
              section: user.student.section,
              action: 
                <Button onClick={() => loadGrade(user,user.student.idNumber)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
            }
          })
      
          setGrade9Details({
            list: newArray
          })
  }

  const loadGrades10 = async () => {
    let response = await gradesService.findAllGrades();
    let result = response.data.filter(user => user.gradeLevel === "10" && user.status)
        let newArray = result.map((user ) => {
            return {
              key: user._id,
              id: user._id,
              firstName: user.student.firstName,
              lastName: user.student.lastName,
              middleName: user.student.middleName,
              idNumber: user.student.idNumber,
              contactNumber: user.student.contactNumber,
              email: user.student.email,
              section: user.student.section,
              action: 
                <Button onClick={() => loadGrade(user,user.student.idNumber)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
            }
          })
      
          setGrade10Details({
            list: newArray
          })
  }

  useEffect(() => {
    loadGrades1();
    loadGrades2();
    loadGrades3();
    loadGrades4();
    loadGrades5();
    loadGrades6();
    loadGrades7();
    loadGrades8();
    loadGrades9();
    loadGrades10();
    loadGrades();
    currentGradeUser();
    getListOfTeacher();
  }, []);


  return {
    loadGrades1,
    grade2Details,
    grade3Details,
    grade4Details,
    grade5Details,
    grade6Details,
    grade7Details,
    grade8Details,
    grade9Details,
    grade10Details,
    showGradeVisible,
    setShowGradeVisible,
    showGrade,
    grade1Details,
    selectedGrade,
    editGrade,
    selectedTeacher,
    gradeDetails,
    selectedUserGrade,
    showAllGradeVisible, 
    setShowAllGradeVisible,
    selectedUser,
    selectedGradeUser,
    upgradeStudent,
    setSelectedListOfStudent,
    loading,
    studentAdvisor,
    filterCurrentGradeUser
  }
};

export default Grade1Action;
