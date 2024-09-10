import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import Header from '../components/Header';
import tw from 'tailwind-react-native-classnames';

const Credits = () => {
  const [credits, setCredits] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getPermissions = async () => {
      // Request permissions for image picker and location
      const imagePickerStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      
      if (imagePickerStatus.status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera roll permissions are required to select an image.');
      }
      if (cameraStatus.status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera permissions are required to take a photo.');
      }
      if (locationStatus.status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permissions are required to fetch address.');
      }
    };

    getPermissions();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to fetch address.');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
    setAddress(reverseGeocode[0].city || '');
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = () => {
    if (!name || !address || !category || !image) {
      Alert.alert('Missing Fields', 'Please fill in all fields and take a photo.');
      return;
    }

    let addedCredits = 0;
    switch (category) {
      case 'Plants':
        addedCredits = 20;
        break;
      case 'Fertilizer':
        addedCredits = 15;
        break;
      case 'Pesticide':
        addedCredits = 10;
        break;
      case 'Organic Material':
        addedCredits = 10;
        break;
      default:
        Alert.alert('Invalid Category', 'Please select a valid category.');
        return;
    }
    setCredits(credits + addedCredits);
    Alert.alert('Credits Added', `${addedCredits} credits have been added.`);
    setShowForm(false);
  };

  return (
    <>
    <Header />
    <View style={styles.container}>
      <View style={styles.creditsBox}>
        <Text style={styles.creditsText}>My Credits: {credits}</Text>
      </View>
      {showForm ? (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onFocus={getLocation}
            onChangeText={setAddress}
          />
          <Picker
            selectedValue={category}
            style={styles.input}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Select Category" value="" />
            <Picker.Item label="Plants" value="Plants" />
            <Picker.Item label="Fertilizer" value="Fertilizer" />
            <Picker.Item label="Pesticide" value="Pesticide" />
            <Picker.Item label="Organic Material" value="Organic Material" />
          </Picker>
          <Button title="Take a Photo" onPress={takePhoto} />
          {image && (
            <Image
              source={{ uri: image }}
              style={styles.image}
            />
          )}
          <Button style={tw``} title="Submit" onPress={handleSubmit} />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.earnCreditsButton}
          onPress={() => setShowForm(true)}
        >
          <Text style={styles.earnCreditsButtonText}>Earn Credit</Text>
        </TouchableOpacity>
      )}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  creditsBox: {
    width: '100%',
    padding: 12,
    marginVertical: 10,
    backgroundColor: '#48bb78',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
  },
  creditsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    marginTop: 80,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 12,
    resizeMode: 'cover'
  },
  earnCreditsButton: {
    padding: 16,
    backgroundColor: '#48bb78',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    position: 'absolute',
    bottom: 36,
    left: 16,
    right: 16
  },
  earnCreditsButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Credits;
