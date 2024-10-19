import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Icon, Text, Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const Success = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Card containerStyle={styles.card}>
        {/* Checkmark Icon */}
        <Icon
          name="check-circle"
          type="feather"
          color="#00c853"
          size={100}
          containerStyle={styles.iconContainer}
        />

        {/* Success Message */}
        <Text h4 style={styles.successMessage}>
          Đăng việc thành công
        </Text>
        <Text style={styles.subMessage}>
          Bạn đã đăng việc thành công, bạn có thể kiểm tra công việc ở trang hoạt động
        </Text>

        {/* Job Tracking Button */}
        <Button
          title="Theo dõi công việc"
          buttonStyle={styles.trackButton}
          onPress={() => navigation.navigate('Activity')}
        />

        {/* Return Home Button */}
        <Button
          title="Quay về trang chủ"
          type="outline"
          buttonStyle={styles.homeButton}
          titleStyle={styles.homeButtonText}
          onPress={() => navigation.navigate('Home')}
        />
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
  },
  iconContainer: {
    marginBottom: 20,
  },
  successMessage: {
    color: '#00c853',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subMessage: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  trackButton: {
    backgroundColor: '#00c853',
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 10,
    width: '100%',
  },
  homeButton: {
    borderColor: '#00c853',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
  },
  homeButtonText: {
    color: '#00c853',
    fontWeight: 'bold',
  },
});

export default Success;
