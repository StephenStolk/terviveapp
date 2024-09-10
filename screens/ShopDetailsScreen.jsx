import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ShopDetailsScreen = ({ route }) => {
  const { shop } = route.params;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <ScrollView contentContainerStyle={tw`p-4`}>
      <View style={tw`p-4 bg-gray-200 rounded-lg mb-4`}>
        <Text style={tw`text-xl font-bold`}>{shop.properties.name}</Text>
        <Text>{shop.properties.address_line2}</Text>
        <TouchableOpacity
          style={tw`mt-2`}
          onPress={() => setShowDetails(!showDetails)}
        >
          <Ionicons name={showDetails ? 'chevron-up' : 'chevron-down'} size={24} color="orange" />
          <Text style={tw`text-orange-500`}>
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Text>
        </TouchableOpacity>
        {showDetails && (
          <View style={tw`mt-4`}>
            <Text>Contact: {shop.properties.phone}</Text>
            <Text>Website: {shop.properties.website}</Text>
            <Text>Opening Hours: {shop.properties.opening_hours}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ShopDetailsScreen;
