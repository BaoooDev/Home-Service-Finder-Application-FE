import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, SafeAreaView, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimeSelection = ({ navigation, route }) => {
  const { selectedOption,quantity,selectedService, selectedAddress, serviceType } = route.params;
  const [selectedTime, setSelectedTime] = useState(new Date()); // Initialize with current time
  const [isWeekly, setIsWeekly] = useState(false);
  const [note, setNote] = useState('');
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showPicker, setShowPicker] = useState(false); // To show time picker modal

  const toggleWeeklySwitch = () => setIsWeekly(!isWeekly);

  const onTimeChange = (event, selectedDate) => {
    // Ensure that the selectedDate is valid before updating the state
    if (selectedDate) {
      setSelectedTime(selectedDate);
    }
    setShowPicker(false);  // Hide the picker after selecting
  };

  // Automatically generate days from today up to the next 7 days
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of the day

    const upcomingDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i); // Increment by i days
      upcomingDays.push(day);
    }
    setDaysOfWeek(upcomingDays);
    setSelectedDay(upcomingDays[0]); // Default to today
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chọn thời gian làm việc</Text>
      </View>

      {/* Chọn ngày làm */}
      <Text style={styles.sectionTitle}>Thời gian làm việc</Text>
      <Text style={styles.description}>Chọn ngày làm</Text>
      <View style={styles.dateSelection}>
        {daysOfWeek.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dayOption, selectedDay?.getTime() === day.getTime() && styles.selectedDay]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={styles.dayText}>{`T${(day.getDay() === 0 ? 7 : day.getDay())}`}</Text>
            <Text style={styles.dateText}>{day.getDate()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chọn giờ làm */}
      <View style={styles.timePicker}>
        <Ionicons name="time-outline" size={20} color="#ff8a00" />
        <Text style={styles.timePickerText}>Chọn giờ làm</Text>
        <TouchableOpacity style={styles.timeInputContainer} onPress={() => setShowPicker(true)}>
          <Text style={styles.timeInput}>
            {selectedTime instanceof Date 
              ? selectedTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) 
              : '00:00'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal for DateTimePicker */}
      {showPicker && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showPicker}
          onRequestClose={() => setShowPicker(false)}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: '#333' }]}>
              <DateTimePicker
                value={selectedTime}
                mode="time"
                is24Hour={true}
                display="spinner" 
                themeVariant="dark"
                onChange={onTimeChange}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => setShowPicker(false)}
                >
                  <Text style={styles.confirmText}>Xác nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowPicker(false)}
                >
                  <Text style={styles.cancelText}>Hủy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Lặp lại hàng tuần */}
      <View style={styles.weeklyRepeat}>
        <Text style={styles.weeklyText}>Lặp lại hàng tuần</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#ff8a00' }}
          thumbColor={isWeekly ? '#fff' : '#fff'}
          onValueChange={toggleWeeklySwitch}
          value={isWeekly}
        />
      </View>

      {/* Ghi chú cho Tasker */}
      <Text style={styles.sectionTitle}>Ghi chú cho Tasker</Text>
      <Text style={styles.description}>Ghi chú này sẽ giúp Tasker làm nhanh và tốt hơn.</Text>
      <TextInput
        style={styles.noteInput}
        placeholder="Bạn có yêu cầu gì thêm, hãy nhập ở đây nhé"
        multiline={true}
        value={note}
        onChangeText={(text) => setNote(text)}
      />

      {/* Tổng tiền và nút Tiếp theo */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>240,000 VND/3h</Text>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('Confirmation', { selectedOption,
            quantity,selectedTime, selectedDay, selectedService, selectedAddress, serviceType })}
        >
          <Text style={styles.nextButtonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: { fontSize: 14, color: '#666' },
  dateSelection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  dayOption: {
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 10,
    borderRadius: 10,
  },
  selectedDay: {
    backgroundColor: '#ff8a00',
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  timePickerText: {
    fontSize: 16,
    marginLeft: 5,
  },
  timeInputContainer: {
    marginLeft: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  timeInput: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  weeklyRepeat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  weeklyText: {
    fontSize: 16,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    height: 100,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00c853',
  },
  nextButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#ff8a00',
    borderRadius: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: '#ff8a00',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TimeSelection;
