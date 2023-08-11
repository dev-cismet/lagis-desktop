import { useState, useEffect } from "react";
import "../../../index.css";
import { DatePicker, Form, Input, Select, Switch, Button } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(weekday);
dayjs.extend(localeData);
const { TextArea } = Input;
const RightsForm = ({
  fields = {
    key: "1",
    recht: false,
    art: "Dienstbarkeit",
    artrecht: "Geh- und Fahrrecht",
    nummer: "Dept. II, No. 22",
    eintragung: "07.05.2001",
    löschung: "08.05.2001",
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
        name="validateOnly"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Ist richtig" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Art">
          <Select defaultValue={fields.art}>
            <Select.Option value="art">{fields.art}</Select.Option>
            <Select.Option value="artrecht">{fields.artrecht}</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Nummer">
          <Input
            style={{
              width: "100%",
            }}
            placeholder={fields.nummer}
          />
        </Form.Item>
        <Form.Item label="Daten">
          <DatePicker
            defaultValue={dayjs(fields.eintragung)}
            format={dateFormat}
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
            "Einreichen"
          </Button>
        </div>
      </Form>
    </>
  );
};

export default RightsForm;
