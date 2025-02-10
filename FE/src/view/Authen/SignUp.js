import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

const SignUp = ({ navigation }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
  const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!isConfirmPasswordVisible);

  // Validation checks
  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Họ tên không được để trống.');
      return false;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Email không hợp lệ.');
      return false;
    }
    if (!password.trim() || password.length < 6) {
      Alert.alert('Error', 'Mật khẩu phải chứa ít nhất 6 ký tự.');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Mật khẩu xác nhận không khớp.');
      return false;
    }
    return true;
  };

  // Submit handler
  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        const response = await fetch(`${API_URL}/users/registerClient`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            full_name: name,
            email: email,
            password: password,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok) {

          Alert.alert('Success', 'Đăng ký thành công!');
          await SecureStore.setItemAsync('authToken', result.token.toString());
        navigation.navigate('TabNavigationContainer');
        } else {
          Alert.alert('Error', result.message || 'Đăng ký thất bại.');
        }
      } catch (error) {
        Alert.alert('Error', 'Có lỗi xảy ra. Vui lòng thử lại.');
        console.error('Sign Up Error:', error);
      }
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Start')}>
          <Image source={require('../../img/imgAuth/logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.title}>TBKEE</Text>
      </View>

      {/* Sign up form */}
      <View style={styles.formContainer}>
        {/* Name input */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={25} color="black" style={styles.icon} />
          <TextInput
            placeholder="Nhập họ tên của bạn"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email input */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={25} color="black" style={styles.icon} />
          <TextInput
            placeholder="Nhập email của bạn"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>


        {/* Password input */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={25} color="black" style={styles.icon} />
          <TextInput
            placeholder="Nhập mật khẩu của bạn"
            style={styles.input}
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'} size={25} color="black" />
          </TouchableOpacity>
        </View>

        {/* Confirm password input */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={25} color="black" style={styles.icon} />
          <TextInput
            placeholder="Xác nhận lại mật khẩu"
            style={styles.input}
            secureTextEntry={!isConfirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
            <Ionicons name={isConfirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'} size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sign up button and other links */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Đăng ký</Text>
        </TouchableOpacity>

        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginText}>Bạn đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginLink}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    marginTop: 10,
  },
  formContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 55,
    width: '90%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: 'gray',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#ff8a00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 20,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
  },
  loginLink: {
    color: '#5669fe',
    fontSize: 16,
    marginLeft: 5,
  },
});
