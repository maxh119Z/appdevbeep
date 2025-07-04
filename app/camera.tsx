
import { useEffect, useRef, useState } from "react";
import { Text, View, Button, StyleSheet, Image, Alert, TouchableOpacity, Dimensions} from "react-native";
import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Link } from 'expo-router';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';


const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  Image:{
    width:"90%",
    height:"auto",
  },
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
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
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

export default function camera() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

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
         
      </View>
      <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        
      </CameraView>
    </View>

      
    </View>
  );
}