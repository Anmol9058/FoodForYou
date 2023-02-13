import React, { useMemo } from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getScreenHeight, getScreenWidth } from '../utils/domUtil';
import { navigate } from '../Services/Routerseervivces';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Rating, AirbnbRating } from 'react-native-ratings';
const ResturantCard = (props: any) => {
  //   console.log(props, 'ggg');
  const orientation = useSelector((state: any) => state.auth.orientation);
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={orientation == false ? styles.container : styles.landScapecontainer}>
      {/* <Image style={styles.tinyLogo} source={require('@expo/snack-static/react-native-logo.png')} /> */}
      <Image style={orientation == false ? styles.tinyLogo : styles.landScapetinyLogo} source={{ uri: props.item.images[0].url }} />
      <View>
        <View style={orientation == false ? styles.titleContainer : styles.LandscapetitleContainer}>
          <Text style={orientation == false ? styles.titleStyle : styles.landScapetitleStyle}>{props.item.title}</Text>
        </View>
        <Rating
          imageSize={15}
          readonly
          showReadOnlyText={false}
          startingValue={props.item.rating}
          style={{ marginRight: getScreenWidth(25), marginTop: getScreenHeight(0.7) }}
        />
        {/* <AirbnbRating size={15} showRating={false} isDisabled starContainerStyle={{ marginRight: getScreenWidth(20), flexDirection: 'row' }} /> */}
      </View>
      <TouchableOpacity style={orientation == false ? styles.LogoContainer : styles.landScapeLogoContainer} onPress={props.onmapPress}>
        <Image style={styles.Logo} source={require('../assets/location.png')} />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.white,
      width: getScreenWidth(90),
      height: getScreenHeight(12),
      flexDirection: 'row',
      //  alignItems: 'center',
      padding: 5,
      marginTop: getScreenWidth(2),
      marginBottom: getScreenWidth(2),
      alignSelf: 'center',
      elevation: 10,
      borderRadius: 7,
    },
    landScapecontainer: {
      backgroundColor: theme.white,
      width: getScreenWidth(90),
      height: getScreenHeight(25),
      flexDirection: 'row',
      //  alignItems: 'center',
      padding: 5,
      marginTop: getScreenWidth(2),
      marginBottom: getScreenWidth(2),
      alignSelf: 'center',
      elevation: 10,
      borderRadius: 7,
    },
    backtext: {
      fontWeight: '600',
      marginLeft: getScreenWidth(2.5),
      color: 'white',
    },
    titleContainer: {
      width: getScreenWidth(50),
      marginLeft: getScreenWidth(5.5),
      marginTop: getScreenWidth(5),
    },
    LandscapetitleContainer: {
      width: getScreenWidth(50),
      marginLeft: getScreenWidth(14.5),
      marginTop: getScreenWidth(1),
    },
    titleStyle: {
      fontWeight: '600',

      color: 'black',
      fontSize: getScreenWidth(3.7),
    },
    landScapetitleStyle: {
      fontWeight: '600',

      color: 'black',
      fontSize: getScreenWidth(3),
    },
    tinyLogo: {
      width: getScreenWidth(15),
      height: getScreenWidth(15),
      borderRadius: 8,
      marginLeft: getScreenWidth(2),
      alignSelf: 'center',
    },
    landScapetinyLogo: {
      width: getScreenWidth(13),
      height: getScreenWidth(9),
      borderRadius: 8,
      marginLeft: getScreenWidth(2),
      alignSelf: 'center',
    },
    LogoContainer: {
      width: 45,
      height: 45,
      backgroundColor: theme.primary,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      elevation: 2,
    },
    landScapeLogoContainer: {
      width: getScreenWidth(8),
      height: getScreenWidth(8),
      backgroundColor: theme.primary,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      elevation: 2,
    },
    Logo: {
      width: 25,
      height: 25,
    },
  });

export default ResturantCard;
