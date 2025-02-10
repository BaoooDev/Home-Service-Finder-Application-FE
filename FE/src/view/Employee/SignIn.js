import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { Alert, Image, Switch, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from '@env';

const EmployeeSignIn = ({ navigation }) => {
  // Switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  
  // show/hide password
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle login function
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login/worker`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        await SecureStore.setItemAsync('authToken', result.token.toString());
        navigation.navigate('EmployeeTabNavigationContainer');
      } else {
        Alert.alert('Đăng nhập thất bại', result.msg);
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Đăng nhập thất bại', 'Có lỗi xảy ra khi đăng nhập');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Start')}>
          <Image source={require('../../img/imgAuth/worker.png')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.title}>TBKEE PARTNER</Text>
      </View>

      {/* Sign in form */}
      <View style={styles.formContainer}>
        {/* Email input */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={25} color="black" style={styles.icon} />
          <TextInput
            placeholder="Nhập email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password input */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={25} color="black" style={styles.icon} />
          <TextInput
            placeholder="Nhập mật khẩu"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'} size={25} color="black" />
          </TouchableOpacity>
        </View>

        {/* Remember me switch and forgot password */}
        <View style={styles.optionsContainer}>
          <View style={styles.rememberMeContainer}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.switch}
            />
            <Text style={styles.rememberMeText}>Nhớ tài khoản</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('EmployeeRequestResetPassword')}>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>

        {/* Login button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </TouchableOpacity>

        {/* Sign up link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EmployeeSignUp')}>
            <Text style={styles.signUpLink}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
    fontSize: 28,
    marginTop: 10,
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: 'gray',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    marginRight: 5,
  },
  rememberMeText: {
    fontSize: 16,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#5669fe',
  },
  loginButton: {
    backgroundColor: '#4090C3', // Changed to green
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  signUpText: {
    fontSize: 16,
  },
  signUpLink: {
    color: '#5669fe',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default EmployeeSignIn;
