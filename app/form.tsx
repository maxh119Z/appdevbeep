
import { useEffect, useRef, useState } from "react";
import { Text, View, Button, StyleSheet, Image, Alert, TouchableOpacity, Dimensions, Pressable, TouchableWithoutFeedback, Modal} from "react-native";
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
    backgroundColor: "#b7c9b6",
    paddingVertical: 4,
    justifyContent: "center",
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  customButton1: {
    backgroundColor: "#f7b5b8",
    justifyContent: "center",
    borderRadius: 12,
    marginTop: 15,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 46,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },
  linkWrapper: {
    alignSelf: "center",
    width: 75,
  },
  linkWrapper1: {
    marginLeft:20,
    width: 55,
    height:55,
  },
  buttonText1: {
    color: "white",
    fontSize: 33,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },
  backdrop: {
    width:"70%",
    height:"55%",
    margin: "auto",
    display:"flex",
    // position:"fixed",
    
    // left:"50%",
    // top:"50%",
    // transform:"translate(-50%,-50%)",//will change later this is bad hardcode way to center
    // backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup:{
    width:"100%",
    height:"100%",
  },
  popup1: {
    // backgroundColor: 'red',
    backgroundColor: "#d9e8f5",
    paddingRight:5,
    borderRadius: 10,
    width:"96%",
    height:"98%",
    position:"absolute",
    bottom:0,
    left:0,
    zIndex:2,
  },
  popup2: {
    backgroundColor: '#9ec6e5',
    paddingLeft:5,
    borderRadius: 10,
    width:"95%",
    height:"97%",
    position:"absolute",
    top:0,
    right:0,
    zIndex:1,
  },
  popuptext:{
    width:"90%",
    alignSelf:"center",

    
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },
  Image1:{
    paddingTop:20,
    width:"80%",
    height:undefined,
    aspectRatio: 1.27,     
    alignSelf: 'center',
    resizeMode: 'contain',

  },
});

export default function form() {
  const [visible, setVisible] = useState(false);
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
       <Pressable
        onPress={() => setVisible(true)}
        style={({ pressed }) =>
          StyleSheet.flatten([
            styles.linkWrapper,
            styles.customButton,
            styles.shadowBox,
            pressed && { opacity: 0.7 }
          ])
        }
      >
        <Text style={styles.buttonText}>&#9432;</Text>
      </Pressable>
      </View>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback >
          <View style={styles.backdrop}>
           <TouchableWithoutFeedback >
            <View style = {styles.popup}>
              <View style={styles.popup1}>
                <Pressable
                  onPress={() => setVisible(false)}
                  style={({ pressed }) =>
                    StyleSheet.flatten([
                      styles.linkWrapper1,
                      styles.customButton1,
                      pressed && { opacity: 0.7 }
                    ])
                  }
                >
                  <Text style={styles.buttonText1}>X</Text>
                </Pressable>
                <Text style = {styles.popuptext}>Turn your device horizontally when your camera turns on.{"\n"}{"\n"}Hold up your badminton form, and the software will map your joints. A green circle indicates the correct form, while a red circle means something is wrong!
                  
                </Text>
                <Image
                          style={styles.Image1}
                          source={require('./images/formguy.png')}
                        />
                </View>
              <View style={styles.popup2}></View>
            </View>
          </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      

     
    </View>
  );
}