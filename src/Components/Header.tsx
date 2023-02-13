import React, { useMemo } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

import { getScreenHeight, getScreenWidth } from '../utils/domUtil';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { navigate, NavigationRef } from '../Services/Routerseervivces';
interface Props {
  title?: string;
  onpress?: () => void;
}
// const orientation = useSelector((state: any) => state.auth.orientation);
const Header: React.FC<Props> = ({ title, onpress }) => {
  //   console.log(title, 'ttttt');
  const orientation = useSelector((state: any) => state.auth.orientation);

  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={orientation == false ? styles.container : styles.landscapeContainer}>
      <TouchableOpacity style={{ position: 'absolute' }}>
        <Text style={orientation == false ? styles.backtext : styles.backtext2} onPress={onpress}>
          Back
        </Text>
      </TouchableOpacity>
      <View style={{ width: wp('100'), justifyContent: 'center', alignItems: 'center' }}>
        <Text style={orientation == false ? styles.titleStyle : styles.titleStyle2}>{title ? title : ''}</Text>
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.primary,
      width: '100%',
      height: '5%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    landscapeContainer: {
      height: getScreenHeight(14),
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.primary,
    },
    backtext: {
      fontWeight: '600',
      marginLeft: wp(2.5),
      color: 'white',
      alignSelf: 'center',
    },
    backtext2: {
      fontWeight: '600',
      marginLeft: wp(2.5),
      color: 'white',
      fontSize: 22,
      alignSelf: 'center',
    },
    landscapebacktext: {
      fontWeight: '600',
      marginLeft: wp(2.5),
      color: 'white',

      alignSelf: 'center',
    },
    titleStyle: {
      fontWeight: '600',
      color: 'white',
      //  marginBottom: 10,
      fontSize: 18,
    },
    titleStyle2: {
      fontWeight: '600',
      color: 'white',
      //  marginBottom: 10,
      fontSize: 26,
    },
  });

export default Header;
