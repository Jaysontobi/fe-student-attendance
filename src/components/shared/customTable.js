import React from 'react';
import { Table } from 'antd';

const CustomTable = ({ details = [], headers = [] }) => {
  const columns = headers.map(head => {
    let headerObj = {
      title: <b>{head.title}</b>,
      dataIndex: head.field,
      width: (head.width) ? head.width : '',
      render(value) {
        return {
          props: {
            style: { color: (head.withCondition) ? head.withCondition(value) : '' }
          },
          children: <div>{value}</div>
        }
      }
    };

    return headerObj;
  });

  return (
    <Table columns={columns} dataSource={details} pagination={false} />
  );
}

export default CustomTable;