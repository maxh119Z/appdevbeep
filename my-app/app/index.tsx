
import { useEffect, useRef, useState } from "react";
import { Text, View, Button, StyleSheet, Image, Alert, TouchableOpacity} from "react-native";
import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Link } from 'expo-router';
import { WebView } from 'react-native-webview';

export default function Index() {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
  });


  const styles = StyleSheet.create({
    container: {

      flex: 1,
 
      alignItems: "center",
    },
    tinyLogo: {
    width: 50,
    height: 50,
   },
    header: {
      padding: 30,
      width:"100%",
      justifyContent: "center",
      
      gap: 15,
      flexDirection: "column",
      alignItems: "center",
      paddingTop:70,
   
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
      shadowRadius: 13.84,         
      elevation: 5,           
    },
    customButton: {
      backgroundColor: "#9fc9ae",
      width:"100%",
      paddingVertical: 22,
      justifyContent:"center",
    
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
    Link1:{
      alignSelf: "center",
      width: "75vw"
      
    }
    
  });

  return (
    <View style={styles.container}>
      
      <View style = {styles.header}><Image
        style={styles.tinyLogo}
        source={require('./images/logo.png')}
      /><Text style = {styles.headerText}>Beep Blop Boop</Text></View>

      <Link href="/match">
        <TouchableOpacity style={[styles.customButton, styles.shadowBox, styles.Link1]}>
          <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="clip">
            Form
          </Text>
        </TouchableOpacity>
      </Link>

      <Link href="/match">
        <TouchableOpacity style={[styles.customButton, styles.shadowBox, styles.Link1]}>
          <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="clip">
            Match Analysis
          </Text>
        </TouchableOpacity>
      </Link>


      <Link href="/match">
        <TouchableOpacity style={[styles.customButton, styles.shadowBox, styles.Link1]}>
          <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="clip">
            About
          </Text>
        </TouchableOpacity>
      </Link>
      
    </View>
  );
}
