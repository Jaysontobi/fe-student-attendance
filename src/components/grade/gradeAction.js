import React, { useState, useEffect } from 'react';
import gradesService from './gradesService';
import userService from '../user/userService';
import advisoryService from '../grade/advisoryService';
import auditTrailService from '../auditTrail/auditTrailService';
import AdditionalService from '../user/additionalService';
import { Button } from 'antd';
import moment from 'moment';
import { OBSERVED_VALUES } from '../modelTemplate/observedValues';

const Grade1Action = (initial = { searchRequest: {} }) => {
  let [studentAdvisor, setStudentAdvisor] = useState({});
  let [selectedUserGrade, setSelectedUserGrade] = useState([]);
  let [loading, setLoading] = useState(false);
  let [selectedGradeUser, setSelectedGradeUser] = useState([]); //list of grades
  let [gradeDetails, setGradeDetails] = useState({ list: [] });
  let [grade1Details, setGrade1Details] = useState({ list: [] });
  let [grade2Details, setGrade2Details] = useState({ list: [] });
  let [grade3Details, setGrade3Details] = useState({ list: [] });
  let [grade4Details, setGrade4Details] = useState({ list: [] });
  let [grade5Details, setGrade5Details] = useState({ list: [] });
  let [grade6Details, setGrade6Details] = useState({ list: [] });
  let [grade7Details, setGrade7Details] = useState({ list: [] });
  let [grade8Details, setGrade8Details] = useState({ list: [] });
  let [grade9Details, setGrade9Details] = useState({ list: [] });
  let [grade10Details, setGrade10Details] = useState({ list: [] });
  let [advisoryGrades, setAdvisoryGrades] = useState([]);

  let [showGradeVisible, setShowGradeVisible] = useState(false);
  let [selectedGrade, setSelectedGrade] = useState({}); //student grade record
  let [selectedTeacher, setSelectedTeacher] = useState([]);
  let [showAllGradeVisible, setShowAllGradeVisible] = useState(false);
  let [selectedUser, setSelectedUser] = useState({});

  let [selectedListOfStudent, setSelectedListOfStudent] = useState([]);
  let [overAllGrade, setOverAllGrade] = useState({ finalGrade: '', remarks: '' });
  let [observedValues, setObservedValues] = useState([]);

  const upgradeStudent = async values => {
    let auditTrailObj = {
      user: JSON.parse(sessionStorage.user),
      activity: "Upgrade Student",
      date: new Date()
    }
    auditTrailService.add(auditTrailObj)
    let ctr = 0;
    await selectedListOfStudent.map(async student => {
      setLoading(true)
      let result = await gradesService.findyById(student.id);

      let userCurrentGrade = (parseInt(result.data.gradeLevel))


      if (userCurrentGrade < 10) {
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
          schoolYear: currentStudent.schoolYear,
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
            schoolYear: currentUser.schoolYear,
            subjectName: "Filipino",
            subjectGrade: {
              firstQuarter: 0,
              secondQuarter: 0,
              thirdQuarter: 0,
              fourthQuarter: 0
            }
          },
          {
            schoolYear: currentUser.schoolYear,
            subjectName: "Science",
            subjectGrade: {
              firstQuarter: 0,
              secondQuarter: 0,
              thirdQuarter: 0,
              fourthQuarter: 0
            }
          },
          {
            schoolYear: currentUser.schoolYear,
            subjectName: "Math",
            subjectGrade: {
              firstQuarter: 0,
              secondQuarter: 0,
              thirdQuarter: 0,
              fourthQuarter: 0
            }
          },
          {
            schoolYear: currentUser.schoolYear,
            subjectName: "MAPEH",
            subjectGrade: {
              firstQuarter: 0,
              secondQuarter: 0,
              thirdQuarter: 0,
              fourthQuarter: 0
            }
          },
          {
            schoolYear: currentUser.schoolYear,
            subjectName: "Values",
            subjectGrade: {
              firstQuarter: 0,
              secondQuarter: 0,
              thirdQuarter: 0,
              fourthQuarter: 0
            }
          },
          {
            schoolYear: currentUser.schoolYear,
            subjectName: "Music",
            subjectGrade: {
              firstQuarter: 0,
              secondQuarter: 0,
              thirdQuarter: 0,
              fourthQuarter: 0
            }
          },
          {
            schoolYear: currentUser.schoolYear,
            subjectName: "Art",
            subjectGrade: {
              firstQuarter: 0,
              secondQuarter: 0,
              thirdQuarter: 0,
              fourthQuarter: 0
            }
          },
          {
            schoolYear: currentUser.schoolYear,
            subjectName: "PE",
            subjectGrade: {
              firstQuarter: 0,
              secondQuarter: 0,
              thirdQuarter: 0,
              fourthQuarter: 0
            }
          },
          {
            schoolYear: currentUser.schoolYear,
            subjectName: "Health",
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
      ctr = ctr + 1
      if (ctr === selectedListOfStudent.length) {
        setLoading(false)
        window.location.reload(false)
      }
    })

  };

  const editGrade = async (values, isAdvisory = false) => {
    console.log(values);
    let result = await gradesService.findyById(values._id);
    let grade = result.data

    if (values.English) {
      let firstQuarter = 0;
      let secondQuarter = 0;
      let thirdQuarter = 0;
      let fourthQuarter = 0;

      if (values.English.firstQuarter) {
        firstQuarter = values.English.firstQuarter
      } else {
        firstQuarter = grade.subjects[0].subjectGrade.firstQuarter
      }

      if (values.English.secondQuarter) {
        secondQuarter = values.English.secondQuarter
      } else {
        secondQuarter = grade.subjects[0].subjectGrade.secondQuarter
      }

      if (values.English.thirdQuarter) {
        thirdQuarter = values.English.thirdQuarter
      } else {
        thirdQuarter = grade.subjects[0].subjectGrade.thirdQuarter
      }

      if (values.English.fourthQuarter) {
        fourthQuarter = values.English.fourthQuarter
      } else {
        fourthQuarter = grade.subjects[0].subjectGrade.fourthQuarter
      }

      let newEnglishGrade = {
        firstQuarter: firstQuarter,
        secondQuarter: secondQuarter,
        thirdQuarter: thirdQuarter,
        fourthQuarter: fourthQuarter
      };

      if (isAdvisory) {
        grade.subjects[0].subjectGrade = newEnglishGrade;
        grade.subjects[0].recommendedGrade = {};
      } else {
        grade.subjects[0].recommendedGrade = newEnglishGrade;
      };
    }

    if (values.Filipino) {
      let firstQuarter = 0;
      let secondQuarter = 0;
      let thirdQuarter = 0;
      let fourthQuarter = 0;

      if (values.Filipino.firstQuarter) {
        firstQuarter = values.Filipino.firstQuarter
      } else {
        firstQuarter = grade.subjects[1].subjectGrade.firstQuarter
      }

      if (values.Filipino.secondQuarter) {
        secondQuarter = values.Filipino.secondQuarter
      } else {
        secondQuarter = grade.subjects[1].subjectGrade.secondQuarter
      }

      if (values.Filipino.thirdQuarter) {
        thirdQuarter = values.Filipino.thirdQuarter
      } else {
        thirdQuarter = grade.subjects[1].subjectGrade.thirdQuarter
      }

      if (values.Filipino.fourthQuarter) {
        fourthQuarter = values.Filipino.fourthQuarter
      } else {
        fourthQuarter = grade.subjects[1].subjectGrade.fourthQuarter
      }

      let newFilipinoGrade = {
        firstQuarter: firstQuarter,
        secondQuarter: secondQuarter,
        thirdQuarter: thirdQuarter,
        fourthQuarter: fourthQuarter
      }

      if (isAdvisory) {
        grade.subjects[1].subjectGrade = newFilipinoGrade;
        grade.subjects[1].recommendedGrade = {};
      } else {
        grade.subjects[1].recommendedGrade = newFilipinoGrade;
      };
    }

    if (values.Science) {
      let firstQuarter = 0;
      let secondQuarter = 0;
      let thirdQuarter = 0;
      let fourthQuarter = 0;

      if (values.Science.firstQuarter) {
        firstQuarter = values.Science.firstQuarter
      } else {
        firstQuarter = grade.subjects[2].subjectGrade.firstQuarter
      }

      if (values.Science.secondQuarter) {
        secondQuarter = values.Science.secondQuarter
      } else {
        secondQuarter = grade.subjects[2].subjectGrade.secondQuarter
      }

      if (values.Science.thirdQuarter) {
        thirdQuarter = values.Science.thirdQuarter
      } else {
        thirdQuarter = grade.subjects[2].subjectGrade.thirdQuarter
      }

      if (values.Science.fourthQuarter) {
        fourthQuarter = values.Science.fourthQuarter
      } else {
        fourthQuarter = grade.subjects[2].subjectGrade.fourthQuarter
      }

      let newScienceGrade = {
        firstQuarter: firstQuarter,
        secondQuarter: secondQuarter,
        thirdQuarter: thirdQuarter,
        fourthQuarter: fourthQuarter
      };

      if (isAdvisory) {
        grade.subjects[2].subjectGrade = newScienceGrade;
        grade.subjects[2].recommendedGrade = {};
      } else {
        grade.subjects[2].recommendedGrade = newScienceGrade;
      };
    }

    if (values.Math) {
      let firstQuarter = 0;
      let secondQuarter = 0;
      let thirdQuarter = 0;
      let fourthQuarter = 0;

      if (values.Math.firstQuarter) {
        firstQuarter = values.Math.firstQuarter
      } else {
        firstQuarter = grade.subjects[3].subjectGrade.firstQuarter
      }

      if (values.Math.secondQuarter) {
        secondQuarter = values.Math.secondQuarter
      } else {
        secondQuarter = grade.subjects[3].subjectGrade.secondQuarter
      }

      if (values.Math.thirdQuarter) {
        thirdQuarter = values.Math.thirdQuarter
      } else {
        thirdQuarter = grade.subjects[3].subjectGrade.thirdQuarter
      }

      if (values.Math.fourthQuarter) {
        fourthQuarter = values.Math.fourthQuarter
      } else {
        fourthQuarter = grade.subjects[3].subjectGrade.fourthQuarter
      }

      let newMathGrade = {
        firstQuarter: firstQuarter,
        secondQuarter: secondQuarter,
        thirdQuarter: thirdQuarter,
        fourthQuarter: fourthQuarter
      };

      if (isAdvisory) {
        grade.subjects[3].subjectGrade = newMathGrade;
        grade.subjects[3].recommendedGrade = {};
      } else {
        grade.subjects[3].recommendedGrade = newMathGrade;
      };
    }

    // if (values.MAPEH) {
    //   let firstQuarter = 0;
    //   let secondQuarter = 0;
    //   let thirdQuarter = 0;
    //   let fourthQuarter = 0;

    //   if (values.MAPEH.firstQuarter) {
    //     firstQuarter = values.MAPEH.firstQuarter
    //   } else {
    //     firstQuarter = grade.subjects[4].subjectGrade.firstQuarter
    //   }

    //   if (values.MAPEH.secondQuarter) {
    //     secondQuarter = values.MAPEH.secondQuarter
    //   } else {
    //     secondQuarter = grade.subjects[4].subjectGrade.secondQuarter
    //   }

    //   if (values.MAPEH.thirdQuarter) {
    //     thirdQuarter = values.MAPEH.thirdQuarter
    //   } else {
    //     thirdQuarter = grade.subjects[4].subjectGrade.thirdQuarter
    //   }

    //   if (values.MAPEH.fourthQuarter) {
    //     fourthQuarter = values.MAPEH.fourthQuarter
    //   } else {
    //     fourthQuarter = grade.subjects[4].subjectGrade.fourthQuarter
    //   }

    //   let newMAPEHGrade = {
    //     firstQuarter: firstQuarter,
    //     secondQuarter: secondQuarter,
    //     thirdQuarter: thirdQuarter,
    //     fourthQuarter: fourthQuarter
    //   };

    //   if (isAdvisory) {
    //     grade.subjects[4].subjectGrade = newMAPEHGrade;
    //     grade.subjects[4].recommendedGrade = {};
    //   } else {
    //     grade.subjects[4].recommendedGrade = newMAPEHGrade;
    //   };
    // }

    if (values.Values) {
      let firstQuarter = 0;
      let secondQuarter = 0;
      let thirdQuarter = 0;
      let fourthQuarter = 0;

      if (values.Values.firstQuarter) {
        firstQuarter = values.Values.firstQuarter
      } else {
        firstQuarter = grade.subjects[5].subjectGrade.firstQuarter
      }

      if (values.Values.secondQuarter) {
        secondQuarter = values.Values.secondQuarter
      } else {
        secondQuarter = grade.subjects[5].subjectGrade.secondQuarter
      }

      if (values.Values.thirdQuarter) {
        thirdQuarter = values.Values.thirdQuarter
      } else {
        thirdQuarter = grade.subjects[5].subjectGrade.thirdQuarter
      }

      if (values.Values.fourthQuarter) {
        fourthQuarter = values.Values.fourthQuarter
      } else {
        fourthQuarter = grade.subjects[5].subjectGrade.fourthQuarter
      }

      let newValuesGrade = {
        firstQuarter: firstQuarter,
        secondQuarter: secondQuarter,
        thirdQuarter: thirdQuarter,
        fourthQuarter: fourthQuarter
      };

      if (isAdvisory) {
        grade.subjects[5].subjectGrade = newValuesGrade;
        grade.subjects[5].recommendedGrade = {};
      } else {
        grade.subjects[5].recommendedGrade = newValuesGrade;
      };
    };

    const subjectDummy = {
      firstQuarter: 0,
      secondQuarter: 0,
      thirdQuarter: 0,
      fourthQuarter: 0
    };

    if (values.Music) {
      let subjectIndex = grade.subjects.findIndex(subject => subject.subjectName === 'Music');
      let subjectGrades = (subjectIndex !== -1) ? grade.subjects[subjectIndex] : subjectDummy;
      let updatedGrades = constructSubjectGrades(values, 'Music', subjectGrades);

      let newSubject = {
        schoolYear: grade.subjects[0].schoolYear,
        subjectName: 'Music',
        subjectGrade: updatedGrades
      };

      if (isAdvisory) {

        if (subjectIndex === -1) {
          grade.subjects.push(newSubject);
        } else {
          grade.subjects[subjectIndex].subjectGrade = updatedGrades;
          grade.subjects[subjectIndex].recommendedGrade = {};
        };
      } else {
        if (subjectIndex === -1) {
          grade.subjects.push(newSubject);
        } else {
          grade.subjects[subjectIndex].recommendedGrade = updatedGrades;
        };
      };
    };


    if (values.Art) {
      let subjectIndex = grade.subjects.findIndex(subject => subject.subjectName === 'Art');
      let subjectGrades = (subjectIndex !== -1) ? grade.subjects[subjectIndex] : subjectDummy;
      let updatedGrades = constructSubjectGrades(values, 'Art', subjectGrades);

      let newSubject = {
        schoolYear: grade.subjects[0].schoolYear,
        subjectName: 'Art',
        subjectGrade: updatedGrades
      };

      if (isAdvisory) {

        if (subjectIndex === -1) {
          grade.subjects.push(newSubject);
        } else {
          grade.subjects[subjectIndex].subjectGrade = updatedGrades;
          grade.subjects[subjectIndex].recommendedGrade = {};
        };
      } else {
        if (subjectIndex === -1) {
          grade.subjects.push(newSubject);
        } else {
          grade.subjects[subjectIndex].recommendedGrade = updatedGrades;
        };
      };
    };

    if (values.PE) {
      let subjectIndex = grade.subjects.findIndex(subject => subject.subjectName === 'PE');
      let subjectGrades = (subjectIndex !== -1) ? grade.subjects[subjectIndex] : subjectDummy;
      let updatedGrades = constructSubjectGrades(values, 'PE', subjectGrades);

      let newSubject = {
        schoolYear: grade.subjects[0].schoolYear,
        subjectName: 'PE',
        subjectGrade: updatedGrades
      };

      if (isAdvisory) {

        if (subjectIndex === -1) {
          grade.subjects.push(newSubject);
        } else {
          grade.subjects[subjectIndex].subjectGrade = updatedGrades;
          grade.subjects[subjectIndex].recommendedGrade = {};
        };
      } else {
        if (subjectIndex === -1) {
          grade.subjects.push(newSubject);
        } else {
          grade.subjects[subjectIndex].recommendedGrade = updatedGrades;
        };
      };
    };

    if (values.Health) {
      let subjectIndex = grade.subjects.findIndex(subject => subject.subjectName === 'Health');
      let subjectGrades = (subjectIndex !== -1) ? grade.subjects[subjectIndex] : subjectDummy;
      let updatedGrades = constructSubjectGrades(values, 'Health', subjectGrades);

      let newSubject = {
        schoolYear: grade.subjects[0].schoolYear,
        subjectName: 'Health',
        subjectGrade: updatedGrades
      };

      if (isAdvisory) {

        if (subjectIndex === -1) {
          grade.subjects.push(newSubject);
        } else {
          grade.subjects[subjectIndex].subjectGrade = updatedGrades;
          grade.subjects[subjectIndex].recommendedGrade = {};
        };
      } else {
        if (subjectIndex === -1) {
          grade.subjects.push(newSubject);
        } else {
          grade.subjects[subjectIndex].recommendedGrade = updatedGrades;
        };
      };
    };

    let updateResult = await gradesService.update(grade);
    //add record  to audit trail
    let loggedDate = new Date().toISOString();
    let userDetails = {
      user: JSON.parse(sessionStorage.user),
      activity: 'Teacher has updated student grades',
      date: loggedDate
    };
    await auditTrailService.add(userDetails);
    window.location.reload();
  };

  const constructSubjectGrades = (values, subject = '', subjectGrade) => {
    let firstQuarter = 0;
    let secondQuarter = 0;
    let thirdQuarter = 0;
    let fourthQuarter = 0;

    if (values[subject].firstQuarter) {
      firstQuarter = values[subject].firstQuarter
    } else {
      firstQuarter = subjectGrade.firstQuarter
    }

    if (values[subject].secondQuarter) {
      secondQuarter = values[subject].secondQuarter
    } else {
      secondQuarter = subjectGrade.secondQuarter
    }

    if (values[subject].thirdQuarter) {
      thirdQuarter = values[subject].thirdQuarter
    } else {
      thirdQuarter = subjectGrade.thirdQuarter
    }

    if (values[subject].fourthQuarter) {
      fourthQuarter = values[subject].fourthQuarter
    } else {
      fourthQuarter = subjectGrade.fourthQuarter
    };

    let gradesObj = {
      firstQuarter: firstQuarter,
      secondQuarter: secondQuarter,
      thirdQuarter: thirdQuarter,
      fourthQuarter: fourthQuarter
    };

    return gradesObj;
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

  const loadGrade = (gradeObj, idNumber, level = '') => {
    getCurrentGradeUser(idNumber, level)
    setSelectedGrade({ ...gradeObj });
    setShowGradeVisible(true);
  };

  const loadSelectedGrade = async (gradeId) => {
    let response = await gradesService.findyById(gradeId);
    setSelectedGrade({ ...response.data });
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
    if (result.length >= 1 && result[0].subjects && result[0].subjects.length >= 1) {
      let newArray = result[0].subjects.map((subject) => {
        return buidSubjectRow(subject);
      });

      let response = await advisoryService.findAllAdvisory()
      let result1 = [];
      result1 = response.data.filter(user => user.gradeLevel === gradeLevel);

      //remove mapeh
      let mapehIndex = newArray.findIndex(topic => topic.subject === 'MAPEH');
      newArray.splice(mapehIndex, 1);
      
      buildObservedValues(result[0].observedValues);
      buildOverallRemarks(newArray);
      setSelectedUser(result[0].student)
      setStudentAdvisor(result1[0]);
      setSelectedUserGrade(newArray);

    } else {
      setSelectedUser({})
      setSelectedUserGrade([])
    }
    setLoading(false)
  };

  const buildOverallRemarks = async (newArray) => {
    let finalGradesholder = [];

    newArray.map(subject => { 
      if (subject.FinalGrade && subject.FinalGrade !== '') finalGradesholder.push(subject.FinalGrade);
    });

    if (finalGradesholder.length === newArray.length) {
      let average = finalGradesholder.reduce((a, b) => a + b, 0) / finalGradesholder.length;
      let remarks = '';

      if (average >= 75) {
        remarks = 'Promoted';
      } else {
        remarks = 'Failed';
      };

      setOverAllGrade({
        finalGrade: average.toFixed(2),
        remarks: remarks
      });
    };
  };

  const buildObservedValues = valuesDatas => {
    let observedValuesTmp = JSON.parse(JSON.stringify(OBSERVED_VALUES));

    if (valuesDatas) {
      observedValuesTmp = observedValuesTmp.map( valuesObj => {
        let newObj = valuesDatas.find(item => item.value === valuesObj.id);
        if (!newObj) {
          return valuesObj;
        } else {
          valuesObj = Object.assign(valuesObj, newObj.grades);
          return valuesObj;
        }
      });
    }

    setObservedValues(observedValuesTmp);
  };

  const currentGradeUser = async () => {
    let response = await gradesService.findAllGrades();
    let result = [];
    if (JSON.parse(sessionStorage.user).gradeLevel === "Graduate") {
      result = response.data.filter(user => user.student.idNumber === JSON.parse(sessionStorage.user).idNumber && user.student.gradeLevel === "1")
    } else {
      result = response.data.filter(user => user.student.idNumber === JSON.parse(sessionStorage.user).idNumber && user.student.gradeLevel === JSON.parse(sessionStorage.user).gradeLevel)
    }
    if (result.length >= 1 && result[0].subjects && result[0].subjects.length >= 1) {
      setSelectedUser(result[0].student)
      let newArray = result[0].subjects.map((subject) => {
        return buidSubjectRow(subject);
      });

      let response = await advisoryService.findAllAdvisory()
      let result1 = [];
      if (JSON.parse(sessionStorage.user).gradeLevel === "Graduate") {
        result1 = response.data.filter(user => user.gradeLevel === "1");
      } else {
        result1 = response.data.filter(user => user.gradeLevel === JSON.parse(sessionStorage.user).gradeLevel);
      };

      //remove mapeh
      let mapehIndex = newArray.findIndex(topic => topic.subject === 'MAPEH');
      newArray.splice(mapehIndex, 1);

      buildOverallRemarks(newArray);
      buildObservedValues(result[0].observedValues);
      setStudentAdvisor(result1[0]);
      setSelectedUserGrade(newArray);
    } else {
      setSelectedUser({})
      setSelectedUserGrade([])
    };

  };

  const buidSubjectRow = (subject) => {
    let remarks = "";
    let finalGrade = (subject.subjectGrade.firstQuarter +
      subject.subjectGrade.secondQuarter +
      subject.subjectGrade.thirdQuarter +
      subject.subjectGrade.fourthQuarter) / 4;

    let inComplete = false;
    let firstQuarter = subject.subjectGrade.firstQuarter;
    let secondQuarter = subject.subjectGrade.secondQuarter;
    let thirdQuarter = subject.subjectGrade.thirdQuarter;
    let fourthQuarter = subject.subjectGrade.fourthQuarter;

    //leave blank all zero grades
    if (firstQuarter === 0) {
      firstQuarter = '';
      inComplete = true;
    };
    if (secondQuarter === 0) {
      secondQuarter = '';
      inComplete = true;
    };
    if (thirdQuarter === 0) {
      thirdQuarter = '';
      inComplete = true;
    };
    if (fourthQuarter === 0) {
      fourthQuarter = '';
      inComplete = true;
    };

    if (!inComplete && finalGrade >= 75) {
      remarks = "Passed";
    } else if (!inComplete && finalGrade < 75){
      remarks = "Failed";
    } else {
      remarks = '';
    };;

    return {
      key: subject._id,
      id: subject._id,
      subject: subject.subjectName,
      Quarter1st: firstQuarter,
      Quarter2nd: secondQuarter,
      Quarter3rd: thirdQuarter,
      Quarter4th: fourthQuarter,
      FinalGrade: (!inComplete) ? finalGrade : '',
      Remarks: remarks
    }
  };

  const getCurrentGradeUser = async (idNumber, level = '') => {
    let response = await gradesService.findAllGrades(level);
    let result = response.data.filter(user => user.student.idNumber === idNumber);
    if (result.length >= 1 && result[0].subjects && result[0].subjects.length >= 1) {
      setSelectedUser(result[0].student);
      let newArray = result[0].subjects.map((subject) => {
        return buidSubjectRow(subject);
      });
      
      //remove mapeh
      let mapehIndex = newArray.findIndex(topic => topic.subject === 'MAPEH');
      newArray.splice(mapehIndex, 1);
      buildObservedValues(result[0].observedValues);
      buildOverallRemarks(newArray);
      setSelectedGradeUser(newArray);
    } else {
      setSelectedUser({})
      setSelectedGradeUser([])
    };

  }

  const loadGrades = async () => {
    let finalOffspring = [];
    let response = await gradesService.findAllGrades();
    let parent = await userService.findAllUser();
    let result = parent.data.filter(user => user.parent);
    let newArray = [];
    let offspring = result.filter(user => user.parent._id === JSON.parse(sessionStorage.user).id);
    await response.data.map((user) => {
      offspring.map((off) => {
        if (user.student.idNumber === off.idNumber) {
          finalOffspring.push(user)
        }
      });
    });
    newArray = finalOffspring.map((user) => {
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
          <Button onClick={() => loadGrade(user, user.student.idNumber)} key={"VIEW_" + user._id}>View User&nbsp; </Button>,
      }
    })

    setGradeDetails({
      list: newArray
    })
  };

  const loadStudentGradesPerLevel = async (level='') => {
    let response = await gradesService.findAllGrades(level);
    let result = response.data.filter(user => user.gradeLevel === level && user.status)
    let newArray = result.map((user) => {
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
          <Button onClick={() => {
            setLoading(true);
            setTimeout(() => { loadGrade(user, user.student.idNumber, level) }, 3000);
            setTimeout(() => { setLoading(false);}, 3200 );
          }} key={"VIEW_" + user._id}>View User&nbsp; </Button>,
      }
    });

    return newArray;
  };

  const loadGrades1 = async () => {
    let newArray = await loadStudentGradesPerLevel('1');
    setGrade1Details({
      list: newArray
    })
  }

  const loadGrades2 = async () => {
    let newArray = await loadStudentGradesPerLevel('2');
    setGrade2Details({
      list: newArray
    })
  };

  const loadGrades3 = async () => {
   let newArray = await loadStudentGradesPerLevel('3');
   setGrade3Details({
      list: newArray
    });
  };

  const loadGrades4 = async () => {
    let newArray = await loadStudentGradesPerLevel('4');
    setGrade4Details({
       list: newArray
     });
  }

  const loadGrades5 = async () => {
    let newArray = await loadStudentGradesPerLevel('5');
    setGrade5Details({
      list: newArray
    })
  }

  const loadGrades6 = async () => {
    let newArray = await loadStudentGradesPerLevel('6');
    setGrade6Details({
      list: newArray
    })
  }

  const loadGrades7 = async () => {
    let newArray = await loadStudentGradesPerLevel('7');
    setGrade7Details({
      list: newArray
    })
  }

  const loadGrades8 = async () => {
    let newArray = await loadStudentGradesPerLevel('8');
    setGrade8Details({
      list: newArray
    });
  }

  const loadGrades9 = async () => {
    let newArray = await loadStudentGradesPerLevel('9');
    setGrade9Details({
      list: newArray
    })
  }

  const loadGrades10 = async () => {
    let newArray = await loadStudentGradesPerLevel('10');
    setGrade10Details({
      list: newArray
    })
  }

  const loadAdvisoryGrades = async () => {
    let user = JSON.parse(sessionStorage.user);
    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName
    };

    try {
      let advisory = await AdditionalService.getAdvisory(userData);

      if (!advisory) return;

      let response = await gradesService.findAllGrades(advisory.data.gradeLevel);
      let result = response.data.filter(user => user.gradeLevel === advisory.data.gradeLevel && user.status)
      let list = result.map((user) => {
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
            <Button onClick={() => loadGrade(user, user.student.idNumber, advisory.data.gradeLevel)} key={"VIEW_" + user._id}>View User&nbsp; </Button>,
        }
      })

      setAdvisoryGrades(list);
    } catch (error) {
    };
  };

  const addUpdateObservedValues = async values => {
    setObservedValues(values);
    let list = values.map(value => {
      let valuesObj = {
        value: value.key,
        grades : {
          q1: value.q1,
          q2: value.q2,
          q3: value.q3,
          q4: value.q4
        }
      };

      return valuesObj;
    });

    let paramsObj = {
      idNumber: selectedGrade.student.idNumber,
      gradeLevel: selectedGrade.gradeLevel,
      observedValues: list
    };

   try {
     let response = await gradesService.addUpdateObservedValues(paramsObj);
     return response.data;
   } catch (error) {
   };
  };

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
    loadAdvisoryGrades();
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
    filterCurrentGradeUser,
    advisoryGrades,
    overAllGrade,
    observedValues,
    setObservedValues,
    addUpdateObservedValues
  }
};

export default Grade1Action;
