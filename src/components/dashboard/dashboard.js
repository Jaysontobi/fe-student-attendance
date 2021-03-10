import React from 'react';
import { Drawer, Card, Button, Typography, Icon, Row, Col } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import DashboardAtion from "../dashboard/dashboardAction"

const EmployeePage = () => { 
    let{
        userDetails
      } = DashboardAtion({});
  return (
    <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }}>
        <Card className="bg-gray" title="Total Number Of Students" bordered={false}>
          <span className="dashboard-padding">
              {userDetails.numberOfStudents}
            </span>
        </Card>
      </Col>
      <Col span={8}>
        <Card className="bg-skyblue" title="Total Number Of Parents" bordered={false}>
          <span className="dashboard-padding">
            {userDetails.numberOfParents}
          </span>
        </Card>
      </Col>
      <Col span={8}>
        <Card className="bg-orange" title="Total Number Of Teachers" bordered={false}>
          <span className="dashboard-padding">
            {userDetails.numberOfTeachers}
          </span>
        </Card>
      </Col>
    </Row>
  </div>
      
  );
}

export default EmployeePage;

