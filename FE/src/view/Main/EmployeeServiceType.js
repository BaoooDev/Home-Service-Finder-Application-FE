import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import Checkbox from 'expo-checkbox'
import { API_URL } from '@env'
import * as SecureStore from 'expo-secure-store'
import { SafeAreaView } from 'react-native-safe-area-context'

const EmployeeServiceType = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState([])
  const [provinces, setProvinces] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistricts, setSelectedDistricts] = useState([])
  const [selectedServices, setSelectedServices] = useState([])

  // Fetch provinces and districts
  const fetchProvinces = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/?depth=2`)
      const data = await response.json()
      if (response.ok) {
        setProvinces(data)
      }
    } catch (error) {
      console.error('Error fetching provinces:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchServices = async () => {
    setLoading(true)
    try {
      const token = await SecureStore.getItemAsync('authToken')
      if (!token) {
        throw new Error('Token not found. Please login again.')
      }

      const response = await fetch(`${API_URL}/services`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (response.ok) {
        setServices(data.results)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateServices = async () => {
    setLoading(true)
    try {
      const token = await SecureStore.getItemAsync('authToken')
      if (!token) {
        throw new Error('Token not found. Please login again.')
      }

      const response = await fetch(`${API_URL}/users/worker`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address: `${selectedProvince.name}, ${selectedDistricts.name}`,
          services,
        }),
      })
      const data = await response.json()
      if (response.ok) {
        // Navigate to the next screen
        navigation.navigate('EmployeeTabNavigationContainer')
        setServices(data.results)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProvinces()
    fetchServices()
  }, [])

  // Toggle selection of district
  const toggleDistrictSelection = (district) => {
    setSelectedDistricts((prev) =>
      prev.includes(district) ? prev.filter((d) => d !== district) : [...prev, district]
    )
  }

  // Toggle selection of service
  const toggleServiceSelection = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    )
  }

  // Render Provinces Screen
  const renderProvinces = () => (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>Bạn ở thành phố nào?</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={provinces}
          keyExtractor={(item) => item.code.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.gridItem} onPress={() => setSelectedProvince(item)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
    </SafeAreaView>
  )

  // Render Districts Screen
  const renderDistricts = () => (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>Bạn ở quận nào?</Text>
      <FlatList
        data={selectedProvince.districts}
        keyExtractor={(item) => item.code.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.optionRow}>
            <Checkbox
              value={selectedDistricts.includes(item.name)}
              onValueChange={() => toggleDistrictSelection(item.name)}
            />
            <Text style={styles.nameCheckbox}>{item.name}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => setSelectedProvince(null)}>
        <Text style={styles.buttonText}>Quay lại</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )

  // Render Services Screen
  const renderServices = () => (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>Bạn muốn đăng ký dịch vụ nào?</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.optionRow}>
            <Checkbox
              value={selectedServices.includes(item._id)}
              onValueChange={() => toggleServiceSelection(item._id)}
            />
            <Text style={styles.nameCheckbox}>{item.name}</Text>
          </View>
        )}
      />
      <View style={styles.containerConfirm}>
        <TouchableOpacity style={styles.buttonBack} onPress={() => setSelectedDistricts([])}>
          <Text style={styles.buttonText}>Quay lại</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonConfirm} onPress={() => handleUpdateServices()}>
          <Text style={styles.buttonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  )

  // Main Render
  return (
    <View style={styles.container}>
      {!selectedProvince && renderProvinces()}
      {selectedProvince && selectedDistricts.length === 0 && renderDistricts()}
      {selectedDistricts.length > 0 && renderServices()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  containerConfirm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  gridItem: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: '45%', // Adjust for grid layout in rows
    marginHorizontal: '2.5%',
  },
  button: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonBack: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    flex: 1,
  },
  buttonConfirm: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    flex: 1,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  nameCheckbox: {
    marginLeft: 8,
  },
})

export default EmployeeServiceType
