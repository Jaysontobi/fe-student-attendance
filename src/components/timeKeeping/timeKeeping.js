import React from 'react';
import { Drawer, Card, Button, Typography, Icon, Row, Col, Select, DatePicker } from 'antd';
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';



import TimekeepingTable from './timeKeepingTable'
import AttendanceAction from './AttendanceAction'
const {Option} = Select;

const TimekeepingPage = () => {
    let{
        userDetails  ,
        filterUsers
    } = AttendanceAction({});
  
  return (
    <Card className="h-82 p-70">
      <Row className="mt-15">
        <Col lg={{ span: 14 }}>
          <Typography.Title level={3} className="ml-15">Student Attendance</Typography.Title>
        </Col>
        <Col lg={{ span: 6 }}>
        <DatePicker className="w-100P" placeholder={"Input Date Here"} onChange={(date, dateString)=>filterUsers(date)} />
        {/* <Select name="Month" placeholder="Month" onChange={(value)=> console.log(value)}>
          <Option value="January">January</Option>
          <Option value="Febuary">Febuary</Option>
          <Option value="March">March</Option>
          <Option value="April">April</Option>
          <Option value="May">May</Option>
          <Option value="June">June</Option>
          <Option value="July">July</Option>
          <Option value="August">August</Option>
          <Option value="September">September</Option>
          <Option value="October">October</Option>
          <Option value="November">November</Option>
          <Option value="December">December</Option>
        </Select>
        <Select name="Day" placeholder="Day" onChange={(value)=> console.log(value)}>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5">5</Option>
          <Option value="6">6</Option>
          <Option value="7">7</Option>
          <Option value="8">8</Option>
          <Option value="9">9</Option>
          <Option value="10">10</Option>
          <Option value="11">11</Option>
          <Option value="12">12</Option>
          <Option value="13">13</Option>
          <Option value="14">14</Option>
          <Option value="15">15</Option>
          <Option value="16">16</Option>
          <Option value="17">17</Option>
          <Option value="18">18</Option>
          <Option value="19">19</Option>
          <Option value="20">20</Option>
          <Option value="21">21</Option>
          <Option value="22">22</Option>
          <Option value="23">23</Option>
          <Option value="24">24</Option>
          <Option value="25">25</Option>
          <Option value="26">26</Option>
          <Option value="27">27</Option>
          <Option value="28">28</Option>
          <Option value="29">29</Option>
          <Option value="30">30</Option>
          <Option value="31">31</Option>
        </Select>
        <Input placeholder="Year" name="Year" onChange={(e)=>console.log(e.target.value)}></Input> */}
        </Col>
        {/* <Button className="right ml-10" type="danger " onClick={() => console.log("lol")}>
          <DeleteOutlined type="minus-circle" /> Delete User
        </Button> */}
    </Row>
    <Row>
      <Col lg={{ span: "24" }}>
        <TimekeepingTable details={userDetails.list} />
      </Col>
    </Row>
  </Card>
	
      
  );
}

export default TimekeepingPage;

