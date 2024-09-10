import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import tw from 'tailwind-react-native-classnames';
import { auth } from '../firebaseConfig';

const Register = ({props}) => {
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerigy, setPasswordVerify] = useState(false);
  const [name, setName] = useState('');
  const [nameVerify, setNameVerify] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileVerify, setMobileVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  // const handleRegister = async () => {
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;
  //     console.log('Registered with:', user.email);
  //     navigation.navigate('Login'); 
  //   } catch (error) {
  //     console.error('Error registering:', error.message);
  //   }
  // };
  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    set
  }

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-lg font-bold`}>Register Screen</Text>
      <TextInput
        style={tw`mt-4 w-3/4 p-2 border border-gray-300 rounded`}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={tw`mt-4 w-3/4 p-2 border border-gray-300 rounded`}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={tw`mt-4 w-3/4 p-2 border border-gray-300 rounded`}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={tw`mt-4 w-3/4 p-2 border border-gray-300 rounded`}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={tw`mt-4 p-2 bg-blue-500 rounded`}>
        <Text style={tw`text-white`}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={tw`mt-4`}>
        <Text style={tw`text-blue-500`}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;