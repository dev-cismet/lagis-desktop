import { Select, Space } from "antd";
const HeaderSelectors = () => {
  const names = [
    { value: "Vohwinkel", label: "vohwinkel" },
    { value: "VohwinkelOne", label: "vohwinkelone" },
  ];
  const numbersSmall = [
    { value: 20, label: "20" },
    { value: 10, label: "10" },
  ];
  const numbersBig = [
    { value: 120, label: "120" },
    { value: 210, label: "210" },
  ];
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Space>
      <Select
        defaultValue="Vohwinkel"
        onChange={handleChange}
        options={names}
      />
      <Select
        defaultValue="10"
        onChange={handleChange}
        options={numbersSmall}
      />
      <Select defaultValue="10" onChange={handleChange} options={numbersBig} />
    </Space>
  );
};
export default HeaderSelectors;