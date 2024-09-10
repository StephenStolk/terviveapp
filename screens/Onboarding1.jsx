import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

const Onboarding1 = () => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/bg1.jpeg')} style={styles.bg} />
            <View style={styles.splashContainer}>
                <Image source={require('../assets/images/tree.png')} style={styles.splashImage} />
                <Text style={tw`text-xl font-bold`}>Plant a Memory Plant a Tree, </Text>
                <Text style={tw`text-xl font-bold`}>Do it Today for Tomorrow !</Text>
                <TouchableOpacity 
                    style={tw`p-2 rounded-xl w-3/4 absolute bottom-8 border`} 
                    onPress={() => navigation.navigate('Onboarding2')}
                >
                    <Text style={tw`m-auto py-1 text-lg`}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#93c572',
    },
    bg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '30%',
        width: '100%',
        resizeMode: 'cover',
        borderBottomRightRadius: 500,
        borderBottomLeftRadius: 300 
    },
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, 
    },
    splashImage: {
        width: 200,
        height: 200,
        borderBottomRightRadius: 100, 
    },
});

export default Onboarding1;
