import { useState, useEffect } from "react";
import { Button, Form, Input, Space } from "antd";
import Labelform from "./Labelform";

const SubmitButton = ({ form }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

const OfficesForm = ({ first, second }) => {
  const [form] = Form.useForm();
  const inputStyle = {
    border: "1px solid #D9D9D9",
    borderRadius: "2px",
    padding: "5px 8px",
    textTransform: "lowercase",
  };

  return (
    <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
      <Form.Item
        name={first}
        label={<Labelform name={first} />}
        rules={[{ required: true }]}
      >
        <Input style={inputStyle} placeholder={`Type ${first}...`} />
      </Form.Item>
      <Form.Item
        name={second}
        label={<Labelform name={second} />}
        rules={[{ required: true }]}
      >
        <Input style={inputStyle} placeholder={`Type ${second}...`} />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" ghost htmlType="reset">
            Cancel
          </Button>
          <SubmitButton form={form} />
        </Space>
      </Form.Item>
    </Form>
  );
};

export default OfficesForm;
