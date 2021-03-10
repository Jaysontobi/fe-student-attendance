import React from 'react';
import { Form, Input, DatePicker, Select } from 'formik-antd'
import { Formik } from 'formik';
import { Row, Col, Button, Spin } from 'antd';

const LoginForm = ({login}) => {
   return (
      <Formik
         initialValues={{
            username: "",
            password: ""
         }}
         enableReinitialize={true}
         onSubmit={async (values, actions) => {
             login(values)
            // await login(values)
            // actions.setSubmitting(false);
         }}
         render={
            ({ values, errors, touched, setFieldValue, isSubmitting }) => (
               <Spin spinning={isSubmitting}>
                  <Form className="mt-10P">
                     <Row>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                           <b className="center">
                              USERNAME:
                           </b>
                           <Form.Item name="username">
                              <Input name="username" />
                           </Form.Item>
                        </Col>
                     </Row>
                     <Row>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                           <b className="center">
                              PASSWORD:
                           </b>
                           <Form.Item name="password">
                              <Input.Password name="password" />
                           </Form.Item>
                        </Col>
                     </Row>
                     <Row>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                           <Button type="dark" className="btn-login" htmlType="Submit">
                              Login
                        </Button>
                        </Col>
                     </Row>
                  </Form>
               </Spin>
            )}
      />
   );
}

export default LoginForm;