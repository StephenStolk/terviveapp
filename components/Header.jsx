import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import tw from 'tailwind-react-native-classnames';
// import Colors from '../utils/Colors';
import * as Location from 'expo-location';
import * as LocationGeocoding from 'expo-location';

const Header = () => {
  const [initial, setInitial] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setInitial(getInitial(user));
      } else {
        setInitial('');
      }
    });

    return () => unsubscribe();
  }, []);

  const getInitial = (user) => {
    if (user.displayName) {
      console.log(user.displayName);
      return user.displayName.charAt(0).toUpperCase();
    } else if (user.email) {
      console.log(user.email.charAt(0));
      return user.email.charAt(0).toUpperCase();
    } else {
      return '?';
    }
  };

  const [locationEnabled, setLocationEnabled] = useState(false);

  useEffect(() => {
    CheckIfLocationEnabled();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location services are not enabled.",
        "Please Enable your location services",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationEnabled(true);
    }
  };

  return (
    <SafeAreaView style={tw`bg-white`}>
      <View style={tw`mt-12 mb-4`}>
        <View style={tw`flex-row items-center px-2`}>
          <View style={tw`bg-green-500 rounded-full w-12 h-12 justify-center items-center`}>
            <Text style={tw`text-2xl text-white`}>{initial}</Text>
          </View>
          <TextInput
            style={[styles.input, tw`flex-1 ml-6`]}
            placeholder="Enter a location"
            // value={query}
            // onChangeText={setQuery}
            // onSubmitEditing={fetchAqiDataByQuery}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 6,
  },
});

export default Header;


// components/Header.jsx
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const Header = ({ initials }) => {
//   return (
//     <View style={styles.header}>
//       <Text style={styles.initials}>{initials}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     height: 60,
//     backgroundColor: '#ff6600',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   initials: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
// });

// export default Header;
