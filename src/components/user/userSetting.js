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
    console.log('________');
    if (password === '' || newPassword === '' || confirmPassword === '') return error = true;
    return success = true;
  };
  
  
  return (
    <Card className="h-82 p-70">
     <Row className="mt-15">
       <Col lg={{ span: 14 }}>
         <Typography.Title level={3} className="ml-15">Setting</Typography.Title>
       </Col>
     </Row>
     <Row>
       <Col lg={{ span: "24" }}>
          dgdfgdfgdfgdfgd
       </Col>
      </Row>
    </Card>     
  );
}

export default Settings;
