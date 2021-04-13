import React from 'react';
import { Drawer, Card, Button, Typography, Icon, Row, Col, Input, Space, Alert } from 'antd';

import UserAction from './userAction';

const Settings = () => {
  let password = '';
  let newPassword = '';
  let confirmPassword = '';
  let error = false;
  let success = false;
  
  const changePassword = () => {
    if (password === '' || newPassword === '' || confirmPassword === '') return error = true;
    return success = true;
  };
  
  
  return (
    <Card className="h-82 p-70" style={{textAlign: 'center'}}>
     <Row className="mt-15">
       <Col lg={{ span: 6, offset: 9 }}>
         <Typography.Title level={3} className="ml-15">Settings</Typography.Title>
       </Col>
     </Row>
     <form onSubmit={() => changePassword()}>
       <Row className="mt-15">
        <Col lg={{ span: 6, offset: 9 }}>
          <Input placeholder="Old Password" onChange={(e) => password = e.target.value}/>
        </Col>
      </Row>
      <Row className="mt-15">
        <Col lg={{ span: 6, offset: 9 }}>
          <Input placeholder="New Password" onChange={(e) => newPassword = e.target.value}/>
        </Col>
      </Row>
      <Row className="mt-15">
        <Col lg={{ span: 6, offset: 9 }}>
          <Input placeholder="Confirm Password" onChange={(e) => confirmPassword = e.target.value}/>
        </Col>
      </Row>
      <Row style={{marginTop: '15px'}}>
       <Col lg={{ span: 6, offset: 9 }}>
        <Space align="center">
          <Button  className="addUser btn-add" onClick={()=> changePassword()}>
            Change Password
          </Button>
        </Space>
       </Col>
      </Row>
     </form>
     { error ? (
         <Row style={{marginTop: '15px'}}>
           <Col lg={{ span: 6, offset: 9 }}>
             <Alert
               message="Error"
               description="Please fill all fields."
               type="error"
               showIcon
            />
          </Col>
        </Row>
      ) : ("")}
        { success ? (
         <Row style={{marginTop: '15px'}}>
           <Col lg={{ span: 6, offset: 9 }}>
             <Alert
               message="Success"
               description="Password changed successfully."
               type="success"
               showIcon
            />
          </Col>
        </Row>
      ) : ("")}
   </Card>     
  );
}

export default Settings;
