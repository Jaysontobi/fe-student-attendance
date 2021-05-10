import React from 'react';
import { Drawer, Card, Button, Typography, Icon, Row, Col, Spin } from 'antd';
import { PlusCircleOutlined, RiseOutlined } from '@ant-design/icons';
import GradeForm from './gradeForm'
import TeacherForm from './teacherForm'
import StudentGradeTable from '../userDetails/gradeTable'
import GradeAction from './gradeAction'
import AdvisoryForm from './advisoryForm'
import AdvisorAction from './advisoryAction';

import GradeTable from './gradeTable'
import TeacherAction from './teacherAction';
import AttendanceTable from '../userDetails/attendanceTable';
import AttendanceAction from '../userDetails/attendanceAction';
import CustomTable from '../shared/customTable';
import {
  DESCRIPTOR_TABLE,
  MARKING_TABLE,
  OBSERVED_VALUES_HEADER
} from '../modelTemplate/observedValues';
import GradesInput from './gradesInput';

const GradePage = () => {


  let {
    addGrade,
    showGradeVisible,
    setShowGradeVisible,
    showGrade,
    grade10Details,
    selectedGrade,
    editGrade,
    selectedTeacher,
    selectedGradeUser,
    upgradeStudent,
    setSelectedListOfStudent,
    loading,
    overAllGrade,
    observedValues
  } = GradeAction({});

  let {
    showTeacherVisible,
    hideTeacher,
    showTeacher,
    add,
    selectedTeacherAssignedGrade10,
    selectedTeacherAssgined
  } = TeacherAction({});

  let {
    showAdvisorVisible,
    hideAdvisor,
    showAdvisor,
    addAdvisor,
    selectedAdvisoryAssignedGrade10,
    selectedAdvisoryAssgined,
    availableAdvisors
  } = AdvisorAction({});

  let { getAttendance, attendances } = AttendanceAction();
  let loadAttendance = async () => {
    if (!selectedGrade.student) return;
    await getAttendance(selectedGrade.student.idNumber);
  };

  loadAttendance();

  return (
    <Card className="h-82 p-70">
      <Spin spinning={loading} delay={0}>
        <Row className="mt-15">
          <Col lg={{ span: 13 }}>
            <Typography.Title level={3} className="ml-15">Grade10 Management</Typography.Title>
          </Col>
          <Col lg={{ span: 10 }}>
            {JSON.parse(sessionStorage.user).role === "Admin" ? <Button className="right ml-10 btn-add" type="save " onClick={() => showTeacher("10")}>
              <PlusCircleOutlined type="minus-circle" /> Add teacher
             </Button> : null
            }
            {JSON.parse(sessionStorage.user).role === "Admin" ? <Button className="right ml-10 bg-gray text-white" type="save " onClick={() => showAdvisor("10")}>
              <PlusCircleOutlined type="minus-circle" /> Add Advisor
             </Button> : null}
            {JSON.parse(sessionStorage.user).role === "Admin" ?
              <Button className="right btn-save" onClick={() => upgradeStudent()}>
                <RiseOutlined type="minus-circle" /> Promote
             </Button>
              : null}
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: "24" }}>
            <GradeTable setSelectedListOfStudent={setSelectedListOfStudent} details={grade10Details.list} />
          </Col>
        </Row>
        <Drawer
          title={
            <Typography.Title level={4}>
              Student Info
                  </Typography.Title>
          }
          width={950}
          visible={showGradeVisible}
          onClose={() => { setShowGradeVisible(false) }}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <GradeForm upgradeStudent={upgradeStudent} add={addGrade} update={editGrade} selectedTeacher={selectedTeacher} selectedGrade={selectedGrade} gradeLevel={"10"} selectedTeacherAssignedGrade={selectedTeacherAssignedGrade10} />
          <GradesInput level={2} grades={selectedGrade.subjects} gradeSubjectTeachers={selectedTeacherAssignedGrade2.subjects}/>
          <StudentGradeTable details={selectedGradeUser ? selectedGradeUser : []} />
          <Row style={{ marginBottom: '35px', marginTop: '15px', textAlign: 'left' }}>
            <Typography.Title level={5} style={{ marginLeft: '20px' }} lg={{ span: "24" }}>
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
          <Row style={{ marginBottom: '35px', marginTop: '15px', textAlign: 'left' }}>
            <Typography.Title level={5} style={{ marginLeft: '20px' }} lg={{ span: "24" }}>
              Student Attendance
              </Typography.Title>
            <AttendanceTable details={attendances} />
          </Row>
          <Row style={{ marginBottom: '35px', marginTop: '15px', textAlign: 'left' }}>
            <Typography.Title level={5} style={{ marginLeft: '20px' }} lg={{ span: "24" }}>Learner's Observed Values</Typography.Title>
            <Col lg={{ span: "24" }} className="mt-15">
              <CustomTable details={observedValues ? observedValues : []} headers={OBSERVED_VALUES_HEADER}></CustomTable>
            </Col>
          </Row>
          <Row style={{ marginBottom: '35px', marginTop: '5px', textAlign: 'left', width: "100%" }}>
            <Col lg={{ span: "11" }}>
              <CustomTable details={DESCRIPTOR_TABLE.body} headers={DESCRIPTOR_TABLE.headers}></CustomTable>
            </Col>
            <Col lg={{ span: "11", offset: "1" }}>
              <CustomTable details={MARKING_TABLE.body} headers={MARKING_TABLE.headers}></CustomTable>
            </Col>
          </Row>
        </Drawer>

        <Drawer
          title={
            <Typography.Title level={4}>
              Teachers for grade 10
                  </Typography.Title>
          }
          width={700}
          visible={showTeacherVisible}
          onClose={() => hideTeacher()}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <TeacherForm selectedTeacherAssgined={selectedTeacherAssgined} add={add} selectedTeacher={selectedTeacher} gradeLevel={"10"} />
        </Drawer>

        <Drawer
          title={
            <Typography.Title level={4}>
              Advisor for grade 10
                  </Typography.Title>
          }
          width={700}
          visible={showAdvisorVisible}
          onClose={() => hideAdvisor()}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <AdvisoryForm selectedTeacherAssgined={selectedAdvisoryAssignedGrade10} selectedTeacher={availableAdvisors} add={addAdvisor} gradeLevel={"10"} />
        </Drawer>
      </Spin>
    </Card>


  );
}

export default GradePage;

