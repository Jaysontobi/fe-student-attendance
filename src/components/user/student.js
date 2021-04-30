import React, { useState } from 'react';
import { Drawer, Card, Button, Typography, Icon, Row, Col, Input, Upload } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, PlusOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import UserForm from './userForm';
import AdvisoryAction from '../grade/advisoryAction';

import UserAction from './userAction';
import AdditionalService from './additionalService';
import TimeKeepingAction from '../timeKeeping/timeKeepingAction';
import UploadImageAction from './imageUpload';

import UserTable from './userTable';

const EmployeePage = ({ isAdvisory }) => {

  let {
    addUser,
    showUserVisible,
    setShowUserVisible,
    showUser,
    studentList,
    selectedUser,
    editUser,
    selectedParent,
    filterStudent
  } = UserAction({});

  let {
    advisoryStudents,
    loadAdvisoryStudents
  } = AdvisoryAction({});

  let {
    today
  } = TimeKeepingAction({});

  let {
    handleChange,
    saveUpload,
    profileSrc,
    beforeUpload,
    uploadSrc,
    loading,
    processing,
    setProfileSrc,
    setUploadSrc
  } = UploadImageAction();

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  if ( showUserVisible && selectedUser && selectedUser.profileImgSrc) { profileSrc = selectedUser.profileImgSrc};

  return (
    <Card className="h-82 p-70">
      <Row className="mt-15">
        <Col lg={{ span: 14 }}>
          <Typography.Title level={3} className="ml-15">Student List</Typography.Title>
        </Col>
        {JSON.parse(sessionStorage.user).role === "Admin" ?
          <>
            <Col lg={{ span: 6 }}>
              <Input placeholder="Search" onChange={(e) => filterStudent(e.target.value)} />
              {/* <Button className="right" type="danger " onClick={() => console.log("lol")}>
            <MinusCircleOutlined type="minus-circle" /> Delete User
          </Button> */}
            </Col>
            <Button className="addUser btn-add" onClick={() => showUser()}>
              <PlusCircleOutlined type="plus-circle" /> Add User
        </Button>
          </>
          : null}

      </Row>
      <Row>
        <Col lg={{ span: "24" }}>
          <UserTable details={isAdvisory ? advisoryStudents : studentList} />
        </Col>
      </Row>
      <Drawer
        title={
          <Typography.Title level={4}>
            {selectedUser && selectedUser._id ? "Update User" : "Add User"}
          </Typography.Title>
        }
        width={550}
        visible={showUserVisible}
        onClose={() => { setShowUserVisible(false); setProfileSrc(''); setUploadSrc(''); }}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <div style={{ textAlign: "right", marginRight: "23px" }}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={(info) => handleChange(info)}
          >
            {(uploadSrc || profileSrc) ? <img src={uploadSrc !== '' ? uploadSrc : profileSrc} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
          {uploadSrc ?
            <Button
              onClick={() => { saveUpload(selectedUser.idNumber) }}
              style={{ marginRight: "7px" }}
              icon={processing ? <LoadingOutlined /> : <UploadOutlined />}
            >Save</Button> : ''}
        </div>
        <UserForm add={addUser} update={editUser} selectedUser={selectedUser} selectedParent={selectedParent} role='Student' isNewData="false" />
      </Drawer>
    </Card>

  );
}

export default EmployeePage;

