import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { View, StyleSheet, ActivityIndicator, Text } = require("react-native");

const Splash = ({ navigation }) => {
  const handleAuth = async () => {
    let token = await AsyncStorage.getItem("token");
    setTimeout(() => {
      token ? navigation.navigate("Dashboard") : navigation.navigate("Login");
    }, 2000);
  };
  useEffect(() => {
    handleAuth();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Employee Tracking Systum</Text>
      <ActivityIndicator size={20} color={"#FFF"} />
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C1D8C3",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
  },
});

export default Splash;
