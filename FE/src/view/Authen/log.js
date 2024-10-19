import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';

const LogScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Logo Section */}
        <Image
          source={require('../../img/imgAuth/logo.png')}  // Ensure the path to the image is correct
          style={styles.logo}
        />

        <Text style={styles.welcomeText}>Xin chào bạn đến với TBKEE</Text>
        <Text style={styles.questionText}>Bạn là?</Text>

        {/* Nút cho Khách hàng */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AuthenNavigation')} // Chuyển đến màn hình khách hàng
        >
          <Text style={styles.buttonText}>Khách hàng</Text>
        </TouchableOpacity>

        {/* Nút cho Nhân viên */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EmployeeScreen')} // Chuyển đến màn hình nhân viên
        >
          <Text style={styles.buttonText}>Nhân viên</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,    // Adjust size as per your need
    height: 150,   // Adjust size as per your need
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#ff8a00',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogScreen;
