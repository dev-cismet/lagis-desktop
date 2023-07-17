/** @type { import('@storybook/react').Preview } */
import "tailwindcss/tailwind.css";
import { ConfigProvider } from "antd";
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          "CommonComponents",
          "App",
          "Overview",
          ["Page", "Components"],
          "Offices",
          ["Page", "Components"],
          "Rent",
          ["Page", "Components"],
          "Rights",
          ["Page", "Components"],
          "Usage",
          ["Page", "Components"],
          "Operations",
          ["Page", "Components"],
          "History",
          ["Page", "Components"],
          "TransactionNumber",
          ["Page", "Components"],
          "DMS",
          ["Page", "Components"],
        ],
      },
    },
  },
};

export default preview;
