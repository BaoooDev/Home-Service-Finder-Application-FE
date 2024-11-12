import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { API_URL } from '@env'
import * as SecureStore from 'expo-secure-store'
import { SafeAreaView } from 'react-native-safe-area-context'

const EmployeeSignUp = ({ navigation }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible)
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!isConfirmPasswordVisible)
  }

  // Define validation schema using Yup
  const SignUpSchema = Yup.object().shape({
    identity_number: Yup.string()
      .matches(/^\d{13}$/, 'CMND/CCCD phải có đúng 13 chữ số')
      .required('CMND/CCCD là bắt buộc'),
    full_name: Yup.string().required('Họ tên là bắt buộc'),
    email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Số điện thoại phải có đúng 10 chữ số')
      .required('Số điện thoại là bắt buộc'),
    password: Yup.string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .required('Mật khẩu là bắt buộc'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
      .required('Xác nhận mật khẩu là bắt buộc'),
  })

  const handleSignUp = async (values) => {
    try {
      const response = await fetch(`${API_URL}/users/registerWorker`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const result = await response.json()

      if (response.ok) {
        await SecureStore.setItemAsync('authToken', result.token.toString())
        navigation.navigate('EmployeeServiceType')
      } else {
        Alert.alert('Đăng ký thất bại', result.msg)
      }
    } catch (error) {
      console.error('Error during sign-up:', error)
      Alert.alert('Đăng ký thất bại', 'Có lỗi xảy ra khi đăng ký')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Start')}>
          <Image source={require('../../img/imgAuth/worker.png')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.title}>TBKEE PARTNER</Text>
      </View>

      <Formik
        initialValues={{
          identity_number: '',
          full_name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => handleSignUp(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            {/* CMND/CCCD Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="id-card-outline" size={25} color="black" style={styles.icon} />
              <TextInput
                placeholder="Nhập CMND/CCCD"
                style={styles.input}
                onChangeText={handleChange('identity_number')}
                onBlur={handleBlur('identity_number')}
                value={values.identity_number}
              />
            </View>
            {errors.identity_number && touched.identity_number && (
              <Text style={styles.errorText}>{errors.identity_number}</Text>
            )}

            {/* Full Name Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={25} color="black" style={styles.icon} />
              <TextInput
                placeholder="Nhập họ tên của bạn"
                style={styles.input}
                onChangeText={handleChange('full_name')}
                onBlur={handleBlur('full_name')}
                value={values.full_name}
              />
            </View>
            {errors.full_name && touched.full_name && (
              <Text style={styles.errorText}>{errors.full_name}</Text>
            )}

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={25} color="black" style={styles.icon} />
              <TextInput
                placeholder="Nhập email của bạn"
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
            </View>
            {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={25} color="black" style={styles.icon} />
              <TextInput
                placeholder="Nhập số điện thoại của bạn"
                style={styles.input}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                keyboardType="phone-pad"
              />
            </View>
            {errors.phone && touched.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={25} color="black" style={styles.icon} />
              <TextInput
                placeholder="Nhập mật khẩu của bạn"
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Ionicons
                  name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                  size={25}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={25} color="black" style={styles.icon} />
              <TextInput
                placeholder="Xác nhận lại mật khẩu"
                style={styles.input}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry={!isConfirmPasswordVisible}
              />
              <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                <Ionicons
                  name={isConfirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                  size={25}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      {/* Login Link */}
      <View style={styles.loginLinkContainer}>
        <Text style={styles.loginText}>Bạn đã có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.loginLink}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default EmployeeSignUp

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
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: 4,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    marginTop: 8,
    paddingHorizontal: 10,
    height: 55,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: 'gray',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: '#4090C3',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 16,
  },
  loginLink: {
    color: '#5669fe',
    fontSize: 16,
    marginLeft: 5,
  },
})
