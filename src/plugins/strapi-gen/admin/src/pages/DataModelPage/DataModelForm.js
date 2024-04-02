import React, { useState } from 'react';
import { Form, Input, InputNumber } from 'antd';

const DataModelForm = ({ isEdit, dataModel, onFinish, onCancel }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isEdit && dataModel) {
      form.setFieldsValue({
        name: dataModel.name,
        description: dataModel.description,
      });
    }
  }, [isEdit, dataModel, form]);

  return (
    <Form
      form={form}
      name="data-model-form"
      layout="vertical"
      onFinish={onFinish}
      onReset={onCancel}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input the name of the data model' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please input the description of the data model' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel}>
Cancel
        </button>
      </Form.Item>
    </Form>
  );
};

export default DataModelForm;