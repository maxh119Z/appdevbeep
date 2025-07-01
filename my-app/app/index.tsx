
import { useEffect, useRef, useState } from "react";
import { Text, View, Button, StyleSheet, Image, Alert, TouchableOpacity, Dimensions} from "react-native";
import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Link } from 'expo-router';


const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:80,
    backgroundColor:"	#fdf6ec",
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
    gap: 15,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 70,
  },
  headerText: {
    color: "black",
    fontSize: 30,
    fontFamily: "Poppins_500Medium",
    fontWeight: "bold",
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 13,
    elevation: 5, // for Android
  },
  customButton: {
    backgroundColor: "#9fc9ae",
    paddingVertical: 22,
    justifyContent: "center",
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },
  linkWrapper: {
    alignSelf: "center",
    width: "75%",
  }
});

export default function Index() {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }



  return (
    <View style={styles.container}>
      
      <View style = {styles.header}><Image
        style={styles.tinyLogo}
        source={require('./images/logo.png')}
      /><Text style = {styles.headerText}>Beep Blop Boop</Text></View>

      <Link href="/form" asChild style={styles.linkWrapper}>
        <TouchableOpacity style={StyleSheet.flatten([styles.customButton, styles.shadowBox])}>
          <Text style={styles.buttonText}>
            Form
          </Text>
        </TouchableOpacity>
      </Link>

  
      <Link href="/match" asChild style={styles.linkWrapper}>
        <TouchableOpacity style={StyleSheet.flatten([styles.customButton, styles.shadowBox])}>
          <Text style={styles.buttonText}>
            Match Analysis
          </Text>
        </TouchableOpacity>
      </Link>

      <Link href="/about" asChild style={styles.linkWrapper}>
        <TouchableOpacity style={StyleSheet.flatten([styles.customButton, styles.shadowBox])}>
          <Text style={styles.buttonText}>
            About
          </Text>
        </TouchableOpacity>
      </Link>
      
    </View>
  );
}
