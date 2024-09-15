import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from "../assets/logoSplashScreen.png";

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Image
        source={Logo}
        style={{ width: 80, height: 100, resizeMode: "contain" }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
