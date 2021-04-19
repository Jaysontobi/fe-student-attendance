import React from 'react';
import { Drawer, Card, Button, Typography, Icon, Row, Col, Select, Spin } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';


import UserForm from './userDetailsForm'
import UserTable from './gradeTable'
import GradeAction from '../grade/gradeAction'
import AdvisorAction from '../grade/advisoryAction'
import AttendanceTable from './attendanceTable';
import AttendanceAction from './attendanceAction';

const { Option } = Select;


const EmployeePage = () => {

  let {
    selectedUserGrade,
    showAllGradeVisible,
    setShowAllGradeVisible,
    selectedUser,
    studentAdvisor,
    filterCurrentGradeUser,
    loading,
    overAllGrade
  } = GradeAction({});

  let { getAttendance , attendances } = AttendanceAction();

  let loadAttendance = async () => {
    let user = JSON.parse(sessionStorage.user);
    await getAttendance(user.idNumber);
  };

  if (attendances.length  === 0)  loadAttendance();;
 
  return (
    <Card className="h-82 p-70">
      <Spin spinning={loading} delay={0}>
        <Row>
          <Col span={24}>
            <Card className="ml-15" title={
              <Typography.Title>Student Details</Typography.Title>
            }>
              <Row>
                <Col span={12}>
                  <p>
                    <b>Full Name: </b>{selectedUser.firstName ? selectedUser.firstName + " " + selectedUser.lastName : null}
                  </p>
                  <p>
                    <b>Grade Level: </b>{JSON.parse(sessionStorage.user).gradeLevel}
                  </p>
                  <p>
                    <b>Section: </b>{selectedUser ? selectedUser.section : null}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <b>Advisor Name: </b>{studentAdvisor && studentAdvisor.teacher ? studentAdvisor.teacher.firstName + " " + studentAdvisor.teacher.lastName : null}
                  </p>
                  <p>
                    <b>Advisor Contact Number: </b>{studentAdvisor && studentAdvisor.teacher ? studentAdvisor.teacher.contactNumber : null}
                  </p>
                  <b>Yr./Lvl: </b>
                  <Select className="ml-15" placeholder="Select Yr./Level" onChange={(value) => filterCurrentGradeUser(value)}>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value="6">6</Option>
                    <Option value="7">7</Option>
                    <Option value="8">8</Option>
                    <Option value="9">9</Option>
                    <Option value="10">10</Option>
                  </Select>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg={{ span: "24" }}>
            <UserTable details={selectedUserGrade ? selectedUserGrade : []} />
          </Col>
          <Row style={{ marginBottom: '35px', marginTop: '15px', textAlign: 'left' }}>
            <Typography.Title level={5} style={{ marginLeft: '20px' }}  lg={{ span: "24" }}>
              General Average :
              { overAllGrade ? (
                <>
                 <span style={{marginLeft: '15px', color: (overAllGrade.finalGrade < 75) ? 
                  'red': '' }}>{ overAllGrade.finalGrade }</span>
                 <span style={{marginLeft: '10px', color: (overAllGrade.finalGrade < 75) ?
                  'red': '' }}>{ overAllGrade.remarks }</span>
                </>
              ) : ('')}
            </Typography.Title>
          </Row>
          <Col lg={{ span: "24" }}>
            <Card className="ml-15" title={
              <Typography.Title>Attendance Record</Typography.Title>
            }>
              <AttendanceTable details={attendances}></AttendanceTable>
            </Card>
          </Col>
        </Row>
      </Spin>
    </Card>
  );
}

export default EmployeePage;

