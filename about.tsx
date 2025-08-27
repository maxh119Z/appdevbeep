import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image // Import Image for images
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./App";
import AntDesign from 'react-native-vector-icons/AntDesign'; // Still using for back arrow if needed

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "About">;

const AboutScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={[styles.customButton, styles.shadowBox]}
        >
          <AntDesign name="arrowleft" size={31} color="#111" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <Text style={styles.title}>App Creators</Text>
        
        {/* Angela's Card */}
        <View style={[styles.card, styles.shadowBox]}>
          <Image
            source={require('./images/formguy.png')} // Replace with Angela's image path
            style={styles.avatarImage}
          />
          <Text style={styles.name}>Angela</Text>
          <Text style={styles.bio}>
            angela is so cool. angela is so cool. angela is so cool. angela is so cool. angela is so cool.
          </Text>
        </View>

        {/* Max's Card */}
        <View style={[styles.card, styles.shadowBox]}>
          <Image
            source={require('./images/formguy.png')} // Replace with Max's image path
            style={styles.avatarImage}
          />
          <Text style={styles.name}>Max</Text>
          <Text style={styles.bio}>
            maximus maxiumus maximusmaximusmaximusmaximusmaximusmaximusmaximusmaximusmaximus
          </Text>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fdf6ec",
  },
  headerContainer: {
    width: "90%",
    alignSelf: 'center',
  },
  scrollContentContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  shadowBox: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f8f8f2ff',
    borderRadius: 15,
    padding: 25,
    width: '95%',
    alignItems: 'center',
    marginBottom: 35,
  },
  avatarImage: { 
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    borderRadius: 50, // Makes the image circular
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
  }
});

export default AboutScreen;