import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "@env";

const CountdownTimer = ({ initialSeconds, onResend }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isCounting, setIsCounting] = useState(true);

  useEffect(() => {
    if (seconds === 0) {
      setIsCounting(false); // Stop counting
      return;
    }

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup
  }, [seconds]);

  const handleResend = () => {
    setSeconds(initialSeconds); // Reset countdown
    setIsCounting(true);
    onResend && onResend(); // Trigger resend function
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

const EmployeeVerification = ({ route, navigation }) => {
  const { email } = route.params; 
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]); 
  const [isVerifying, setIsVerifying] = useState(false);

  const handleChange = (text, index) => {
    const newValues = [...otpValues];
    newValues[index] = text;
    setOtpValues(newValues);
  };

  const handleVerifyOTP = async () => {
    const otp = otpValues.join(""); // Combine OTP digits
    if (otp.length !== 6) {
      Alert.alert("Lỗi", "OTP phải đủ 6 chữ số");
      return;
    }

    try {
      setIsVerifying(true);
      const response = await fetch(`${API_URL}/users/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Thành công", "Xác thực OTP thành công");
        navigation.navigate("EmployeeServiceType"); // Navigate to the home screen
      } else {
        Alert.alert("Lỗi", result.message || "Xác thực OTP thất bại");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert("Lỗi", "Không thể xác thực OTP. Vui lòng thử lại.");
    } finally {
      setIsVerifying(false);
    }
  };

  const resendOTP = async () => {
    try {
      const response = await fetch(`${API_URL}/users/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Thành công", "Mã OTP đã được gửi lại");
      } else {
        Alert.alert("Lỗi", result.message || "Không thể gửi lại OTP");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      Alert.alert("Lỗi", "Không thể gửi lại OTP. Vui lòng thử lại.");
    }
  };

  return (
    <View style={styles.appContainer}>
      <View style={{ flex: 1, justifyContent: "center", marginTop: 20 }}>
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 8.2, alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: "85%", height: "100%", paddingTop: 24 }}>
          <Text style={{ fontWeight: "bold", fontSize: 26 }}>Xác Thực</Text>
          <View style={{ width: 300, height: 60 }}>
            <Text style={{ fontSize: 17, marginTop: 10 }}>
              Mã xác thực đã được gửi đến:{" "}
              <Text style={{ fontWeight: "bold" }}>{email}</Text>
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
            {otpValues.map((value, index) => (
              <TextInput
                key={index}
                style={{
                  width: "14%",
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
                maxLength={1} // Allow only 1 digit
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
              onPress={handleVerifyOTP}
              disabled={isVerifying}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                {isVerifying ? "Đang xử lý..." : "Tiếp tục"}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "100%",
              height: 40,
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 17 }}>
              Gửi lại mã trong{" "}
              <CountdownTimer initialSeconds={60} onResend={resendOTP} />
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
