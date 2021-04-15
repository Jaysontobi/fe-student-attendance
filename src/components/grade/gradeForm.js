import React, { useState } from 'react';
import { Form, Input, DatePicker, Select } from 'formik-antd'
import { Formik } from 'formik';
import { Row, Col, Button, message, Spin, Card } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
const { Option } = Select;

const Grade1EditForm = ({ upgradeStudent,add,update, selectedGrade, selectedTeacher, selectedTeacherAssignedGrade, gradeLevel, isAdviser = false }) => {

   let [loading, setLoading] = useState(false);
   const hasUpdate = (subjectName='', quarter='') => {
     let subject = selectedGrade.subjects.find(subject => subject.subjectName === subjectName);
      
    if( subject.recommendedGrade && subject.recommendedGrade[quarter] && subject.recommendedGrade[quarter] !== subject.subjectGrade[quarter]) return true;
      
    return false;
   };

   let updatesHolder = {};

   const autoFillGrade = (subjectName='', quarter='', field='') => {
      let index = selectedGrade.subjects.findIndex(subject => subject.subjectName === subjectName);
      let value = selectedGrade.subjects[index].recommendedGrade[quarter];
      let holder = {
            [field] : value
      };
      updatesHolder = Object.assign(updatesHolder, holder);
      return value;
   };
   
   return (
      <Formik
         initialValues={selectedGrade}
         enableReinitialize={true}
         onSubmit={async inputValues => {
      
            let values = {};
            values = Object.assign(values, updatesHolder);
            values =  Object.assign(values, inputValues);
         
            let newValues = {
               _id : values._id
            };
            let English = {};
            let Filipino = {};
            let Science = {};
            let Math = {};
            let MAPEH = {};
            let Values = {};
            if(values.English1 || values.English2 || values.English3 || values.English4) {
               English = {
                  firstQuarter:values.English1,
                  secondQuarter:values.English2,
                  thirdQuarter:values.English3,
                  fourthQuarter:values.English4
               }
               newValues.English = English;
            }
            if(values.Filipino1 || values.Filipino2 || values.Filipino3 || values.Filipino4) {
               Filipino = {
                  firstQuarter:values.Filipino1,
                  secondQuarter:values.Filipino2,
                  thirdQuarter:values.Filipino3,
                  fourthQuarter:values.Filipino4
               }
               newValues.Filipino = Filipino;
            }
            if(values.Science1 || values.Science2 || values.Science3 || values.Science4) {
               Science = {
                  firstQuarter:values.Science1,
                  secondQuarter:values.Science2,
                  thirdQuarter:values.Science3,
                  fourthQuarter:values.Science4
               }
               newValues.Science = Science;
            }
            if(values.Math1 || values.Math2 || values.Math3 || values.Math4) {
               Math = {
                  firstQuarter:values.Math1,
                  secondQuarter:values.Math2,
                  thirdQuarter:values.Math3,
                  fourthQuarter:values.Math4
               }
               newValues.Math = Math;
            }
            if(values.MAPEH1 || values.MAPEH2 || values.MAPEH3 || values.MAPEH4) {
               MAPEH = {
                  firstQuarter:values.MAPEH1,
                  secondQuarter:values.MAPEH2,
                  thirdQuarter:values.MAPEH3,
                  fourthQuarter:values.MAPEH4
               }
               newValues.MAPEH = MAPEH;
            }
            if(values.Values1 || values.Values2 || values.Values3 || values.Values4) {
               Values = {
                  firstQuarter:values.Values1,
                  secondQuarter:values.Values2,
                  thirdQuarter:values.Values3,
                  fourthQuarter:values.Values4
               }
               newValues.Values = Values;
            };
   
            update(newValues, isAdviser);
         }}
         render={({ values, touched, setFieldValue }) => (
             
            <Spin spinning={loading} delay={500}>
               <Form className="p-30" >
               <Row gutter={16}>
                     <Col span={16}>
                        <Form.Item label="ID Number" name="idNumber">
                           <Input disabled={true} value={values.student.idNumber}/>
                        </Form.Item>
                     </Col>
                  </Row>
               <Row gutter={16}>
                     <Col span={16}>
                        <Form.Item label="Name" name="name">
                           <Input disabled={true} value={values.student.firstName + " " + values.student.middleName + " "  + values.student.lastName}/>
                        </Form.Item>
                     </Col>
                  </Row>
                  <Row gutter={16}>
                     <Col span={16}>
                        <Form.Item  label="School Year" name="schoolYear">
                        <Input disabled={true} name="schoolYear" />
                        </Form.Item>
                     </Col>
                  </Row>
                  <>      
                    <Row gutter={16}>
                     {( isAdviser ||
                       selectedTeacherAssignedGrade &&
                       selectedTeacherAssignedGrade.subjects &&
                       selectedTeacherAssignedGrade.subjects != undefined &&
                       selectedTeacherAssignedGrade.subjects[0] && 
                       selectedTeacherAssignedGrade.subjects[0].teacher &&
                       selectedTeacherAssignedGrade.subjects[0].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                     ?                      
                     <Col span={12}>
                     <Card title="English" disabled = {true} style={{ width: 300 }}>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="1st Q" name="values">
                        <Input
                           style={{border: hasUpdate('English', 'firstQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "1"} name="English1" 
                           defaultValue={hasUpdate('English', 'firstQuarter') ? 
                              autoFillGrade('English', 'firstQuarter', 'English1'):
                              values.subjects[0].subjectGrade.firstQuarter}/>
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="2nd Q" name="values">
                        <Input
                           style={{border: hasUpdate('English', 'secondQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "2"}
                           name="English2"
                           defaultValue={hasUpdate('English', 'secondQuarter') ? 
                              autoFillGrade('English', 'secondQuarter', 'English2'):
                              values.subjects[0].subjectGrade.secondQuarter} />
                     </Form.Item>
                     </Col>
                     </Row>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="3rd Q" name="values">
                        <Input
                           style={{border: hasUpdate('English', 'thirdQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "3"}
                           name="English3"
                           defaultValue={hasUpdate('English', 'thirdQuarter') ? 
                              autoFillGrade('English', 'thirdQuarter', 'English3'):
                              values.subjects[0].subjectGrade.thirdQuarter}/>
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="4th Q" name="values">
                        <Input
                           style={{border: hasUpdate('English', 'fourthQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "4"}
                           name="English4"
                           defaultValue={hasUpdate('English', 'fourthQuarter') ? 
                              autoFillGrade('English', 'fourthQuarter', 'English4'):
                              values.subjects[0].subjectGrade.fourthQuarter} />
                     </Form.Item>
                     </Col>
                     </Row>
                  </Card>
               </Col>:
                     null}
                  {( isAdviser ||
                  selectedTeacherAssignedGrade.subjects[1] && 
                  selectedTeacherAssignedGrade.subjects[1].teacher &&
                  selectedTeacherAssignedGrade.subjects[1].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                  ? 
                     <Col span={12}>
                     <Card title="Filipino" disabled = {true} style={{ width: 300 }}>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="1st Q" name="values">
                        <Input
                           style={{border: hasUpdate('Filipino', 'firstQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "1"}
                           name="Filipino1"
                           defaultValue={hasUpdate('Filipino', 'firstQuarter') ? 
                              autoFillGrade('Filipino', 'firstQuarter', 'Filipino1'):
                              values.subjects[1].subjectGrade.firstQuarter}
                        />
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="2nd Q" name="values">
                        <Input
                           style={{border: hasUpdate('Filipino', 'secondQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "2"}
                           name="Filipino2"
                           defaultValue={hasUpdate('Filipino', 'secondQuarter') ? 
                              autoFillGrade('Filipino', 'secondQuarter', 'Filipino2'):
                              values.subjects[1].subjectGrade.secondQuarter}
                        />
                     </Form.Item>
                     </Col>
                     </Row>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="3rd Q" name="values">
                        <Input
                           style={{border: hasUpdate('Filipino', 'thirdQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "3"}
                           name="Filipino3"
                           defaultValue={hasUpdate('Filipino', 'thirdQuarter') ? 
                              autoFillGrade('Filipino', 'thirdQuarter', 'Filipino3'):
                              values.subjects[1].subjectGrade.thirdQuarter}
                         />
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="4th Q" name="values">
                        <Input
                           style={{border: hasUpdate('Filipino', 'fourthQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "4"}
                           name="Filipino4"
                           defaultValue={hasUpdate('Filipino', 'fourthQuarter') ? 
                              autoFillGrade('Filipino', 'fourthQuarter', 'Filipino4'):
                              values.subjects[1].subjectGrade.fourthQuarter}
                        />
                     </Form.Item>
                     </Col>
                     </Row>
                  </Card>

               </Col>
                  : null}
                     
                  </Row>    
                     <Row gutter={16}>
                     {( isAdviser ||
                      selectedTeacherAssignedGrade &&
                      selectedTeacherAssignedGrade.subjects &&
                      selectedTeacherAssignedGrade.subjects != undefined &&
                      selectedTeacherAssignedGrade.subjects.length !==0 &&
                      selectedTeacherAssignedGrade.subjects[2] &&
                      selectedTeacherAssignedGrade.subjects[2] &&
                      selectedTeacherAssignedGrade.subjects[2].teacher &&
                      selectedTeacherAssignedGrade.subjects[2].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                     ?                      
                     <Col span={12}>
                     <Card title="Science" disabled = {true} style={{ width: 300 }}>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="1st Q" name="values">
                        <Input
                           style={{border: hasUpdate('Science', 'firstQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "1"}
                           name="Science1"
                           defaultValue={ hasUpdate('Science', 'firstQuarter') ? 
                              autoFillGrade('Science', 'firstQuarter', 'Science1') :
                              values.subjects[2].subjectGrade.firstQuarter
                           }
                        />
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="2nd Q" name="values">
                        <Input
                           style={{border: hasUpdate('Science', 'secondQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "2"}
                           name="Science2"
                           defaultValue={hasUpdate('Science', 'secondQuarter') ? 
                              autoFillGrade('Science', 'secondQuarter', 'Science2') :
                              values.subjects[2].subjectGrade.secondQuarter
                           }
                        />
                     </Form.Item>
                     </Col>
                     </Row>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="3rd Q" name="values">
                        <Input
                           style={{border: hasUpdate('Science', 'thirdQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "3"}
                           name="Science3"
                           defaultValue={ hasUpdate('Science', 'thirdQuarter') ? 
                             autoFillGrade('Science', 'thirdQuarter', 'Science3') :
                             values.subjects[2].subjectGrade.thirdQuarter    
                          }
                        />
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="4th Q" name="values">
                        <Input
                           style={{border: hasUpdate('Science', 'fourthQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "4"}
                           name="Science4"
                           defaultValue={ hasUpdate('Science', 'fourthQuarter') ? 
                             autoFillGrade('Science', 'fourthQuarter', 'Science4') :
                             values.subjects[2].subjectGrade.fourthQuarter
                           }
                        />
                     </Form.Item>
                     </Col>
                     </Row>
                  </Card>
               </Col>:
                     null}
                  {( isAdviser ||
                     selectedTeacherAssignedGrade.subjects[3] &&
                     selectedTeacherAssignedGrade.subjects[3].teacher &&
                     selectedTeacherAssignedGrade.subjects[3].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                    ? 
                     <Col span={12}>
                     <Card title="Math" disabled = {true} style={{ width: 300 }}>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="1st Q" name="values">
                        <Input
                           style={{border: hasUpdate('Math', 'firstQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "1"}
                           name="Math1" 
                           defaultValue={ hasUpdate('Math', 'firstQuarter') ? 
                              autoFillGrade('Math', 'firstQuarter', 'Math1'):
                              values.subjects[3].subjectGrade.firstQuarter
                           }
                        />
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="2nd Q" name="values">
                        <Input
                           style={{border: hasUpdate('Math', 'secondQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "2"}
                           name="Math2"
                           defaultValue={ hasUpdate('Math', 'secondQuarter') ? 
                              autoFillGrade('Math', 'secondQuarter', 'Math2'):
                              values.subjects[3].subjectGrade.secondQuarter
                           }
                        />
                     </Form.Item>
                     </Col>
                     </Row>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="3rd Q" name="values">
                        <Input
                           style={{border: hasUpdate('Math', 'thirdQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "3"}
                           name="Math3"
                           defaultValue={ hasUpdate('Math', 'thirdQuarter') ? 
                              autoFillGrade('Math', 'thirdQuarter', 'Math3'):
                              values.subjects[3].subjectGrade.thirdQuarter
                           }
                        />
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="4th Q" name="values">
                        <Input
                           style={{border: hasUpdate('Math', 'fourthQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "4"}
                           name="Math4"
                           defaultValue={ hasUpdate('Math', 'fourthQuarter') ? 
                              autoFillGrade('Math', 'fourthQuarter', 'Math4'):
                              values.subjects[3].subjectGrade.fourthQuarter
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
                     {( isAdviser ||
                      selectedTeacherAssignedGrade.subjects[4] &&
                      selectedTeacherAssignedGrade.subjects[4].teacher &&
                      selectedTeacherAssignedGrade.subjects[4].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                     ?                      
                     <Col span={12}>
                     <Card title="MAPEH" disabled = {true} style={{ width: 300 }}>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="1st Q" name="values">
                        <Input
                           style={{border: hasUpdate('MAPEH', 'firstQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "1"}
                           name="MAPEH1" 
                           defaultValue={ hasUpdate('MAPEH', 'firstQuarter') ? 
                              autoFillGrade('MAPEH', 'firstQuarter', 'MAPEH1'):
                              values.subjects[4].subjectGrade.firstQuarter
                           }
                        />
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="2nd Q" name="values">
                        <Input
                           style={{border: hasUpdate('MAPEH', 'secondQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "2"}
                           name="MAPEH2"
                           defaultValue={hasUpdate('MAPEH', 'secondQuarter') ? 
                              autoFillGrade('MAPEH', 'secondQuarter', 'MAPEH2'):
                              values.subjects[4].subjectGrade.secondQuarter
                           }
                        />
                     </Form.Item>
                     </Col>
                     </Row>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="3rd Q" name="values">
                        <Input
                           style={{border: hasUpdate('MAPEH', 'thirdQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "3"}
                           name="MAPEH3"
                           defaultValue={hasUpdate('MAPEH', 'thirdQuarter') ? 
                              autoFillGrade('MAPEH', 'thirdQuarter', 'MAPEH3'):
                              values.subjects[4].subjectGrade.thirdQuarter
                           }
                        />
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="4th Q" name="values">
                        <Input
                           style={{border: hasUpdate('MAPEH', 'fourthQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "4"}
                           name="MAPEH4"
                           defaultValue={hasUpdate('MAPEH', 'fourthQuarter') ? 
                              autoFillGrade('MAPEH', 'fourthQuarter', 'MAPEH4'):
                              values.subjects[4].subjectGrade.fourthQuarter
                           }
                        />
                     </Form.Item>
                     </Col>
                     </Row>
                  </Card>
               </Col>:
                     null}
                  {( isAdviser ||
                     selectedTeacherAssignedGrade.subjects[5] &&
                     selectedTeacherAssignedGrade.subjects[5].teacher &&
                     selectedTeacherAssignedGrade.subjects[5].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                  ? 
                     <Col span={12}>
                     <Card title="Values" disabled = {true} style={{ width: 300 }}>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="1st Q" name="values">
                        <Input
                           style={{border: hasUpdate('Values', 'firstQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "1"}
                           name="Values1"
                           defaultValue={hasUpdate('Values', 'firstQuarter') ? 
                             autoFillGrade('Values', 'firstQuarter', 'Values1'):
                             values.subjects[5].subjectGrade.firstQuarter
                           }
                        />
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="2nd Q" name="values">
                        <Input
                           style={{border: hasUpdate('Values', 'secondQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "2"}
                           name="Values2"
                           defaultValue={hasUpdate('Values', 'secondQuarter') ? 
                             autoFillGrade('Values', 'secondQuarter', 'Values2'):
                             values.subjects[5].subjectGrade.secondQuarter
                           }
                        />
                     </Form.Item>
                     </Col>
                     </Row>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="3rd Q" name="values">
                        <Input
                           style={{border: hasUpdate('Values', 'thirdQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "3"}
                           name="Values3"
                           defaultValue={hasUpdate('Values', 'thirdQuarter') ? 
                             autoFillGrade('Values', 'thirdQuarter', 'Values3'):
                             values.subjects[5].subjectGrade.thirdQuarter
                           }
                        />
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="4th Q" name="values">
                        <Input
                           style={{border: hasUpdate('Values', 'fourthQuarter') ? '1px solid red': ''}}
                           disabled={sessionStorage.quarter !== "4"}
                           name="Values4"
                           defaultValue={hasUpdate('Values', 'fourthQuarter') ? 
                             autoFillGrade('Values', 'fourthQuarter', 'Values4'):
                             values.subjects[5].subjectGrade.fourthQuarter
                           } 
                        />
                     </Form.Item>
                     </Col>
                     </Row>
                  </Card>
               </Col>
                  : null}
                     
                  </Row>
                  </>
                  <Button className="btn-save" htmlType="submit">
                     <CheckCircleFilled type="check-circle" /> {values._id ? "Update": "Save"}
                  </Button>
               </Form>
            </Spin>
         )}
      />

   );
}

export default Grade1EditForm;
