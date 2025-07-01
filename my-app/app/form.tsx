
import { useEffect, useRef, useState } from "react";
import { Text, View, Button, StyleSheet, Image, Alert, TouchableOpacity, Dimensions} from "react-native";
import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Link } from 'expo-router';


const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    backgroundColor:"	#fdf6ec",
    justifyContent:"flex-start",
    alignItems: "center",
  },
  custcontainer:{
    display:"flex",
    width:"90%",
    flexDirection: "row",
    // height: 100,
    // backgroundColor:"black",
    justifyContent:"space-between",

  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 5,
  },
  customButton: {
    backgroundColor: "#9fc9ae",
    paddingVertical: 4,
    justifyContent: "center",
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 46,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },
  linkWrapper: {
    alignSelf: "center",
    width: 75,
  }
});

export default function form() {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      
      
      <View style = {styles.custcontainer}>
        <Link href="/" asChild style={styles.linkWrapper}>
          <TouchableOpacity style={StyleSheet.flatten([styles.customButton, styles.shadowBox])}>
            <Text style={styles.buttonText}>
              &lt;
            </Text>
          </TouchableOpacity>
        </Link>
         <Link href="/" asChild style={styles.linkWrapper}>
          <TouchableOpacity style={StyleSheet.flatten([styles.customButton, styles.shadowBox])}>
            <Text style={styles.buttonText}>
              &#9432;
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
      

      
    </View>
  );
}
