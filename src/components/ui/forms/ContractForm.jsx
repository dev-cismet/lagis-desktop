import React, { useEffect } from "react";
import { Col, Form, Input, Row, Divider, Tooltip, Select } from "antd";

const ContractForm = ({ activeRow, setShowButton }) => {
  const [form] = Form.useForm();
  const nameValue = Form.useWatch("name", form);
  const customGutter = 24;
  const dividerStyles = { margin: "0" };
  const inputStile = "mt-4 mb-4 text-xs";
  const handleValuesChange = (changedValues, allValues) => {
    console.log("Changed values:", changedValues);
    console.log("All values:", allValues);
    setShowButton(true);
  };
  useEffect(() => {
    form.setFieldsValue({
      kaufpreis: activeRow?.kaufpreis ? activeRow.kaufpreis : "",
      quadratmeterpreis: activeRow?.quadratmeterpreis
        ? activeRow.quadratmeterpreis
        : "",
      vertragsart: activeRow?.vertragsart ? activeRow.vertragsart : "",
    });
  }, [activeRow, form]);
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        style={{ padding: "0 12px" }}
        onValuesChange={handleValuesChange}
      >
        <Row gutter={customGutter}>
          <Col span={24}>
            <Form.Item
              name="voreigentümer"
              label={<span style={{ fontSize: "14px" }}>Voreigentümer</span>}
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
                <Tooltip title="inkl. Nebenkosten">
                  <span style={{ fontSize: "14px" }}>Kaufpreis</span>
                </Tooltip>
              }
              initialValue={activeRow?.kaufpreis ? activeRow.kaufpreis : ""}
              className={inputStile}
            >
              <Input value={activeRow?.kaufpreis ? activeRow.kaufpreis : ""} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="auflassung"
              label={<span style={{ fontSize: "14px" }}>Auflassung</span>}
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
                <span style={{ fontSize: "14px" }}>Quadratmeterpreis</span>
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
              label={<span style={{ fontSize: "12px" }}>Vertragsart</span>}
              name="vertragsart"
              className={inputStile}
            >
              <Select>
                <Select.Option value="vermietung">Vermietung</Select.Option>
                <Select.Option value="leasing">Leasing</Select.Option>
              </Select>
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
