import React from 'react';
import { Drawer, Card, Button, Typography, Icon, Row, Col, Select, Spin, notification } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';


import UserForm from './userDetailsForm'
import UserTable from './gradeTable'
import GradeAction from '../grade/gradeAction'
import AdvisorAction from '../grade/advisoryAction'
import AttendanceTable from './attendanceTable';
import AttendanceAction from './attendanceAction';
import ValuesTable from './valuesTable';
import CustomTable from '../shared/customTable';
import {
  DESCRIPTOR_TABLE,
  MARKING_TABLE,
  OBSERVED_VALUES_HEADER
} from '../modelTemplate/observedValues';

const { Option } = Select;


const EmployeePage = ({ isParent = false }) => {

  let {
    selectedGrade,
    gradeDetails, //child or children list
    selectedUserGrade,
    selectedUser,
    studentAdvisor,
    filterCurrentGradeUser,
    loading,
    overAllGrade,
    observedValues,
  } = GradeAction({});

  let { getAttendance, attendances } = AttendanceAction();

  let loadAttendance = async () => {
    let user = JSON.parse(sessionStorage.user);
    await getAttendance(user.idNumber);
  };

  if (attendances.length === 0) loadAttendance();

  const filterChild = async ({idNumber='', gradeLevel=''}) => {
    let student = (idNumber !=='') ? gradeDetails.list.find(student => student.idNumber === idNumber) : selectedUser;
    let level = (gradeLevel !=='') ? gradeLevel : student.gradeLevel;
    await filterCurrentGradeUser({ gradeLevel: level, studentObj: student });
  };

  const renderChildrenDropdown = () => {
    return gradeDetails.list.map((child) => {
      return <Option value={child.idNumber} key={child.idNumber}>
        {child.firstName + " " + child.lastName}
      </Option>
    })
  };

  const renderChildLevels = () => {
    return selectedUser.gradeLevelList.map((level) => {
      return <Option value={level} key={level} >{level}</Option>
    });
  };

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
             
                    <b>Full Name: </b>
                    {isParent ?
                      (
                        <Select
                          id="studentSelect"
                          className="ml-15"
                          placeholder=""
                          value={selectedUser.idNumber}
                          onChange={(value) => { filterChild({idNumber: value}) }}
                          style={{ width: '300px' }}>
                          { renderChildrenDropdown()}
                        </Select>
                      ) :
                      <>
                        {selectedUser.firstName ? selectedUser.firstName + " " + selectedUser.lastName : null}
                      </>
                    }
                  </p>
                  <p>
                    <b>Grade Level: </b>{selectedUser.gradeLevel ? selectedUser.gradeLevel : JSON.parse(sessionStorage.user).gradeLevel}
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
                  <Select 
                    className="ml-15"
                    value={selectedUser.gradeLevel}
                    style={{ width: '70px' }}
                    onChange={(value) => filterCurrentGradeUser({studentObj: selectedUser, gradeLevel: value })}>
                    { selectedUser.gradeLevelList ? renderChildLevels() : ''}
                  </Select>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg={{ span: "24" }}>
            <UserTable details={selectedUserGrade ? selectedUserGrade : []} />
          </Col>
          <Row>
            <Typography.Title level={5}
              style={{ marginLeft: '20px', paddingBottom: '50px', marginTop: '15px', textAlign: 'left' }} lg={{ span: "24" }}>
              General Average :
              {overAllGrade ? (
                <>
                  <span style={{
                    marginLeft: '15px', color: (overAllGrade.finalGrade < 75) ?
                      'red' : ''
                  }}>{overAllGrade.finalGrade}</span>
                  <span style={{
                    marginLeft: '10px', color: (overAllGrade.finalGrade < 75) ?
                      'red' : ''
                  }}>{overAllGrade.remarks}</span>
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
          <Col lg={{ span: "24" }}>
            <Card className="ml-15" title={
              <Typography.Title>Learner's Observed Values</Typography.Title>
            }>
              <CustomTable details={observedValues ? observedValues : []} headers={OBSERVED_VALUES_HEADER}></CustomTable>
            </Card>
          </Col>
          <Col lg={{ span: "24" }} className="mt-15">
            <Row>
              <Col lg={{ span: "12" }}>
                <Card className="ml-15">
                  <CustomTable details={DESCRIPTOR_TABLE.body} headers={DESCRIPTOR_TABLE.headers}></CustomTable>
                </Card>
              </Col>
              <Col lg={{ span: "12" }}>
                <Card className="ml-15">
                  <CustomTable details={MARKING_TABLE.body} headers={MARKING_TABLE.headers}></CustomTable>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </Card >
  );
}

export default EmployeePage;

