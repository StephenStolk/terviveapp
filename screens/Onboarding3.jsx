import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
// import RegisterScreen from './Register';
import Register from './Register';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();


const Onboarding3 = () => {
    const navigation = useNavigation();
    const loadFonts = () => {
        return Font.loadAsync({
          'Roboto': require('../assets/Roboto-Black.ttf'),
          'Roboto_medium': require('../assets/Roboto-Medium.ttf'),
        });
      };
  return (
    <>
    {/* <View style={tw`w-full items-center bg-white`}>
    
    </View> */}
    <View style={styles.splashContainer}>
    <Text style={tw`text-3xl px-4 rounded-xl absolute top-16 left-8 py-2`}>'Save Plants, </Text>
    <Text style={tw`text-3xl px-4 rounded-xl absolute top-28 left-8 py-2`}>Save the Planet'</Text>
        <Image source={require('../assets/images/t5.webp')} style={styles.splashImage} />
    <TouchableOpacity style={tw`p-2 bg-gray-100 rounded-xl w-3/4 absolute bottom-8`} onPress={()=>navigation.navigate('Register')}>
     <Text style={tw`m-auto py-1 text-lg`}>Next</Text>
     </TouchableOpacity>
  </View>
  
    </>
  )
}

export default Onboarding3

const styles = StyleSheet.create({
    splashContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#93c572',
      //#fdfffc
    },
    splashImage: {
        width: 300,
        height: 300,
        // borderBottomRightRadius:500,
        // borderBottomLeftRadius:50,
        // marginBottom: 20,
        // position: "absolute",
        // top:0
      },
});