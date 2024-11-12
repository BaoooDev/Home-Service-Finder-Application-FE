import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, SafeAreaView, FlatList, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const WashingMachineService = ({ navigation, route  }) => {
  const [selectedType, setSelectedType] = useState('Top Load');
  const [isDrumRemoval, setIsDrumRemoval] = useState(false);
  const [machines, setMachines] = useState([]);
  const [showBottomBar, setShowBottomBar] = useState(false); // Track visibility of bottom bar
  const [quantity, setQuantity] = useState(1);
  const { selectedAddress, serviceType } = route.params; // Get data from route

  const pricePerUnit = selectedType === 'Top Load' ? 216000 : 300000;
  const drumRemovalPrice = isDrumRemoval ? 100000 : 0;
  const totalPrice = pricePerUnit + drumRemovalPrice;

  const toggleDrumRemoval = () => setIsDrumRemoval(!isDrumRemoval);

  const addMachine = () => {
    const newMachine = {
      id: machines.length + 1,
      type: selectedType,
      drumRemoval: isDrumRemoval ? 'Có tháo lồng giặt' : 'Không tháo lồng giặt',
      price: totalPrice,
    };
    setMachines([...machines, newMachine]);
    setShowBottomBar(true); // Show bottom bar after adding a machine
  };

  const removeMachine = (id) => {
    const updatedMachines = machines.filter((machine) => machine.id !== id);
    setMachines(updatedMachines);
    if (updatedMachines.length === 0) setShowBottomBar(false); // Hide bottom bar if no machines left
  };

  const renderMachineItem = ({ item }) => (
    <View style={styles.machineItem}>
      <Text style={styles.machineTitle}>Thiết bị {item.id}</Text>
      <Text>Loại: {item.type}</Text>
      <Text>Dịch vụ thêm: {item.drumRemoval}</Text>
      <Text>Giá: {item.price.toLocaleString()} VND</Text>
      <TouchableOpacity onPress={() => removeMachine(item.id)} style={styles.deleteIcon}>
        <Icon name="close" size={20} color="#ff0000" />
      </TouchableOpacity>
    </View>
  );

  const getMachineImage = () => {
    return selectedType === 'Top Load'
      ? require('../../img/service/cuatren.png')
      : require('../../img/service/cuatruoc.png');
  };

  const renderHeader = () => (
    <>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#ff8a00" />
        </TouchableOpacity>
        <View style={styles.addressContainer}>
          <Icon name="location-on" size={18} color="#ff8a00" />
          <Text style={styles.addressText}>1392 Đường Quang Trung</Text>
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
      <Image source={getMachineImage()} style={styles.machineImage} />

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
      <View style={styles.warrantyBox}>
            <Icon name="verified" color="orange" />
            <Text style={styles.warrantyText}>Dịch vụ được bảo hành trong 7 ngày.</Text>
          </View>
      {/* Enlarged Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={addMachine}>
        <Text style={styles.addButtonText}>Thêm</Text>
      </TouchableOpacity>

      {/* Machine List Header */}
      {machines.length > 0 && <Text style={styles.sectionTitle}>Danh sách máy giặt</Text>}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={machines}
        renderItem={renderMachineItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.contentContainer}
        
      />

      {/* Fixed Price and Next Button (only visible after adding a machine) */}
      {showBottomBar && (
        <View style={styles.bottomBar}>
          <Text style={styles.priceText}>{totalPrice.toLocaleString()} VND</Text>
          <TouchableOpacity style={styles.nextButton}
           onPress={() =>
            navigation.navigate('TimeSelection', {
              quantity,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addressContainer: { flexDirection: 'row', alignItems: 'center', marginLeft: 8 },
  addressText: { fontSize: 16, fontWeight: 'bold' },
  machineImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  warrantyBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3E0', padding: 10, marginHorizontal: 16, borderRadius: 8 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  typeButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5,
  },
  selectedTypeButton: { backgroundColor: '#ff8a00', borderColor: '#ff8a00' },
  typeText: { color: '#666', fontSize: 16 },
  selectedTypeText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff5e1',
    borderRadius: 8,
    marginBottom: 20,
  },
  optionLabel: { fontSize: 16, fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
    alignSelf: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  machineItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    position: 'relative',
  },
  machineTitle: { fontWeight: 'bold', color: '#FF6F00' },
  deleteIcon: { position: 'absolute', top: 10, right: 10 },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff5e1',
    padding: 10,
    borderRadius: 8,
  },
  footerText: { color: '#FF6F00', fontSize: 16 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#4CAF50',
  },
  priceText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  nextButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  nextButtonText: { color: '#4CAF50', fontSize: 16, fontWeight: 'bold' },
});

export default WashingMachineService;
