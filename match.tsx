import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App'; 

const screenWidth = Dimensions.get('window').width;

type MatchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Match'>;

const MatchScreen = () => {
  const navigation = useNavigation<MatchScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.custcontainer}>
        <TouchableOpacity
          style={[styles.customButton, styles.shadowBox]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>&lt;</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -100 }}>
        <Text style={styles.pageText}>Page Coming Soon - Match Analysis</Text>
      </View>
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
    width: 75,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 46,
    fontWeight: "bold",
    textAlign: "center",
 
  },
  pageText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
});

export default MatchScreen;
