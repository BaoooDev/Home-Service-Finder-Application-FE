import * as SecureStore from 'expo-secure-store'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { API_URL } from '@env'
const EmployeeAccountScreen = ({ navigation }) => {
  const [me, setMe] = useState()
  const [loading, setLoading] = useState(false)
  const getMe = async () => {
    setLoading(true)
    try {
      const token = await SecureStore.getItemAsync('authToken')
      if (!token) {
        throw new Error('Token not found. Please login again.')
      }

      const response = await fetch(`${API_URL}/me`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      if (response.ok) {
        setMe(data)
      }
    } catch (error) {
      console.error('Error get me:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMe()
  }, [])

  if (loading) {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <ActivityIndicator animating={true} color="#5A62D5" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Tài khoản</Text>
      </View>

      {/* Main Balance Section */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Tài khoản chính</Text>
        <Text style={styles.balanceAmount}>{me?.user?.balance}₫</Text>
        <Text style={styles.promoBalance}>
          Tài khoản ký quỹ: <Text style={styles.promoAmount}>0₫</Text>
        </Text>
      </View>

      {/* Menu Options */}
      <ScrollView contentContainerStyle={styles.menuContainer}>
        {/* Weekly Report Section */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EmployeeReport')}>
          <Text style={styles.menuTitle}>Báo cáo tháng</Text>
          <View>
            <Text style={styles.menuSubtitle}>Công việc đã hoàn thành: {me?.work_done}</Text>
          </View>
        </TouchableOpacity>

        {/* Income History Section */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EmployeeHistories')}>
          <Text style={styles.menuTitle}>Lịch sử thu nhập</Text>
          <View>
            <Text style={styles.menuSubtitle}>Thu nhập tháng này: {me?.total_income}₫</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FF',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 15,
    backgroundColor: '#5A62D5', // Blue-purple header background
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  balanceContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  balanceTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  promoBalance: {
    fontSize: 14,
    color: '#666',
  },
  promoAmount: {
    color: '#333',
    fontWeight: 'bold',
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    gap: 8,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5A62D5',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: '#FF7F56', // Arrow color
  },
})

export default EmployeeAccountScreen
