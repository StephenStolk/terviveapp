import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, Alert, ScrollView, TextInput } from 'react-native';
import * as Location from 'expo-location';
import tw from 'tailwind-react-native-classnames';

const API_TOKEN = 'e4e3faf70f12c7792717a0ca57faa7bb415e3b5b';

const StatsScreen = () => {
  const [location, setLocation] = useState(null);
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to fetch AQI data based on your location.');
      return false;
    }
    return true;
  };

  const getLocation = async () => {
    if (await getLocationPermission()) {
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      fetchAqiData(loc.coords.latitude, loc.coords.longitude);
    }
  };

  const fetchAqiData = async (lat, lon) => {
    setLoading(true);
    try {
      let response = await fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${API_TOKEN}`);
      let result = await response.json();
      if (result.status === 'ok') {
        setAqiData(result.data);
      } else {
        Alert.alert('Error', 'Failed to fetch AQI data');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch AQI data');
    } finally {
      setLoading(false);
    }
  };

  const fetchAqiDataByQuery = async () => {
    if (query.trim() === '') {
      Alert.alert('Error', 'Please enter a location');
      return;
    }
    setLoading(true);
    try {
      let response = await fetch(`https://api.waqi.info/feed/${query}/?token=${API_TOKEN}`);
      let result = await response.json();
      if (result.status === 'ok') {
        setAqiData(result.data);
      } else {
        Alert.alert('Error', 'Failed to fetch AQI data');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch AQI data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pollutants & Weather Conditions</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a location"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={fetchAqiDataByQuery}
        />
        <Button title="Search" onPress={fetchAqiDataByQuery} color="#48bb78" />
      </View>
      <ScrollView style={styles.scrollView}>
        {loading && <ActivityIndicator size="large" color="#ff6600" />}
        {!loading && aqiData && (
          <View style={styles.dataContainer}>
            <Text style={styles.station}>Station: {aqiData.city.name} on {aqiData.time.s}</Text>
            <View style={styles.table}>
              {Object.keys(aqiData.iaqi).map((key) => (
                <View key={key} style={styles.row}>
                  <Text style={styles.cell}>{getPollutantName(key)}</Text>
                  <Text style={styles.cell}>{colorize(aqiData.iaqi[key].v, key)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.locationButtonContainer}>
        <Button title="Use My Location" onPress={getLocation} color="#48bb78" />
      </View>
    </View>
  );
};

const getPollutantName = (key) => {
  const names = {
    pm25: "PM2.5",
    pm10: "PM10",
    o3: "Ozone",
    no2: "Nitrogen Dioxide",
    so2: "Sulphur Dioxide",
    co: "Carbon Monoxide",
    t: "Temperature",
    w: "Wind",
    r: "Rain (precipitation)",
    h: "Relative Humidity",
    d: "Dew",
    p: "Atmospheric Pressure",
  };
  return names[key] || key;
};

const colorize = (aqi, specie) => {
  specie = specie || "aqi";
  if (["pm25", "pm10", "no2", "so2", "co", "o3", "aqi"].indexOf(specie) < 0)
    return aqi;

  var spectrum = [
    { a: 0, b: "#cccccc", f: "#ffffff" },
    { a: 50, b: "#009966", f: "#ffffff" },
    { a: 100, b: "#ffde33", f: "#000000" },
    { a: 150, b: "#ff9933", f: "#000000" },
    { a: 200, b: "#cc0033", f: "#ffffff" },
    { a: 300, b: "#660099", f: "#ffffff" },
    { a: 500, b: "#7e0023", f: "#ffffff" },
  ];

  var i = 0;
  for (i = 0; i < spectrum.length - 2; i++) {
    if (aqi == "-" || aqi <= spectrum[i].a) break;
  }
  return (
    <View style={[styles.aqiBox, { backgroundColor: spectrum[i].b }]}>
      <Text style={{ color: spectrum[i].f }}>{aqi}</Text>
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
    marginTop: 36,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 36,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  scrollView: {
    flex: 1,
  },
  dataContainer: {
    flex: 1,
    alignItems: 'center',
  },
  station: {
    fontSize: 16,
    marginBottom: 12,
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  aqiBox: {
    padding: 8,
    borderRadius: 4,
  },
  locationButtonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
});

export default StatsScreen;
