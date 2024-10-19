import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Button, Card, Title, Paragraph, Avatar } from 'react-native-paper';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

// Temporary mock worker data
const mockWorker = {
  _id: 'worker123',
  name: 'Nguyen Van A',
  phone: '0912345678',
  avatar: 'https://via.placeholder.com/48',  // Placeholder for worker's avatar
  rating: 4.5, // Example rating
};

const JobDetail = ({ navigation,route }) => {
  const { job } = route.params; // assuming job data is passed via route params
  const { colors } = useTheme(); // Get theme colors

  // For demonstration, we'll assume that if the job is accepted, in_progress, or completed, we show the mock worker data
  const showWorkerInfo = ['accepted', 'in_progress', 'completed'].includes(job.status);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>

        {/* Address Section */}
        <Card style={styles.card}>
          <Card.Title title="Địa chỉ" left={(props) => <MaterialIcons name="location-on" size={28} color={colors.text} />} />
          <Card.Content>
            <Paragraph style={styles.paragraph}>{job.address}</Paragraph>
            <View style={styles.row}>
              <MaterialIcons name="date-range" size={20} color={colors.text} />
              <Paragraph style={styles.subText}>Chủ nhật, {job.scheduled_time} - {job.time}</Paragraph>
            </View>
            <View style={styles.row}>
              <MaterialIcons name="phone" size={20} color={colors.text} />
              <Paragraph style={styles.subText}>{job.phone} | {job.name}</Paragraph>
            </View>
          </Card.Content>
        </Card>

        {/* Job Details Section */}
        <Card style={styles.card}>
          <Card.Title title="Chi tiết công việc" left={(props) => <FontAwesome5 name="tasks" size={20} color={colors.text} />} />
          <Card.Content>
            <View style={styles.row}>
              <MaterialIcons name="access-time" size={20} color={colors.text} />
              <Paragraph style={styles.subText}>Thời lượng: {job.duration} giờ, {job.time_start} đến {job.time_end}</Paragraph>
            </View>
            <View style={styles.row}>
              <MaterialIcons name="note" size={20} color={colors.text} />
              <Paragraph style={styles.subText}>Ghi chú: {job.notes || 'Không có ghi chú'}</Paragraph>
            </View>
          </Card.Content>
        </Card>

        {/* Payment Method Section */}
        <Card style={styles.card}>
          <Card.Title title="Phương thức thanh toán" left={(props) => <MaterialIcons name="payment" size={24} color={colors.text} />} />
          <Card.Content>
            <View style={styles.row}>
              <FontAwesome5 name="money-bill-wave" size={20} color={colors.text} />
              <Paragraph style={styles.subText}>Tổng cộng: {job.price} VND</Paragraph>
            </View>
          </Card.Content>
        </Card>

        {/* Worker Info (if job is accepted, in_progress, or completed) */}
        {showWorkerInfo && (
          <Card style={styles.card}>
            <Card.Title
              title="Thông tin người giúp việc"
              left={(props) => <Avatar.Image size={48} source={{ uri: mockWorker.avatar }} />}
            />
            <Card.Content>
              <View style={styles.row}>
                <MaterialIcons name="person" size={20} color={colors.text} />
                <Paragraph style={styles.subText}>Tên: {mockWorker.name}</Paragraph>
              </View>
              <View style={styles.row}>
                <MaterialIcons name="phone" size={20} color={colors.text} />
                <Paragraph style={styles.subText}>Số điện thoại: {mockWorker.phone}</Paragraph>
              </View>
              <View style={styles.row}>
                <MaterialIcons name="star" size={20} color={colors.text} />
                <Paragraph style={styles.subText}>Đánh giá: {mockWorker.rating} ⭐</Paragraph>
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Footer Section */}
        {job.status === 'completed' ? (
          <Button mode="contained" style={styles.rateButton} onPress={() => navigation.navigate('RatingScreen', { jobId: job._id })}>
            Đánh giá
          </Button>
        ) : (
          job.status !== 'in_progress' && (
            <View style={styles.footer}>
              <Button mode="outlined" style={styles.cancelButton} onPress={() => console.log('Cancel Job Pressed')}>
                Đổi thời gian / Hủy việc
              </Button>
            </View>
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
  footer: {
    padding: 16,
  },
  cancelButton: {
    borderColor: '#FF5252',
    borderWidth: 1,
    color: '#FF5252',
  },
  rateButton: {
    backgroundColor: '#FF8A00',
    marginTop: 16,
  },
});

export default JobDetail;
