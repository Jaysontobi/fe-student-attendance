import React from 'react';
import { Table } from 'antd';

const GradeTable = ({ details }) => {

   const columns = [
      {
         title: <b>Subject</b>,
         dataIndex: 'subject',
         render (grade) {
            return {
             props: {
                style: { color: grade < 75 ? "red" : "" }
              },
              children: <div>{grade}</div>
            }
          }
      },
      {
        title: <b>1st Quarter</b>,
        dataIndex: 'Quarter1st',
        render (grade) {
         return {
          props: {
             style: { color: grade < 75 ? "red" : "" }
           },
           children: <div>{grade}</div>
         }
       }
     },
      {
         title: <b>2nd Quarter</b>,
         dataIndex: 'Quarter2nd',
         render (grade) {
            return {
             props: {
                style: { color: grade < 75 ? "red" : "" }
              },
              children: <div>{grade}</div>
            }
          }
      },
      {
         title: <b>3rd Quarter</b>,
         dataIndex: 'Quarter3rd',
         render (grade) {
            return {
             props: {
                style: { color: grade < 75 ? "red" : "" }
              },
              children: <div>{grade}</div>
            }
          }
      },
      {
        title: <b>4th Quarter</b>,
        dataIndex: 'Quarter4th',
        render (grade) {
         return {
          props: {
             style: { color: grade < 75 ? "red" : "" }
           },
           children: <div>{grade}</div>
         }
       }
     },
     {
        title: <b>Final Grade</b>,
        dataIndex: 'FinalGrade',
        render (grade) {
         return {
          props: {
             style: { color: grade < 75 ? "red" : "" }
           },
           children: <div>{grade}</div>
         }
       }
     },
     {
        title: <b>Remarks</b>,
        dataIndex: 'Remarks',
        render (text) {
           return {
            props: {
               style: { color: text === 'Failed' ? "red" : "" }
             },
             children: <div>{text}</div>
           }
        }
     }
                            
   ];

   return (
      <Table columns={columns} dataSource={details} pagination={false} />
   );
}

export default GradeTable;