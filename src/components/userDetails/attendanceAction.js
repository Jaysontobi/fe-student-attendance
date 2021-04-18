import React, { useState, useEffect } from 'react';
import AttendanceService from './attendanceService';

const AttendanceAction = () => {

  let [ attendances, setattendances ] = useState([]);

  const getAttendance = async (id) => {
    let attendanceDatas = [];
    let response = await AttendanceService.getAttendance(id);
    let schoolDays = response.data.schoolDays;
    schoolDays.key = 'schoolDays123';
    schoolDays.id = 'schoolDays123';
    schoolDays.tag = "No. of School Days";
    let attendedDays = response.data.attendedDays;
    attendedDays.key = 'attendedDays1123';
    attendedDays.id = 'attendedDays1123';
    attendedDays.tag= "No. of School Days Present";
    let absences = response.data.absences;
    absences.key = 'absences1123';
    absences.id = 'absences1123';
    absences.tag = 'No. of Days Absent';
    attendanceDatas.push(schoolDays);
    attendanceDatas.push(attendedDays);
    attendanceDatas.push(absences);

    setattendances(attendanceDatas);
    return attendanceDatas;
  }

  useEffect(() => {
  }, []);

  return {
    getAttendance,
    attendances
  }
};

export default AttendanceAction;