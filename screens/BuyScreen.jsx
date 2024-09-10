import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import TervivePurchase from './TervivePurchase';

const BuyScreen = ({ navigation }) => {
  const items = [
    { id: 1, name: 'Plants', category: 'commercial.agrarian', uri: require('../assets/images/plants.jpeg') },
    { id: 2, name: 'Fertilizers', category: 'commercial.agrarian', uri: require('../assets/images/fertilizer.jpeg') },
    { id: 3, name: 'Pesticides', category: 'commercial.agrarian', uri: require('../assets/images/pesticide.jpeg') },
    { id: 4, name: 'Organic Material', category: 'commercial.agrarian', uri: require('../assets/images/organic.jpeg') },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          style={[styles.card, tw`p-4 rounded-lg mb-4 mt-8`]}
          onPress={() => navigation.navigate('ShopsListScreen', { category: item.category })}
        >
          <Image
            source={item.uri}
            style={tw`w-full h-32 mb-2 rounded-lg`}
            resizeMode="cover"
          />
          <Text style={tw`text-xl text-center`}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    height: '100%'
  },
  card: {
    width: '48%', // Adjust width as needed
    borderWidth: 2,
    borderColor: '#48bb78',
    marginBottom: 16,
  },
});

export default BuyScreen;
