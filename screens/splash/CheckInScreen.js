import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Input } from "react-native-elements";
import * as Location from "expo-location";

const CheckInOutScreen = () => {
  const [dealerName, setDealerName] = useState("");
  const [dealerLocation, setDealerLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);

  const handleCheckIn = () => {
    if (!dealerName) {
      Alert.alert("Error", "Please enter the dealer's name");
      return;
    }
    setCheckedIn(true);
    Alert.alert("Checked In", `You have checked in at ${dealerName}`);
  };

  const handleCheckOut = () => {
    setCheckedIn(false);
    Alert.alert("Checked Out", `You have checked out from ${dealerName}`);
  };

  const handleLocationChange = (latitude, longitude) => {
    setDealerLocation({ latitude, longitude });
  };

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setDealerLocation(coords);
    };

    getLocation();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{errorMsg}</Text>
      </View>
    );
  }

  if (!dealerLocation) {
    return (
      <View style={styles.container}>
        <Text>Loading location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dealer Check-In/Check-Out</Text>

      <Input
        placeholder="Dealer's Name"
        value={dealerName}
        onChangeText={setDealerName}
        containerStyle={styles.input}
      />

      <Text style={styles.label}>Dealer's Location:</Text>
      <MapView
        style={styles.map}
        region={{
          latitude: dealerLocation.latitude,
          longitude: dealerLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChangeComplete={(region) => {
          handleLocationChange(region.latitude, region.longitude);
        }}
      >
        <Marker
          coordinate={dealerLocation}
          title={dealerName}
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
          You are currently checked in at {dealerName}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
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
    color: 'red',
    textAlign: 'center',
  },
});

export default CheckInOutScreen;
