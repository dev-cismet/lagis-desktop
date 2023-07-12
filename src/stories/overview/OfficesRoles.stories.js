import { withDesign } from "storybook-addon-designs";
import Offices from "../../components/overview/Offices";
import design from "../assets/overview/Offices.png";

export default {
  title: "Overview/Components/OfficesRoles",
  component: Offices,
  decorators: [withDesign],
};

export const Mockup = {
  args: {},
};
Mockup.parameters = {
  design: {
    type: "image",
    url: design,
    scale: 0.5,
  },
};
