import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const Confirmation = ({ route, navigation }) => {
  // Nhận thông tin từ các trang trước, sử dụng giá trị mặc định nếu không có
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

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Xác nhận và thanh toán</Text>
      </View>

      {/* Vị trí làm việc */}
      <Text style={styles.sectionTitle}>Vị trí làm việc</Text>
      <View style={styles.jobLocation}>
        <View>
          <Text style={styles.addressTitle}>{address}</Text>
          <Text style={styles.addressSubtitle}>{address}</Text>
          <Text style={styles.contactInfo}>{contactName}</Text>
          <Text style={styles.contactInfo}>{contactPhone}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AddressSelection')}>
          <Text style={styles.changeButton}>Thay đổi</Text>
        </TouchableOpacity>
      </View>

      {/* Thông tin công việc */}
      <Text style={styles.sectionTitle}>Thông tin công việc</Text>
      <View style={styles.jobDetails}>
        <Text style={styles.detailText}>Thời gian làm việc</Text>
        <Text style={styles.detailValue}>Ngày làm việc: {jobDate}</Text>
        <Text style={styles.detailValue}>Làm trong {jobDuration}, {jobTime} đến {parseInt(jobTime) + parseInt(jobDuration)}:00</Text>

        <Text style={styles.detailText}>Chi tiết công việc</Text>
        <Text style={styles.detailValue}>Khối lượng công việc: {jobDetails}</Text>
      </View>

      {/* Phương thức thanh toán */}
      <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
      <View style={styles.paymentMethod}>
        <Text style={styles.methodText}>Tiền mặt</Text>
        <TouchableOpacity>
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Tổng cộng */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Tổng cộng</Text>
        <Text style={styles.totalValue}>{totalPrice}</Text>
      </View>

      {/* Nút Đăng việc */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => alert('Công việc đã được đăng thành công!')}
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
