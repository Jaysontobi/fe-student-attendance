import React from 'react';
import { Drawer, Card, Button, Typography, Icon, Row, Col, Input } from 'antd';

import UserAction from './userAction';

const Settings = () => {
  
  const changePassword = value => {
  
  };
  
  const reset = () => {};
  
  return (
    <Card className="h-82 p-70">
     <Row className="mt-15">
       <Col lg={{ span: 14 }}>
         <Typography.Title level={3} className="ml-15">Setting</Typography.Title>
       </Col>
     </Row>
     <form>
       <Row className="mt-15">
        <Col lg={{ span: 12, offset: 6 }}>
          <Input placeholder="Old Password"/>
        </Col>
      </Row>
      <Row className="mt-15">
        <Col lg={{ span: 6 }}>
        </Col>
        <Col lg={{ span: 6 }}>
          <Input placeholder="New Password"/>
        </Col>
      </Row>
      <Row className="mt-15">
        <Col lg={{ span: 6 }}>
        </Col>
        <Col lg={{ span: 6 }}>
          <Input placeholder="Confirm Password"/>
        </Col>
      </Row>
      <Row>
         <Button  className="addUser btn-add" onClick={()=> changePassword()}>
           Change Password
        </Button>
        <Button  className="addUser btn-add" onClick={()=> reset()}>
           Cancel
        </Button>
      </Row>
     </form>
   </Card>     
  );
}

export default Settings;
