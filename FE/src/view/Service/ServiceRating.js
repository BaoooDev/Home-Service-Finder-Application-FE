import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

const ServiceRating = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleRatingComplete = (rating) => {
    setRating(rating);
  };

  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name="close" size={24} color="black" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Đánh giá dịch vụ</Text>
      <Image
        source={{ uri: 'https://example.com/service.jpg' }}  // Replace with service image
        style={styles.serviceImage}
      />
      <Text style={styles.serviceName}>Dịch vụ ABC</Text>
      <AirbnbRating
        count={5}
        reviews={['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời']}
        defaultRating={0}
        size={30}
        onFinishRating={handleRatingComplete}
      />
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={4}
        placeholder="Viết đánh giá của bạn về dịch vụ..."
        value={review}
        onChangeText={setReview}
      />
      <Button
        mode="contained"
        style={styles.submitButton}
        onPress={() => console.log('Service rating submitted', rating, review)}
      >
        Gửi đi
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  serviceImage: { width: 100, height: 100, alignSelf: 'center', marginBottom: 10 },
  serviceName: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  textInput: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5, marginTop: 15, marginBottom: 10 },
  submitButton: { backgroundColor: '#ff8a00', padding: 10 },
});

export default ServiceRating;
