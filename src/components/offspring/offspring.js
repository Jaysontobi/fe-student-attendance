import React from 'react';
import { Drawer, Card, Button, Typography, Icon, Row, Col } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import GradeForm from '../offspring/offspringForm'

import GradeAction from '../grade/gradeAction'

import OffspringTable from '../offspring/offspringTable'

const OffspringPage = () => {


  let {
    selectedGrade,
    showGradeVisible,
    setShowGradeVisible,
    gradeDetails
  } = GradeAction({});
  return (
    <Card className="h-82 p-70">
      <Row className="mt-15">
        <Col lg={{ span: 12 }}>
          <Typography.Title level={3} className="ml-15">Student Grade</Typography.Title>
        </Col>
        <Col lg={{ span: 12 }}>
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: "24" }}>
          <OffspringTable details={gradeDetails.list} />
        </Col>
      </Row>
      <Drawer
        title={
          <Typography.Title level={4}>

          </Typography.Title>
        }
        width={700}
        visible={showGradeVisible}
        onClose={() => { setShowGradeVisible(false) }}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <GradeForm selectedOffspring={selectedGrade} />
      </Drawer>

    </Card>


  );
}

export default OffspringPage;

