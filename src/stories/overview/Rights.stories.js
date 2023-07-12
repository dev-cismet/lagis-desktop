import { withDesign } from "storybook-addon-designs";
import DashboardDMS from "../../components/overview/Rights";
import designDMS from "../assets/overview/Rights.png";

export default {
  title: "Overview/Components/Rights",
  component: DashboardDMS,

  decorators: [withDesign],
};

export const Mockup = {
  args: {},
};
Mockup.parameters = {
  design: {
    type: "image",
    url: designDMS,
    scale: 0.5,
  },
};
