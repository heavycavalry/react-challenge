import React from 'react';

import { Modal } from '../ui/molecules/Modal';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Zadanie 1/Modal',
  component: Modal,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = ({ ...args }) => <Modal {...args}></Modal>;

const All = () => <Modal title="Dodaj rekord"></Modal>;
export const Playground = Template.bind({});
export const AllStories = All.bind({});
