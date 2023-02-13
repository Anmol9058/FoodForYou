import React, { useMemo, useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle, TextInputProps, View, TextInput, Text } from 'react-native';
import { useSelector } from 'react-redux';

interface ExtraInputProps {
  label?: string;
  iconColor?: string;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  iconSize?: number;
  onChangeText?: (text: string) => void;
  hideLabel?: boolean;
  multiline?: boolean;
  // value?: string;
}

type InputProps = ExtraInputProps & TextInputProps;

const StyledTextInput: React.FC<InputProps> = ({
  label,
  iconColor,
  placeholder,
  keyboardType,
  containerStyle,
  inputStyle,
  iconSize,
  onChangeText,
  hideLabel,
  multiline,
  // value,
}) => {
  //styles
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  //props
  const labelValue = label ? label : 'Label';
  const iconColorValue = iconColor ? iconColor : 'rgba(255,87,87,1)';
  const placeholderValue = placeholder ? placeholder : 'placeholder';
  const keyboardTypeValue = keyboardType ? keyboardType : 'default';
  const iconSizeValue = iconSize ? iconSize : 24;
  const hideLabelValue = hideLabel ? hideLabel : false;

  const [height, setHeight] = useState(50 as number);

  //default placeholder value
  const _defaultPlaceholderValue = () => {
    switch (labelValue.toLocaleLowerCase()) {
      case 'email' || 'e-mail':
        return 'your@email.com';
      case 'password':
        return '∗ ∗ ∗ ∗ ∗ ∗ ∗ ∗';
      case 'username':
        return 'username@123';
      default:
        return 'placeholder';
    }
  };

  const defaultPlaceholderValue = placeholderValue || _defaultPlaceholderValue();

  //state
  // const [value, onChangeValue] = useState('');

  // console.log(labelValue.toLocaleLowerCase() === 'password' ? true : false);

  return (
    <View>
      {!hideLabel && <Text style={styles.inputLabel}>{labelValue}</Text>}
      <View style={[styles.inputContainer, { height: height }, containerStyle]}>
        <TextInput
          style={[styles.input, inputStyle]}
          onChangeText={onChangeText}
          // value={value}
          placeholder={defaultPlaceholderValue}
          keyboardType={keyboardTypeValue}
          secureTextEntry={labelValue.toLocaleLowerCase() === 'password' ? true : false}
          multiline={multiline || false}
          numberOfLines={multiline ? 4 : 1}
          onContentSizeChange={(e) => {
            if (multiline) {
              const height = e.nativeEvent.contentSize.height;
              if (height < 50) setHeight(50);
              if (height > 50 && height < 80) setHeight(height);
            }
          }}
        />
      </View>
    </View>
  );
};

export default StyledTextInput;

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '70%',
      alignSelf: 'center',
    },
    inputContainer: {
      // width: '70%',
      // height: 50,
      backgroundColor: 'white',
      borderRadius: 7,
      elevation: 10,
    },
    inputLabel: {
      textTransform: 'uppercase',
      marginBottom: 5,
      fontSize: 15,
      fontWeight: 'bold',
      color: 'black',
    },
    rightIcon: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
    },

    input: {
      height: '100%',
      width: '100%',
      color: 'black',
      fontWeight: 'bold',
      // borderWidth: 2,
      // borderColor: 'rgb(211, 211, 211)',
      borderRadius: 10,
      paddingLeft: 15,
      paddingRight: '20%',
    },
  });
