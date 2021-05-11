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
    filterStudent,
    setSelectedUser,
    loadStudent
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
    uploadSrc,
    loading,
    processing,
    setProfileSrc,
    setUploadSrc
  } = UploadImageAction();

  const uploadButton = (
    <div style={{ height: "110px" }}>
      <div style={{ border: "0.5px dashed grey", height: "100px", width: "100px", textAlign: "center", float: "right" }}>
        {loading ? <LoadingOutlined style={{ marginTop: '20px' }} /> : <PlusOutlined style={{ marginTop: '20px' }} />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    </div>
  );

  if (showUserVisible && selectedUser && selectedUser.profileImgSrc) { profileSrc = selectedUser.profileImgSrc };

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
        onClose={() => { setShowUserVisible(false); setProfileSrc(''); setUploadSrc(''); loadStudent() }}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {
          showUserVisible ? (
            <form style={{ textAlign: "right", marginRight: "23px" }}>
              {(uploadSrc || profileSrc) ? <img src={uploadSrc !== '' ? uploadSrc : profileSrc} alt="avatar" style={{ width: '100px', height: '100px' }} /> : uploadButton}
              <div style={{ textAlign: 'right', marginTop: '5px', marginBottom: '5px' }} >
                <input style={{ width: '85px', marginRight: '5px' }} id="profileImgInput" type="file" onChange={(e) => handleChange(e)} />
              </div>
              <div>
                {uploadSrc ?
                  <Button
                    onClick={async () => { let updates = await saveUpload(selectedUser.idNumber); setSelectedUser(updates) }}
                    style={{ marginRight: "7px" }}
                    icon={processing ? <LoadingOutlined /> : <UploadOutlined />}
                  >Save</Button> : ''}
              </div>
            </form>
          ) : ('')
        }
        <UserForm add={addUser} update={editUser} selectedUser={selectedUser} selectedParent={selectedParent} role='Student' isNewData="false" />
      </Drawer>
    </Card>

  );
}

export default EmployeePage;

