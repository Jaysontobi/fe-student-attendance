import React from 'react';
import { Card, Typography, Row, Col, Select, Spin } from 'antd';
import EditableTable from '../shared/editableTable';
import ClearanceAction from './clearanceAction';
import { CLEARANCE_HEADERS } from '../modelTemplate/clearance';
const { Option } = Select;

const ClearancePage = () => {
  
  let { getClearance, loading, levelClearance, addUpdateLvlClearance} = ClearanceAction();
  
  const levels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']; 
  const renderLevels = () => {
    return levels.map((level) => {
      return <Option value={level} key={level} >{level}</Option>
    });
  };

  return (
    <Card className="h-82 p-70">
      <Spin spinning={loading} delay={0}>
        <Row className="mt-15">
          <Col lg={{ span: 14 }}>
            <Typography.Title level={3} className="ml-15">
              Clearance
          </Typography.Title>
          </Col>
          <Col lg={{ span: 6 }}>
            <Select
              id="studentSelect"
              className="ml-15"
              placeholder="Please select a year level"
              onChange={(value) => {getClearance({level: value}) }}
              style={{ width: '300px' }}>
              {renderLevels()}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: "24" }}>
            <EditableTable details={levelClearance} headers={CLEARANCE_HEADERS} setData={addUpdateLvlClearance}/>
          </Col>
        </Row>
      </Spin>
    </Card>
  );
}

export default ClearancePage;

