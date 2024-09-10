import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Image, TouchableOpacity, Settings } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { AppRegistry } from 'react-native';
import Onboarding1 from './screens/Onboarding1';
import Onboarding3 from './screens/Onboarding3';
import Onboarding2 from './screens/Onboarding2';
import HomeScreen from './screens/HomeScreen';
import ShopsListScreen from './screens/ShopsListScreen';
import ShopDetailsScreen from './screens/ShopDetailsScreen'; // New screen for shop details
import Credits from './screens/Credits';
import Leaderboard from './screens/Leaderboard';
import Login from './screens/Login';
import Register from './screens/Register';
import SettingsScreen from './screens/Settings';

const Stack = createStackNavigator();

const loadFonts = () => {
  return Font.loadAsync({
    'Roboto': require('./assets/Roboto-Black.ttf'),
    'Roboto_medium': require('./assets/Roboto-Medium.ttf'),
  });
};

const SplashScreenComponent = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Onboarding1');
    }, 3000);
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Image source={require('./assets/images/p1.jpeg')} style={styles.splashImage} />
      <Text style={styles.splashText}>Tervive</Text>
    </View>
  );
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreenComponent} />
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} />
        <Stack.Screen name="Onboarding3" component={Onboarding3} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ShopsListScreen" component={ShopsListScreen} options={{ title: 'Nearby Shops' }} />
        <Stack.Screen name="ShopDetailsScreen" component={ShopDetailsScreen} options={{ title: 'Shop Details' }} />
        <Stack.Screen name="Credits" component={Credits} options={{ title: 'My Credits' }} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} options={{ title: 'Leaderboard' }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('main', () => App);

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA500',
  },
  splashImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  splashText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
});
