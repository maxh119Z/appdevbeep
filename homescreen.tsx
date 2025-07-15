import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.tinyLogo} source={require('./images/logo.png')} />
        <Text style={styles.headerText}>Beep Blop Boop</Text>
      </View>

      <TouchableOpacity
        style={[styles.customButton, styles.shadowBox]}
        onPress={() => navigation.navigate('Form')}
      >
        <Text style={styles.buttonText}>Form</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.customButton, styles.shadowBox]}
        onPress={() => navigation.navigate('Match')}
      >
        <Text style={styles.buttonText}>Match Analysis</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.customButton, styles.shadowBox]}
        onPress={() => navigation.navigate('About')}
      >
        <Text style={styles.buttonText}>About</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: "#fdf6ec",
    alignItems: "center",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  header: {
    padding: 30,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 70,
  },
  headerText: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
   
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 13,
    elevation: 5,
  },
  customButton: {
    backgroundColor: "#9fc9ae",
    paddingVertical: 22,
    justifyContent: "center",
    borderRadius: 12,
    marginTop: 20,
    width: "75%",
  },
  buttonText: {
    color: "black",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  
  },
});

export default HomeScreen;