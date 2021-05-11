import React from 'react';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

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

// const getQuarterNum = (quarter) => {
//   switch (quarter) {
//     case 'secondQuarter':
//       return '2';
//     case 'thirdQuarter':
//       return '3';
//     case 'fourthQuarter':
//       return '4';
//     default:
//       return '1';
//   };
// };

const GradesInput = ({ gradeSubjectTeachers = [], isAdviser = false, record = {} }) => {

  let { updateGrades, setInput, updatedInputs, getQuarterNum } = GradeInputAction({ level: Number(record.gradeLevel), grades: record.subjects, record, isAdviser });
  const userRole = JSON.parse(sessionStorage.user).role;

  const onFinish = async () => {
    await updateGrades(isAdviser);
  };

  const getValue = (subject, quarter) => {
    // let isActive = sessionStorage.quarter === getQuarterNum(quarter);
    let rating = 0;
    let lowestRating = 50;
    if (!isAdviser) {
      rating = subject.recommendedGrade[quarter] ? subject.recommendedGrade[quarter]: 0;
      
      // rating = lowestRating;
      // if (isActive && rating === 0) {
      //   setInput(rating, subject.subjectName, quarter)
      // };
    } else if (isAdviser) {
      if (subject.recommendedGrade[quarter] && subject.recommendedGrade[quarter] !== subject.subjectGrade[quarter]) {
        rating = subject.recommendedGrade[quarter];
      } else {
        rating = subject.subjectGrade[quarter];
      };
    }
    return rating;
  };

  const renderButton = () => {
    let role = JSON.parse(sessionStorage.user).role;
    if (role !== 'Teacher') return '';
    return (
      <Button className="btn-save" htmlType="submit" style={{ marginTop: '10px' }}>
        <CheckCircleFilled type="check-circle" /> Update
      </Button>
    )
  };

  const renderSubjects = () => {
    let teacherSubjects = [];
    let teacherId = JSON.parse(sessionStorage.user).idNumber;
    gradeSubjectTeachers.map(item => {

      if (item.teacher.idNumber === teacherId) teacherSubjects.push(item.subjectName);
    });

    return (
      <>
        { updatedInputs.map((subject) => {

          if (!isAdviser && !teacherSubjects.includes(subject.subjectName)) return '';

          return (
            <Col span={12} key={subject.subjectName}>
              <Card title={subject.subjectName} disabled={true} style={{ width: 300 }}>
                <Row gutter={16}>
                  {Object.keys(subject.subjectGrade).map(quarter => {
                    return (
                      <Col span={12} key={subject.subjectName + quarter}>
                        <Form.Item label={getQuarterName(quarter)} >
                          <Input
                            value={getValue(subject, quarter)}
                            onChange={(e) => { setInput(e.target.value, subject.subjectName, quarter, isAdviser) }}
                            disabled={userRole !== 'Teacher' || sessionStorage.quarter !== getQuarterNum(quarter)}
                            style={{ border: subject.recommendedGrade[quarter] !== subject.subjectGrade[quarter] && subject.subjectGrade[quarter] !== 0 ? '1px solid red' : '' }}
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
    <Form name="grades_input" onFinish={onFinish} autoComplete="off" style={{ marginLeft: '28px', marginBottom: '30px' }}>
      <Row gutter={16} >
        {updatedInputs.length > 0 ?
          renderSubjects()
          : ''}
      </Row>
      {renderButton()}
    </Form>
  );
}

export default GradesInput;
