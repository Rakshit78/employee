import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Sign Up successful!");
        navigation.navigate("Dashboard");
      } else {
        const token = await signInWithEmailAndPassword(auth, email, password);
        console.log(token._tokenResponse.idToken);
        await AsyncStorage.setItem("token", token._tokenResponse.idToken);
        Alert.alert("Success", "Sign In successful!");
        navigation.navigate("Dashboard");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Text style={styles.header}>
          {isSignUp ? "Create Account" : "Welcome Back!"}
        </Text>
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#666"
            secureTextEntry
            returnKeyType="done"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>
            {isSignUp ? "Sign Up" : "Login"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={styles.link}>
            {isSignUp
              ? "Already have an account? Login"
              : "Don’t have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C1D8C3",
    justifyContent: "center",
  },
  inner: {
    padding: 24,
    backgroundColor: "#FFFBE6",
    borderRadius: 8,
    shadowColor: "#FFFBE6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 16,
  },
  icon: {
    marginRight: 12,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#007BFF",
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
  },
});

export default Login;
