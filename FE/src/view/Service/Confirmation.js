import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView ,Image, Modal,} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { API_URL } from '@env';
import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";

const Confirmation = ({ route, navigation }) => {
  // Receive job data from previous screens
  const { 
    address = "Không có địa chỉ", 
    contactName = "Không có tên", 
    contactPhone = "Không có số điện thoại", 
    jobDate = "Không có ngày làm việc", 
    jobTime = "Không có giờ làm", 
    jobDuration = "Không có thời lượng", 
    jobDetails = "Không có chi tiết công việc", 
    totalPrice = "0 VND" 
  } = route?.params || {};
  const [selectedMethod, setSelectedMethod] = useState('Tiền mặt'); // Default is "Tiền mặt"
  const [showOptions, setShowOptions] = useState(false); 
  const { quantity,selectedTime, selectedService, selectedAddress, selectedDay, serviceType,dynamicPrice } = route.params;
  const hours = (serviceType === '64fdb1f1c912ef0012e23b49')
  ? (selectedService && selectedService.match(/\d+/) ? parseInt(selectedService.match(/\d+/)[0], 10) : 0)
  : quantity;

  const [isModalVisible, setIsModalVisible] = useState(false); // Show/Hide QR Code modal

  const handlePaymentSelect = (method) => {
    setSelectedMethod(method);
    setShowOptions(false);
    if (method === 'Chuyển khoản') {
      setIsModalVisible(true); // Show modal if "Chuyển khoản" is selected
    }
  };
  const handleJobSubmit = async () => {
    // Prepare the data for the API
    const jobData = {
      address: selectedAddress.address,
      duration_hours: hours,  // Change to correct selected time
      service_id: serviceType,
      price:dynamicPrice,
      scheduled_time: new Date(selectedDay.setHours(selectedTime.getHours(), selectedTime.getMinutes()))
    .toISOString(),   // Fix scheduled_time based on current logic
    };

    try {
      const token = await SecureStore.getItemAsync("authToken");
      if (!token) {
        throw new Error("Token not found. Please login again.");
      }

      const response = await fetch(`${API_URL}/jobs/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      const result = await response.json();
      if (response.ok) {
        // Handle success, maybe navigate to another screen
        navigation.navigate('Success');
      } else {
        alert('Failed to create job');
      }
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Xác nhận và thanh toán</Text>
      </View>

      {/* Job Location */}
      <Text style={styles.sectionTitle}>Vị trí làm việc</Text>
      <View style={styles.jobLocation}>
        <View>
          <Text style={styles.addressTitle}>{selectedAddress.address}</Text>
          <Text style={styles.addressSubtitle}>{selectedAddress.address}</Text>
          <Text style={styles.contactInfo}>{selectedAddress.name}</Text>
          <Text style={styles.contactInfo}>{selectedAddress.phone}</Text>
        </View>
      </View>

      {/* Job Details */}
      <Text style={styles.sectionTitle}>Thông tin công việc</Text>
      <View style={styles.jobDetails}>
        <Text style={styles.detailText}>Thời gian làm việc</Text>
        {/* Format the selectedDay */}
        <Text style={styles.detailValue}>
          Ngày làm việc: {selectedDay ? selectedDay.toLocaleDateString('vi-VN') : 'Chưa chọn ngày'}
        </Text>
        {/* Parse jobTime and jobDuration for calculation */}
        <Text style={styles.detailValue}>
          Làm trong {hours} giờ, từ {selectedTime.getHours()} h
        </Text>

        <Text style={styles.detailText}>Chi tiết công việc</Text>
        <Text style={styles.detailValue}>Khối lượng công việc: {jobDetails}</Text>
      </View>

      {/* Payment Method */}
      <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>

      {/* Default payment method */}
      <TouchableOpacity
        style={styles.paymentMethod}
        onPress={() => setShowOptions(!showOptions)}
      >
        <Text style={styles.methodText}>{selectedMethod}</Text>
        <Ionicons
          name={showOptions ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={20}
          color="#000"
        />
      </TouchableOpacity>

      {/* Payment options */}
      {showOptions && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.option,
              selectedMethod === 'Tiền mặt' && styles.selectedOption,
            ]}
            onPress={() => handlePaymentSelect('Tiền mặt')}
          >
            <Text style={styles.optionText}>Tiền mặt</Text>
            {selectedMethod === 'Tiền mặt' && (
              <Ionicons name="checkmark-circle" size={20} color="#00c853" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.option,
              selectedMethod === 'Chuyển khoản' && styles.selectedOption,
            ]}
            onPress={() => handlePaymentSelect('Chuyển khoản')}
          >
            <Text style={styles.optionText}>Chuyển khoản</Text>
            {selectedMethod === 'Chuyển khoản' && (
              <Ionicons name="checkmark-circle" size={20} color="#00c853" />
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* QR Code Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Quét mã QR để thanh toán</Text>
            <Image
              source={require('../../img/qr.jpg')} // Replace with your QR code image path
              style={styles.qrImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => {
                setIsModalVisible(false); // Đóng modal
                handleJobSubmit(); // Thực hiện gửi công việc
              }}
            >
              <Text   style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
    
      {/* Total */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Tổng cộng</Text>
        <Text style={styles.totalValue}>{dynamicPrice} VNĐ / {hours} giờ</Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleJobSubmit}
      >
        <Text style={styles.submitButtonText}>Đăng việc</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  jobLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f7f7f7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressSubtitle: {
    color: '#666',
  },
  contactInfo: {
    fontSize: 14,
    marginTop: 5,
  },
  changeButton: {
    color: '#00c853',
    fontWeight: 'bold',
  },
  jobDetails: {
    backgroundColor: '#f7f7f7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  methodText: {
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00c853',
  },
  submitButton: {
    paddingVertical: 15,
    backgroundColor: '#00c853',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    marginBottom: 10,
  },
  methodText: {
    fontSize: 16,
    color: '#000',
  },
  optionsContainer: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    paddingVertical: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedOption: {
    backgroundColor: '#e8f5e9',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  qrText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#000',
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
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  qrImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#00c853',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Confirmation;
