import React from 'react';
import { Drawer, Card, Button, Typography, Icon, Row, Col, Input, Space } from 'antd';

import UserAction from './userAction';

const Settings = () => {
  
  const changePassword = value => {
  
  };
  
  const reset = () => {};
  
  return (
    <Card className="h-82 p-70" style={{textAlign: 'center'}}>
     <Row className="mt-15">
       <Col lg={{ span: 6, offset: 9 }}>
         <Typography.Title level={3} className="ml-15">Settings</Typography.Title>
       </Col>
     </Row>
     <form>
       <Row className="mt-15">
        <Col lg={{ span: 6, offset: 9 }}>
          <Input placeholder="Old Password"/>
        </Col>
      </Row>
      <Row className="mt-15">
        <Col lg={{ span: 6, offset: 9 }}>
          <Input placeholder="New Password"/>
        </Col>
      </Row>
      <Row className="mt-15">
        <Col lg={{ span: 6, offset: 9 }}>
          <Input placeholder="Confirm Password"/>
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
