import React from 'react';
import { Table } from 'antd';

const TimeKeepingTable = ({ details }) => {

   const columns = [
      {
         title: <b>Name</b>,
         dataIndex: 'name',
      },
      {
        title: <b>ID Number</b>,
        dataIndex: 'idNumber',
     },
      {
         title: <b>Time In</b>,
         dataIndex: 'timeIn',
      },
      {
         title: <b>Time Out</b>,
         dataIndex: 'timeOut',
      },
                            
   ];

   return (
      <Table columns={columns} dataSource={details}
      />
   );
}

export default TimeKeepingTable;