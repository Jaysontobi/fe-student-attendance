import React from 'react';
import { Drawer, Card, Button, Typography, Icon, Row, Col, Spin } from 'antd';
import { PlusCircleOutlined, RiseOutlined } from '@ant-design/icons';
import GradeForm from './gradeForm'
import TeacherForm from './teacherForm'

import GradeAction from './gradeAction'
import AdvisoryForm from './advisoryForm'
import AdvisorAction from './advisoryAction';
import StudentGradeTable from '../userDetails/gradeTable'
import GradeTable from './gradeTable'
import TeacherAction from './teacherAction';
import AttendanceTable from '../userDetails/attendanceTable';
import AttendanceAction from '../userDetails/attendanceAction';

const GradePage = () => {


  let {
    addGrade,
    showGradeVisible,
    setShowGradeVisible,
    showGrade,
    grade9Details,
    selectedGrade,
    editGrade,
    selectedTeacher,
    selectedGradeUser,
    upgradeStudent,
    setSelectedListOfStudent,
    loading
  } = GradeAction({});

  let {
    showTeacherVisible,
    hideTeacher,
    showTeacher,
    add,
    selectedTeacherAssignedGrade9,
    selectedTeacherAssgined
  } = TeacherAction({});

  let {
    showAdvisorVisible,
    hideAdvisor,
    showAdvisor,
    addAdvisor,
    selectedAdvisoryAssignedGrade9,
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
            <Typography.Title level={3} className="ml-15">Grade9 Management</Typography.Title>
          </Col>
          <Col lg={{ span: 10 }}>
            {JSON.parse(sessionStorage.user).role === "Admin" ? <Button className="right ml-10 btn-add" type="save " onClick={() => showTeacher("9")}>
              <PlusCircleOutlined type="minus-circle" /> Add teacher
             </Button> : null
            }
            {JSON.parse(sessionStorage.user).role === "Admin" ? <Button className="right ml-10 bg-gray text-white" type="save " onClick={() => showAdvisor("9")}>
              <PlusCircleOutlined type="minus-circle" /> Add Advisor
             </Button> : null}
            {JSON.parse(sessionStorage.user).role === "Admin" ?
              <Button className="right btn-save" onClick={() => upgradeStudent()}>
                <RiseOutlined type="minus-circle" /> Upgrade
             </Button>
              : null}
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: "24" }}>
            <GradeTable setSelectedListOfStudent={setSelectedListOfStudent} details={grade9Details.list} />
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
          <GradeForm upgradeStudent={upgradeStudent} add={addGrade} update={editGrade} selectedTeacher={selectedTeacher} gradeLevel={"9"} selectedTeacherAssignedGrade={selectedTeacherAssignedGrade9} selectedGrade={selectedGrade} />
          <StudentGradeTable details={selectedGradeUser ? selectedGradeUser : []} />
          <Typography.Title level={4} style={{marginLeft: '20px'}}>
              Student Attendance
          </Typography.Title>
          <AttendanceTable details={attendances} />
        </Drawer>

        <Drawer
          title={
            <Typography.Title level={4}>
              Teachers for grade 9
                  </Typography.Title>
          }
          width={700}
          visible={showTeacherVisible}
          onClose={() => hideTeacher()}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <TeacherForm selectedTeacherAssgined={selectedTeacherAssgined} add={add} selectedTeacher={selectedTeacher} gradeLevel={"9"} />
        </Drawer>

        <Drawer
          title={
            <Typography.Title level={4}>
              Advisor for grade 9
                  </Typography.Title>
          }
          width={700}
          visible={showAdvisorVisible}
          onClose={() => hideAdvisor()}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <AdvisoryForm selectedTeacherAssgined={selectedAdvisoryAssignedGrade9} selectedTeacher={availableAdvisors} add={addAdvisor} gradeLevel={"9"} />
        </Drawer>
      </Spin>
    </Card>


  );
}

export default GradePage;

