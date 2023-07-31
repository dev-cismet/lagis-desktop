import React from "react";
import { Col, Form, Input, Row, Divider } from "antd";

const ContractForm = () => {
  const [form] = Form.useForm();
  const nameValue = Form.useWatch("name", form);
  const customGutter = 24;
  const dividerStyles = { margin: "0" };
  const inputStile = "mt-4 mb-4 text-xs";

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        style={{ padding: "0 12px" }}
      >
        <Row gutter={customGutter}>
          <Col span={24}>
            <Form.Item
              name="voreigentümer"
              label={<span style={{ fontSize: "12px" }}>Voreigentümer</span>}
              className={inputStile}
            >
              <Input />
            </Form.Item>
            <Divider style={dividerStyles} />
          </Col>
        </Row>
        <Row gutter={customGutter}>
          <Col span={12}>
            <Form.Item
              name="kaufpreis"
              label={
                <span style={{ fontSize: "12px" }}>
                  Kaufpreis (inkl. Nebenkosten)
                </span>
              }
              className={inputStile}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="auflassung"
              label={<span style={{ fontSize: "12px" }}>Auflassung</span>}
              className={inputStile}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Divider style={dividerStyles} />
          </Col>
        </Row>
        <Row gutter={customGutter}>
          <Col span={12}>
            <Form.Item
              name="quadratmeterpreis"
              label={
                <span style={{ fontSize: "12px" }}>Quadratmeterpreis</span>
              }
              className={inputStile}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="eintragung"
              label={<span style={{ fontSize: "12px" }}>Eintragung</span>}
              className={inputStile}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Divider style={dividerStyles} />
          </Col>
        </Row>
        <Row gutter={customGutter}>
          <Col span={12}>
            <Form.Item
              name="vertragsart"
              label={<span style={{ fontSize: "12px" }}>Vertragsart</span>}
              className={inputStile}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="aktenzeichen"
              label={<span style={{ fontSize: "12px" }}>Aktenzeichen</span>}
              className={inputStile}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Divider style={dividerStyles} />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ContractForm;
