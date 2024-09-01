import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
const Map = () => {
  const locationList = useSelector((state) => state.location);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  console.log(locationList, "khcsh");
  useEffect(() => {
    (async () => {
      console.log("start");
      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
      console.log("capturing location", location);
      console.log("end");
    })();
  }, []);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  if (!location) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loding...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title={"Employee live location"}
        />
        {Array.isArray(locationList) &&
          locationList.map((res) => {
            return (
              <Marker
                key={res}
                coordinate={{
                  latitude: res.coords.latitude,
                  longitude: res.coords.longitude,
                }}
                title={"Employee location every 5 min"}
              />
            );
          })}
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
