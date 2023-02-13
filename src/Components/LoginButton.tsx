import React from 'react';
import { Button, View, Text, ButtonProps, StyleProp, TouchableOpacity, TextStyle } from 'react-native';
import { string } from 'zod';
import fonts from '../constants/fonts';
import theme from '../redux/theme';
import { useSelector } from 'react-redux';
import { getScreenWidth, getScreenHeight } from '../utils/domUtil';

interface Props {
  title?: string;
  style?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const LoginButton: React.FC<Props> = ({ title, style, textStyle, onPress }) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const orientation = useSelector((state: any) => state.auth.orientation);

  return (
    <TouchableOpacity
      style={
        style
          ? style
          : {
              backgroundColor: theme.white,
              marginTop: getScreenHeight(3),
              height: orientation == false ? getScreenHeight(4) : getScreenWidth(4),
              width: orientation == false ? getScreenWidth(30) : getScreenWidth(15),
              borderRadius: getScreenWidth(4),
              alignItems: 'center',
              justifyContent: 'center',
            }
      }
      onPress={onPress}
    >
      <Text
        style={
          textStyle
            ? textStyle
            : { color: 'black', textAlign: 'center', fontSize: orientation == false ? getScreenWidth(3.8) : 18, fontWeight: 'bold' }
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
