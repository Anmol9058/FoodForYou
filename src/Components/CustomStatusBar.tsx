import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const CustomStatusBar = (props: any) => {
  const theme = useSelector((state: any) => state.theme.theme);

  return <StatusBar backgroundColor={props.color ? props.color : theme.primary_light} barStyle={props.light ? 'light-content' : 'dark-content'} />;
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    status: {
      backgroundColor: theme.primary_light,
    },
  });

export default CustomStatusBar;
