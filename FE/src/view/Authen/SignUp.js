import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Appbar, PaperProvider } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

const SignUp = ({ navigation }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false) //password co the nhin thay duoc mac dinh la false
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible)
  }
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!isConfirmPasswordVisible)
  }

  return (
    <View style={styles.container}>
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
        <Text style={{ fontWeight: 'bold', fontSize: 35, marginTop: 5 }}>TBKEE</Text>
      </View>

      {/* Sign up form */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ width: '90%' }}>
          <View
            style={{
              width: '100%',
              height: 55,
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
              <Ionicons name="person-outline" size={25} color="black" />
            </View>
            <View style={{ flex: 8.5, justifyContent: 'center' }}>
              <TextInput
                placeholder="Nhập họ tên của bạn"
                style={{
                  color: 'gray',
                  fontSize: 18,
                  width: '100%',
                  height: '100%',
                  borderRadius: 12,
                }}
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 55,
              borderWidth: 1,
              borderRadius: 12,
              marginTop: 15,
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
                placeholder="Nhập email của bạn"
                style={{
                  color: 'gray',
                  fontSize: 18,
                  width: '100%',
                  height: '100%',
                  borderRadius: 12,
                }}
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 55,
              borderWidth: 1,
              borderRadius: 12,
              marginTop: 15,
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
              <Ionicons name="call-outline" size={25} color="black" />
            </View>
            <View style={{ flex: 8.5, justifyContent: 'center' }}>
              <TextInput
                placeholder="Nhập số điện thoại của bạn"
                style={{
                  color: 'gray',
                  fontSize: 18,
                  width: '100%',
                  height: '100%',
                  borderRadius: 12,
                }}
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 55,
              borderWidth: 1,
              borderRadius: 12,
              marginTop: 15,
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
                // value={password}
                // onChangeText={setPassword}
                // secureTextEntry={!isPasswordVisible}
                placeholder="Nhập mật khẩu của bạn"
                style={{
                  color: 'gray',
                  fontSize: 18,
                  width: '100%',
                  height: '100%',
                  borderRadius: 12,
                }}
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
          <View
            style={{
              width: '100%',
              height: 55,
              borderWidth: 1,
              borderRadius: 12,
              marginTop: 15,
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
                // value={password}
                // onChangeText={setPassword}
                // secureTextEntry={!isPasswordVisible}
                placeholder="Xác nhận lại mật khẩu"
                style={{
                  color: 'gray',
                  fontSize: 18,
                  width: '100%',
                  height: '100%',
                  borderRadius: 12,
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                flex: 1.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={toggleConfirmPasswordVisibility}
            >
              <Ionicons
                name={isConfirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                size={25}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* other sign up methods */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>Đăng ký</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 16 }}>Ban đã có tài khoản?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: '#5669fe', fontSize: 16, marginLeft: 5 }}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
