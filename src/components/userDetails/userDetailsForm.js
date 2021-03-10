import React, { useState } from 'react';
import { Form, Input, DatePicker, Select } from 'formik-antd'
import { Formik } from 'formik';
import { Row, Col, Button, message, Spin, Card, Form as AntForm } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
const { Option } = Select;


const UserEditForm = ({ selectedUser }) => {

   let [loading, setLoading] = useState(false);

   return (
      <Formik
         initialValues={selectedUser}
         enableReinitialize={true}
         onSubmit={async (values) => {
         }}
         render={({ values, touched, setFieldValue }) => (
            <Spin spinning={loading} delay={500}>
               <Form className="p-30">
               <Card className="p-70">
               <Row gutter={16}>
                     <Col span={12}>
                        <Form.Item label="ID Number" name="idNumber">
                           <Input bordered={false} value={values.student && values.student.idNumber ? values.student.idNumber : null} name="idNumber" />
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Name" name="name">
                           <Input bordered={false} value={values.student && values.student.firstName ? values.student.firstName + " " + values.student.middleName + " " + values.student.lastName : null}/>
                        </Form.Item>
                     </Col>
                  </Row>
                  <Row gutter={16}>
                     <Col span={12}>
                        <Form.Item label="Grade Level" name="gradeLevel">
                           <Input bordered={false} value={values.student && values.student.gradeLevel ? values.student.gradeLevel : null} />
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item label="Section" name="section">
                           <Input bordered={false} value={values.student && values.student.section ? values.student.section : null} name="section" />
                        </Form.Item>
                     </Col>
                  </Row>
               </Card>
                <br/>
                {console.log(values)}
               
                <Row gutter={16}>

{/* <Col span={12}>
         <Card title="English" disabled = {true} style={{ width: 300 }}>
         <Row gutter={16}>
         <Col span={12}>
         <Form.Item label="1st Q" name="values">
            <Input name="values" disabled={true} value={values.subjects ? values.subjects[0].subjectGrade.firstQuarter : null}/>
         </Form.Item>
         </Col>
         <Col span={12}>
         <Form.Item label="2nd Q" name="values">
            <Input   disabled={true} value={values.subjects ? values.subjects[0].subjectGrade.secondQuarter : null} name="values"/>
         </Form.Item>
         </Col>
         </Row>
         <Row gutter={16}>
         <Col span={12}>
         <Form.Item label="3rd Q" name="values">
            <Input   disabled={true} value={values.subjects ? values.subjects[0].subjectGrade.thirdQuarter : null} name="values"/>
         </Form.Item>
         </Col>
         <Col span={12}>
         <Form.Item label="4th Q" name="values">
            <Input   disabled={true} value={values.subjects ? values.subjects[0].subjectGrade.fourthQuarter : null} name="values"/>
         </Form.Item>
         </Col>
         </Row>
      </Card>
   </Col>

<Col span={12}>
         <Card title="Filipino" disabled = {true} style={{ width: 300 }}>
         <Row gutter={16}>
         <Col span={12}>
         <Form.Item label="1st Q" name="values">
            <Input name="values" disabled={true} value={values.subjects ? values.subjects[1].subjectGrade.firstQuarter : null}/>
         </Form.Item>
         </Col>
         <Col span={12}>
         <Form.Item label="2nd Q" name="values">
            <Input   disabled={true} value={values.subjects ? values.subjects[1].subjectGrade.secondQuarter : null} name="values"/>
         </Form.Item>
         </Col>
         </Row>
         <Row gutter={16}>
         <Col span={12}>
         <Form.Item label="3rd Q" name="values">
            <Input   disabled={true} value={values.subjects ? values.subjects[1].subjectGrade.thirdQuarter : null} name="values"/>
         </Form.Item>
         </Col>
         <Col span={12}>
         <Form.Item label="4th Q" name="values">
            <Input   disabled={true} value={values.subjects ? values.subjects[1].subjectGrade.fourthQuarter : null} name="values"/>
         </Form.Item>
         </Col>
         </Row>
      </Card>
   </Col>

<Col span={12}>
         <Card title="Science" disabled = {true} style={{ width: 300 }}>
         <Row gutter={16}>
         <Col span={12}>
         <Form.Item label="1st Q" name="values">
            <Input name="values" disabled={true} value={values.subjects ? values.subjects[2].subjectGrade.firstQuarter : null}/>
         </Form.Item>
         </Col>
         <Col span={12}>
         <Form.Item label="2nd Q" name="values">
            <Input   disabled={true} value={values.subjects ? values.subjects[2].subjectGrade.secondQuarter : null} name="values"/>
         </Form.Item>
         </Col>
         </Row>
         <Row gutter={16}>
         <Col span={12}>
         <Form.Item label="3rd Q" name="values">
            <Input   disabled={true} value={values.subjects ? values.subjects[2].subjectGrade.thirdQuarter : null} name="values"/>
         </Form.Item>
         </Col>
         <Col span={12}>
         <Form.Item label="4th Q" name="values">
            <Input   disabled={true} value={values.subjects ? values.subjects[2].subjectGrade.fourthQuarter : null} name="values"/>
         </Form.Item>
         </Col>
         </Row>
      </Card>
   </Col>

<Col span={12}>
         <Card title="Math" disabled = {true} style={{ width: 300 }}>
         <Row gutter={16}>
         <Col span={12}>
         <Form.Item label="1st Q" name="values">
            <Input name="values" disabled={true} value={values.subjects ? values.subjects[3].subjectGrade.firstQuarter : null}/>
         </Form.Item>
         </Col>
         <Col span={12}>
         <Form.Item label="2nd Q" name="values">
            <Input   disabled={true} value={values.subjects ? values.subjects[3].subjectGrade.secondQuarter : null} name="values"/>
         </Form.Item>
         </Col>
         </Row>
         <Row gutter={16}>
         <Col span={12}>
         <Form.Item label="3rd Q" name="values">
            <Input   disabled={true} value={values.subjects ? values.subjects[3].subjectGrade.thirdQuarter : null} name="values"/>
         </Form.Item>
         </Col>
         <Col span={12}>
         <Form.Item label="4th Q" name="values">
            <Input   disabled={true} value={values.subjects ? values.subjects[3].subjectGrade.fourthQuarter : null} name="values"/>
         </Form.Item>
         </Col>
         </Row>
      </Card>
   </Col>
 
   <Col span={12}>
         <Card title="MAPEH" disabled = {true} style={{ width: 300 }}>
         <Row gutter={16}>
         <Col span={12}>
         <Form.Item label="1st Q" name="values">
            <Input name="values" disabled={true} value={values.subjects ? values.subjects[4].subjectGrade.firstQuarter : null}/>
         </Form.Item>
         </Col>
         <Col span={12}>
         <Form.Item label="2nd Q" name="values">
            <Input   disabled={true} value={values.subjects ? values.subjects[4].subjectGrade.secondQuarter : null} name="values"/>
         </Form.Item>
         </Col>
         </Row>
         <Row gutter={16}>
         <Col span={12}>
         <Form.Item label="3rd Q" name="values">
            <Input   disabled={true} value={values.subjects ? values.subjects[4].subjectGrade.thirdQuarter : null} name="values"/>
         </Form.Item>
         </Col>
         <Col span={12}>
         <Form.Item label="4th Q" name="values">
            <Input   disabled={true} value={values.subjects ? values.subjects[4].subjectGrade.fourthQuarter : null} name="values"/>
         </Form.Item>
         </Col>
         </Row>
      </Card>
   </Col>

   <Col span={12}>
         <Card title="Values" disabled = {true} style={{ width: 300 }}>
         <Row gutter={16}>
         <Col span={12}>
         <Form.Item label="1st Q" name="values">
            <Input name="values" disabled={true} value={values.subjects ? values.subjects[5].subjectGrade.firstQuarter : null}/>
         </Form.Item>
         </Col>
         <Col span={12}>
         <Form.Item label="2nd Q" name="values">
            <Input   disabled={true} value={values.subjects ? values.subjects[5].subjectGrade.secondQuarter : null} name="values"/>
         </Form.Item>
         </Col>
         </Row>
         <Row gutter={16}>
         <Col span={12}>
         <Form.Item label="3rd Q" name="values">
            <Input   disabled={true} value={values.subjects ? values.subjects[5].subjectGrade.thirdQuarter : null} name="values"/>
         </Form.Item>
         </Col>
         <Col span={12}>
         <Form.Item label="4th Q" name="values">
            <Input   disabled={true} value={values.subjects ? values.subjects[5].subjectGrade.fourthQuarter : null} name="values"/>
         </Form.Item>
         </Col>
         </Row>
      </Card>
   </Col> */}
</Row>
             
               </Form>
            </Spin>
         )}
      />

   );
}

export default UserEditForm;