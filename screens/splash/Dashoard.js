import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Device from "expo-device";
import * as Location from "expo-location";
import { addLocations } from "../../redux/reducer/locationReducer";

const Dashboard = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const disPatch = useDispatch();
    useEffect(() => {
      const timeId = setInterval(() => {
        console.log("thnder");
        (async () => {
          if (Platform.OS === "android" && !Device.isDevice) {
            setErrorMsg(
              "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
            );
            return;
          }
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
  
          setLocation(location);
          console.log("capturing location", location);
          disPatch(addLocations(location));
        })();
      }, 50000);
      return () => clearInterval(timeId);
    }, []);
    const handleLogOut=async ()=>{
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login')
    }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      <TouchableOpacity 
        style={styles.box}
        onPress={() => navigation.navigate('Attendance')}
      >
        <Text style={styles.boxText}>Attendance</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.box}
        onPress={() => navigation.navigate('CheckInOutScreen')}
      >
        <Text style={styles.boxText}>Dealer Check-In</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.box}
        onPress={() => navigation.navigate('Map')}
      >
        <Text style={styles.boxText}>Employee Location Map</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.box}
        onPress={() => handleLogOut()}
      >
        <Text style={styles.boxText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  box: {
    width: '100%',
    padding: 16,
    backgroundColor: '#4CAF50',
    marginBottom: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  boxText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Dashboard;
