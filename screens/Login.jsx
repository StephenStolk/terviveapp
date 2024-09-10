import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig';
import tw from 'tailwind-react-native-classnames';
// import MainApp from './MainApp';
import HomeScreen from './HomeScreen';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // const handleLogin = async () => {
  //   try {
  //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;
  //     console.log('Logged in with:', user.email);
  //     navigation.navigate('HomeScreen'); 
  //   } catch (error) {
  //     console.error('Error logging in:', error.message);
  //   }
  // };

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-lg font-bold`}>Login Screen</Text>
      <TextInput
        style={tw`mt-4 w-3/4 p-2 border border-gray-300 rounded`}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={tw`mt-4 w-3/4 p-2 border border-gray-300 rounded`}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={tw`mt-4 p-2 bg-blue-500 rounded`}>
        <Text style={tw`text-white`}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={tw`mt-4`}>
        <Text style={tw`text-blue-500`}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
