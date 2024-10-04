import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const AddressSelection = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Chọn địa chỉ</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.addressContainer}>
        <View style={styles.addressDetails}>
          <Text style={styles.addressTitle}>1392 Đường Quang Trung</Text>
          <Text style={styles.addressSubtitle}>
            1392 Đường Quang Trung, phường 14, Gò Vấp, Hồ Chí Minh
          </Text>
          <Text style={styles.addressSubtitle}>Bảo</Text>
          <Text style={styles.phoneNumber}>(+84) 0392734554</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Text>
              <Icon name="pencil-outline" size={20} color="#00c853" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>
              <Icon name="trash-outline" size={20} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.newAddressButton}>
        <Text style={styles.newAddressText}>Chọn địa chỉ mới</Text>
      </TouchableOpacity>

      {/* Nút Tiếp theo */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('ServicePackage')}
      >
        <Text style={styles.nextButtonText}>Tiếp theo</Text>
      </TouchableOpacity>
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
    borderColor: '#00c853',
    alignItems: 'center',
    marginBottom: 20,
  },
  newAddressText: {
    color: '#00c853',
    fontWeight: 'bold',
  },
  nextButton: {
    paddingVertical: 15,
    backgroundColor: '#00c853',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 'auto', // Đẩy nút xuống cuối màn hình
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddressSelection;
