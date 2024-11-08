import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

const CountdownTimer = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isCounting, setIsCounting] = useState(true);

  useEffect(() => {
    if (seconds === 0) {
      setIsCounting(false); // Khi đếm ngược xong thì dừng lại
      return;
    }

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [seconds]);

  const handleResend = () => {
    setSeconds(initialSeconds); // Reset thời gian đếm ngược
    setIsCounting(true); // Bắt đầu lại bộ đếm
    // onResend && onResend(); // Gọi hàm onResend nếu có
  };

  return (
    <View style={styles.container}>
      {isCounting ? (
        <Text style={styles.timer}>{formatTime(seconds)}</Text>
      ) : (
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.timer}>Gửi lại</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const EmployeeVerification = ({ navigation }) => {
  const [values, setValues] = useState(["", "", "", ""]);

  const handleChange = (text, index) => {
    const newValues = [...values];
    newValues[index] = text;
    setValues(newValues);
  };

  return (
    <View style={styles.appContainer}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 8.2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "85%", height: "100%", paddingTop: 24 }}>
          <Text style={{ fontWeight: "bold", fontSize: 26 }}>Xác Thực</Text>
          <View style={{ width: 300, height: 60 }}>
            <Text style={{ fontSize: 17, marginTop: 10 }}>
              Chúng tôi sẽ gửi mã xác thực đến {""}
              <Text style={{ fontSize: 17 }}>vanchanh0730@gmail.com</Text>
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              height: 75,
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: -7,
            }}
          >
            {values.map((value, index) => (
              <TextInput
                key={index}
                style={{
                  width: "21%",
                  height: "100%",
                  borderWidth: 1.5,
                  borderRadius: 20,
                  borderColor: "#D0D0D0",
                  marginLeft: 12,
                  fontSize: 30,
                  textAlign: "center",
                }}
                placeholder="0"
                value={value}
                onChangeText={(text) => handleChange(text, index)}
                keyboardType="numeric"
                maxLength={1} // Giới hạn chỉ nhập 1 ký tự
              />
            ))}
          </View>

          <View
            style={{
              width: "100%",
              height: 70,
              marginTop: 15,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: "90%",
                height: 50,
                backgroundColor: "#5669fe",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 12,
              }}
              onPress={() => navigation.navigate("ResetPassword")}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "100%",
              height: 40,
              // justifyContent: "center",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 17 }}>
              Gửi lại mã trong
              <TouchableOpacity>
                <CountdownTimer initialSeconds={60} />
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EmployeeVerification;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: "#f0f0f0",
    paddingLeft: 5,
  },
  timer: {
    fontSize: 17,
    color: "#5669fe",
  },
});
