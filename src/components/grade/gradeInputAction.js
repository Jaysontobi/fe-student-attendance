import { useState, useEffect } from 'react';
import Subjects from '../modelTemplate/subjects';
import gradesService from './gradesService';
import auditTrailService from '../auditTrail/auditTrailService';

const GradeInputAction = ({level= 0, grades=[], record={}}) => {
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

  const buildInputArr = () => {
    let subjectsHolder = Subjects.buildLevelSubjects(level, '');
    let prevRecords = JSON.parse(JSON.stringify(grades));
    let list = [];
    subjectsHolder.map(topic => {
      let recObj = prevRecords.find(prevRec => prevRec.subjectName === topic.subjectName);
      if (recObj) {
        recObj = Object.assign(topic, recObj);
        recObj.recommendedGrade = Object.keys(recObj.recommendedGrade).length > 0 ? recObj.recommendedGrade : JSON.parse(JSON.stringify(recObj.subjectGrade));
        list.push(recObj);
      } else {
        list.push(topic);
      }
    });
    setUpdatedInputs(list);
  };

  useEffect(() => {
    buildInputArr()
  }, []);

  return {
    updatedInputs,
    updateGrades,
    setInput
  }
};

export default GradeInputAction;
