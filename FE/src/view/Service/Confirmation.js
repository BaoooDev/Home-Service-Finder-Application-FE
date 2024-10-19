import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { API_URL } from '@env';
import * as SecureStore from "expo-secure-store";

console.log(API_URL); 
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
  
  const { selectedTime, selectedService, selectedAddress, selectedDay, serviceType } = route.params;
  const defaultTime = new Date(); // Current date and time
  defaultTime.setHours(14); // Set the hour to 14 (2 PM)
  defaultTime.setMinutes(0); // Set minutes to 0
const hours = selectedService.match(/\d+/) ? parseInt(selectedService.match(/\d+/)[0], 10) : 0;

  const handleJobSubmit = async () => {
    // Prepare the data for the API
    const jobData = {
      address: selectedAddress.address,
      duration_hours: hours,  // Change to correct selected time
      service_type: serviceType,
      scheduled_time: new Date(selectedDay.setHours(selectedTime.getHours(), selectedTime.getMinutes()))
    .toISOString(),   // Fix scheduled_time based on current logic
    };
    console.log(jobData);

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
          Làm trong {selectedService} giờ, từ {jobTime}:00 đến {parseInt(jobTime, 10) + parseInt(jobDuration, 10)}:00
        </Text>

        <Text style={styles.detailText}>Chi tiết công việc</Text>
        <Text style={styles.detailValue}>Khối lượng công việc: {jobDetails}</Text>
      </View>

      {/* Payment Method */}
      <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
      <View style={styles.paymentMethod}>
        <Text style={styles.methodText}>Tiền mặt</Text>
        <TouchableOpacity>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Total */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Tổng cộng</Text>
        <Text style={styles.totalValue}>{totalPrice}</Text>
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
});

export default Confirmation;
