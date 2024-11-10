import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../../App";
import axios from "axios";
import Toast from "react-native-simple-toast";

export default function Login({
  navigation,
}: NativeStackScreenProps<StackScreens, "Login">) {
  const handleRegisterPress = useCallback(
    () => navigation.navigate("Register"),
    [navigation?.navigate]
  );
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signInUser = async () => {

    if (!username || !password) {
      Toast.show("Please fill User name and password then try again");
      return;
    }

    console.log(' process.env.EXPO_PUBLIC_BACKEND_ROOT + "/auth/login" ====>',  process.env.EXPO_PUBLIC_BACKEND_ROOT + "/auth/login")
    try {
      const res = await axios({
        method: "POST",
        url: process.env.EXPO_PUBLIC_BACKEND_ROOT + "/auth/login",
        data: {
          username,
          password,
        },
      });


      if(!res.data?.success){
        Toast.show(res.data?.message);
      }

      setUserName("");
      setPassword("");
      navigation.navigate("App", { userdata: res });

      
    } catch (error) {
      console.log({ error });
      Toast.show("login failed");
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <SafeAreaView style={[styles.container, { justifyContent: "center" }]}>
        <View style={{ paddingVertical: 20 }}>
          <TextInput
            placeholder={"User name"}
            value={username}
            onChangeText={(val) => setUserName(val)}
            style={styles.input}
          />

          <TextInput
            placeholder={"Password"}
            value={password}
            onChangeText={(val) => setPassword(val)}
            style={[styles.input, { marginTop: 20 }]}
            secureTextEntry
          />

          <TouchableOpacity
            onPress={() => signInUser()}
            style={styles.loginBtn}
          >
            <Text>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleRegisterPress()}
            style={{ alignSelf: "center", marginTop: 20 }}
          >
            <Text>Don't have an Account ?</Text>
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
