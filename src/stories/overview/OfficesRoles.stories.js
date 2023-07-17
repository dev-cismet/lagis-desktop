import { withDesign } from "storybook-addon-designs";
import Offices from "../../components/overview/Offices";
import design from "../assets/overview/Offices.png";
import { generateStory } from "../_tools/StoryFactory";

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

export const M = generateStory([340, 218]);
export const L = generateStory([220, 234]);
export const XL = generateStory([566, 323]);
export const S = generateStory([250, 220]);
export const TabletLandscape = generateStory([200, 190]);
export const TabletPortrait = generateStory([200, 210]);