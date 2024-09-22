import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';  // SafeAreaView cho notch
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');  // Lấy chiều rộng màn hình cho banner

const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);  // Chỉ số banner hiện tại
  const scrollViewRef = useRef(null);  // Tạo tham chiếu cho ScrollView
  const banners = [  // Danh sách banner
    {
      image: require('../../img/imgAuth/fb.png'),
      text: 'New Feature - Chat in-app',
    },
    {
      image: require('../../img/imgAuth/fb.png'),
      text: 'Rebook your favorite Tasker!',
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex === banners.length - 1 ? 0 : prevIndex + 1;
        scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
        return nextIndex;
      });
    }, 5000);  // Thời gian chuyển mỗi banner (5 giây)

    return () => clearInterval(intervalId);  // Xóa interval khi component bị hủy
  }, [banners.length]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Xin chào Bảo</Text>
          <View style={styles.headerPoints}>
            <Text style={styles.pointsText}>0 đ</Text>
            <Text style={styles.bPointsText}>0 bPoints</Text>
          </View>
        </View>

        {/* Banner quảng cáo với tự động cuộn */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}  // Tham chiếu đến ScrollView
          style={styles.bannerScroll}
        >
          {banners.map((banner, index) => (
            <View key={index} style={styles.bannerItem}>
              <Image source={banner.image} style={styles.bannerImage} />
              <Text style={styles.bannerText}>{banner.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Danh sách dịch vụ chính */}
        <View style={styles.servicesContainer}>
          <Text style={styles.servicesTitle}>Dịch vụ</Text>
          <Text style={styles.viewAllText}>Xem tất cả</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.servicesScroll}>
            <View style={styles.serviceItem}>
              <Icon name="home" size={30} color="#ff8a00" />
              <Text style={styles.serviceText}>Dọn dẹp nhà</Text>
            </View>
            <View style={styles.serviceItem}>
              <Icon name="bed" size={30} color="#ff8a00" />
              <Text style={styles.serviceText}>Dọn dẹp nhà gói cố định</Text>
            </View>
            <View style={styles.serviceItem}>
              <Icon name="cleaning-services" size={30} color="#ff8a00" />
              <Text style={styles.serviceText}>Tổng vệ sinh</Text>
            </View>
            <View style={styles.serviceItem}>
              <Icon name="airplane" size={30} color="#ff8a00" />
              <Text style={styles.serviceText}>Vệ sinh máy lạnh</Text>
            </View>
          </ScrollView>
        </View>

        {/* Thêm 4 dịch vụ ngang */}
        <View style={styles.servicesContainer}>
          <Text style={styles.servicesTitle}>Các dịch vụ khác</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.servicesScroll}>
            <View style={styles.serviceItem}>
              <Icon name="car-sport-outline" size={30} color="#ff8a00" />
              <Text style={styles.serviceText}>Vệ sinh xe hơi</Text>
            </View>
            <View style={styles.serviceItem}>
              <Icon name="water-outline" size={30} color="#ff8a00" />
              <Text style={styles.serviceText}>Làm sạch hồ bơi</Text>
            </View>
            <View style={styles.serviceItem}>
              <Icon name="hammer-outline" size={30} color="#ff8a00" />
              <Text style={styles.serviceText}>Sửa chữa đồ gia dụng</Text>
            </View>
            <View style={styles.serviceItem}>
              <Icon name="leaf-outline" size={30} color="#ff8a00" />
              <Text style={styles.serviceText}>Chăm sóc cây cảnh</Text>
            </View>
          </ScrollView>
        </View>

        {/* Phần đánh giá từ khách hàng */}
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>Đánh giá từ khách hàng</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.reviewsScroll}>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewText}>"Dịch vụ rất tốt, nhân viên nhiệt tình!"</Text>
              <Text style={styles.reviewAuthor}>- Nguyễn An</Text>
            </View>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewText}>"Sẽ tiếp tục sử dụng trong tương lai!"</Text>
              <Text style={styles.reviewAuthor}>- Trần Hùng</Text>
            </View>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewText}>"Giá cả hợp lý và chất lượng." </Text>
              <Text style={styles.reviewAuthor}>- Lê Thảo</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#ff8a00', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 },
  welcomeText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  headerPoints: { alignItems: 'flex-end' },
  pointsText: { color: '#fff', fontSize: 16 },
  bPointsText: { color: '#fff', fontSize: 12 },

  // Banner quảng cáo
  bannerScroll: {
    marginTop: 16,
  },
  bannerItem: {
    width: width - 40,
    marginLeft: 20,
    marginRight: 20,
    height: 150,
    backgroundColor: '#fff5e1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  bannerText: {
    fontSize: 16,
    color: '#ff8a00',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 10,
    left: 10,
  },

  servicesContainer: { padding: 16 },
  servicesTitle: { fontSize: 18, fontWeight: 'bold' },
  viewAllText: { position: 'absolute', right: 16, top: 16, color: '#ff8a00' },
  servicesScroll: { marginTop: 16 },
  serviceItem: { alignItems: 'center', marginRight: 16, width: 80 },
  serviceText: { fontSize: 12, textAlign: 'center', marginTop: 8 },

  // Phần đánh giá từ khách hàng
  reviewsContainer: { padding: 16 },
  reviewsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  reviewsScroll: { marginTop: 10 },
  reviewItem: {
    width: 250,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginRight: 16,
  },
  reviewText: { fontSize: 14, fontStyle: 'italic' },
  reviewAuthor: { fontSize: 12, textAlign: 'right', marginTop: 5, fontWeight: 'bold' },
});

export default HomeScreen;
