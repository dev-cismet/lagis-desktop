import { useState, useEffect } from "react";
import "../../../index.css";
import "./styleRform.css";
import { DatePicker, Form, Input, Select, Switch, Button } from "antd";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
const { TextArea } = Input;
const RightsForm = ({
  fields = {
    key: "1",
    recht: false,
    art: "Dienstbarkeit",
    artrecht: "Geh- und Fahrrecht",
    nummer: "Dept. II, No. 22",
    eintragung: "07.05.2001",
    loschung: "21.05.2001",
    bemerkung: "21.7.2016",
  },
}) => {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState(false);
  const values = Form.useWatch([], form);
  const dateFormat = "DD.MM.YYYY";
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
    <>
      <Form
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 24,
        }}
        layout="vertical"
      >
        <Form.Item
          label={<span style={{ padding: 0 }}>"Ist richtig"</span>}
          valuePropName="checked"
          required
          style={{ marginBottom: "0.4rem", paddingBottom: "0.2rem" }}
        >
          <Switch />
        </Form.Item>
        <Form.Item label="Art" required>
          <Select defaultValue={fields.art}>
            <Select.Option value="art">{fields.art}</Select.Option>
            <Select.Option value="artrecht">{fields.artrecht}</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Nummer" required>
          <Input placeholder={fields.nummer} />
        </Form.Item>
        <Form.Item label="Eintragung" required>
          <DatePicker
            defaultValue={dayjs(fields.eintragung, dateFormat)}
            format={dateFormat}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item label="Löschung" required>
          <DatePicker
            defaultValue={dayjs(fields.loschung, dateFormat)}
            format={dateFormat}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item label="Bemerkung">
          <TextArea
            style={{
              width: "100%",
            }}
            rows={4}
            placeholder={fields.bemerkung}
          />
        </Form.Item>
        <div className="flex items-center justify-end">
          <Button type="primary" ghost htmlType="reset" className="mr-4">
            Abbrechen
          </Button>
          <Button type="primary" htmlType="submit" disabled={!submittable}>
            Einreichen
          </Button>
        </div>
      </Form>
    </>
  );
};

export default RightsForm;
