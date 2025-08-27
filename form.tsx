import React, { useState } from "react";
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./App";

const screenWidth = Dimensions.get("window").width;

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Form">;

const FormScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [visible, setVisible] = useState(true);

  return (
    <View style={styles.container}>
      {/* Back and Info Buttons */}
      <View style={styles.custcontainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={[styles.customButton, styles.shadowBox, styles.linkWrapper]}
        >
          <Text style={styles.buttonText}><AntDesign name="arrowleft" size={31} color="#111" /></Text>
        </TouchableOpacity>

        <Pressable
          onPress={() => setVisible(true)}
          style={({ pressed }) => [
            styles.linkWrapper,
            styles.customButton,
            styles.shadowBox,
            pressed && { opacity: 0.7 },
          ]}
        >
          <Text style={styles.buttonText}><AntDesign name="info" size={35} color="#111" /></Text>
        </Pressable>
      </View>

      {/* Section */}
      <View style={styles.section1}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Camera")}
          style={[styles.customSectionButton, styles.shadowBox, styles.linkWrapper3]}
        >
          <Text style={styles.buttonText2}>Start Form Detection <AntDesign name="camera" size={37} color="#2e1315ff" /></Text>
        </TouchableOpacity>
        <View style={styles.subheader}>
                <Text style = {styles.subheaderText}>Wifi Connection is Required!</Text>
                
        </View>

        <Image style={styles.Image2} source={require("./images/placeholder.png")} />
      </View>
      
      {/* Info Modal */}
      <Modal transparent visible={visible} animationType="fade" onRequestClose={() => setVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.backdrop}>
            <TouchableWithoutFeedback>
              <View style={styles.popup}>
                <View style={styles.popup1}>
                  <Pressable
                    onPress={() => setVisible(false)}
                    style={({ pressed }) => [
                      styles.linkWrapper1,
                      styles.customButton1,
                      pressed && { opacity: 0.7 },
                    ]}
                  >
                    <Text style={styles.buttonText1}>X</Text>
                  </Pressable>
                  <Text style={styles.popuptext}>
                    Turn your device horizontally when your camera turns on.{"\n\n"}
                    Ensure  your entire upper body is visible. Hold up your badminton form, and the software will map your joints. Green = Good, while Red = something is wrong!
                  </Text>
                  <Image style={styles.Image1} source={require("./images/formguy.png")} />
                 
                </View>
                <View style={styles.popup2}></View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fdf6ec",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  custcontainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shadowBox: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 5,
  },
  customButton: {
    backgroundColor: "#9fc9ae",
    paddingVertical: 18,
    justifyContent: "center",
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
    width: 70,
    alignItems: "center",
  },
    subheaderText:{
    color: "#1A202C",
    fontSize: 18,
    fontFamily: 'Inter_28pt-SemiBoldItalic',
    alignSelf:"center",
  },
  subheader:{
    width: "100%",
    justifyContent: "center",
    textAlign:"center",
    alignItems: "center",
    flexDirection:"row",
  },
  customSectionButton: {
    backgroundColor: "#f7b5b8",
    paddingVertical: 7,
    justifyContent: "center",
    borderRadius: 7,
    marginTop: 10,
    marginBottom: 20,
  },
  customButton1: {
    backgroundColor: "#f7b5b8",
    justifyContent: "center",
    borderRadius: 12,
    marginTop: 10,
    marginLeft:10,
    marginBottom: 10,
    width: 40,
    height: 40,
    alignItems: "center",
   
  },
  buttonText: {
    color: "white",
    fontSize: 46,
    fontFamily: "Inter_28pt-ExtraBold",
    textAlign: "center",
  },
  buttonText2: {
    color: "#2e1315ff",
    fontSize: 27,
    fontFamily: "Inter_28pt-ExtraBold",
    textAlign: "center",
  },
  buttonText1: {
    color: "white",
    fontSize: 23,
    fontFamily: "Inter_28pt-ExtraBold",
    textAlign: "center",
  },
  linkWrapper: {
    alignSelf: "center",
    width: 70,
  },
  linkWrapper3: {
    alignSelf: "center",
    width: "75%",
  },
  linkWrapper1: {
    marginLeft: 20,
  },
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "70%",
    height: "55%",
    position: "relative",
  },
  popup1: {
    backgroundColor: "#d9e8f5",
    paddingRight: 5,
    borderRadius: 10,
    width: "96%",
    height: "98%",
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 2,
  },
  popup2: {
    backgroundColor: "#9ec6e5",
    paddingLeft: 5,
    borderRadius: 10,
    width: "95%",
    height: "97%",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
  popuptext: {
    width: "90%",
    alignSelf: "center",
    fontSize: 15,
    fontFamily: "Inter_28pt-Bold",
    textAlign: "center",
  },
  section1: {
    width: "75%",
    height: "75%",
    alignSelf: "center",
    marginTop: 15,
  },
  Image1: {
    flex: 0.9,
    resizeMode: "contain",
    alignSelf: "center",
  },
  Image2: {
    flex: 1,
    width: "120%",
    resizeMode: "contain",
    alignSelf: "center",
  },
});

export default FormScreen;
