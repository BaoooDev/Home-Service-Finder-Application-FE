import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Avatar, Button, Card, Paragraph } from 'react-native-paper'

const JobDetail = ({ navigation, route }) => {
  const { job } = route.params // assuming job data is passed via route params
  const { colors } = useTheme() // Get theme colors

  const goBack = () => {
    navigation.navigate('EmployeeHomeScreen') // Make sure 'Home' matches your home screen's route name
  }

  // For demonstration, we'll assume that if the job is accepted, in_progress, or completed, we show the mock worker data
  const showWorkerInfo = ['accepted', 'in_progress', 'completed'].includes(job.status)

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Address Section */}
        <Card style={styles.card}>
          <Card.Title title={job.address} />
          <Card.Content>
            <View style={styles.row}>
              <MaterialIcons name="date-range" size={20} color={colors.text} />
              <Paragraph style={styles.subText}>
                Chủ nhật, {new Date(job.scheduled_time).toLocaleDateString()}
              </Paragraph>
            </View>
          </Card.Content>
        </Card>

        {/* Job Details Section */}
        <Card style={styles.card}>
          <Card.Title title="Chi tiết công việc" />
          <Card.Content>
            <View style={styles.row}>
              <MaterialIcons name="access-time" size={20} color={colors.text} />
              <Paragraph style={styles.subText}>Thời lượng: {job.duration_hours} giờ</Paragraph>
            </View>
            <View style={styles.row}>
              <MaterialIcons name="note" size={20} color={colors.text} />
              <Paragraph style={styles.subText}>
                Ghi chú: {job.notes || 'Không có ghi chú'}
              </Paragraph>
            </View>
          </Card.Content>
        </Card>

        {/* Payment Method Section */}
        <Card style={styles.card}>
          <Card.Title title="Phương thức thanh toán" />
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
              left={(props) => <Avatar.Image size={48} source={{ uri: 'https://via.placeholder.com/48' }} />}
            />
            <Card.Content>
              <View style={styles.row}>
                <MaterialIcons name="person" size={20} color={colors.text} />
                <Paragraph style={styles.subText}>Tên: {job.worker.full_name}</Paragraph>
              </View>
              <View style={styles.row}>
                <MaterialIcons name="phone" size={20} color={colors.text} />
                <Paragraph style={styles.subText}>Số điện thoại: {job.worker.phone_number ?? 'Chưa có'}</Paragraph>
              </View>
              <View style={styles.row}>
                <MaterialIcons name="star" size={20} color={colors.text} />
                <Paragraph style={styles.subText}>Đánh giá: {job.worker.worker_profile.rating} ⭐</Paragraph>
              </View>
            </Card.Content>
          </Card>
        )}

        <View>
          <Button mode="outlined" onPress={goBack}>
            Quay trở lại
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

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
  cancelButton: {
    borderColor: '#FF5252',
    borderWidth: 1,
    color: '#FF5252',
  },
  rateButton: {
    backgroundColor: '#FF8A00',
    marginTop: 16,
  },
})

export default JobDetail
