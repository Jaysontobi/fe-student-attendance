import React, { useState, useEffect } from 'react';
import clearanceService from './clearanceService';
import gradesService from '../grade/gradesService';
import { CLEARANCE_DROPDOWN } from '../../constants/clearance';


const ClearanceAction = (initial = {}) => {
  let [levelClearance, setLevelClearance] = useState([]);
  let [loading, setLoading] = useState(false);
  let [levelToEdit, setLevelToEdit] = useState('');

  const getIndividualRec = async (list = [], idNumber = '') => {
    if (list.length === 0) return null;
    let record = await list.find(item => item.idNumber === idNumber);
    return record;
  };

  const getClearance = async ({ level }) => {
    try {
      setLevelToEdit(level);
      setLoading(true);
      let responseGradeRecords = await gradesService.findAllGrades(level);
      responseGradeRecords = responseGradeRecords.data;
      let responseClearance = await clearanceService.getClearance(level);
      let clearanceData = [];

      if (responseGradeRecords.length > 0) {
        await responseGradeRecords.map(async (item, key) => {
          let record = await getIndividualRec(responseClearance.data?.students, item.student.idNumber);
          console.log(record);
          let studentName = `${item.student.lastName}, ${item.student.firstName} ${item.student.middleName}`;
          let studentObj = {
            key: 'student' + item.student.idNumber,
            id: 'student' + item.student.idNumber,
            studentName: studentName,
            idNumber: item.student.idNumber,
            firstQuarter: record ? record.firstQuarter : '',
            secondQuarter: record ? record.secondQuarter : '',
            thirdQuarter: record ? record.thirdQuarter : '',
            fourthQuarter: record ? record.fourthQuarter : '',
            dropdownList: CLEARANCE_DROPDOWN
          };

          clearanceData.push(studentObj);
        });
      };

      setTimeout(() => {
        setLevelClearance(clearanceData);
        setLoading(false);
      }, 1000);
    } catch (error) { };
  };

  const addUpdateLvlClearance = async (values) => {
    setLevelClearance(values);
    setLoading(true);
    let students = values.map(item => {
      return {
        idNumber: item.idNumber,
        firstQuarter: item.firstQuarter,
        secondQuarter: item.secondQuarter,
        thirdQuarter: item.thirdQuarter,
        fourthQuarter: item.fourthQuarter,
      }
    })
    let paramsObj = {
      gradeLevel: levelToEdit,
      students: students
    };

    let data = await clearanceService.addUpdateClearance(paramsObj);
    console.log(data);
    setLoading(false);
  };

  return {
    getClearance,
    loading,
    levelClearance,
    addUpdateLvlClearance
  }
};

export default ClearanceAction;