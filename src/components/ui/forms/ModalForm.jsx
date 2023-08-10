import { useState, useEffect } from "react";
import { Button, Row, Col, Form, Input } from "antd";
import Labelform from "./Labelform";
import CustomTags from "../tags/CustomTags";
import UploadFiles from "./UploadFiles";
const ModalForm = ({
  fields,
  size = 24,
  buttonPosition = { justifyContent: "center" },
  tagsBar = [],
  file = false,
}) => {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState(false);
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
  const inputStyle = {
    border: "1px solid #D9D9D9",
    borderRadius: "2px",
    padding: "5px 8px",
    textTransform: "lowercase",
    fontWeight: "normal",
  };

  return (
    <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
      <Row gutter={12}>
        {fields.map((i) => (
          <Col span={size} key={i.title}>
            <Form.Item
              name={i.title}
              label={<Labelform name={i.title} />}
              rules={i.rules}
            >
              <Input style={inputStyle} placeholder={i.value} />
            </Form.Item>
          </Col>
        ))}
      </Row>
      {tagsBar.length > 0 && (
        <Row>
          <Col span={24}>
            <div className="flex gap-2 mb-5 mt-2">
              <span style={{ color: "red" }}>*</span>
              <Labelform name="Features" customStyle={{ fontSize: "14" }} />
            </div>
          </Col>
          <Col span={24}>
            <CustomTags />
          </Col>
        </Row>
      )}
      {file && (
        <Row style={{ marginBottom: "30px" }}>
          <Col span={24}>
            <div className="flex gap-2 mb-5 mt-2">
              <span style={{ color: "red" }}>*</span>
              <Labelform name="Bild" customStyle={{ fontSize: "14" }} />
            </div>
          </Col>
          <Col span={24}>
            <UploadFiles />
          </Col>
        </Row>
      )}
      <Form.Item style={{ margin: "10px" }}>
        <div className="flex items-center" style={buttonPosition}>
          <Button type="primary" ghost htmlType="reset" className="mr-4">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" disabled={!submittable}>
            {file ? " Upload" : " Submit"}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default ModalForm;
