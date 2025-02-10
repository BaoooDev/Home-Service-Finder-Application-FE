import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView
import { Ionicons } from '@expo/vector-icons';

const AccountScreen = ({ navigation }) => { // Khởi tạo navigation

  const handleLogout = () => {
    // Chuyển hướng đến màn hình SignIn
    navigation.navigate('SignIn');// replace để ngăn quay lại màn hình hiện tại
  };

  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header thông tin người dùng */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={require('../../img/imgAuth/fb.png')} // Ảnh đại diện mặc định
              style={styles.avatar}
            />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>.</Text>
              <TouchableOpacity>
                <Text style={styles.viewProfileText}>Xem hồ sơ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Các mục trong trang tài khoản */}
        <View style={styles.menuContainer}>
          <MenuItem icon="wallet-outline" text="bPay" />
          <MenuItem icon="gift-outline" text="Ưu đãi của tôi" />
          <MenuItem icon="ribbon-outline" text="bRewards" />
          <MenuItem icon="pricetag-outline" text="Gói Ưu Đãi" />
          <MenuItem icon="heart-outline" text="Tasker yêu thích" />
          <MenuItem icon="list-outline" text="Danh sách chặn" />
          <MenuItem icon="share-social-outline" text="Săn quà giới thiệu" />
          <MenuItem icon="help-circle-outline" text="Trợ giúp" />
          <MenuItem icon="settings-outline" text="Cài đặt" />
        </View>

        {/* Nút Đăng xuất */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({ icon, text, badge }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuItemLeft}>
      <Ionicons name={icon} size={24} color="#000" />
      <Text style={styles.menuText}>{text}</Text>
    </View>
    {badge && (
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
    )}
    <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Đảm bảo khu vực an toàn có nền trắng
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 30, // Khoảng cách dọc giữa phần header và các mục khác
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center', // Căn giữa nội dung
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userInfo: {
    flexDirection: 'column',
    alignItems: 'center', // Căn giữa ảnh đại diện và tên
  },
  avatar: {
    width: 80, // Kích thước ảnh đại diện lớn hơn
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  userDetails: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  viewProfileText: {
    color: '#4CAF50', // Màu xanh cho "Xem hồ sơ"
    marginTop: 4,
  },
  menuContainer: {
    marginTop: 20, // Khoảng cách giữa header và menu
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20, // Tăng khoảng cách trong mỗi mục
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#000',
  },
  badgeContainer: {
    backgroundColor: '#ff8a00',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: '#FF3D00',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountScreen;
