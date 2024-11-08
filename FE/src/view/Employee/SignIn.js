import { Ionicons } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store' // Import SecureStore
import React, { useState } from 'react'
import { Alert, Image, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'

// Import API_URL from .env
import { API_URL } from '@env'

const EmployeeSignIn = ({ navigation }) => {
  // Switch
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  // show/hide password
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible)
  }

  // Login form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Handle login function
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin')
      return
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        // Store token and userId as strings
        await SecureStore.setItemAsync('authToken', result.token.toString())
        // Navigate to the next screen
        navigation.navigate('TabNavigationContainer')
      } else {
        Alert.alert('Đăng nhập thất bại', result.msg)
      }
    } catch (error) {
      console.error('Error during login:', error)
      Alert.alert('Đăng nhập thất bại', 'Có lỗi xảy ra khi đăng nhập')
    }
  }

  return (
    <View>
      {/* logo */}
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Start')}>
          <Image
            source={require('../../img/imgAuth/logo.png')}
            style={{
              marginTop: 18,
              width: 100,
              height: 100,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', fontSize: 28, marginTop: 5 }}>TBKEE</Text>
      </View>

      {/* Sign in form */}
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: '90%', paddingTop: 10 }}>

          {/* Email input */}
          <View
            style={{
              width: '100%',
              height: 50,
              borderWidth: 1,
              borderRadius: 12,
              marginTop: 20,
              flexDirection: 'row',
              borderColor: 'gray',
            }}
          >
            <View
              style={{
                flex: 1.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name="mail-outline" size={25} color="black" />
            </View>
            <View style={{ flex: 8.5, justifyContent: 'center' }}>
              <TextInput
                placeholder="Nhập email"
                style={{
                  color: 'gray',
                  fontSize: 18,
                  width: '100%',
                  height: '100%',
                  borderRadius: 12,
                }}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Password input */}
          <View
            style={{
              width: '100%',
              height: 50,
              borderWidth: 1,
              borderRadius: 12,
              marginTop: 18,
              flexDirection: 'row',
              borderColor: 'gray',
            }}
          >
            <View
              style={{
                flex: 1.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name="lock-closed-outline" size={25} color="black" />
            </View>
            <View style={{ flex: 7, justifyContent: 'center' }}>
              <TextInput
                placeholder="Nhập mật khẩu"
                style={{
                  color: 'gray',
                  fontSize: 18,
                  width: '100%',
                  height: '100%',
                  borderRadius: 12,
                }}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
              />
            </View>
            <TouchableOpacity
              style={{
                flex: 1.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={togglePasswordVisibility}
            >
              <Ionicons
                name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                size={25}
                color="black"
              />
            </TouchableOpacity>
          </View>

          {/* Remember me switch */}
          <View
            style={{
              width: '100%',
              height: 45,
              marginTop: 15,
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                flex: 6,
                flexDirection: 'row',
              }}
            >
              <View style={{ flex: 3 }}>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  style={{ width: 35, height: 25 }}
                />
              </View>
              <View style={{ flex: 7, marginTop: 5 }}>
                <Text style={{ fontSize: 16, marginLeft: -5 }}>Nhớ tài khoản</Text>
              </View>
            </View>
            <View style={{ flex: 4 }}>
              <TouchableOpacity onPress={() => navigation.navigate('EmployeeRequestResetPassword')}>
                <Text style={{ fontSize: 16, marginTop: 5 }}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Login button */}
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: '90%', height: '100%', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#ff8a00',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 12,
            }}
            onPress={handleLogin} // Call the login function here
          >
            <Text style={{ color: 'white', fontSize: 18 }}>Đăng nhập</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 16 }}>Bạn chưa có tài khoản?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EmployeeSignUp')}>
              <Text style={{ color: '#5669fe', fontSize: 16, marginLeft: 5 }}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default EmployeeSignIn
