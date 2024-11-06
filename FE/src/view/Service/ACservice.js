import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';

const ACService = ({ navigation, route }) => {
  const [selectedOption, setSelectedOption] = useState(null);  // Track selected HP option
  const [quantity, setQuantity] = useState(1);  // Track quantity
  const pricePerUnit = selectedOption === 'Dưới 2HP' ? 216000 : 300000; // Prices based on selection
  const { selectedAddress, serviceType } = route.params;  // Get data from route

  const handleOptionSelect = (option) => {
    setSelectedOption(option);  // Set the selected option when user clicks
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Icon name="arrow-back" size={24} onPress={() => {}} />
          <Text style={styles.headerText}>Vệ sinh máy lạnh - Treo tường</Text>
        </View>

        {/* Air Conditioner Image */}
        <Image
          source={require('../../img/service/ac.png')} // Replace with your image URL
          style={styles.acImage}
        />

        {/* Option Selection */}
        <View style={styles.optionContainer}>
          <TouchableOpacity onPress={() => handleOptionSelect('Dưới 2HP')} style={styles.option}>
            <Text style={styles.optionText}>Dưới 2HP</Text>
            {selectedOption === 'Dưới 2HP' && <Icon name="check" color="green" />}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleOptionSelect('Từ 2HP trở lên')} style={styles.option}>
            <Text style={styles.optionText}>Từ 2HP trở lên</Text>
            {selectedOption === 'Từ 2HP trở lên' && <Icon name="check" color="green" />}
          </TouchableOpacity>
        </View>

        {/* Quantity and Price Section (Show only when an option is selected) */}
        {selectedOption && (
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityHeader}>SỐ LƯỢNG</Text>
            <View style={styles.quantityControl}>
              <Button title="-" onPress={decreaseQuantity} />
              <Text style={styles.quantityText}>{quantity}</Text>
              <Button title="+" onPress={increaseQuantity} />
            </View>
          </View>
        )}

        {/* Warranty Information */}
        <View style={styles.warrantyBox}>
          <Icon name="verified" color="orange" />
          <Text style={styles.warrantyText}>Dịch vụ được bảo hành trong 7 ngày.</Text>
        </View>
      </ScrollView>

      {/* Selected Device and Price (Show only when an option is selected) */}
      {selectedOption && (
        <View style={styles.summaryBox}>
          <View style={styles.summaryContent}>
            <Text style={styles.summaryText}>Thiết bị đã chọn</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>{(pricePerUnit * quantity).toLocaleString('vi-VN')} VND/h</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{quantity}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() =>
              navigation.navigate('TimeSelection', {
                selectedOption,
                quantity,
                selectedAddress,
                serviceType,
              })
            }
          >
            <Text style={styles.nextButtonText}>Tiếp theo</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  acImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  optionContainer: {
    paddingHorizontal: 16,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
  },
  quantityContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  quantityHeader: {
    fontSize: 18,
    marginBottom: 10,
  },
  quantityControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  warrantyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 10,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  warrantyText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#FF6F00',
  },
  summaryBox: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 15,
    color: '#00796B',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796B',
    marginLeft: 10,
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ACService;
