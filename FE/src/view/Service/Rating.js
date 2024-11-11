import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

const Rating = ({ navigation, route }) => {
  const { jobId, jobDetails, onRatingSubmitted } = route.params || {};
  const workerName = jobDetails?.worker?.full_name || 'Worker Name';
  const workerAvatar = jobDetails?.worker?.avatar || 'https://via.placeholder.com/50';

  // State variables
  const [workerRating, setWorkerRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [workerComment, setWorkerComment] = useState('');
  const [serviceComment, setServiceComment] = useState('');
  const [showModal, setShowModal] = useState(false);

  const getToken = async () => {
    return await SecureStore.getItemAsync('authToken');
  };

  const handleSubmit = async () => {
    const token = await getToken();

    if (!token) {
      console.error('Token not found. Please login again.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/jobs/${jobId}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          workerRating,
          serviceRating,
          workerComment,
          serviceComment,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log('Rating submitted successfully:', data.message);
        setShowModal(true); // Show success modal
        onRatingSubmitted(); // Notify JobDetail screen that the rating was submitted
      } else {
        console.error('Failed to submit rating:', data.message);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Worker Rating Section */}
          <View style={styles.section}>
            <View style={styles.header}>
              <Image source={{ uri: workerAvatar }} style={styles.avatar} />
              <Text style={styles.workerName}>{workerName}</Text>
            </View>

            <Title>Đánh giá người giúp việc</Title>
            <AirbnbRating
              count={5}
              reviews={["Tệ", "Không tốt", "Bình thường", "Tốt", "Tuyệt vời"]}
              defaultRating={workerRating}
              size={30}
              onFinishRating={(rating) => setWorkerRating(rating)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Bạn có nhận xét gì về người giúp việc?"
              placeholderTextColor="#666"
              multiline={true}
              value={workerComment}
              onChangeText={setWorkerComment}
            />
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Service Rating Section */}
          <View style={styles.section}>
            <Title>Đánh giá dịch vụ</Title>
            <AirbnbRating
              count={5}
              reviews={["Tệ", "Không tốt", "Bình thường", "Tốt", "Tuyệt vời"]}
              defaultRating={serviceRating}
              size={30}
              onFinishRating={(rating) => setServiceRating(rating)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Bạn có nhận xét gì về dịch vụ?"
              placeholderTextColor="#666"
              multiline={true}
              value={serviceComment}
              onChangeText={setServiceComment}
            />
          </View>

          {/* Submit Button */}
          <Button mode="contained" style={styles.submitButton} onPress={handleSubmit}>
            Gửi đánh giá
          </Button>

          {/* Centered Modal for feedback */}
          <Modal
            transparent={true}
            visible={showModal}
            animationType="slide"
            onRequestClose={() => setShowModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Đã gửi đánh giá! Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</Text>
                <Button onPress={() => { setShowModal(false); navigation.goBack(); }}>
                  OK
                </Button>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  workerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    height: 100,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    textAlignVertical: 'top',
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#ff8a00',
    marginTop: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Rating;
