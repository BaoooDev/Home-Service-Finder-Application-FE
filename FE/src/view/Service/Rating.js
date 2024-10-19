import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings'; // Library for star ratings
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Rating = ({ route }) => {
  const navigation = useNavigation();

  const [workerRating, setWorkerRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [workerComment, setWorkerComment] = useState('');
  const [serviceComment, setServiceComment] = useState('');

  const handleSubmit = () => {
    console.log('Submit Ratings', {
      workerRating,
      serviceRating,
      workerComment,
      serviceComment,
    });

    navigation.goBack();  // Navigate back after submission
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Worker Rating Section */}
          <View style={styles.section}>
            <View style={styles.header}>
              <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.avatar} />
              <Text style={styles.workerName}>Worker Name</Text>
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
});

export default Rating;
