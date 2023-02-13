import React, {useMemo} from 'react';
import {
  Modal,
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useSelector} from 'react-redux';

import Fonts from '../constants/fonts';
import {getScreenHeight, getScreenWidth} from '../utils/domUtil';

const CustomOpenSettings = (props:any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Modal
      visible={props.visible}
      animationType="fade"
      transparent={true}
      {...props}>
      <Pressable style={styles.modalScreen}>
        <View style={styles.modalContanier}>
          <Text style={[styles.title, {color: theme.primary}]}>
            {props.title} <Text style={{color: theme.primary}}>Denied</Text>
          </Text>
          <Text style={styles.subtitle}>{props.subtitle}</Text>

          <View style={styles.buttoncontanier}>
            <TouchableOpacity
              onPress={() => {
                props.opensettings();
              }}>
              <Text style={styles.buttontext}>
                {props.lefttitle ? props.lefttitle : 'Open Settings'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.close();
              }}>
              <Text style={styles.buttontext}>
                {props.righttitle ? props.righttitle : 'Close'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const createStyles = (theme:any) =>
  StyleSheet.create({
    modalScreen: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
      justifyContent: 'center',
    },
    modalContanier: {
      backgroundColor: 'white',
      width: getScreenWidth(90),
      alignSelf: 'center',
      padding: getScreenHeight(2),
      borderRadius: getScreenHeight(1),
    },
    title: {
      fontSize: getScreenHeight(2),
      fontFamily: Fonts.semiBold,
    },
    buttoncontanier: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: getScreenHeight(4),
    },
    subtitle: {
      fontFamily: Fonts.medium,
      fontSize: getScreenHeight(1.5),
    },
    buttontext: {
      fontSize: getScreenHeight(1.8),
      color: theme.primary,
      fontFamily: Fonts.medium,
    },
  });

export default CustomOpenSettings;