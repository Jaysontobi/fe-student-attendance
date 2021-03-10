import React, { useState } from 'react';
import { Form, Input, DatePicker, Select } from 'formik-antd'
import { Formik } from 'formik';
import { Row, Col, Button, message, Spin, Card } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
const { Option } = Select;


const TeacherForm = ({ selectedTeacher, add, gradeLevel, selectedTeacherAssgined }) => {

   let [loading, setLoading] = useState(false);

   return (
      <Formik
         initialValues={{}}
         enableReinitialize={true}
         onSubmit={async (values) => {
            add(values, gradeLevel) 
         }}
         render={({ values, touched, setFieldValue }) => (
             
            <Spin spinning={loading} delay={500}>
               <Form className="p-30">
         <Row gutter={16}>
         <Col span={12}>
            <Form.Item label="English" name="english">
            <Select defaultValue={selectedTeacherAssgined && selectedTeacherAssgined[0] ? selectedTeacherAssgined[0].teacher.firstName + " " + selectedTeacherAssgined[0].teacher.lastName : null} name="english">
                  {selectedTeacher.map(teacher => {
                     return <Option value={teacher._id}>{teacher.firstName + " " + teacher.lastName}</Option>
                  })}
                  
               </Select>
            </Form.Item>
         </Col>
         <Col span={12}>
            <Form.Item label="Filipino" name="filipino">
               <Select defaultValue={selectedTeacherAssgined && selectedTeacherAssgined[1] ? selectedTeacherAssgined[1].teacher.firstName + " " + selectedTeacherAssgined[1].teacher.lastName : null} name="filipino">
               {selectedTeacher.map(teacher => {
                     return <Option value={teacher._id}>{teacher.firstName + " " + teacher.lastName}</Option>
                  })}
               </Select>
            </Form.Item>
         </Col>
         </Row>

         <Row gutter={16}>
         <Col span={12}>
            <Form.Item label="Science" name="science">
            <Select defaultValue={selectedTeacherAssgined && selectedTeacherAssgined[2] ? selectedTeacherAssgined[2].teacher.firstName + " " + selectedTeacherAssgined[2].teacher.lastName : null} name="science">
            {selectedTeacher.map(teacher => {
                     return <Option value={teacher._id}>{teacher.firstName + " " + teacher.lastName}</Option>
                  })}
               </Select>
            </Form.Item>
         </Col>
         <Col span={12}>
            <Form.Item label="Math" name="math">
               <Select defaultValue={selectedTeacherAssgined && selectedTeacherAssgined[3] ? selectedTeacherAssgined[3].teacher.firstName + " " + selectedTeacherAssgined[3].teacher.lastName : null} name="math">
               {selectedTeacher.map(teacher => {
                     return <Option value={teacher._id}>{teacher.firstName + " " + teacher.lastName}</Option>
                  })}
               </Select>
            </Form.Item>
         </Col>
         </Row>

         <Row gutter={16}>
         <Col span={12}>
            <Form.Item label="MAPEH" name="mapeh">
            <Select defaultValue={selectedTeacherAssgined && selectedTeacherAssgined[4] ? selectedTeacherAssgined[4].teacher.firstName + " " + selectedTeacherAssgined[4].teacher.lastName : null} name="mapeh">
            {selectedTeacher.map(teacher => {
                     return <Option value={teacher._id}>{teacher.firstName + " " + teacher.lastName}</Option>
                  })}
               </Select>
            </Form.Item>
         </Col>
         <Col span={12}>
            <Form.Item label="Values" name="values">
               <Select defaultValue={selectedTeacherAssgined && selectedTeacherAssgined[5] ? selectedTeacherAssgined[5].teacher.firstName + " " + selectedTeacherAssgined[5].teacher.lastName : null}name="values">
               {selectedTeacher.map(teacher => {
                     return <Option value={teacher._id}>{teacher.firstName + " " + teacher.lastName}</Option>
                  })}
               </Select>
            </Form.Item>
         </Col>
         </Row>
                  <Button className="btn-save" htmlType="submit">
                     <CheckCircleFilled type="check-circle" /> {values._id ? "Update": "Save"}
                  </Button>
               </Form>
            </Spin>
         )}
      />

   );
}

export default TeacherForm;