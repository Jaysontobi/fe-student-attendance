import { useState, useEffect } from 'react';
import Subjects from '../modelTemplate/subjects';
import gradesService from './gradesService';
import auditTrailService from '../auditTrail/auditTrailService';

const GradeInputAction = ({level= 0, grades=[], record={}, isAdviser=false, teacherSubjects=[]}) => {
  let [updatedInputs, setUpdatedInputs] = useState([]);

  const setInput = async (value='', subject='', quarter='', isAdviser=false) => {
    let numVal = Number(value);
    let updatedInputClone = JSON.parse(JSON.stringify(updatedInputs));
    let targetIndex = updatedInputClone.findIndex(topic => topic.subjectName === subject);
    let topicObj = updatedInputClone[targetIndex];

    if(isAdviser) {
      topicObj.subjectGrade[quarter] = numVal;
      topicObj.recommendedGrade[quarter] = numVal;
    } else {
      topicObj.recommendedGrade[quarter] = numVal;
    };

    updatedInputClone.splice(targetIndex, 1, topicObj);
    await setUpdatedInputs(updatedInputClone);
  };

  const updateGrades = async(isAdviser=false) => {
    let updatedSubjectsRec = [];
    //remove inputs in recommended if advisor
    if (isAdviser) {
      updatedInputs.map(topic => {
        topic.subjectGrade = topic.recommendedGrade;
        topic.recommendedGrade = {};
        updatedSubjectsRec.push(topic);
      });
    };

    record.subjects = isAdviser ? updatedSubjectsRec : updatedInputs;

    await gradesService.update(record);
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

  const getQuarterName = (quarter) => {
    switch (quarter) {
      case '2':
        return 'secondQuarter';
      case '3':
        return 'thirdQuarter';
      case '4':
        return 'fourthQuarter';
      default:
        return 'firstQuarter';
    };
  };

  const buildInputArr = () => {
    let activeQuarter = getQuarterName(sessionStorage.quarter);
    let subjectsHolder = Subjects.buildLevelSubjects(level, '');
    let editingSubjects = [];
    let teacherId = JSON.parse(sessionStorage.user).idNumber;
    let prevRecords = JSON.parse(JSON.stringify(grades));
    teacherSubjects.map(item => {
      if (item.teacher.idNumber === teacherId) editingSubjects.push(item.subjectName);
    });

    let list = [];
    subjectsHolder.map(topic => {
      let recObj = prevRecords.find(prevRec => prevRec.subjectName === topic.subjectName);
      if (recObj) {
        recObj = Object.assign(topic, recObj);
        recObj.recommendedGrade = Object.keys(recObj.recommendedGrade).length > 0 ? 
          recObj.recommendedGrade : 
          JSON.parse(JSON.stringify(recObj.subjectGrade));

        //setting of 50
        if (!isAdviser && editingSubjects.includes(topic.subjectName) && recObj.recommendedGrade[activeQuarter] === 0) {
          recObj.recommendedGrade[activeQuarter] = 50;
        };

        list.push(recObj);
      } else {
        list.push(topic);
      };
    });

    setUpdatedInputs(list);
  };

  const getQuarterNum = (quarter) => {
    switch (quarter) {
      case 'secondQuarter':
        return '2';
      case 'thirdQuarter':
        return '3';
      case 'fourthQuarter':
        return '4';
      default:
        return '1';
    };
  };

  useEffect(() => {
    buildInputArr()
  }, []);

  return {
    updatedInputs,
    updateGrades,
    setInput,
    getQuarterNum
  }
};

export default GradeInputAction;
