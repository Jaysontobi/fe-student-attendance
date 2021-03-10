import React, { useState } from 'react';
import { Form, Input, DatePicker, Select } from 'formik-antd'
import { Formik } from 'formik';
import { Row, Col, Button, message, Spin, Card } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
const { Option } = Select;


const Grade1EditForm = ({selectedOffspring }) => {

   let [loading, setLoading] = useState(false);

   return (
      <Formik
         initialValues={selectedOffspring}
         enableReinitialize={true}
         onSubmit={async (values) => {
         }}
         render={({ values, touched, setFieldValue }) => (
             
            <Spin spinning={loading} delay={500}>
               <Form className="p-30">
                  {console.log(selectedOffspring)}
               <Row gutter={16}>
                     <Col span={16}>
                        <Form.Item label="ID Number" name="idNumber">
                           <Input disabled={true} value={values.student && values.student.idNumber ? values.student.idNumber : null}/>
                        </Form.Item>
                     </Col>
                  </Row>
               <Row gutter={16}>
                     <Col span={16}>
                        <Form.Item label="Name" name="name">
                           <Input disabled={true} value={values.student && values.student.firstName ? values.student.firstName + " " + values.student.middleName + " "  + values.student.lastName : null}/>
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
                  <Row gutter={16}>
                     <Col span={16}>
                        <Form.Item  label="Grade Level" name="gradeLevel">
                        <Input disabled={true} name="gradeLevel" />
                        </Form.Item>
                     </Col>
                  </Row>                     
                  <Row gutter={16}>

                  <Col span={12}>
                           <Card title={<b>English</b>} disabled = {true} style={{ width: 300 }}>
                           <Row gutter={16}>
                           <Col span={12}>
                           <Form.Item label="1st Q" name="values">
                              <Input name="values" disabled={true} value={values.subjects[0].subjectGrade.firstQuarter}/>
                           </Form.Item>
                           </Col>
                           <Col span={12}>
                           <Form.Item label="2nd Q" name="values">
                              <Input   disabled={true} value={values.subjects[0].subjectGrade.secondQuarter} name="values"/>
                           </Form.Item>
                           </Col>
                           </Row>
                           <Row gutter={16}>
                           <Col span={12}>
                           <Form.Item label="3rd Q" name="values">
                              <Input   disabled={true} value={values.subjects[0].subjectGrade.thirdQuarter} name="values"/>
                           </Form.Item>
                           </Col>
                           <Col span={12}>
                           <Form.Item label="4th Q" name="values">
                              <Input   disabled={true} value={values.subjects[0].subjectGrade.fourthQuarter} name="values"/>
                           </Form.Item>
                           </Col>
                           </Row>
                        </Card>
                     </Col>

                  <Col span={12}>
                           <Card title={<b>Filipino</b>} disabled = {true} style={{ width: 300 }}>
                           <Row gutter={16}>
                           <Col span={12}>
                           <Form.Item label="1st Q" name="values">
                              <Input name="values" disabled={true} value={values.subjects[1].subjectGrade.firstQuarter}/>
                           </Form.Item>
                           </Col>
                           <Col span={12}>
                           <Form.Item label="2nd Q" name="values">
                              <Input   disabled={true} value={values.subjects[1].subjectGrade.secondQuarter} name="values"/>
                           </Form.Item>
                           </Col>
                           </Row>
                           <Row gutter={16}>
                           <Col span={12}>
                           <Form.Item label="3rd Q" name="values">
                              <Input   disabled={true} value={values.subjects[1].subjectGrade.thirdQuarter} name="values"/>
                           </Form.Item>
                           </Col>
                           <Col span={12}>
                           <Form.Item label="4th Q" name="values">
                              <Input   disabled={true} value={values.subjects[1].subjectGrade.fourthQuarter} name="values"/>
                           </Form.Item>
                           </Col>
                           </Row>
                        </Card>
                     </Col>

                  <Col span={12}>
                           <Card title={<b>Science</b>} disabled = {true} style={{ width: 300 }}>
                           <Row gutter={16}>
                           <Col span={12}>
                           <Form.Item label="1st Q" name="values">
                              <Input name="values" disabled={true} value={values.subjects[2].subjectGrade.firstQuarter}/>
                           </Form.Item>
                           </Col>
                           <Col span={12}>
                           <Form.Item label="2nd Q" name="values">
                              <Input   disabled={true} value={values.subjects[2].subjectGrade.secondQuarter} name="values"/>
                           </Form.Item>
                           </Col>
                           </Row>
                           <Row gutter={16}>
                           <Col span={12}>
                           <Form.Item label="3rd Q" name="values">
                              <Input   disabled={true} value={values.subjects[2].subjectGrade.thirdQuarter} name="values"/>
                           </Form.Item>
                           </Col>
                           <Col span={12}>
                           <Form.Item label="4th Q" name="values">
                              <Input   disabled={true} value={values.subjects[2].subjectGrade.fourthQuarter} name="values"/>
                           </Form.Item>
                           </Col>
                           </Row>
                        </Card>
                     </Col>

                  <Col span={12}>
                           <Card title={<b>Math</b>} disabled = {true} style={{ width: 300 }}>
                           <Row gutter={16}>
                           <Col span={12}>
                           <Form.Item label="1st Q" name="values">
                              <Input name="values" disabled={true} value={values.subjects[3].subjectGrade.firstQuarter}/>
                           </Form.Item>
                           </Col>
                           <Col span={12}>
                           <Form.Item label="2nd Q" name="values">
                              <Input   disabled={true} value={values.subjects[3].subjectGrade.secondQuarter} name="values"/>
                           </Form.Item>
                           </Col>
                           </Row>
                           <Row gutter={16}>
                           <Col span={12}>
                           <Form.Item label="3rd Q" name="values">
                              <Input   disabled={true} value={values.subjects[3].subjectGrade.thirdQuarter} name="values"/>
                           </Form.Item>
                           </Col>
                           <Col span={12}>
                           <Form.Item label="4th Q" name="values">
                              <Input   disabled={true} value={values.subjects[3].subjectGrade.fourthQuarter} name="values"/>
                           </Form.Item>
                           </Col>
                           </Row>
                        </Card>
                     </Col>
                   
                     <Col span={12}>
                           <Card title={<b>MAPEH</b>} disabled = {true} style={{ width: 300 }}>
                           <Row gutter={16}>
                           <Col span={12}>
                           <Form.Item label="1st Q" name="values">
                              <Input name="values" disabled={true} value={values.subjects[4].subjectGrade.firstQuarter}/>
                           </Form.Item>
                           </Col>
                           <Col span={12}>
                           <Form.Item label="2nd Q" name="values">
                              <Input   disabled={true} value={values.subjects[4].subjectGrade.secondQuarter} name="values"/>
                           </Form.Item>
                           </Col>
                           </Row>
                           <Row gutter={16}>
                           <Col span={12}>
                           <Form.Item label="3rd Q" name="values">
                              <Input   disabled={true} value={values.subjects[4].subjectGrade.thirdQuarter} name="values"/>
                           </Form.Item>
                           </Col>
                           <Col span={12}>
                           <Form.Item label="4th Q" name="values">
                              <Input   disabled={true} value={values.subjects[4].subjectGrade.fourthQuarter} name="values"/>
                           </Form.Item>
                           </Col>
                           </Row>
                        </Card>
                     </Col>

                     <Col span={12}>
                           <Card title={<b>Values</b>} disabled = {true} style={{ width: 300 }}>
                           <Row gutter={16}>
                           <Col span={12}>
                           <Form.Item label="1st Q" name="values">
                              <Input name="values" disabled={true} value={values.subjects[5].subjectGrade.firstQuarter}/>
                           </Form.Item>
                           </Col>
                           <Col span={12}>
                           <Form.Item label="2nd Q" name="values">
                              <Input   disabled={true} value={values.subjects[5].subjectGrade.secondQuarter} name="values"/>
                           </Form.Item>
                           </Col>
                           </Row>
                           <Row gutter={16}>
                           <Col span={12}>
                           <Form.Item label="3rd Q" name="values">
                              <Input   disabled={true} value={values.subjects[5].subjectGrade.thirdQuarter} name="values"/>
                           </Form.Item>
                           </Col>
                           <Col span={12}>
                           <Form.Item label="4th Q" name="values">
                              <Input   disabled={true} value={values.subjects[5].subjectGrade.fourthQuarter} name="values"/>
                           </Form.Item>
                           </Col>
                           </Row>
                        </Card>
                     </Col>
                  </Row>
               </Form>
            </Spin>
         )}
      />

   );
}

export default Grade1EditForm;