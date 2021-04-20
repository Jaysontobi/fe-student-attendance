import React from 'react';
import { Table } from 'antd';

const AttendanceTable = ({ details }) => {

  const columns = [
    {
      title: <b></b>,
      dataIndex: 'tag',
    },
    {
      title: <b>Jun</b>,
      dataIndex: 'Jun',
    },
    {
      title: <b>Jul</b>,
      dataIndex: 'Jul',
    },
    {
      title: <b>Aug</b>,
      dataIndex: 'Aug',
    },
    {
      title: <b>Sep</b>,
      dataIndex: 'Sep',
    },
    {
      title: <b>Oct</b>,
      dataIndex: 'Oct',
    },
    {
      title: <b>Nov</b>,
      dataIndex: 'Nov',
    },
    {
      title: <b>Dec</b>,
      dataIndex: 'Dec',
    },
    {
      title: <b>Jan</b>,
      dataIndex: 'Jan',
    },
    {
      title: <b>Feb</b>,
      dataIndex: 'Feb',
    },
    {
      title: <b>Mar</b>,
      dataIndex: 'Mar',
    },
    {
      title: <b>Apr</b>,
      dataIndex: 'Apr',
    },
    {
      title: <b>Total</b>,
      dataIndex: 'total',
    }
  ];

  return (
    <Table columns={columns} dataSource={details} pagination={false}/>
  );
}

export default AttendanceTable;