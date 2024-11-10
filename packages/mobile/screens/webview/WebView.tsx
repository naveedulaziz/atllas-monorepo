import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../../App";
import { WebView as NativeWebView } from "react-native-webview";
import { useRef } from "react";

export default function WebView({
  route: { params },
}: NativeStackScreenProps<StackScreens, "App">) {
  const webviewRef = useRef(null);
  console.log(
    "EXPO_PUBLIC_WEBAPP_ROOT=%s",
    process.env.EXPO_PUBLIC_WEBAPP_ROOT
  );

  let token = null;

  if (params?.userData) {
    token = params?.userData?.token;
  }

  return (
    <View style={styles.container}>
      <NativeWebView
        ref={webviewRef}
        source={{
          uri: process.env.EXPO_PUBLIC_WEBAPP_ROOT as string,
          headers: {
            cookies: `SESSION_TOKEN=${token}`,
          },
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
