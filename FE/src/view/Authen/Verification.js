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
    setIsCounting(true);
    
     // Bắt đầu lại bộ đếm
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

const Verification = ({ navigation, route  }) => {
  const [values, setValues] = useState(["", "", "", ""]);
  const { email } = route.params;

  const handleChange = (text, index) => {
    const newValues = [...values];
    newValues[index] = text;
    setValues(newValues);
  };

  const verifyOTP = async () => {
    try {
      console.log("OTP truyền vào:", value); // Thêm dòng này để kiểm tra giá trị OTP
  
      const response = await fetch(`${API_URL}/api/users/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, otp: value }),
      });
  
      const data = await response.json();
  
      // Nếu có lỗi từ server, hiển thị lỗi đó
      if (!response.ok) {
        console.error(data);
        throw new Error(data.message);
      }
  
      console.log("Giá trị của data FP2:", data);
  
      // Hiển thị thông báo từ BE
      Toast.show({
        type: data.success ? "success" : "error",
        text1: "Thông báo",
        text2: data.message,
      });
  
      // Chuyển đến trang Register nếu xác thực OTP thành công
      if (data.success) {
        console.log("Xác thực OTP thành công!");
        navigation.navigate("Register", { email: email });
      }
  
      return data;
    } catch (error) {
      console.error("Error:", error);
      alert(`Xác thực OTP không thành công! Lỗi: ${error.message}`);
    }
  };
  
  
  const handleSubmit = () => {
    verifyOTP();
  };
  const resendOTP = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
  
      const data = await response.json();
  
      // Nếu có lỗi từ server, hiển thị lỗi đó
      if (!response.ok) {
        console.error(data);
        throw new Error(data.message);
      }
  
      console.log("Mã OTP mới:", data.otp);
  
      // Hiển thị thông báo từ BE
      Toast.show({
        type: data.success ? "success" : "error",
        text1: "Thông báo",
        text2: data.message,
      });
  
      return data;
    } catch (error) {
      console.error("Error:", error);
      alert(`Gửi lại OTP không thành công! Lỗi: ${error.message}`);
    }
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
              <Text style={{ fontSize: 17 }}>{email}</Text>
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
              onPress={handleSubmit}
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

export default Verification;

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
