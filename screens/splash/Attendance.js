import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ATTENDANCE_KEY = "@attendance_data";

const Attendance = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);

      // Load attendance data from AsyncStorage
      const storedData = await AsyncStorage.getItem(ATTENDANCE_KEY);
      if (storedData) {
        const { checkIn, checkOut } = JSON.parse(storedData);
        if (checkIn) {
          setCheckInTime(checkIn);
          setCheckedIn(true);
        }
        if (checkOut) {
          setCheckOutTime(checkOut);
        }
      }
    })();
  }, []);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString();
  };

  const handleCheckIn = async () => {
    if (!employeeId) {
      Alert.alert("Error", "Please enter your Employee ID");
      return;
    }
    if (!location) {
      Alert.alert("Error", "Unable to fetch your location. Please try again.");
      return;
    }
    const time = getCurrentTime();
    setCheckedIn(true);
    setCheckInTime(time);
    
    // Save check-in time to AsyncStorage
    await AsyncStorage.setItem(
      ATTENDANCE_KEY,
      JSON.stringify({ checkIn: time, checkOut: checkOutTime })
    );
    
    Alert.alert("Checked In", `You have successfully checked in at ${time}. Welcome, Employee ${employeeId}`);
  };

  const handleCheckOut = async () => {
    if (!employeeId) {
      Alert.alert("Error", "Please enter your Employee ID");
      return;
    }
    const time = getCurrentTime();
    setCheckedIn(false);
    setCheckOutTime(time);
    
    // Save check-out time to AsyncStorage
    await AsyncStorage.setItem(
      ATTENDANCE_KEY,
      JSON.stringify({ checkIn: checkInTime, checkOut: time })
    );
    
    Alert.alert("Checked Out", `You have successfully checked out at ${time}. Goodbye, Employee ${employeeId}`);
  };

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Employee Attendance</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Employee ID"
        value={employeeId}
        onChangeText={setEmployeeId}
      />
      <Text style={styles.label}>Your Location:</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Your Location"
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <Button
          title={checkedIn ? "Check Out" : "Check In"}
          onPress={checkedIn ? handleCheckOut : handleCheckIn}
          color={checkedIn ? "red" : "green"}
        />
      </View>
      {checkedIn && (
        <Text style={styles.status}>
          You are currently checked in at {checkInTime}
        </Text>
      )}
      {!checkedIn && checkOutTime && (
        <Text style={styles.status}>
          Last checked out at {checkOutTime}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  map: {
    width: "100%",
    height: 300,
    marginBottom: 16,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  status: {
    fontSize: 16,
    color: "green",
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});

export default Attendance;
