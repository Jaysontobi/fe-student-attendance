import React from 'react';
import { Drawer, Card, Button, Typography, Icon, Row, Col, Input, Space, message } from 'antd';

import userService from './userService';

const Settings = () => {
  let password = '';
  let newPassword = '';
  let confirmPassword = '';
  
  const changePassword = async () => {
    if (password === '' || newPassword === '' || confirmPassword === '') {
      return message.error('All fields are required.', 3);
    };
    
     if (newPassword !== confirmPassword) {
      return message.error('New password and confirm must match.', 3);
    };
    
    let user = JSON.parse(sessionStorage.user);
    let body = {
      idNumber: user.idNumber,
      currentPassword: password,
      newPassword: newPassword
    };
    try {
      let response = await userService.updatePassword(body);
      if (response && response.status === 200) {
        password = '';
        newPassword = '';
        confirmPassword = '';
        return message.success('Password updated', 3);
      }
    } catch (error) {
      return message.error('Unable to update password', 3);
    };
  };
  
  return (
    <Card className="h-82 p-70" style={{textAlign: 'center'}}>
     <Row className="mt-15">
       <Col lg={{ span: 6, offset: 9  }}>
         <Typography.Title level={3} className="ml-15">Setting</Typography.Title>
       </Col>
     </Row>
      <form onSubmit={() => changePassword()}>
        <Row className="mt-15">
          <Col lg={{ span: 6, offset: 9 }}>
            <Input placeholder="Old Password" type="password" onChange={(e) => password = e.target.value}/>
          </Col>
        </Row>
        <Row className="mt-15">
         <Col lg={{ span: 6, offset: 9 }}>
           <Input placeholder="New Password" type="password" onChange={(e) => newPassword = e.target.value}/>
         </Col>
       </Row>
       <Row className="mt-15">
         <Col lg={{ span: 6, offset: 9 }}>
          <Input placeholder="Confirm Password" type="password" onChange={(e) => confirmPassword = e.target.value}/>
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
    </Card>     
  );
}

export default Settings;
