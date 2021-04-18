import React, { useState } from 'react';
import { Form, Input, DatePicker, Select } from 'formik-antd'
import { Formik } from 'formik';
import { Row, Col, Button, message, Spin, Card, Collapse } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
const { Option } = Select;
const { Panel } = Collapse;

const Grade1EditForm = ({ upgradeStudent, add, update, selectedGrade, selectedTeacher, selectedTeacherAssignedGrade, gradeLevel, isAdviser = false }) => {

  let [loading, setLoading] = useState(false);
  const userRole = JSON.parse(sessionStorage.user).role;

  let lowestGrade = 50;
  const hasUpdate = (subjectName = '', quarter = '') => {
    let subject = selectedGrade.subjects.find(subject => subject.subjectName === subjectName);

    if (subject && subject.recommendedGrade && subject.recommendedGrade[quarter] && subject.recommendedGrade[quarter] !== subject.subjectGrade[quarter]) return true;

    return false;
  };

  let updatesHolder = {};
  let mapehObj = {
    MAPEH1: 0,
    MAPEH2: 0,
    MAPEH3: 0,
    MAPEH4: 0
  };

  const autoFillGrade = (subjectName = '', quarter = '', field = '', isDefault = false, quarterNum = 0) => {
    let activeQuarter = sessionStorage.quarter;
    let index = selectedGrade.subjects.findIndex(subject => subject.subjectName === subjectName);
    let value = (selectedGrade.subjects[index] && selectedGrade.subjects[index].recommendedGrade) ? selectedGrade.subjects[index].recommendedGrade[quarter] : null;
    let dafaultVal = (selectedGrade.subjects[index]) ? selectedGrade.subjects[index].subjectGrade[quarter] : lowestGrade;
    dafaultVal = (dafaultVal && dafaultVal >= 50) ? dafaultVal : (activeQuarter === quarterNum) ? lowestGrade : 0;
    value = (isDefault) ? dafaultVal : value;
    let holder = {
      [field]: value
    };
    updatesHolder = Object.assign(updatesHolder, holder);
    return value;
  };

  //used to get the confirmed grades
  const getGrade = (subjectName = '', quarter = '') => {
    let subject = selectedGrade.subjects.find(subject => subject.subjectName === subjectName);
    if (subject) {
      return subject.subjectGrade[quarter];
    } else {
      return '0';
    };
  };

  const getMAPEHGrades = (quarter) => {
    let q1 = document.getElementbyId('Music' + quarter).value;
    let q2 = document.getElementbyId('Art' + quarter).value;
    let q3 = document.getElementbyId('PE' + quarter).value;
    let q4 = document.getElementbyId('Health' + quarter).value;
    let average = (q1 + q2 + q3 + q4) / 4;
    let key = 'MAPEH' + quarter;
    mapehObj[key] = average;
  };

  return (
    <Formik
      initialValues={selectedGrade}
      enableReinitialize={true}
      onSubmit={async inputValues => {

        let values = {};
        values = Object.assign(values, updatesHolder);
        values = Object.assign(values, inputValues);

        let newValues = {
          _id: values._id
        };
        let English = {};
        let Filipino = {};
        let Science = {};
        let Math = {};
        let MAPEH = {};
        let Values = {};
        let Music = {};
        let Art = {};
        let PE = {};
        let Health = {};

        if (values.English1 || values.English2 || values.English3 || values.English4) {
          English = {
            firstQuarter: values.English1,
            secondQuarter: values.English2,
            thirdQuarter: values.English3,
            fourthQuarter: values.English4
          }
          newValues.English = English;
        }
        if (values.Filipino1 || values.Filipino2 || values.Filipino3 || values.Filipino4) {
          Filipino = {
            firstQuarter: values.Filipino1,
            secondQuarter: values.Filipino2,
            thirdQuarter: values.Filipino3,
            fourthQuarter: values.Filipino4
          }
          newValues.Filipino = Filipino;
        }
        if (values.Science1 || values.Science2 || values.Science3 || values.Science4) {
          Science = {
            firstQuarter: values.Science1,
            secondQuarter: values.Science2,
            thirdQuarter: values.Science3,
            fourthQuarter: values.Science4
          }
          newValues.Science = Science;
        }
        if (values.Math1 || values.Math2 || values.Math3 || values.Math4) {
          Math = {
            firstQuarter: values.Math1,
            secondQuarter: values.Math2,
            thirdQuarter: values.Math3,
            fourthQuarter: values.Math4
          }
          newValues.Math = Math;
        }
        if (values.MAPEH1 || values.MAPEH2 || values.MAPEH3 || values.MAPEH4) {
          MAPEH = {
            firstQuarter: values.MAPEH1,
            secondQuarter: values.MAPEH2,
            thirdQuarter: values.MAPEH3,
            fourthQuarter: values.MAPEH4
          }
          newValues.MAPEH = MAPEH;
        }
        if (values.Values1 || values.Values2 || values.Values3 || values.Values4) {
          Values = {
            firstQuarter: values.Values1,
            secondQuarter: values.Values2,
            thirdQuarter: values.Values3,
            fourthQuarter: values.Values4
          }
          newValues.Values = Values;
        };

        if (values.Music1 || values.Music2 || values.Music3 || values.Music4) {
          Music = {
            firstQuarter: values.Music1,
            secondQuarter: values.Music2,
            thirdQuarter: values.Music3,
            fourthQuarter: values.Music4
          }
          newValues.Music = Music;
        };

        if (values.Art1 || values.Art2 || values.Art3 || values.Art4) {
          Art = {
            firstQuarter: values.Art1,
            secondQuarter: values.Art2,
            thirdQuarter: values.Art3,
            fourthQuarter: values.Art4
          }
          newValues.Art = Art;
        };

        if (values.PE1 || values.PE2 || values.PE3 || values.PE4) {
          PE = {
            firstQuarter: values.PE1,
            secondQuarter: values.PE2,
            thirdQuarter: values.PE3,
            fourthQuarter: values.PE4
          }
          newValues.PE = PE;
        };

        if (values.Health1 || values.Health2 || values.Health3 || values.Health4) {
          Health = {
            firstQuarter: values.Health1,
            secondQuarter: values.Health2,
            thirdQuarter: values.Health3,
            fourthQuarter: values.Health4
          }
          newValues.Health = Health;
        };
        update(newValues, isAdviser);
      }}
      render={({ values, touched, setFieldValue }) => (

        <Spin spinning={loading} delay={500}>
          <Form className="p-30" >
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item label="ID Number" name="idNumber">
                  <Input disabled={true} value={values.student.idNumber} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item label="Name" name="name">
                  <Input disabled={true} value={values.student.firstName + " " + values.student.middleName + " " + values.student.lastName} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item label="School Year" name="schoolYear">
                  <Input disabled={true} name="schoolYear" />
                </Form.Item>
              </Col>
            </Row>
            <>
              <Row gutter={16}>
                {(isAdviser ||
                  selectedTeacherAssignedGrade &&
                  selectedTeacherAssignedGrade.subjects &&
                  selectedTeacherAssignedGrade.subjects != undefined &&
                  selectedTeacherAssignedGrade.subjects[0] &&
                  selectedTeacherAssignedGrade.subjects[0].teacher &&
                  selectedTeacherAssignedGrade.subjects[0].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                  ?
                  <Col span={12}>
                    <Card title="English" disabled={true} style={{ width: 300 }}>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="1st Q" name="values">
                            <Input
                              style={{ border: hasUpdate('English', 'firstQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "1"}
                              name="English1"
                              defaultValue={hasUpdate('English', 'firstQuarter') ?
                                autoFillGrade('English', 'firstQuarter', 'English1') :
                                autoFillGrade('English', 'firstQuarter', 'English1', true, '1')}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="2nd Q" name="values">
                            <Input
                              style={{ border: hasUpdate('English', 'secondQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "2"}
                              name="English2"
                              defaultValue={hasUpdate('English', 'secondQuarter') ?
                                autoFillGrade('English', 'secondQuarter', 'English2') :
                                autoFillGrade('English', 'secondQuarter', 'English2', true, '2')} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="3rd Q" name="values">
                            <Input
                              style={{ border: hasUpdate('English', 'thirdQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "3"}
                              name="English3"
                              defaultValue={hasUpdate('English', 'thirdQuarter') ?
                                autoFillGrade('English', 'thirdQuarter', 'English3') :
                                autoFillGrade('English', 'thirdQuarter', 'English3', true, '3')} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="4th Q" name="values">
                            <Input
                              style={{ border: hasUpdate('English', 'fourthQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "4"}
                              name="English4"
                              defaultValue={hasUpdate('English', 'fourthQuarter') ?
                                autoFillGrade('English', 'fourthQuarter', 'English4') :
                                autoFillGrade('English', 'fourthQuarter', 'English4', true, '4')} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </Col> :
                  null}
                {(isAdviser ||
                  selectedTeacherAssignedGrade.subjects[1] &&
                  selectedTeacherAssignedGrade.subjects[1].teacher &&
                  selectedTeacherAssignedGrade.subjects[1].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                  ?
                  <Col span={12}>
                    <Card title="Filipino" disabled={true} style={{ width: 300 }}>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="1st Q" name="values">
                            <Input
                              style={{ border: hasUpdate('Filipino', 'firstQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "1"}
                              name="Filipino1"
                              defaultValue={hasUpdate('Filipino', 'firstQuarter') ?
                                autoFillGrade('Filipino', 'firstQuarter', 'Filipino1') :
                                autoFillGrade('Filipino', 'firstQuarter', 'Filipino1', true, '1')}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="2nd Q" name="values">
                            <Input
                              style={{ border: hasUpdate('Filipino', 'secondQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "2"}
                              name="Filipino2"
                              defaultValue={hasUpdate('Filipino', 'secondQuarter') ?
                                autoFillGrade('Filipino', 'secondQuarter', 'Filipino2') :
                                autoFillGrade('Filipino', 'secondQuarter', 'Filipino2', true, '2')}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="3rd Q" name="values">
                            <Input
                              style={{ border: hasUpdate('Filipino', 'thirdQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "3"}
                              name="Filipino3"
                              defaultValue={hasUpdate('Filipino', 'thirdQuarter') ?
                                autoFillGrade('Filipino', 'thirdQuarter', 'Filipino3') :
                                autoFillGrade('Filipino', 'thirdQuarter', 'Filipino3', true, '3')}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="4th Q" name="values">
                            <Input
                              style={{ border: hasUpdate('Filipino', 'fourthQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "4"}
                              name="Filipino4"
                              defaultValue={hasUpdate('Filipino', 'fourthQuarter') ?
                                autoFillGrade('Filipino', 'fourthQuarter', 'Filipino4') :
                                autoFillGrade('Filipino', 'fourthQuarter', 'Filipino4', true, '4')}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>

                  </Col>
                  : null}

              </Row>
              <Row gutter={16}>
                {(isAdviser ||
                  selectedTeacherAssignedGrade &&
                  selectedTeacherAssignedGrade.subjects &&
                  selectedTeacherAssignedGrade.subjects != undefined &&
                  selectedTeacherAssignedGrade.subjects.length !== 0 &&
                  selectedTeacherAssignedGrade.subjects[2] &&
                  selectedTeacherAssignedGrade.subjects[2] &&
                  selectedTeacherAssignedGrade.subjects[2].teacher &&
                  selectedTeacherAssignedGrade.subjects[2].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                  ?
                  <Col span={12}>
                    <Card title="Science" disabled={true} style={{ width: 300 }}>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="1st Q" name="values">
                            <Input
                              style={{ border: hasUpdate('Science', 'firstQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "1"}
                              name="Science1"
                              defaultValue={hasUpdate('Science', 'firstQuarter') ?
                                autoFillGrade('Science', 'firstQuarter', 'Science1') :
                                autoFillGrade('Science', 'firstQuarter', 'Science1', true, '1')
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="2nd Q" name="values">
                            <Input
                              style={{ border: hasUpdate('Science', 'secondQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "2"}
                              name="Science2"
                              defaultValue={hasUpdate('Science', 'secondQuarter') ?
                                autoFillGrade('Science', 'secondQuarter', 'Science2') :
                                autoFillGrade('Science', 'secondQuarter', 'Science2', true, '2')
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="3rd Q" name="values">
                            <Input
                              style={{ border: hasUpdate('Science', 'thirdQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "3"}
                              name="Science3"
                              defaultValue={hasUpdate('Science', 'thirdQuarter') ?
                                autoFillGrade('Science', 'thirdQuarter', 'Science3') :
                                autoFillGrade('Science', 'thirdQuarter', 'Science3', true, '3')
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="4th Q" name="values">
                            <Input
                              style={{ border: hasUpdate('Science', 'fourthQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "4"}
                              name="Science4"
                              defaultValue={hasUpdate('Science', 'fourthQuarter') ?
                                autoFillGrade('Science', 'fourthQuarter', 'Science4') :
                                autoFillGrade('Science', 'fourthQuarter', 'Science4', true, '4')
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </Col> :
                  null}
                {(isAdviser ||
                  selectedTeacherAssignedGrade.subjects[3] &&
                  selectedTeacherAssignedGrade.subjects[3].teacher &&
                  selectedTeacherAssignedGrade.subjects[3].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                  ?
                  <Col span={12}>
                    <Card title="Math" disabled={true} style={{ width: 300 }}>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="1st Q" name="values">
                            <Input
                              style={{ border: hasUpdate('Math', 'firstQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "1"}
                              name="Math1"
                              defaultValue={hasUpdate('Math', 'firstQuarter') ?
                                autoFillGrade('Math', 'firstQuarter', 'Math1') :
                                autoFillGrade('Math', 'firstQuarter', 'Math1', true, '1')
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="2nd Q" name="values">
                            <Input
                              style={{ border: hasUpdate('Math', 'secondQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "2"}
                              name="Math2"
                              defaultValue={hasUpdate('Math', 'secondQuarter') ?
                                autoFillGrade('Math', 'secondQuarter', 'Math2') :
                                autoFillGrade('Math', 'secondQuarter', 'Math2', true, '2')
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="3rd Q" name="values">
                            <Input
                              style={{ border: hasUpdate('Math', 'thirdQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "3"}
                              name="Math3"
                              defaultValue={hasUpdate('Math', 'thirdQuarter') ?
                                autoFillGrade('Math', 'thirdQuarter', 'Math3') :
                                autoFillGrade('Math', 'thirdQuarter', 'Math3', true, '3')
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="4th Q" name="values">
                            <Input
                              style={{ border: hasUpdate('Math', 'fourthQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "4"}
                              name="Math4"
                              defaultValue={hasUpdate('Math', 'fourthQuarter') ?
                                autoFillGrade('Math', 'fourthQuarter', 'Math4') :
                                autoFillGrade('Math', 'fourthQuarter', 'Math4', true, 4)
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  : null}

              </Row>
              <Row gutter={16}>
                {/* {(isAdviser ||
                  selectedTeacherAssignedGrade.subjects[4] &&
                  selectedTeacherAssignedGrade.subjects[4].teacher &&
                  selectedTeacherAssignedGrade.subjects[4].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                  ?
                  <Col span={12}>
                    <Card title="MAPEH" disabled={true} style={{ width: 300 }}>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="1st Q" name="values">
                            <Input
                              style={{ border: hasUpdate('MAPEH', 'firstQuarter') ? '1px solid red' : '' }}
                              disabled={userRole === 'Teacher' || sessionStorage.quarter !== "1"}
                              name="MAPEH1"
                              defaultValue={hasUpdate('MAPEH', 'firstQuarter') ?
                                autoFillGrade('MAPEH', 'firstQuarter', 'MAPEH1') :
                                autoFillGrade('MAPEH', 'firstQuarter', 'MAPEH1', true, '1')
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="2nd Q" name="values">
                            <Input
                              style={{ border: hasUpdate('MAPEH', 'secondQuarter') ? '1px solid red' : '' }}
                              disabled={userRole === 'Teacher' || sessionStorage.quarter !== "2"}
                              name="MAPEH2"
                              defaultValue={hasUpdate('MAPEH', 'secondQuarter') ?
                                autoFillGrade('MAPEH', 'secondQuarter', 'MAPEH2') :
                                autoFillGrade('MAPEH', 'secondQuarter', 'MAPEH2', true, '2')
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="3rd Q" name="values">
                            <Input
                              style={{ border: hasUpdate('MAPEH', 'thirdQuarter') ? '1px solid red' : '' }}
                              disabled={userRole === 'Teacher' || sessionStorage.quarter !== "3"}
                              name="MAPEH3"
                              defaultValue={hasUpdate('MAPEH', 'thirdQuarter') ?
                                autoFillGrade('MAPEH', 'thirdQuarter', 'MAPEH3') :
                                autoFillGrade('MAPEH', 'thirdQuarter', 'MAPEH3', true, '3')
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="4th Q" name="values">
                            <Input
                              style={{ border: hasUpdate('MAPEH', 'fourthQuarter') ? '1px solid red' : '' }}
                              disabled={userRole === 'Teacher' || sessionStorage.quarter !== "4"}
                              name="MAPEH4"
                              defaultValue={hasUpdate('MAPEH', 'fourthQuarter') ?
                                autoFillGrade('MAPEH', 'fourthQuarter', 'MAPEH4') :
                                autoFillGrade('MAPEH', 'fourthQuarter', 'MAPEH4', true, '4')
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </Col> :
                  null} */}
                {(isAdviser ||
                  selectedTeacherAssignedGrade.subjects[5] &&
                  selectedTeacherAssignedGrade.subjects[5].teacher &&
                  selectedTeacherAssignedGrade.subjects[5].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                  ?
                  <Col span={12}>
                    <Card title="Values" disabled={true} style={{ width: 300 }}>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="1st Q" name="values">
                            <Input
                              style={{ border: hasUpdate('Values', 'firstQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "1"}
                              name="Values1"
                              defaultValue={hasUpdate('Values', 'firstQuarter') ?
                                autoFillGrade('Values', 'firstQuarter', 'Values1') :
                                autoFillGrade('Values', 'firstQuarter', 'Values1', true, '1')
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="2nd Q" name="values">
                            <Input
                              style={{ border: hasUpdate('Values', 'secondQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "2"}
                              name="Values2"
                              defaultValue={hasUpdate('Values', 'secondQuarter') ?
                                autoFillGrade('Values', 'secondQuarter', 'Values2') :
                                autoFillGrade('Values', 'secondQuarter', 'Values2', true, '2')
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="3rd Q" name="values">
                            <Input
                              style={{ border: hasUpdate('Values', 'thirdQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "3"}
                              name="Values3"
                              defaultValue={hasUpdate('Values', 'thirdQuarter') ?
                                autoFillGrade('Values', 'thirdQuarter', 'Values3') :
                                autoFillGrade('Values', 'thirdQuarter', 'Values3', true, '3')
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="4th Q" name="values">
                            <Input
                              style={{ border: hasUpdate('Values', 'fourthQuarter') ? '1px solid red' : '' }}
                              disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "4"}
                              name="Values4"
                              defaultValue={hasUpdate('Values', 'fourthQuarter') ?
                                autoFillGrade('Values', 'fourthQuarter', 'Values4') :
                                autoFillGrade('Values', 'thirdQuarter', 'Values3', true, '4')
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  : null}

              </Row>
              {/*============================================================================ */}
              {(isAdviser ||
                selectedTeacherAssignedGrade.subjects[4] &&
                selectedTeacherAssignedGrade.subjects[4].teacher &&
                selectedTeacherAssignedGrade.subjects[4].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                ? (
                  <React.Fragment>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Card title="Music" disabled={true} style={{ width: 300 }}>
                          <Row gutter={16}>
                            <Col span={12}>
                              <Form.Item label="1st Q" name="values">
                                <Input
                                  style={{ border: hasUpdate('Music', 'firstQuarter') ? '1px solid red' : '' }}
                                  disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "1"}
                                  name="Music1"
                                  defaultValue={hasUpdate('Music', 'firstQuarter') ?
                                    autoFillGrade('Music', 'firstQuarter', 'Music1') :
                                    autoFillGrade('Music', 'firstQuarter', 'Music1', true, '1')
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item label="2nd Q" name="values">
                                <Input
                                  style={{ border: hasUpdate('Music', 'secondQuarter') ? '1px solid red' : '' }}
                                  disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "2"}
                                  name="Music2"
                                  defaultValue={hasUpdate('Music', 'secondQuarter') ?
                                    autoFillGrade('Music', 'secondQuarter', 'Music2') :
                                    autoFillGrade('Music', 'secondQuarter', 'Music2', true, '2')
                                  }
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={16}>
                            <Col span={12}>
                              <Form.Item label="3rd Q" name="values">
                                <Input
                                  style={{ border: hasUpdate('Music', 'thirdQuarter') ? '1px solid red' : '' }}
                                  disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "3"}
                                  name="Music3"
                                  defaultValue={hasUpdate('Music', 'thirdQuarter') ?
                                    autoFillGrade('Music', 'thirdQuarter', 'Music3') :
                                    autoFillGrade('Music', 'thirdQuarter', 'Music3', true, '3')
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item label="4th Q" name="values">
                                <Input
                                  style={{ border: hasUpdate('Music', 'fourthQuarter') ? '1px solid red' : '' }}
                                  disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "4"}
                                  name="Music4"
                                  defaultValue={hasUpdate('Music', 'fourthQuarter') ?
                                    autoFillGrade('Music', 'fourthQuarter', 'Music4') :
                                    autoFillGrade('Music', 'fourthQuarter', 'Music4', true, '4')
                                  }
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                      <Col span={12}>
                        <Card title="Art" disabled={true} style={{ width: 300 }}>
                          <Row gutter={16}>
                            <Col span={12}>
                              <Form.Item label="1st Q" name="values">
                                <Input
                                  style={{ border: hasUpdate('Art', 'firstQuarter') ? '1px solid red' : '' }}
                                  disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "1"}
                                  name="Art1"
                                  defaultValue={hasUpdate('Art', 'firstQuarter') ?
                                    autoFillGrade('Art', 'firstQuarter', 'Art1') :
                                    autoFillGrade('Art', 'firstQuarter', 'Art1', true, '1')
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item label="2nd Q" name="values">
                                <Input
                                  style={{ border: hasUpdate('Art', 'secondQuarter') ? '1px solid red' : '' }}
                                  disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "2"}
                                  name="Art2"
                                  defaultValue={hasUpdate('Art', 'secondQuarter') ?
                                    autoFillGrade('Art', 'secondQuarter', 'Art2') :
                                    autoFillGrade('Art', 'secondQuarter', 'Art2', true, '2')
                                  }
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={16}>
                            <Col span={12}>
                              <Form.Item label="3rd Q" name="values">
                                <Input
                                  style={{ border: hasUpdate('Art', 'thirdQuarter') ? '1px solid red' : '' }}
                                  disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "3"}
                                  name="Art3"
                                  defaultValue={hasUpdate('Art', 'thirdQuarter') ?
                                    autoFillGrade('Art', 'thirdQuarter', 'Art3') :
                                    autoFillGrade('Art', 'thirdQuarter', 'Art3', true, '3')
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item label="4th Q" name="values">
                                <Input
                                  style={{ border: hasUpdate('Art', 'fourthQuarter') ? '1px solid red' : '' }}
                                  disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "4"}
                                  name="Art4"
                                  defaultValue={hasUpdate('Art', 'fourthQuarter') ?
                                    autoFillGrade('Art', 'fourthQuarter', 'Art4') :
                                    autoFillGrade('Art', 'thirdQuarter', 'Art4', true, '4')
                                  }
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Card title="PE" disabled={true} style={{ width: 300 }}>
                          <Row gutter={16}>
                            <Col span={12}>
                              <Form.Item label="1st Q" name="values">
                                <Input
                                  style={{ border: hasUpdate('PE', 'firstQuarter') ? '1px solid red' : '' }}
                                  disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "1"}
                                  name="PE1"
                                  defaultValue={hasUpdate('PE', 'firstQuarter') ?
                                    autoFillGrade('PE', 'firstQuarter', 'PE1') :
                                    autoFillGrade('PE', 'firstQuarter', 'PE1', true, '1')
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item label="2nd Q" name="values">
                                <Input
                                  style={{ border: hasUpdate('PE', 'secondQuarter') ? '1px solid red' : '' }}
                                  disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "2"}
                                  name="PE2"
                                  defaultValue={hasUpdate('PE', 'secondQuarter') ?
                                    autoFillGrade('PE', 'secondQuarter', 'PE2') :
                                    autoFillGrade('PE', 'secondQuarter', 'PE2', true, '2')
                                  }
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={16}>
                            <Col span={12}>
                              <Form.Item label="3rd Q" name="values">
                                <Input
                                  style={{ border: hasUpdate('PE', 'thirdQuarter') ? '1px solid red' : '' }}
                                  disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "3"}
                                  name="PE3"
                                  defaultValue={hasUpdate('PE', 'thirdQuarter') ?
                                    autoFillGrade('PE', 'thirdQuarter', 'PE3') :
                                    autoFillGrade('PE', 'thirdQuarter', 'PE3', true, '3')
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item label="4th Q" name="values">
                                <Input
                                  style={{ border: hasUpdate('PE', 'fourthQuarter') ? '1px solid red' : '' }}
                                  disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "4"}
                                  name="PE4"
                                  defaultValue={hasUpdate('PE', 'fourthQuarter') ?
                                    autoFillGrade('PE', 'fourthQuarter', 'PE4') :
                                    autoFillGrade('PE', 'fourthQuarter', 'PE4', true, '4')
                                  }
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                      <Col span={12}>
                        <Card title="Health" disabled={true} style={{ width: 300 }}>
                          <Row gutter={16}>
                            <Col span={12}>
                              <Form.Item label="1st Q" name="values">
                                <Input
                                  style={{ border: hasUpdate('Health', 'firstQuarter') ? '1px solid red' : '' }}
                                  disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "1"}
                                  name="Health1"
                                  defaultValue={hasUpdate('Health', 'firstQuarter') ?
                                    autoFillGrade('Health', 'firstQuarter', 'Health1') :
                                    autoFillGrade('Health', 'firstQuarter', 'Health1', true, '1')
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item label="2nd Q" name="values">
                                <Input
                                  style={{ border: hasUpdate('Health', 'secondQuarter') ? '1px solid red' : '' }}
                                  disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "2"}
                                  name="Health2"
                                  defaultValue={hasUpdate('Health', 'secondQuarter') ?
                                    autoFillGrade('Health', 'secondQuarter', 'Health2') :
                                    autoFillGrade('Health', 'secondQuarter', 'Health2', true, '2')
                                  }
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={16}>
                            <Col span={12}>
                              <Form.Item label="3rd Q" name="values">
                                <Input
                                  style={{ border: hasUpdate('Health', 'thirdQuarter') ? '1px solid red' : '' }}
                                  disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "3" && userRole !== 'Teacher'}
                                  name="Health3"
                                  defaultValue={hasUpdate('Health', 'thirdQuarter') ?
                                    autoFillGrade('Health', 'thirdQuarter', 'Health3') :
                                    autoFillGrade('Health', 'thirdQuarter', 'Health3', true, '3')
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item label="4th Q" name="values">
                                <Input
                                  style={{ border: hasUpdate('Health', 'fourthQuarter') ? '1px solid red' : '' }}
                                  disabled={userRole !== 'Teacher' || sessionStorage.quarter !== "4"}
                                  name="Health4"
                                  defaultValue={hasUpdate('Health', 'fourthQuarter') ?
                                    autoFillGrade('Health', 'fourthQuarter', 'Health4') :
                                    autoFillGrade('Health', 'fourthQuarter', 'Health4', true, '4')
                                  }
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    </Row>
                  </React.Fragment>
                ) : ('')}
              {/*============================================================================ */}
            </>
            {userRole === 'Teacher' ? (
              <Button className="btn-save" htmlType="submit">
                <CheckCircleFilled type="check-circle" /> {values._id ? "Update" : "Save"}
              </Button>
            ) : ('')}
          </Form>
        </Spin>
      )}
    />

  );
}

export default Grade1EditForm;
