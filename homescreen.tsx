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
        
        <Text style={styles.headerText}>Badminton AI Coach<View style={styles.test1}><Image style={styles.tinyLogo} source={require('./images/logo.png')} /></View></Text>
        
      </View>
      <View style={styles.subheader}>
        
        <Text style={styles.subheaderText}>bbb birdie elite center beep</Text>
        
      </View>

      <TouchableOpacity
        style={[styles.customButton, styles.shadowBox]}
        onPress={() => navigation.navigate('Form')}
      >
        <Text style={styles.buttonText}>Form Correction</Text>
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
        <Text style={styles.buttonText}>About Us</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  test1:{
    width:40,
    paddingLeft:15,
    // backgroundColor:"black",
  },
  container: {
    flex: 1,
    textAlign:"center",
    paddingTop: 80,
    backgroundColor: "#fdf6ec",
    alignItems: "center",
  },
  tinyLogo: {
    width: 40,
    height: 52.5,
  },
  header: {
    padding: 30,
    paddingBottom: 0,
    width: "90%",
    justifyContent: "center",
    textAlign:"center",
    alignItems: "center",
    paddingTop: 20,
  },
  headerText: {
    color: "#1A202C",
    fontSize: 55,
    fontFamily: 'Inter_28pt-ExtraBold',
    alignSelf:"center",
  },
  subheaderText:{
    color: "#1A202C",
    fontSize: 18,
    fontFamily: 'Inter_28pt-SemiBoldItalic',
    alignSelf:"center",
  },
  subheader:{
    padding: 30,
    paddingBottom:50,
    paddingTop:1,
    width: "100%",
    justifyContent: "center",
    textAlign:"center",
    alignItems: "center",
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
    fontFamily: 'Inter_24pt-Regular',
    textAlign: "center",
  
  },
});

export default HomeScreen;