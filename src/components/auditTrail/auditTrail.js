import React from 'react';
import { Drawer, Card, Button, Typography, Icon, Row, Col, Select, DatePicker } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import AuditTrailTable from './auditTrailTable'
import AuditTrailAction from './auditTrailAction'
const { Option } = Select;

const AuditTrailPage = () => {
  let { auditTrailDetails, filterAudit } = AuditTrailAction({});

  return (
    <Card className="h-82 p-70">
      <Row className="mt-15">
        <Col lg={{ span: 14 }}>
          <Typography.Title level={3} className="ml-15">
            Audit Trail
          </Typography.Title>
        </Col>
        <Col lg={{ span: 6 }}>
          <DatePicker
            id="filterDate"
            className="w-100P"
            placeholder={"Input Date Here"}
            onChange={(date, dateString) => {
              let filterRole = document.getElementById('filterRole').value;
              filterAudit({ date: date, role: filterRole });
            }}
          />
        </Col>
        {/* <Col lg={{ span: 24 }}>
          <Button className="right" type="danger " onClick={() => console.log("lol")}>
            <MinusCircleOutlined type="minus-circle" /> Delete Audit
          </Button>
        </Col> */}
        <>
          <Select
            id="filterRole"
            defaultValue=""
            className="ml-15"
            placeholder="select role"
            style={{ width: '150px' }}
            onChange={(value) => {
              let filterDate = document.getElementById('filterDate').value;
              filterAudit({ date: filterDate, role: value })
            }}>
            <Option value="">None</Option>
            <Option value="Admin">Admin</Option>
            <Option value="Teacher">Teacher</Option>
            <Option value="Parent">Parent</Option>
            <Option value="Student">Student</Option>
          </Select>
        </>
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

