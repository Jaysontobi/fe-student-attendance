import React, { useState } from 'react';
import { Form, Input, DatePicker, Select } from 'formik-antd'
import { Formik } from 'formik';
import { Row, Col, Button, message, Spin, Card } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
const { Option } = Select;


const Grade1EditForm = ({ upgradeStudent,add,update, selectedGrade, selectedTeacher, selectedTeacherAssignedGrade, gradeLevel   }) => {

   let [loading, setLoading] = useState(false);

   return (
      <Formik
         initialValues={selectedGrade}
         enableReinitialize={true}
         onSubmit={async (values) => {


         
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
            }
            update(newValues)
         }}
         render={({ values, touched, setFieldValue }) => (
             
            <Spin spinning={loading} delay={500}>
               <Form className="p-30">
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
                     {
                     (selectedTeacherAssignedGrade && selectedTeacherAssignedGrade.subjects && selectedTeacherAssignedGrade.subjects[0].teacher && selectedTeacherAssignedGrade.subjects[0].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                     ?                      
                     <Col span={12}>
                     <Card title="English" disabled = {true} style={{ width: 300 }}>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="1st Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "1"} name="English1" defaultValue={values.subjects[0].subjectGrade.firstQuarter}/>
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="2nd Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "2"} defaultValue={values.subjects[0].subjectGrade.secondQuarter} name="English2"/>
                     </Form.Item>
                     </Col>
                     </Row>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="3rd Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "3"} defaultValue={values.subjects[0].subjectGrade.thirdQuarter} name="English3"/>
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="4th Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "4"} defaultValue={values.subjects[0].subjectGrade.fourthQuarter} name="English4"/>
                     </Form.Item>
                     </Col>
                     </Row>
                  </Card>
               </Col>:
                     null}
                  {
                (selectedTeacherAssignedGrade.subjects[1].teacher && selectedTeacherAssignedGrade.subjects[1].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                  ? 
                     <Col span={12}>
                     <Card title="Filipino" disabled = {true} style={{ width: 300 }}>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="1st Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "1"} name="Filipino1" defaultValue={values.subjects[1].subjectGrade.firstQuarter}/>
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="2nd Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "2"} defaultValue={values.subjects[1].subjectGrade.secondQuarter} name="Filipino2"/>
                     </Form.Item>
                     </Col>
                     </Row>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="3rd Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "3"} defaultValue={values.subjects[1].subjectGrade.thirdQuarter} name="Filipino3"/>
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="4th Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "4"} defaultValue={values.subjects[1].subjectGrade.fourthQuarter} name="Filipino4"/>
                     </Form.Item>
                     </Col>
                     </Row>
                  </Card>

               </Col>
                  : null}
                     
                  </Row>    
                     <Row gutter={16}>
                     {
(selectedTeacherAssignedGrade.subjects[2].teacher && selectedTeacherAssignedGrade.subjects[2].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                     ?                      
                     <Col span={12}>
                     <Card title="Science" disabled = {true} style={{ width: 300 }}>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="1st Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "1"} name="Science1" defaultValue={values.subjects[2].subjectGrade.firstQuarter}/>
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="2nd Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "2"} defaultValue={values.subjects[2].subjectGrade.secondQuarter} name="Science2"/>
                     </Form.Item>
                     </Col>
                     </Row>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="3rd Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "3"} defaultValue={values.subjects[2].subjectGrade.thirdQuarter} name="Science3"/>
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="4th Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "4"} defaultValue={values.subjects[2].subjectGrade.fourthQuarter} name="Science4"/>
                     </Form.Item>
                     </Col>
                     </Row>
                  </Card>
               </Col>:
                     null}
                  {
  (selectedTeacherAssignedGrade.subjects[3].teacher && selectedTeacherAssignedGrade.subjects[3].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                  ? 
                     <Col span={12}>
                     <Card title="Math" disabled = {true} style={{ width: 300 }}>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="1st Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "1"} name="Math1" defaultValue={values.subjects[3].subjectGrade.firstQuarter}/>
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="2nd Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "2"} defaultValue={values.subjects[3].subjectGrade.secondQuarter} name="Math2"/>
                     </Form.Item>
                     </Col>
                     </Row>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="3rd Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "3"} defaultValue={values.subjects[3].subjectGrade.thirdQuarter} name="Math3"/>
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="4th Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "4"} defaultValue={values.subjects[3].subjectGrade.fourthQuarter} name="Math4"/>
                     </Form.Item>
                     </Col>
                     </Row>
                  </Card>
               </Col>
                  : null}
                     
                  </Row>    
                  <Row gutter={16}>
                     {
  (selectedTeacherAssignedGrade.subjects[4].teacher && selectedTeacherAssignedGrade.subjects[4].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                     ?                      
                     <Col span={12}>
                     <Card title="MAPEH" disabled = {true} style={{ width: 300 }}>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="1st Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "1"} name="Mapeh1" defaultValue={values.subjects[4].subjectGrade.firstQuarter}/>
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="2nd Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "2"} defaultValue={values.subjects[4].subjectGrade.secondQuarter} name="Mapeh2"/>
                     </Form.Item>
                     </Col>
                     </Row>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="3rd Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "3"} defaultValue={values.subjects[4].subjectGrade.thirdQuarter} name="Mapeh3"/>
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="4th Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "4"} defaultValue={values.subjects[4].subjectGrade.fourthQuarter} name="Mapeh4"/>
                     </Form.Item>
                     </Col>
                     </Row>
                  </Card>
               </Col>:
                     null}
                  {
              (selectedTeacherAssignedGrade.subjects[5].teacher && selectedTeacherAssignedGrade.subjects[5].teacher.idNumber === JSON.parse(sessionStorage.user).idNumber)
                  ? 
                     <Col span={12}>
                     <Card title="Values" disabled = {true} style={{ width: 300 }}>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="1st Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "1"} name="Values1" defaultValue={values.subjects[4].subjectGrade.firstQuarter}/>
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="2nd Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "2"} defaultValue={values.subjects[5].subjectGrade.secondQuarter} name="Values2"/>
                     </Form.Item>
                     </Col>
                     </Row>
                     <Row gutter={16}>
                     <Col span={12}>
                     <Form.Item label="3rd Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "3"} defaultValue={values.subjects[5].subjectGrade.thirdQuarter} name="Values3"/>
                     </Form.Item>
                     </Col>
                     <Col span={12}>
                     <Form.Item label="4th Q" name="values">
                        <Input disabled={sessionStorage.quarter !== "4"} defaultValue={values.subjects[5].subjectGrade.fourthQuarter} name="Values4"/>
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