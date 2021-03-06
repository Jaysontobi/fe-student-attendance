import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './custom.css';
import { Table, Popconfirm, Form, Typography, Select } from 'antd';

const { Option } = Select;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const renderMarkings = (list=[]) => {
    return list.map((mark) => {
      return <Option value={mark} key={mark} >{mark}</Option>
    });
  };
  const inputNode = (list=[]) => {
    return (
      <Select style={{ minWidth: "65.8px", maxWidth: "150px" }}>
        {renderMarkings(list)};
      </Select>
    )
  };

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
        >
          {inputNode(record?.dropdownList)}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = ({ details = [], headers = [], setData }) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...details];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        await setData(newData);

        setEditingKey('');
      } else {
        newData.push(row);
        await setData(newData);

        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const operationColumn = {
    title: 'operation',
    dataIndex: 'operation',
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <a
            href="javascript:;"
            onClick={() => save(record.key)}
            style={{
              marginRight: 8,
            }}
          >
            Save
          </a>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <a>Cancel</a>
          </Popconfirm>
        </span>
      ) : (
        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
          Edit
        </Typography.Link>
      );
    },
  };

  const columns = headers.concat([operationColumn]);

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    };

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        style: { color: (col.withCondition) ? col.withCondition(record[col.dataIndex]) : '' }
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={details}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
};

export default EditableTable;