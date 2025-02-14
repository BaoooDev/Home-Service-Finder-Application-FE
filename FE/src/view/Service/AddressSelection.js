import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, Modal, TextInput, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { API_URL, GOONG_API_KEY } from '@env'; 
import * as SecureStore from 'expo-secure-store'; 

const AddressSelection = ({ navigation, route }) => {
  const { serviceType } = route.params || {};
  const [addresses, setAddresses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    address: '',
    name: '',
    phone: '',
  });
  
  const [suggestions, setSuggestions] = useState([]);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

  const showCustomAlert = (message) => {
    Alert.alert('Notification', message, [{ text: 'OK' }], { cancelable: true });
  };

  const getToken = async () => {
    const token = await SecureStore.getItemAsync('authToken');
    return token;
  };

  const fetchAddresses = async () => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error('Token not found. Please login again.');
      }

      const response = await fetch(`${API_URL}/client/addresses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (data && data.addresses) {
        setAddresses(data.addresses);
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      setIsFetchingSuggestions(true);
      const response = await fetch(
        `https://rsapi.goong.io/Place/AutoComplete?api_key=${GOONG_API_KEY}&input=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data && data.predictions) {
        setSuggestions(data.predictions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsFetchingSuggestions(false);
    }
  };

  const handleAddOrEditAddress = async () => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error('Token not found. Please login again.');
      }
  
      let updatedAddresses;
      if (selectedAddress) {
        updatedAddresses = addresses.map((addr) =>
          addr._id === selectedAddress._id ? { ...selectedAddress, ...newAddress } : addr
        );
        setAddresses(updatedAddresses);
  
        const response = await fetch(`${API_URL}/client/edit-address`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ addressId: selectedAddress._id, ...newAddress }),
        });
  
        if (response.ok) {
          const result = await response.json();
          showCustomAlert('Address updated successfully');
        } else {
          throw new Error('Failed to update address');
        }
      } else {
        const newId = Math.random().toString(); 
        updatedAddresses = [...addresses, { _id: newId, ...newAddress }];
        setAddresses(updatedAddresses);
  
        const response = await fetch(`${API_URL}/client/add-address`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(newAddress),
        });
  
        if (response.ok) {
          const result = await response.json();
          if (result.address && result.address._id) {
            updatedAddresses = updatedAddresses.map((addr) =>
              addr._id === newId ? { ...addr, _id: result.address._id } : addr
            );
            setAddresses(updatedAddresses);
            showCustomAlert('Address added successfully');
          }
        } else {
          throw new Error('Failed to add address');
        }
      }
  
      setIsModalVisible(false);
      setNewAddress({ address: '', name: '', phone: '' });
    } catch (error) {
      console.error('Error adding/editing address:', error);
      setAddresses(addresses); // Revert UI changes in case of error
      showCustomAlert(error.message || 'Failed to add/edit address');
    }
  };
  
  // Handle Delete Address
 const handleDeleteAddress = async (id) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error('Token not found. Please login again.');
      }

      const response = await fetch(`${API_URL}/client/delete-address`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ addressId: id }),
      });
      const result = await response.json();
      if (result.success) {
        fetchAddresses(); // Refresh addresses after delete
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  useEffect(() => {
    fetchAddresses(); // Fetch addresses when the component mounts
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Chọn địa chỉ</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.addressContainer}
            onPress={() => {
              if (serviceType === '64fdb1f1c912ef0012e23b49') { // ID for "Dọn dẹp nhà"
                navigation.navigate('ServicePackage', { selectedAddress: item, serviceType });
              } else if (serviceType === '67316a9cac4d58ac2c65339f') { // ID for "Vệ sinh máy lạnh"
                navigation.navigate('ACService', { selectedAddress: item, serviceType });
              } else if (serviceType === '6730520722f42b6ef515c7b9') { // ID for "Vệ sinh máy giặt"
                navigation.navigate('WashingMachineService', { selectedAddress: item, serviceType });
              }
            }}
          >
            <View style={styles.addressDetails}>
              <Text style={styles.addressTitle}>{item.address}</Text>
              <Text style={styles.addressSubtitle}>{item.name || 'Unnamed Client'}</Text>
              <Text style={styles.phoneNumber}>{item.phone || 'No Phone Number'}</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedAddress(item);
                  setNewAddress(item);
                  setIsModalVisible(true);
                }}
              >
                <Icon name="pencil-outline" size={20} color="#ff8a00" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteAddress(item._id)}>
                <Icon name="trash-outline" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.newAddressButton}
        onPress={() => {
          setSelectedAddress(null);
          setNewAddress({ address: '', name: '', phone: '' });
          setIsModalVisible(true);
        }}
      >
        <Text style={styles.newAddressText}>Chọn địa chỉ mới</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedAddress ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Địa chỉ"
              placeholderTextColor="#333"
              value={newAddress.address}
              onChangeText={(text) => {
                setNewAddress({ ...newAddress, address: text });
                fetchSuggestions(text);
              }}
            />

            <ScrollView style={styles.suggestionsContainer}>
              {isFetchingSuggestions && <Text>Đang tải...</Text>}
              {suggestions.map((suggestion) => (
                <TouchableOpacity
                  key={suggestion.place_id}
                  onPress={() => {
                    setNewAddress({ ...newAddress, address: suggestion.description });
                    setSuggestions([]);
                  }}
                >
                  <Text style={styles.suggestionItem}>{suggestion.description}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TextInput
              style={styles.input}
              placeholder="Tên khách hàng"
              placeholderTextColor="#333"
              value={newAddress.name}
              onChangeText={(text) => setNewAddress({ ...newAddress, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              placeholderTextColor="#333"
              value={newAddress.phone}
              onChangeText={(text) => setNewAddress({ ...newAddress, phone: text })}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleAddOrEditAddress}>
              <Text style={styles.saveButtonText}>{selectedAddress ? 'Lưu' : 'Thêm'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addressContainer: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addressDetails: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addressSubtitle: {
    color: '#666',
    fontSize: 14,
    marginBottom: 2,
  },
  phoneNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 60,
  },
  newAddressButton: {
    paddingVertical: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ff8a00',
    alignItems: 'center',
    marginBottom: 20,
  },
  newAddressText: {
    color: '#ff8a00',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16, // Increase input text size
    fontWeight: '500', // Adjust weight for more readable text
  },
  saveButton: {
    backgroundColor: '#ff8a00',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 16,
  },  suggestionsContainer: {
    maxHeight: 200,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default AddressSelection;
