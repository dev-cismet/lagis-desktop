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
              label="Voreigentümer"
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
              label="Kaufpreis (inkl. Nebenkosten)"
              className={inputStile}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="auflassung"
              label="Auflassung"
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
              label="Quadratmeterpreis"
              className={inputStile}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="eintragung"
              label="Eintragung"
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
              label="Vertragsart"
              className={inputStile}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="aktenzeichen"
              label="Aktenzeichen"
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
