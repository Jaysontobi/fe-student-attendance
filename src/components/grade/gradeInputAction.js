import React, { useState, useEffect } from 'react';
import Subjects from '../modelTemplate/subjects';

const GradeInputAction = ({level= 0, grades=[]}) => {
  let [updatedInputs, setUpdatedInputs] = useState([]);

  const setInput = async (value='', subject='', quarter='', isAdvisor=false) => {
    let numVal = Number(value);
    let updatedInputClone = JSON.parse(JSON.stringify(updatedInputs));
    let targetIndex = updatedInputClone.findIndex(topic => topic.subjectName === subject);
    let topicObj = updatedInputClone[targetIndex];

    if(isAdvisor) {
      topicObj.subjectGrade[quarter] = numVal;
    } else {
      topicObj.recommendedGrade[quarter] = numVal;
    };

    updatedInputClone.splice(targetIndex, 1, topicObj);
    await setUpdatedInputs(updatedInputClone);
  };

  const updateGrades = async() => {
    console.log(updatedInputs);
    //remove inputs in recommended if advisor
  };

  const buildInputArr = () => {
    let subjectsHolder = Subjects.buildLevelSubjects(level, '');
    let prevRecords = JSON.parse(JSON.stringify(grades));
    let list = []
    subjectsHolder.map(topic => {
      let recObj = prevRecords.find(prevRec => prevRec.subjectName === topic.subjectName);
      if (recObj) {
        recObj = Object.assign(topic, recObj);
        recObj.recommendedGrade = JSON.parse(JSON.stringify(recObj.subjectGrade));
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
