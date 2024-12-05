import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Button, Card, Paragraph, Avatar } from 'react-native-paper';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { API_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

const JobDetail = ({ navigation, route }) => {
  const { job } = route.params;
  const [jobDetails, setJobDetails] = useState(null);
  const [ratingSubmitted, setRatingSubmitted] = useState(false); // State to track if rating is submitted
  const { colors } = useTheme();

  const getToken = async () => {
    const token = await SecureStore.getItemAsync('authToken');
    return token;
  };

  // Fetch job details and check if rating is submitted
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = await getToken();
        if (!token) {
          throw new Error('Token not found. Please login again.');
        }
        
        // Check if rating was previously submitted for this job
        const isRatingSubmitted = await SecureStore.getItemAsync(`ratingSubmitted_${job._id}`);
        if (isRatingSubmitted === 'true') {
          setRatingSubmitted(true);
        }

        const response = await fetch(`${API_URL}/jobs/${job._id}/details`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          console.error(`Failed to fetch job details. Status: ${response.status}`);
          return;
        }
        const data = await response.json();
        if (data.success) {
          setJobDetails(data.job);
        } else {
          console.error('Failed to fetch job details:', data.message);
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchJobDetails();
  }, [job]);

  if (!jobDetails) {
    return <Text>Loading...</Text>;
  }

  const clientAddress = jobDetails.client?.client_profile?.addresses?.find(
    (addr) => addr.address === jobDetails.address
  );
  const clientName = jobDetails.client.name || 'N/A';
  const clientPhone = jobDetails.client.phone || 'N/A';
  const formattedScheduledTime = new Date(jobDetails.scheduled_time).toLocaleString();
  const showWorkerInfo = ['accepted', 'in_progress', 'completed'].includes(jobDetails.status);

  // Handler for navigating to Rating screen
  const handleRating = () => {
    navigation.navigate('Rating', {
      jobId: jobDetails._id,
      jobDetails,
      onRatingSubmitted: async () => {
        setRatingSubmitted(true); // Update the local state
        await SecureStore.setItemAsync(`ratingSubmitted_${jobDetails._id}`, 'true'); // Persist the rating submission
      },
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Address Section */}
        <Card style={styles.card}>
          <Card.Title title="Địa chỉ" left={(props) => <MaterialIcons name="location-on" size={28} color={colors.text} />} />
          <Card.Content>
            <Paragraph style={styles.paragraph}>{jobDetails.address}</Paragraph>
            <View style={styles.row}>
              <MaterialIcons name="date-range" size={20} color={colors.text} />
              <Paragraph style={styles.subText}>Chủ nhật, {formattedScheduledTime}</Paragraph>
            </View>
            <View style={styles.row}>
              <MaterialIcons name="phone" size={20} color={colors.text} />
              <Paragraph style={styles.subText}>{clientPhone} | {clientName}</Paragraph>
            </View>
          </Card.Content>
        </Card>

        {/* Job Details Section */}
        <Card style={styles.card}>
          <Card.Title title="Chi tiết công việc" left={(props) => <FontAwesome5 name="tasks" size={20} color={colors.text} />} />
          <Card.Content>
            <View style={styles.row}>
              <MaterialIcons name="access-time" size={20} color={colors.text} />
              <Paragraph style={styles.subText}>Thời lượng: {jobDetails.duration_hours} giờ</Paragraph>
            </View>
            <View style={styles.row}>
              <MaterialIcons name="note" size={20} color={colors.text} />
              <Paragraph style={styles.subText}>Ghi chú: {jobDetails.notes || 'Không có ghi chú'}</Paragraph>
            </View>
          </Card.Content>
        </Card>

        {/* Payment Method Section */}
        <Card style={styles.card}>
          <Card.Title title="Phương thức thanh toán" left={(props) => <MaterialIcons name="payment" size={24} color={colors.text} />} />
          <Card.Content>
            <View style={styles.row}>
              <FontAwesome5 name="money-bill-wave" size={20} color={colors.text} />
              <Paragraph style={styles.subText}>Tổng cộng: {jobDetails.price} VND</Paragraph>
            </View>
          </Card.Content>
        </Card>

        {/* Worker Info (if job is accepted, in_progress, or completed) */}
        {showWorkerInfo && jobDetails.worker && (
          <Card style={styles.card}>
            <Card.Title
              title="Thông tin người giúp việc"
              left={(props) => <Avatar.Image size={48} source={{ uri: jobDetails.worker.avatar || 'https://via.placeholder.com/48' }} />}
            />
            <Card.Content>
              <View style={styles.row}>
                <MaterialIcons name="person" size={20} color={colors.text} />
                <Paragraph style={styles.subText}>Tên: {jobDetails.worker.name}</Paragraph>
              </View>
              <View style={styles.row}>
                <MaterialIcons name="phone" size={20} color={colors.text} />
                <Paragraph style={styles.subText}>Số điện thoại: {jobDetails.worker.phone_number}</Paragraph>
              </View>
              <View style={styles.row}>
                <MaterialIcons name="star" size={20} color={colors.text} />
                <Paragraph style={styles.subText}>Đánh giá: {jobDetails.worker.rating.toFixed(1)} ⭐</Paragraph>
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Conditionally Render Button */}
        {ratingSubmitted ? (
          <Button
            mode="contained"
            style={styles.rateButton}
            onPress={() => navigation.navigate('Home')}
          >
            Đặt Lại
          </Button>
        ) : (
          jobDetails.status === 'completed' && (
            <Button
              mode="contained"
              style={styles.rateButton}
              onPress={handleRating}
            >
              Đánh giá
            </Button>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  paragraph: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  rateButton: {
    backgroundColor: '#FF8A00',
    marginTop: 16,
  },
});

export default JobDetail;
