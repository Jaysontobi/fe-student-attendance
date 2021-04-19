import React from 'react';
import { Drawer, Card, Button, Typography, Icon, Row, Col, Modal, Form, Input, message } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import DashboardAtion from "../dashboard/dashboardAction";
import { SchoolDaysTmp } from '../modelTemplate/schoolDay';
import AttendanceAction from '../userDetails/attendanceAction';

const DashboardPage = () => {
  const [visible, setVisible] = React.useState(false);
  const [form] = Form.useForm();
  const { getSchoolDays, schoolDays, saveSchoolDays } = AttendanceAction();
  let schoolDaysObj = JSON.parse(JSON.stringify(SchoolDaysTmp));

  getSchoolDays();

  const loadSchoolDays = () => { 
    let daysOfSchool = (schoolDays) ?
      Object.assign(schoolDaysObj, schoolDays) :
      schoolDaysObj;

      return daysOfSchool;
  }; 

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  let {
    userDetails
  } = DashboardAtion({});


  const getFields = () => {
    const count = 12;
    const children = [];

    Object.keys(SchoolDaysTmp).map((month, key)=> {
      children.push(
        <Col span={8} key={key}>
          <Form.Item
            name={month}
            label={month}
          >
            <Input placeholder=""/>
          </Form.Item>
        </Col>,
      );
    });

    return children;
  };

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);

    if (Object.values(values).length > 0) {
      let total = Object.values(values).map(monthDays => { 
        return parseInt(monthDays)
      }).reduce((a,b) => a + b, 0);
      
      let newValues = Object.assign(values, { total: total });
      console.log(newValues);

      await saveSchoolDays(newValues);
      setTimeout(() => {setVisible(false)}, 2000);
    };
  };

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
      <Row>
        <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} >
          <Card title="School Days" bordered={false} style={{ width: '98%', marginTop: '20px' }}>
            <Button type="primary" onClick={showModal} style={{ marginLeft: '10px', marginBottom: '5px', marginTop: '5px' }}>
              Input School Days
            </Button>
            <Modal
              title="School Days"
              visible={visible}
              onCancel={handleCancel}
              footer={null}
            >
              <Form
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                onFinish={onFinish}
                initialValues={loadSchoolDays()}
              >
                <Row gutter={24}>{getFields()}</Row>
                <Row>
                  <Col span={24} style={{textAlign: 'center'}} >
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                    <Button
                      style={{ margin: '0 8px'}}
                      onClick={() => {
                        form.resetFields();
                        setVisible(false);
                      }}
                    >
                      Clear
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Modal>
          </Card>
        </Col>
      </Row>
    </div>

  );
}

export default DashboardPage;

