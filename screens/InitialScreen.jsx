import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Header from '../components/Header';
import tw from 'tailwind-react-native-classnames';

const InitialScreen = ({ navigation }) => {
  return (
    <>
    
    <View style={styles.container}>
    <Header />
      <View style={tw`flex-row justify-around`}>
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('Credits')}>
            <Image source={require('../assets/images/credit.jpg')} style={tw`w-28 h-28`} />
        <Text style={styles.cardTitle}>Credits</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('Leaderboard')}>
            <Image source={require('../assets/images/leaderboard.png')} style={tw`w-28 h-28`} />
        <Text style={styles.cardTitle}>Leaderboard</Text>
      </TouchableOpacity>
      </View>
      <View style={tw`bg-gray-100 h-48 justify-center mx-auto w-72 mt-2`}>
      <Image source={require('../assets/images/t5.webp')} style={tw`w-48 h-48 mx-auto mt-8`} />
      <TouchableOpacity style={tw`bg-gray-200 px-2 py-4`}>
        <Text style={tw`mx-auto`}>
            Diagnose Plant
        </Text>
      </TouchableOpacity>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    width: '45%',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    borderColor: '#b2beb5'
  },
  cardTitle: {
    fontSize: 16,
    marginTop: 24,
    fontWeight: 'semibold'
  },
});

export default InitialScreen;
