import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import tw from 'twrnc'; // Assuming you're using TailwindCSS for React Native

const SplashScreen = ({ navigation }) => {
  return (
    <>
    <View style={styles.splashContainer}>
      <Text style={tw`mt-28 text-2xl font-semibold`}>He who plants</Text>
      <Text style={tw`text-3xl font-bold bg-green-400 px-4 rounded-xl mt-1 py-1`}>a Tree</Text>
      <Text style={tw`text-2xl font-semibold`}>plants happiness</Text>
      <TouchableOpacity 
        style={tw`p-2 bg-gray-100 rounded-xl w-3/4 absolute top-8`} 
        onPress={() => navigation.navigate('Onboarding3')}
      >
        <Text style={tw`m-auto py-1 text-lg`}>Next</Text>
      </TouchableOpacity>      
      {/* <WebView
        source={{ uri: 'https://giphy.com/embed/RCtKcMeeIlIFskmH7C' }}
        style={tw`w-72`}
      /> */}
    </View>
    <View>
        
    <Image source={require('../assets/images/t2.jpg')} style={styles.splashImage} />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#fdfffc',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  splashImage: {
    width: 350,
    height: 350,
    
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // opacity: 0.3,
  },
  // webView: {
  //   width: 300,
  //   height: 300,
  //   borderRadius: 100
  // },
});

export default SplashScreen;
