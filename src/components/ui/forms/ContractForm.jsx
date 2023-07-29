import React from "react";
import { Col, Form, Input, Row } from "antd";

const ContractForm = () => {
  const [form] = Form.useForm();
  const nameValue = Form.useWatch("name", form);

  return (
    <>
      <Form form={form} layout="vertical" autoComplete="off">
        <Row>
          <Col span={24}>
            <Form.Item name="voreigentümer" label="Voreigentümer">
              <Input />
            </Form.Item>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name="kaufpreis" label="Kaufpreis (inkl. Nebenkosten)">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="auflassung" label="Auflassung">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name="quadratmeterpreis" label="Quadratmeterpreis">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="eintragung" label="Eintragung">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name="vertragsart" label="Vertragsart">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="aktenzeichen" label="Aktenzeichen">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <hr />
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ContractForm;
