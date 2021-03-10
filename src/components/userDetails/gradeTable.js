import React from 'react';
import { Table } from 'antd';

const TimeKeepingTable = ({ details }) => {

   const columns = [
      {
         title: <b>Subject</b>,
         dataIndex: 'subject',
      },
      {
        title: <b>1st Quarter</b>,
        dataIndex: 'Quarter1st',
     },
      {
         title: <b>2nd Quarter</b>,
         dataIndex: 'Quarter2nd',
      },
      {
         title: <b>3rd Quarter</b>,
         dataIndex: 'Quarter3rd',
      },
      {
        title: <b>4th Quarter</b>,
        dataIndex: 'Quarter4th',
     },
     {
        title: <b>Final Grade</b>,
        dataIndex: 'FinalGrade',
     },
     {
        title: <b>Remarks</b>,
        dataIndex: 'Remarks',
     }
                            
   ];

   return (
      <Table columns={columns} dataSource={details}
      />
   );
}

export default TimeKeepingTable;