import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, SafeAreaView, FlatList, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { API_URL } from '@env';

const WashingMachineService = ({ navigation, route }) => {
  const [selectedType, setSelectedType] = useState('Top Load');
  const [isDrumRemoval, setIsDrumRemoval] = useState(false);
  const [machines, setMachines] = useState([]);
  const [dynamicPrice, setDynamicPrice] = useState(0);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const { selectedAddress, serviceType } = route.params;
  const [serviceDetails, setServiceDetails] = useState(null); 
  const [totalPrice, setTotalPrice] = useState(0);
  // Toggle drum removal option
  const toggleDrumRemoval = () => setIsDrumRemoval(!isDrumRemoval);

  // Fetch service details from the API
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/services/${serviceType}`);
        const data = await response.json();
        if (data.success) {
          setServiceDetails(data.service); // Store the service details
          calculateTotalPrice(data.service); // Initial calculation based on fetched data
        }
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };
    fetchServiceDetails();
  }, [serviceType]);

  // Calculate total price based on selected type and drum removal
  const calculateTotalPrice = (service) => {
    if (!service) return;
    
    // Use `top_load` or `front_load` price from service details based on `selectedType`
    const pricePerUnit = selectedType === 'Top Load' ? service.top_load : service.front_load;
    const drumRemovalPrice = isDrumRemoval ? 100000 : 0;
    
    const totalPrice = pricePerUnit + drumRemovalPrice;
    setDynamicPrice(totalPrice); // Set total price for a single machine
  };

  
  // Recalculate price whenever `selectedType`, `isDrumRemoval`, or `serviceDetails` changes
  useEffect(() => {
    if (serviceDetails) {
      calculateTotalPrice(serviceDetails);
    }
  }, [selectedType, isDrumRemoval, serviceDetails]);

  // Add machine to the list and show bottom bar
  const addMachine = () => {
    const newMachine = {
      id: `${machines.length + 1}-${new Date().getTime()}`,
      type: selectedType,
      drumRemoval: isDrumRemoval ? 'Có tháo lồng giặt' : 'Không tháo lồng giặt',
      price: dynamicPrice,
    };
    setMachines([...machines, newMachine]);
    setShowBottomBar(true);
  };
  useEffect(() => {
    const newTotalPrice = machines.reduce((sum, machine) => sum + machine.price, 0);
    setTotalPrice(newTotalPrice); // Update `totalPrice` state
  }, [machines]);
  // Remove machine from list and hide bottom bar if no machines left
  const removeMachine = (id) => {
    const updatedMachines = machines.filter((machine) => machine.id !== id);
    setMachines(updatedMachines);
    if (updatedMachines.length === 0) setShowBottomBar(false);
  };

  // Calculate the combined price for all machines whenever the `machines` list changes
  useEffect(() => {
    const newTotalPrice = machines.reduce((sum, machine) => sum + machine.price, 0);
    setDynamicPrice(newTotalPrice);
  }, [machines]);

  // Render each machine item in the list
  const renderMachineItem = ({ item, index }) => (
    <View style={styles.machineItem}>
      <Text style={styles.machineTitle}>Thiết bị {index + 1}</Text>
      <Text>Loại: {item.type === 'Top Load' ? 'Máy cửa trên' : 'Máy cửa trước'}</Text>
      <Text>Dịch vụ thêm: {item.drumRemoval}</Text>
      <Text>Giá: {item.price.toLocaleString()} VND</Text>
      <TouchableOpacity onPress={() => removeMachine(item.id)} style={styles.deleteIcon}>
        <Icon name="close" size={20} color="#ff0000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={machines}
        renderItem={renderMachineItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color="#ff8a00" />
              </TouchableOpacity>
              <View style={styles.addressContainer}>
                <Icon name="location-on" size={18} color="#ff8a00" />
                <Text style={styles.addressText}>{selectedAddress.address}</Text>
              </View>
            </View>

            {/* Machine Type Selector */}
            <Text style={styles.sectionTitle}>Chọn loại máy giặt</Text>
            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[styles.typeButton, selectedType === 'Top Load' && styles.selectedTypeButton]}
                onPress={() => setSelectedType('Top Load')}
              >
                <Text style={selectedType === 'Top Load' ? styles.selectedTypeText : styles.typeText}>Máy cửa trên</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeButton, selectedType === 'Front Load' && styles.selectedTypeButton]}
                onPress={() => setSelectedType('Front Load')}
              >
                <Text style={selectedType === 'Front Load' ? styles.selectedTypeText : styles.typeText}>Máy cửa trước</Text>
              </TouchableOpacity>
            </View>

            {/* Machine Image */}
            <Image source={selectedType === 'Top Load' ? require('../../img/service/cuatren.png') : require('../../img/service/cuatruoc.png')} style={styles.machineImage} />

            {/* Drum Removal Option */}
            <View style={styles.optionContainer}>
              <Text style={styles.optionLabel}>Có tháo lồng giặt</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#ff8a00' }}
                thumbColor={isDrumRemoval ? '#fff' : '#fff'}
                onValueChange={toggleDrumRemoval}
                value={isDrumRemoval}
              />
            </View>

            {/* Add Machine Button */}
            <TouchableOpacity style={styles.addButton} onPress={addMachine}>
              <Text style={styles.addButtonText}>Thêm</Text>
            </TouchableOpacity>

            {/* Machine List Header */}
            {machines.length > 0 && <Text style={styles.sectionTitle}>Danh sách máy giặt</Text>}
          </>
        )}
      />

      {/* Fixed Price and Next Button */}
      {showBottomBar && (
        <View style={styles.bottomBar}>
          <Text style={styles.priceText}>{dynamicPrice.toLocaleString()} VND</Text>
          <TouchableOpacity style={styles.nextButton} onPress={() =>
            navigation.navigate('TimeSelection', {
              quantity: machines.length,
              selectedAddress,
              serviceType,
              totalPrice,
            })
          }>
            <Text style={styles.nextButtonText}>Tiếp theo</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  contentContainer: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  addressContainer: { flexDirection: 'row', alignItems: 'center', marginLeft: 8 },
  addressText: { fontSize: 16, fontWeight: 'bold' },
  machineImage: { width: '100%', height: 200, resizeMode: 'contain', marginVertical: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  typeSelector: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  typeButton: { flex: 1, padding: 15, alignItems: 'center', borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginHorizontal: 5 },
  selectedTypeButton: { backgroundColor: '#ff8a00', borderColor: '#ff8a00' },
  typeText: { color: '#666', fontSize: 16 },
  selectedTypeText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  optionContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, backgroundColor: '#fff5e1', borderRadius: 8, marginBottom: 20 },
  optionLabel: { fontSize: 16, fontWeight: 'bold' },
  addButton: { backgroundColor: '#4CAF50', paddingVertical: 14, paddingHorizontal: 40, alignItems: 'center', borderRadius: 8, marginVertical: 10, alignSelf: 'center' },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  machineItem: { padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8, marginBottom: 10, position: 'relative' },
  deleteIcon: { position: 'absolute', top: 10, right: 10 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#4CAF50' },
  priceText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  nextButton: { paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#fff', borderRadius: 8 },
  nextButtonText: { color: '#4CAF50', fontSize: 16, fontWeight: 'bold' },
});

export default WashingMachineService;
