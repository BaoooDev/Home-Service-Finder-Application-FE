import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions,TouchableOpacity  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';  // SafeAreaView cho notch
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');  // Lấy chiều rộng màn hình cho banner

const HomeScreen = ({ navigation }) => {
  const [serviceType, setServiceType] = useState('Dọn dẹp nhà');

  const [currentIndex, setCurrentIndex] = useState(0);  // Chỉ số banner hiện tại
  const scrollViewRef = useRef(null);  // Tạo tham chiếu cho ScrollView
  const banners = [  // Danh sách banner
    {
      image: require('../../img/service/banner1.jpg'),
      //text: 'New Feature - Chat in-app',
    },
    {
      image: require('../../img/service/banner2.jpg'),
      //text: 'Rebook your favorite Tasker!',
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
          ref={scrollViewRef}
          scrollEnabled={false}  // Disable horizontal scrolling
          style={styles.bannerScroll}
        >
          {banners.map((banner, index) => (
            <View key={index} style={styles.bannerItem}>
              <Image source={banner.image} style={styles.bannerImage} />
            </View>
          ))}
        </ScrollView>

        {/* Danh sách dịch vụ chính */}
        <View style={styles.servicesContainer}>
          <Text style={styles.servicesTitle}>Dịch vụ</Text>
          <Text style={styles.viewAllText}>Xem tất cả</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.servicesScroll}>
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => {
              const service = 'Dọn dẹp nhà';  // Set the service type directly
              navigation.navigate('ServiceNavigation', { serviceType: service }); // Pass serviceType to AddressSelection
            }}
          >
            <Image source={require('../../img/service/hcicon.png')} style={styles.icon}/>
            <Text style={styles.serviceText}>Dọn dẹp nhà</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() =>{
              const service = 'Vệ sinh máy giặt';  // Set the service type directly
              navigation.navigate('ServiceNavigation', { serviceType: service });
            }}
          >
            <Image source={require('../../img/service/wsicon.png')} style={styles.icon} />
            <Text style={styles.serviceText}>Vệ sinh máy giặt</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() =>{
              const service = 'Vệ sinh máy lạnh';  // Set the service type directly
              navigation.navigate('ServiceNavigation', { serviceType: service });
            }}
          >
            <Image source={require('../../img/service/acicon.png')} style={styles.icon} />
            <Text style={styles.serviceText}>Vệ sinh máy lạnh</Text>
          </TouchableOpacity>

          </ScrollView>
        </View>

        {/* Thêm 4 dịch vụ ngang */}
        <View style={styles.servicesContainer}>
          <Text style={styles.servicesTitle}>Các dịch vụ sắp ra mắt</Text>
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
          <Text style={styles.reviewsTitle}>Nhận xét từ khách hàng</Text>
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
  icon: {
    width:70, // Adjust the size based on your design
    height: 65, // Adjust the size based on your design
    resizeMode: 'contain', // Ensures the icon retains its aspect ratio
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10, // Adds some space around the item
    borderRadius: 8, // Rounds the edges of the service item container
    backgroundColor: '#f7f7f7', // Background color for the service item
  },
  serviceText: {
    marginLeft: 15, // Adds space between the icon and the text
    fontSize: 18, // Adjust the font size to your preference
    fontWeight: '500', // Add some weight to the text
    color: '#333', // Dark text color
  },
  // Banner quảng cáo
  bannerScroll: {
    marginTop: 16,
  },
  bannerItem: {
    width: width,  // Full width for the banner
    height: 200,
    backgroundColor: '#fff5e1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
