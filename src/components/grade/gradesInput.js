import React, { useState } from 'react';
import { Form, Input, Button, Space, Table, Row, Col, Card } from 'antd';

import GradeInputAction from './gradeInputAction';

const getQuarterName = (quarter) => {
  switch (quarter) {
    case 'secondQuarter':
      return '2nd Q';
    case 'thirdQuarter':
      return '3rd Q';
    case 'fourthQuarter':
      return '4th Q';
    default:
      return '1st Q';
  };
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

const GradesInput = ({level=0, grades=[], gradeSubjectTeachers=[], isAdvisor=false}) => {

  let { updateGrades, setInput, updatedInputs } = GradeInputAction({level, grades});
  const userRole = JSON.parse(sessionStorage.user).role;

  const onFinish = async () => {
    await updateGrades();
  };

  const renderSubjects = () => {
    let teacherSubjects = [];
    let teacherId = JSON.parse(sessionStorage.user).idNumber;
    gradeSubjectTeachers.map(item => {

      if(item.teacher.idNumber === teacherId) teacherSubjects.push(item.subjectName);
    });
 
    return (
      <>
        { updatedInputs.map((subject) => {

          if(!teacherSubjects.includes(subject.subjectName)) return '';

          return (
            <Col span={12} key={subject.subjectName}>
              <Card title={subject.subjectName} disabled={true} style={{ width: 300 }}>
                <Row gutter={16}>
                  {Object.keys(subject.subjectGrade).map(quarter => {
                    return (
                      <Col span={12} key={subject.subjectName + quarter}>
                        <Form.Item label={getQuarterName(quarter)} >
                          <Input
                            value={!isAdvisor ? subject.recommendedGrade[quarter] : subject.subjectGrade[quarter]}
                            onChange={(e) => {setInput(e.target.value, subject.subjectName, quarter)}}
                            disabled={userRole !== 'Teacher' || sessionStorage.quarter !== getQuarterNum(quarter)}
                          />
                        </Form.Item>
                      </Col>
                    )
                  })}
                </Row>
              </Card>
            </Col>
          )
        })
        }
      </>
    )
  }

  return (
    <Form name="grades_input" onFinish={onFinish} autoComplete="off" style={{ marginLeft: '28px' }}>
      <Row gutter={16} >
        {updatedInputs.length > 0 ?
          renderSubjects()
          : ''}
      </Row>
      <Button className="btn-save" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}

export default GradesInput;
