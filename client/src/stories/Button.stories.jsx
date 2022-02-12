import React from 'react';
import { Button } from '../ui/atoms/Button';
import { Grid, Typography } from '@mui/material';
import { IconAdd, IconArrow } from 'ui/atoms/button.styled';
/* eslint-disable */
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Zadanie 1/Button',
  component: Button,
  description: 'ahaha',
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: ['contained', 'outlined'],
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['large', 'medium', 'small'],
    },
    color: {
      control: {
        type: 'radio',
      },
      options: ['primary', 'error', 'success', 'warning'],
    },
    disabled: {
      control: {
        default: false,
        type: 'boolean',
      },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = ({ label, ...args }) => <Button {...args}>{label}</Button>;
const All = () => (
  <>
    <Grid container>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant={'subheading'}>Contained</Typography>
      </Grid>
      <Button variant={'contained'} color={'primary'}>
        Button
      </Button>
      <Button variant={'contained'} color={'error'}>
        Button
      </Button>
      <Button variant={'contained'} color={'success'}>
        Button
      </Button>
      <Button variant={'contained'} color={'warning'}>
        Button
      </Button>
    </Grid>
    <Grid container sx={{ mt: 5 }}>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant={'subheading'}>Contained Outlined</Typography>
      </Grid>
      <Button disabled color={'primary'} variant={'contained'}>
        Button
      </Button>
      <Button disabled variant={'contained'} color={'error'}>
        Button
      </Button>
      <Button disabled variant={'contained'} color={'success'}>
        Button
      </Button>
      <Button disabled variant={'contained'} color={'warning'}>
        Button
      </Button>
    </Grid>
    <Grid container sx={{ mt: 5 }}>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant={'subheading'}>Outlined</Typography>
      </Grid>
      <Button variant={'outlined'} color={'primary'}>
        Button
      </Button>
      <Button variant={'outlined'} color={'error'}>
        Button
      </Button>
      <Button variant={'outlined'} color={'success'}>
        Button
      </Button>
      <Button variant={'outlined'} color={'warning'}>
        Button
      </Button>
    </Grid>
    <Grid container sx={{ mt: 5 }}>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant={'subheading'}>Outlined Disabled</Typography>
      </Grid>
      <Button disabled variant={'outlined'} color={'primary'}>
        Button
      </Button>
      <Button disabled variant={'outlined'} color={'error'}>
        Button
      </Button>
      <Button disabled variant={'outlined'} color={'success'}>
        Button
      </Button>
      <Button disabled variant={'outlined'} color={'warning'}>
        Button
      </Button>
      <Grid container sx={{ mt: 5 }}>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography variant={'subheading'}>Icons</Typography>
        </Grid>
        <Button endIcon={<IconArrow />} variant={'outlined'} color={'primary'}>
          Dalej
        </Button>
        <Button startIcon={<IconAdd />} variant={'contained'} color={'error'}>
          Dodaj
        </Button>
        <Button
          endIcon={<IconArrow />}
          variant={'outlined'}
          color={'success'}
        ></Button>
        <Button
          startIcon={<IconArrow />}
          variant={'outlined'}
          color={'primary'}
        ></Button>
      </Grid>
    </Grid>
  </>
);

export const Playground = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  label: 'Button',
};

export const AllStories = All.bind({});
