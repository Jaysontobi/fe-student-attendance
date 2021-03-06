import React, { useState } from 'react';
import { Form, Input, DatePicker, Select } from 'formik-antd'
import { Formik } from 'formik';
import { Row, Col, Button, message, Spin, Card } from 'antd';
import { CheckCircleFilled, DeleteOutlined } from '@ant-design/icons';
import AdvisorAction from './advisoryAction';

const { Option } = Select;

const TeacherForm = ({ selectedTeacher, add, gradeLevel, selectedTeacherAssgined }) => {
  let {
    deleteAdvisory
  } = AdvisorAction({});

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
         <Col span={24}>
            <Form.Item label="Advisor" name="advisor">
               <Select name="advisor" defaultValue={selectedTeacherAssgined ? selectedTeacherAssgined.teacher.firstName + " " + selectedTeacherAssgined.teacher.lastName : null}>
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
                 { selectedTeacherAssgined ? (
                    <Button type="danger" style={{ marginLeft: '10px' }} ghost htmlType="button" onClick={() => deleteAdvisory(selectedTeacherAssgined._id)}>
                      <DeleteOutlined /> Remove Advisor
                    </Button>
                  ) : ('') }
               </Form>
            </Spin>
         )}
      />

   );
}

export default TeacherForm;
