/** @type { import('@storybook/react').Preview } */
import { ConfigProvider } from "antd";
import locale from "antd/locale/de_DE";
import "tailwindcss/tailwind.css";
import { withRouter } from "storybook-addon-react-router-v6";
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
  decorators: [
    (Story) => (
      <ConfigProvider locale={locale}>
        <Story />
      </ConfigProvider>
    ),
    withRouter,
  ],
};

export default preview;
