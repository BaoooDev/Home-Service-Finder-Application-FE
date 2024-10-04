import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Đảm bảo bạn đã cài đặt react-native-vector-icons và expo/vector-icons

const ServicePackage = ({ navigation }) => {
  const [selectedTime, setSelectedTime] = useState('3 giờ');
  const [isPremium, setIsPremium] = useState(false);

  const togglePremiumSwitch = () => setIsPremium(previousState => !previousState);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Nút Quay lại */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={24} color="#ff8a00" />
        <Text style={styles.backButtonText}>Quay lại</Text>
      </TouchableOpacity>

      {/* Thông tin địa chỉ */}
      <View style={styles.addressContainer}>
        <Ionicons name="location-outline" size={20} color="#ff8a00" />
        <Text style={styles.addressText}>1392 Đường Quang Trung, phường 14, Gò Vấp, Hồ Chí Minh</Text>
      </View>

      {/* Thời lượng lựa chọn */}
      <Text style={styles.sectionTitle}>Thời lượng</Text>
      <Text style={styles.description}>Vui lòng ước tính diện tích cần dọn dẹp và chọn phương án phù hợp.</Text>

      <TouchableOpacity
        style={[styles.timeOption, selectedTime === '2 giờ' && styles.selectedOption]}
        onPress={() => setSelectedTime('2 giờ')}
      >
        <Text style={styles.timeText}>2 giờ</Text>
        <Text style={styles.subText}>Tối đa 55m² hoặc 2 phòng</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.timeOption, selectedTime === '3 giờ' && styles.selectedOption]}
        onPress={() => setSelectedTime('3 giờ')}
      >
        <Text style={styles.timeText}>3 giờ</Text>
        <Text style={styles.subText}>Tối đa 85m² hoặc 3 phòng</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.timeOption, selectedTime === '4 giờ' && styles.selectedOption]}
        onPress={() => setSelectedTime('4 giờ')}
      >
        <Text style={styles.timeText}>4 giờ</Text>
        <Text style={styles.subText}>Tối đa 105m² hoặc 4 phòng</Text>
      </TouchableOpacity>

      {/* Dịch vụ Premium */}
      <Text style={styles.sectionTitle}>Chọn dịch vụ Premium</Text>
      <View style={styles.premiumContainer}>
        <Text style={styles.premiumText}>Dịch vụ Premium</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#ff8a00' }}
          thumbColor={isPremium ? '#fff' : '#fff'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={togglePremiumSwitch}
          value={isPremium}
        />
      </View>
      <Text style={styles.noteText}>* Đã bao gồm bộ công cụ dụng cụ</Text>

      {/* Tổng cộng và nút tiếp theo */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>240,000 VND/3h</Text>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('TimeSelection')}
        >
          <Text style={styles.nextButtonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, padding: 20, backgroundColor: '#fff' },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 8,
    color: '#ff8a00',
    fontSize: 16,
  },
  addressContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  addressText: { marginLeft: 8, fontSize: 16, fontWeight: 'bold' },
  
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  description: { fontSize: 14, color: '#666', marginBottom: 10 },

  timeOption: {
    padding: 15,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f7f7f7',
  },
  selectedOption: {
    borderColor: '#ff8a00',
  },
  timeText: { fontSize: 16, fontWeight: 'bold' },
  subText: { fontSize: 14, color: '#666' },

  premiumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff5e1',
    borderRadius: 10,
    marginBottom: 10,
  },
  premiumText: { fontSize: 16, fontWeight: 'bold' },

  noteText: { fontSize: 12, color: '#666', marginBottom: 20 },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  totalText: { fontSize: 16, fontWeight: 'bold', color: '#00c853' },
  nextButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#ff8a00',
    borderRadius: 10,
  },
  nextButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ServicePackage;
