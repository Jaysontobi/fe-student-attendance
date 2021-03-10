import React from 'react';
import { Drawer, Card, Button, Typography, Icon, Row, Col, Select, DatePicker } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';



import AuditTrailTable from './auditTrailTable'
import AuditTrailAction from './auditTrailAction'
const {Option} = Select;

const AuditTrailPage = () => {
    let{
        auditTrailDetails,
    } = AuditTrailAction({});
  
  return (
    <Card className="h-82 p-70">
      <Row className="mt-15">
        <Col lg={{ span: 12 }}>
          <Typography.Title level={3} className="ml-15">Audit Trail</Typography.Title>
        </Col>
        {/* <Col lg={{ span: 24 }}>
          <Button className="right" type="danger " onClick={() => console.log("lol")}>
            <MinusCircleOutlined type="minus-circle" /> Delete Audit
          </Button>
        </Col> */}
    </Row>
    <Row>
      <Col lg={{ span: "24" }}>
        <AuditTrailTable details={auditTrailDetails.list} />
      </Col>
    </Row>
  </Card>
	
      
  );
}

export default AuditTrailPage;

