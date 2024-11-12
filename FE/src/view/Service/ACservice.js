import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import { API_URL } from '@env';

const ACService = ({ navigation, route }) => {
  const [quantity, setQuantity] = useState(1); // Track quantity
  const [serviceDetails, setServiceDetails] = useState(null); // Store service data fetched from server
  const [totalPrice, setTotalPrice] = useState(0); // Calculated total price
  const [isGasRefill, setIsGasRefill] = useState(false); // Track if "Bơm Gas" is selected
  const [loading, setLoading] = useState(true); // Loading indicator

  const { selectedAddress, serviceType } = route.params; // Get data from route

  const toggleGasRefill = () => setIsGasRefill(!isGasRefill); // Toggle gas refill option

  // Fetch service details on component mount
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/services/${serviceType}`);
        const data = await response.json();
        if (data.success) {
          setServiceDetails(data.service);
          calculateTotalPrice(data.service, quantity, isGasRefill); // Initial price calculation
        }
      } catch (error) {
        console.error('Failed to fetch service details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceDetails();
  }, [serviceType]);

  // Calculate total price based on base price, quantity, and gas refill option
  const calculateTotalPrice = (service, quantity, gasRefill) => {
    if (!service) return;
    
    const basePrice = service.base_price;
    const variableCost = service.price_per_hour * quantity;
    let calculatedPrice = basePrice + variableCost;
    
    // Add gas refill charge if selected
    if (gasRefill) {
      calculatedPrice += 100000; // Additional 100,000 VND for gas refill
    }
    
    setTotalPrice(calculatedPrice);
  };

  // Recalculate total price whenever quantity or gas refill status changes
  useEffect(() => {
    if (serviceDetails) {
      calculateTotalPrice(serviceDetails, quantity, isGasRefill);
    }
  }, [quantity, isGasRefill]);

  // Increase or decrease quantity
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#ff8a00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Icon name="arrow-back" size={24} onPress={() => navigation.goBack()} />
          <Text style={styles.headerText}>Vệ sinh máy lạnh - Treo tường</Text>
        </View>

        {/* Air Conditioner Image */}
        <Image
          source={require('../../img/service/ac.png')}
          style={styles.acImage}
        />

        {/* Quantity and Price Section */}
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityHeader}>SỐ LƯỢNG</Text>
          <View style={styles.quantityControl}>
            <Button title="-" onPress={decreaseQuantity} />
            <Text style={styles.quantityText}>{quantity}</Text>
            <Button title="+" onPress={increaseQuantity} />
          </View>
        </View>

        {/* Gas Refill Option */}
        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Bơm Gas (+100,000 VND)</Text>
          <Switch
            value={isGasRefill}
            onValueChange={toggleGasRefill}
            trackColor={{ false: '#767577', true: '#ff8a00' }}
            thumbColor={isGasRefill ? '#fff' : '#fff'}
          />
        </View>

        {/* Warranty Information */}
        <View style={styles.warrantyBox}>
          <Icon name="verified" color="orange" />
          <Text style={styles.warrantyText}>Dịch vụ được bảo hành trong 7 ngày.</Text>
        </View>
      </ScrollView>

      {/* Total Price and Next Button */}
      <View style={styles.summaryBox}>
        <View style={styles.summaryContent}>
          <Text style={styles.summaryText}>Thiết bị đã chọn</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{totalPrice ? `${totalPrice.toLocaleString()} VND` : "Calculating..."}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{quantity}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() =>
            navigation.navigate('TimeSelection', {
              quantity,
              selectedAddress,
              serviceType,
              totalPrice,
              isGasRefill,
            })
          }
        >
          <Text style={styles.nextButtonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { paddingVertical: 20 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  headerText: { fontSize: 20, fontWeight: 'bold', marginLeft: 10 },
  acImage: { width: '100%', height: 250, resizeMode: 'contain', marginVertical: 20 },
  quantityContainer: { paddingHorizontal: 16, paddingVertical: 20 },
  quantityHeader: { fontSize: 18, marginBottom: 10 },
  quantityControl: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  quantityText: { fontSize: 20, marginHorizontal: 10 },
  optionContainer: { paddingHorizontal: 16, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' },
  optionText: { fontSize: 16 },
  warrantyBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3E0', padding: 10, marginHorizontal: 16, borderRadius: 8 },
  warrantyText: { fontSize: 16, marginLeft: 10, color: '#FF6F00' },
  summaryBox: { position: 'absolute', bottom: 0, width: '100%', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#ddd' },
  summaryContent: { flexDirection: 'row', alignItems: 'center' },
  summaryText: { fontSize: 15, color: '#00796B' },
  priceContainer: { flexDirection: 'row', alignItems: 'center' },
  priceText: { fontSize: 16, fontWeight: 'bold', color: '#00796B', marginLeft: 10 },
  badge: { backgroundColor: 'red', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 10 },
  badgeText: { color: '#fff', fontSize: 14 },
  nextButton: { backgroundColor: '#4CAF50', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  nextButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ACService;
