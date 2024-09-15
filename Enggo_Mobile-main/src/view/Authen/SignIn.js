import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const SignIn = ({ navigation }) => {
  // Switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // show/hide password
  //   const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false); //password co the nhin thay duoc mac dinh la false

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  // handle login
  //   const [email, setEmail] = useState("");

  //   const handleLogin = () => {
  //     axios
  //       .get(`https://6627001fb625bf088c071863.mockapi.io/emailLogin`)
  //       .then((response) => {
  //         const data = response.data;
  //         const user = data.find((user) => user.email === email);
  //         if (user) {
  //           console.log("Login successful");
  //           navigation.navigate("TabNavigation");
  //         } else {
  //           console.log("Login failed");
  //         }
  //       });
  //   };

  return (
    <View style={styles.container}>
      {/* logo */}
      <View
        style={{
          flex: 2.7,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../img/imgAuth/logoSplashScreen.png")}
          style={{
            marginTop: 18,
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
        ></Image>
        <Text style={{ fontWeight: "bold", fontSize: 35, marginTop: 5 }}>
          Enggo
        </Text>
      </View>

      {/* Sign in form */}
      <View
        style={{
          flex: 3,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "85%", height: "100%", paddingTop: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 26 }}>Đăng nhập</Text>
          <View
            style={{
              width: "100%",
              height: 55,
              borderWidth: 1,
              borderRadius: 12,
              marginTop: 20,
              flexDirection: "row",
              borderColor: "gray",
            }}
          >
            <View
              style={{
                flex: 1.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="mail-outline" size={25} color="black" />
            </View>
            <View style={{ flex: 8.5, justifyContent: "center" }}>
              {/* Input Email */}
              <TextInput
                placeholder="Nhập email"
                style={{
                  color: "gray",
                  fontSize: 18,
                  width: "100%",
                  height: "100%",
                  borderRadius: 12,
                }}
              />
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 55,
              borderWidth: 1,
              borderRadius: 12,
              marginTop: 18,
              flexDirection: "row",
              borderColor: "gray",
            }}
          >
            <View
              style={{
                flex: 1.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="lock-closed-outline" size={25} color="black" />
            </View>
            <View style={{ flex: 7, justifyContent: "center" }}>
              {/* Input Password */}
              <TextInput
                // value={password}
                // onChangeText={setPassword}
                // secureTextEntry={!isPasswordVisible}
                placeholder="Nhập mật khẩu"
                style={{
                  color: "gray",
                  fontSize: 18,
                  width: "100%",
                  height: "100%",
                  borderRadius: 12,
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                flex: 1.5,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={togglePasswordVisibility}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                size={25}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              height: 45,
              marginTop: 15,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 6,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 3,
                }}
              >
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  style={{ width: 35, height: 25 }}
                />
              </View>
              <View style={{ flex: 7, marginTop: 5 }}>
                <Text style={{ fontSize: 16, marginLeft: -5 }}>
                  Nhớ tài khoản
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 4,
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("RequestResetPassword")}
              >
                <Text style={{ fontSize: 16, marginTop: 5 }}>
                  Quên mật khẩu?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* other login methods */}
      <View
        style={{
          flex: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "75%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "#5669fe",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 12,
            }}
            onPress={() => navigation.navigate("TabNavigationContainer")}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Đăng nhập</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "gray",
              fontWeight: "bold",
              fontSize: 18,
              marginTop: 35,
            }}
          >
            Hoặc
          </Text>
          <TouchableOpacity
            style={{
              width: "100%",
              height: 50,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 12,
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "gray",
            }}
          >
            <View
              style={{
                flex: 3,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../img/imgAuth/google.png")}
                style={{ width: 32, height: 32, resizeMode: "contain" }}
              />
            </View>
            <View style={{ flex: 7 }}>
              <Text style={{ fontSize: 18 }}>Đăng nhập với Google</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "100%",
              height: 50,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 12,
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "gray",
            }}
          >
            <View
              style={{
                flex: 3,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../img/imgAuth/fb.png")}
                style={{ width: 32, height: 32, resizeMode: "contain" }}
              />
            </View>
            <View style={{ flex: 7 }}>
              <Text style={{ fontSize: 18 }}>Đăng nhập với Facebook</Text>
            </View>
          </TouchableOpacity>
          <Text style={{ fontSize: 16, marginTop: 8 }}>
            Bạn chưa có tài khoản?
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={{ color: "#5669fe", fontSize: 16, marginLeft: 5 }}>
                Đăng ký
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
