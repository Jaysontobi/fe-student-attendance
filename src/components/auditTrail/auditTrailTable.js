import React from 'react';
import { Table } from 'antd';

const AuditTrailTable = ({ details }) => {

   const columns = [
      {
         title: 'Name',
         dataIndex: 'name',
      },
      {
        title: 'Activity',
        dataIndex: 'activity',
     },
      {
         title: 'Date',
         dataIndex: 'date',
      },
                            
   ];

   return (
      <Table columns={columns} dataSource={details}
      />
   );
}

export default AuditTrailTable;