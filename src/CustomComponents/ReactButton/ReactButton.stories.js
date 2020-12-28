import React from 'react';
// import Center from '../Center/Center';

import Button from './ReactButton';

export default {
  title: 'ReactButton',
  component: Button,
  argTypes: {
    background: { control: 'color' },
    color: { control: 'color' },
    width: { control: 'text' },
    children : {control:'text'},
    padding: { control: 'text' },
    margin:{control:'text'},
    height: { control: 'text' },

  },
  // decorators:[story=><Center>{story()}</Center>]
};

const Template = (args) => {
console.log(args)
return(
<Button {...args} />)};

export const CustomButton = (args) =><Button {...args}>{args.children}</Button>;
CustomButton.args = {
  children:'success',
  // background:'blue',
  // width:'100px',
  // padding:'20px'
}