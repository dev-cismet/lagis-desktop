import { useState, useEffect } from "react";
import { Button, Row, Col, Form, Input } from "antd";
import Labelform from "./Labelform";
import CustomTags from "../tags/CustomTags";
import UploadFiles from "./UploadFiles";
const onChange = (e) => {
  console.log("Change:", e.target.value);
};
const ModalForm = ({
  customFields,
  size = 24,
  buttonPosition = { justifyContent: "end" },
  tagsBar = [],
  showFileUpload = false,
}) => {
  const [form] = Form.useForm();

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
        {customFields.map((items, index) => (
          <Col span={size} key={index}>
            <Form.Item
              name={[items.value, index]}
              label={<Labelform name={items.title} />}
              rules={items.rules}
              initialValue={items.value !== "" ? items.value : undefined}
            >
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
        ))}
      </Row>
      {tagsBar.length > 0 && (
        <Row>
          <Col span={24}>
            <div className="flex gap-2 mb-5 mt-2">
              <span style={{ color: "red" }}>*</span>
              <Labelform
                name="Eigenschaften"
                customStyle={{ fontSize: "14" }}
              />
            </div>
          </Col>
          <Col span={24}>
            <CustomTags />
          </Col>
        </Row>
      )}
      {showFileUpload && (
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
            Abbrechen
          </Button>
          <Button type="primary" htmlType="submit">
            {showFileUpload ? " Hochladen" : "Einreichen"}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default ModalForm;
