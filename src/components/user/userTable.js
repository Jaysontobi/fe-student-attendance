import React from 'react';
import { Table } from 'antd';

const EmployeeTable = ({ details }) => {

   const columns = [
      {
         title: <b>Id Number</b>,
         dataIndex: 'idNumber',
      },
      {
         title: <b>First Name</b>,
         dataIndex: 'firstName',
      },
      {
         title: <b>Middle Name</b>,
         dataIndex: 'middleName',
      },
      {
         title: <b>Last Name</b>,
         dataIndex: 'lastName',
      },
      {
         title: <b>Gender</b>,
         dataIndex: 'gender',
      },
      {
        title: <b>Age</b>,
        dataIndex: 'age',
      },   
      {
        title: <b>Contact Number</b>,
        dataIndex: 'contactNumber',
      },  
      {
        title: <b>Email</b>,
        dataIndex: 'email',
      },   
      {
        title: <b>Role</b>,
        dataIndex: 'role',
      },   
      {
        title: <b>Action</b>,
        dataIndex: 'action',
      },                            
   ];

   const rowUserSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
         console.log(selectedRows)
      }
  };


   return (
      <Table rowSelection={rowUserSelection} columns={columns} dataSource={details}
      />
   );
}

export default EmployeeTable;