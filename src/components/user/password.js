import React from 'react';
import { Drawer, Card, Button, Typography, Icon, Row, Col, Input } from 'antd';

import UserAction from './userAction';

const password = () => {
  


  return (
    <Card className="h-82 p-70">
     <Row className="mt-15">
       <Col lg={{ span: 14 }}>
         <Typography.Title level={3} className="ml-15">Setting</Typography.Title>
       </Col>
     </Row>
     <Row>
       <Col lg={{ span: "24" }}>
         <UserTable details={adminList} />
       </Col>
      </Row>
    </Card>     
  );
}

export default EmployeePage;
