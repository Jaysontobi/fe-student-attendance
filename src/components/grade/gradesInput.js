import React, { useState } from 'react';
import { Form, Input, Button, Space } from 'antd';

const GradesInput = () => {
  const onFinish = values => {
    console.log('values', values)
  };

  return (
      <Form name="grades_input" onFinish={onFinish} autoComplete="off">
        <Form.List name="subjects">

        </Form.List>
      </Form>
   );
}

export default GradesInput;
