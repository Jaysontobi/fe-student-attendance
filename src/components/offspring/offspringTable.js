import React from 'react';
import { Table } from 'antd';

const GradeTable = ({ details, setSelectedListOfStudent }) => {

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
        title: <b>Contact Number</b>,
        dataIndex: 'contactNumber',
      },  
      {
        title: <b>Email</b>,
        dataIndex: 'email',
      },   
      {
        title: <b>Grade Level</b>,
        dataIndex: 'gradeLevel',
      },   
      {
        title: <b>Section</b>,
        dataIndex: 'section',
      },   
      {
        title: <b>Action</b>,
        dataIndex: 'action',
      },                            
   ];

   const rowUserSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
         setSelectedListOfStudent(selectedRows)
      }
  };


   return (
      <Table rowSelection={rowUserSelection} columns={columns} dataSource={details}
      />
   );
}

export default GradeTable;