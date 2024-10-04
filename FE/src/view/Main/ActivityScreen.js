import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ActivityScreen = () => {
  const [activeTab, setActiveTab] = useState('Chờ làm'); // Tab đang hoạt động

  const renderContent = () => {
    switch (activeTab) {
      case 'Chờ làm':
        return (
          <View style={styles.contentContainer}>
            <Image
              source={require('../../img/imgAuth/fb.png')} // Thay bằng ảnh của bạn
              style={styles.activityImage}
            />
            <Text style={styles.messageText}>Ngôi nhà tươm tất sẽ giúp bạn cảm thấy thoải mái hơn.</Text>
            <TouchableOpacity style={styles.button} >
              <Text style={styles.buttonText}>Đăng việc ngay</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Lặp lại':
        return (
          <View style={styles.contentContainer}>
            <Text>Không có việc lặp lại.</Text>
          </View>
        );
      case 'Theo gói':
        return (
          <View style={styles.contentContainer}>
            <Text>Không có việc theo gói.</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hoạt động</Text>
        <TouchableOpacity>
          <Text style={styles.historyText}>Lịch sử</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Chờ làm' && styles.activeTab]}
          onPress={() => setActiveTab('Chờ làm')}
        >
          <Text style={[styles.tabText, activeTab === 'Chờ làm' && styles.activeTabText]}>Chờ làm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Lặp lại' && styles.activeTab]}
          onPress={() => setActiveTab('Lặp lại')}
        >
          <Text style={[styles.tabText, activeTab === 'Lặp lại' && styles.activeTabText]}>Lặp lại</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Theo gói' && styles.activeTab]}
          onPress={() => setActiveTab('Theo gói')}
        >
          <Text style={[styles.tabText, activeTab === 'Theo gói' && styles.activeTabText]}>Theo gói</Text>
        </TouchableOpacity>
      </View>

      {/* Nội dung dựa trên tab */}
      <ScrollView style={styles.scrollView}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: { fontSize: 24, fontWeight: 'bold' },
  historyText: { fontSize: 16, color: '#4CAF50' }, // Màu xanh cho Lịch sử

  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabItem: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#ff8a00',
  },
  tabText: { fontSize: 16, color: '#aaa' },
  activeTabText: { color: '#ff8a00', fontWeight: 'bold' },

  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  activityImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  messageText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50', // Màu xanh cho nút
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  scrollView: { flex: 1 },
});

export default ActivityScreen;
