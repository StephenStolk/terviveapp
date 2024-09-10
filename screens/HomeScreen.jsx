import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-react-native-classnames';
import BuyScreen from './BuyScreen';
import StatsScreen from './StatsScreen';
import CreditPurchase from './CreditPurchase';
import InitialScreen from './InitialScreen';

//icons
import { Ionicons } from '@expo/vector-icons';

// Dummy screens for tabs
const InvestmentScreen = () => (
  <View style={tw`flex-1 justify-center items-center`}>
    <Text>Investment Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#48bb78',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={InitialScreen} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen 
        name="Investment" 
        component={InvestmentScreen} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'ios-cash' : 'ios-cash-outline'} size={size} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen 
        name="Stats" 
        component={StatsScreen} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'stats-chart' : 'stats-chart-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Credit" 
        component={CreditPurchase} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Buy" 
        component={BuyScreen} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'cart' : 'cart-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;

//e4e3faf70f12c7792717a0ca57faa7bb415e3b5b