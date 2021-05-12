import React from 'react';
import { Form, Row, Col, Select, Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import Subjects from '../modelTemplate/subjects';

const { Option } = Select;

const TeacherAssignment = ({ teacherList = [], subjectAssignedTeachers = [], level = 0, submit }) => {

  const onFinish = async () => {
    submit(subjectAssignedTeachers, level);
  };

  if(!subjectAssignedTeachers.length) subjectAssignedTeachers = [];

  let subjects = JSON.parse(JSON.stringify(Subjects.getSubjects(level)));

  const getFormInitialVal = () => {
    let valHolder = {};

    subjectAssignedTeachers.map(topic => {
      valHolder[topic.subjectName] = topic.teacher.idNumber;
    });
    return valHolder;
  };

  const handleChange = (id, subjectName) => {
    let targetIndex = subjectAssignedTeachers.findIndex(topic => topic.subjectName === subjectName);
    let teacher = teacherList.find(teacher => teacher.idNumber === id);
    let rmNum = 1;
    let subjectHolder = {
      subjectName: subjectName,
      teacher: teacher
    };

    if (targetIndex === -1) {
      rmNum = 0;
      targetIndex = subjectAssignedTeachers.length;
    };

    subjectAssignedTeachers.splice(targetIndex, rmNum, subjectHolder);
  };

  const renderSubjects = () => {
    return (
      <>
        { subjects.map((subjectName, key) => {
          return (
            <Col span={12} key={subjectName}>
              <Form.Item label={subjectName} name={subjectName}>
                <Select name={subjectName} onChange={(value) => { handleChange(value, subjectName) }}>
                  {teacherList.map(teacher => {
                    return <Option value={teacher.idNumber} key={subjectName + teacher.idNumber}>{teacher.firstName + " " + teacher.lastName}</Option>
                  })}
                </Select>
              </Form.Item>
            </Col>
          )
        })}
      </>
    )
  }

  return (
    <Form name="grades_input" initialValues={getFormInitialVal()} onFinish={onFinish} autoComplete="off" style={{ marginLeft: '28px', marginBottom: '30px' }}>
      <Row gutter={16} >
        {renderSubjects()}
      </Row>
      <Button className="btn-save" htmlType="submit">
        <CheckCircleFilled type="check-circle" /> Save
      </Button>
    </Form>
  );
}

export default TeacherAssignment;
