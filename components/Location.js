// not in use
import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";
import { addLocations } from "../redux/reducer/locationReducer";
import { useDispatch } from "react-redux";
export default function LocationScreen() {
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
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return <></>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
