import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Switch, SafeAreaView } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const TimeSelectionScreen = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState('23');
  const [selectedTime, setSelectedTime] = useState({ hours: 14, minutes: 0 });
  const [isWeekly, setIsWeekly] = useState(false);
  const [note, setNote] = useState('');

  const toggleWeeklySwitch = () => setIsWeekly(!isWeekly);

  const handleTimeChange = (type, value) => {
    setSelectedTime((prevTime) => ({
      ...prevTime,
      [type]: value,
    }));
  };

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
        {['22', '23', '24', '25', '26', '27'].map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayOption,
              selectedDay === day && styles.selectedDay,
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={styles.dayText}>T2</Text>
            <Text style={styles.dateText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chọn giờ làm */}
      <View style={styles.timePicker}>
        <Ionicons name="time-outline" size={20} color="#ff8a00" />
        <Text style={styles.timePickerText}>Chọn giờ làm</Text>
        <View style={styles.timeInputContainer}>
          <TextInput
            style={styles.timeInput}
            value={String(selectedTime.hours).padStart(2, '0')}
            onChangeText={(value) => handleTimeChange('hours', value)}
            keyboardType="numeric"
          />
          <Text style={styles.timeSeparator}>:</Text>
          <TextInput
            style={styles.timeInput}
            value={String(selectedTime.minutes).padStart(2, '0')}
            onChangeText={(value) => handleTimeChange('minutes', value)}
            keyboardType="numeric"
          />
        </View>
      </View>

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
      <Text style={styles.description}>
        Ghi chú này sẽ giúp Tasker làm nhanh và tốt hơn.
      </Text>
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
          onPress={() => navigation.navigate('Confirmation')}
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
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  timeInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 5,
    textAlign: 'center',
    width: 40,
  },
  timeSeparator: {
    fontSize: 18,
    marginHorizontal: 5,
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
});

export default TimeSelectionScreen;
