import { useState, useEffect } from "react";
import { Button, Row, Col, Form, Input, Select, DatePicker } from "antd";
import Labelform from "./Labelform";
import CustomTags from "../tags/CustomTags";
import UploadFiles from "./UploadFiles";
const inputStyle = {
  border: "1px solid #D9D9D9",
  borderRadius: "2px",
  padding: "5px 8px",
  textTransform: "lowercase",
  fontWeight: "normal",
};
const ModalForm = ({
  customFields,
  updateHandle,
  size = 24,
  buttonPosition = { justifyContent: "end" },
  tagsBar = [],
  showFileUpload = false,
  formName,
}) => {
  const [form] = Form.useForm();
  const onChange = (e) => {};
  const handleFinish = (values) => {
    updateHandle({ key: formName, ...values });
  };
  const dateFormat = "DD.MM.YYYY";
  useEffect(() => {
    const fieldValues = {};
    customFields?.forEach((field) => {
      fieldValues[field.name] = field.value !== "" ? field.value : undefined;
    });
    form.setFieldsValue(fieldValues);
  }, [customFields, form]);

  return (
    <Form
      form={form}
      name={formName}
      layout="vertical"
      autoComplete="off"
      onFinish={handleFinish}
    >
      <Row gutter={12}>
        {customFields?.map((item) => (
          <Col span={size} key={item.key}>
            {item?.type === "select" ? (
              <Form.Item name={item.name} label={item.title}>
                <Select>
                  {item.options.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            ) : item.type === "date" ? (
              <Form.Item name={item.name} label={item.title}>
                <DatePicker format={dateFormat} />
              </Form.Item>
            ) : (
              <Form.Item name={item.name} label={item.title}>
                <Input />
              </Form.Item>
            )}
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
            {showFileUpload ? " Hochladen" : "Ok"}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default ModalForm;
