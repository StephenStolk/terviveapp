import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput, Button } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const API_KEY = '7e6e3144a2054236923c1e05c2a017ef';

const ShopsListScreen = () => {
  const [location, setLocation] = useState(null);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedShops, setExpandedShops] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to fetch nearby shops.');
      return false;
    }
    return true;
  };

  const getLocation = async () => {
    if (await getLocationPermission()) {
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      fetchShops(loc.coords.latitude, loc.coords.longitude);
    }
  };

  const fetchShops = async (lat, lon) => {
    setLoading(true);
    try {
      let response = await fetch(
        `https://api.geoapify.com/v2/places?categories=commercial.agrarian&filter=circle:${lon},${lat},200000&bias=proximity:${lon},${lat}&limit=20&apiKey=${API_KEY}`
      );
      let result = await response.json();
      if (result.features) {
        setShops(result.features);
      } else {
        setShops([]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch nearby shops');
      setShops([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCoordinates = async (city) => {
    setLoading(true);
    try {
      let response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${city}&apiKey=${API_KEY}`
      );
      let result = await response.json();
      if (result.features && result.features.length > 0) {
        let { lat, lon } = result.features[0].properties;
        fetchShops(lat, lon);
      } else {
        Alert.alert('Error', 'Failed to fetch coordinates for the city');
        setShops([]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch coordinates for the city');
      setShops([]);
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const toggleExpand = (placeId) => {
    setExpandedShops((prevExpandedShops) => ({
      ...prevExpandedShops,
      [placeId]: !prevExpandedShops[placeId],
    }));
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearching(true);
      fetchCoordinates(searchQuery.trim());
    } else {
      Alert.alert('Error', 'Please enter a city name to search');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Shops</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter city name"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Search" onPress={handleSearch} color="#48bb78" />
      </View>
      {loading && <ActivityIndicator size="large" color="#48bb78" />}
      {!loading && shops.length > 0 && (
        <FlatList
          data={shops}
          keyExtractor={(item) => item.properties.place_id}
          renderItem={({ item }) => (
            <View style={styles.shopItem}>
              <TouchableOpacity onPress={() => toggleExpand(item.properties.place_id)}>
                <View style={styles.shopHeader}>
                  <Text style={styles.shopName}>{item.properties.name}</Text>
                  <Ionicons
                    name={expandedShops[item.properties.place_id] ? 'arrow-up' : 'arrow-down'}
                    size={18}
                    color="black"
                  />
                </View>
              </TouchableOpacity>
              {expandedShops[item.properties.place_id] && (
                <View style={styles.shopDetails}>
                  <Text style={styles.shopDetailText}>Address: {item.properties.address_line2}</Text>
                  <Text style={styles.shopDetailText}>Opening Hours: {item.properties.opening_hours}</Text>
                </View>
              )}
            </View>
          )}
        />
      )}
      {!loading && !searching && shops.length === 0 && <Text>No shops found nearby.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#48bb78',
    marginTop: 36
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  shopItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  shopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shopName: {
    fontSize: 15,
    fontWeight: 'semibold',
  },
  shopDetails: {
    marginTop: 8,
  },
  shopDetailText: {
    fontSize: 14,
    color: '#666',
  },
});

export default ShopsListScreen;
