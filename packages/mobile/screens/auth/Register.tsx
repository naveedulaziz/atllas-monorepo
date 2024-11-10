import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../../App";
import axios from "axios";
import Toast from "react-native-simple-toast";

export default function Register({
  navigation,
}: NativeStackScreenProps<StackScreens, "Register">) {

  const [username, setUserName] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const [displayName, setDisplayName] = useState<string>("");

  const registerUser = async () => {

    if (!username || !password || !displayName) {
      Toast.show(
        "Please fill User name,display name and password then try again"
      );
      return;
    }

    try {
      const res = await axios({
        method: "POST",
        url: process.env.EXPO_PUBLIC_BACKEND_ROOT + "/auth/register",
        data: {
          username,
          password,
          displayName,
        },
      });

    
      if (!res.data?.message) {
        Toast.show(res.data?.message);
        return;
      }

      setUserName("");
      setPassword("");
      setDisplayName("");

      navigation.navigate("Login");
    } catch (error) {
      Toast.show("Login failed");
    }
  };

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <SafeAreaView style={[styles.container, { justifyContent: "center" }]}>
        <View style={{ paddingVertical: 20 }}>
          <TextInput
            placeholder={"User Name"}
            value={username}
            onChangeText={(val) => setUserName(val)}
            style={styles.input}
          />

          <TextInput
            placeholder={"Display Name"}
            value={displayName}
            onChangeText={(val) => setDisplayName(val)}
            style={[styles.input, { marginTop: 20 }]}
          />

          <TextInput
            placeholder={"Password"}
            value={password}
            onChangeText={(val) => setPassword(val)}
            style={[styles.input, { marginTop: 20 }]}
            secureTextEntry
          />

          <TouchableOpacity
            onPress={() => registerUser()}
            style={styles.loginBtn}
          >
            <Text>Signup</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleLoginPress()}
            style={{ alignSelf: "center", marginTop: 20 }}
          >
            <Text>Already have an account ?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: "90%",
    height: 45,
    alignSelf: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "lightgray",
    paddingLeft: 10,
  },
  loginBtn: {
    width: "50%",
    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
});
