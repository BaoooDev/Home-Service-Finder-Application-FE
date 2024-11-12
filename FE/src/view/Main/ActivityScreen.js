import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, Chip, ActivityIndicator, Title, Paragraph } from 'react-native-paper';
import { API_URL } from '@env';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; // Import icons from expo
import * as SecureStore from "expo-secure-store";

const ActivityScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Chờ làm');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const serviceNames = {
    '64fdb1f1c912ef0012e23b49': 'Dọn dẹp nhà',
    '6730520722f42b6ef515c7b9': 'Vệ sinh máy giặt',
    '67316a9cac4d58ac2c65339f': 'Vệ sinh máy lạnh',
  };
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");
        if (!token) {
          throw new Error("Token not found. Please login again.");
        }

        const response = await fetch(`${API_URL}/jobs`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.jobs) {
          setJobs(data.jobs);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'Chờ làm' || activeTab === 'Lịch sử') {
      fetchJobs();
    }
  }, [activeTab]);

  const handleJobCancel = async (jobId, scheduledTime) => {
    const timeDiff = (new Date(scheduledTime) - new Date()) / (1000 * 60 * 60); // Difference in hours

    if (timeDiff < 12) {
      Alert.alert("Thông báo", "Không được hủy công việc đã có người nhận trước 12 tiếng theo lịch đã đặt.");
      return;
    }

    Alert.alert(
      "Xác nhận hủy",
      "Bạn chắc chắn muốn hủy công việc này?",
      [
        { text: "Không", style: "cancel" },
        {
          text: "Có", 
          onPress: async () => {
            try {
              const token = await SecureStore.getItemAsync("authToken");
              const response = await fetch(`${API_URL}/jobs/${jobId}/cancel`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
              });

              const data = await response.json();

              if (response.ok) {
                setJobs(jobs.filter(job => job._id !== jobId));
              } else {
                console.error('Failed to cancel the job:', data.message);
              }
            } catch (error) {
              console.error('Error cancelling job:', error);
            }
          }
        }
      ]
    );
  };

  const renderJobDetails = (job) => {
    navigation.navigate('JobDetails', { job });
  };

  const renderJobStatus = (status) => {
    switch (status) {
      case 'pending':
        return <Text style={styles.statusPending}>Đang chờ người khác nhận việc...</Text>;
      case 'accepted':
        return <Text style={styles.statusAccepted}>Đã có người nhận việc</Text>;
      case 'in_progress':
        return <Text style={styles.statusInProgress}>Đang dọn dẹp</Text>;
      case 'completed':
        return <Text style={styles.statusCompleted}>Công việc đã hoàn thành</Text>;
      case 'canceled':
        return <Text style={styles.statusCanceled}>Công việc đã bị hủy</Text>;
      default:
        return <Text style={styles.statusUnknown}>Trạng thái không xác định</Text>;
    }
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator animating={true} color="#ff8a00" />;
    }

    const filteredJobs = activeTab === 'Chờ làm'
      ? jobs.filter(job => job.status !== 'completed' && job.status !== 'canceled')
      : jobs.filter(job => job.status === 'completed' || job.status === 'canceled');

    if (filteredJobs.length === 0) {
      return (
        <View style={styles.noJobsContainer}>
          <Text style={styles.noJobsText}>
            {activeTab === 'Chờ làm' ? 'Không có công việc nào đang chờ làm.' : 'Không có công việc nào trong lịch sử.'}
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title  title={serviceNames[item.service] || 'Unknown Service'}titleStyle={{ fontSize: 20 }} right={() => <Chip>Mới đăng</Chip>} />
            <Card.Content>
              <Title>Đã đăng {new Date(item.createdAt).toLocaleDateString()} </Title>
              
              <View style={styles.row}>
                <MaterialIcons name="date-range" size={20} color="#666" />
                <Paragraph style={styles.paragraphText}>Ngày: {new Date(item.scheduled_time).toLocaleDateString()}</Paragraph>
              </View>

              <View style={styles.row}>
                <MaterialIcons name="access-time" size={20} color="#666" />
                <Paragraph style={styles.paragraphText}>Thời gian: {new Date(item.scheduled_time).toLocaleTimeString()} Trong {item.duration_hours} giờ</Paragraph>
              </View>

              <View style={styles.row}>
                <FontAwesome5 name="money-bill-wave" size={20} color="#666" />
                <Paragraph style={styles.paragraphText}>Giá: {item.price} VND</Paragraph>
              </View>

              <View style={styles.row}>
                <MaterialIcons name="location-on" size={20} color="#666" />
                <Paragraph style={styles.paragraphText}>Địa chỉ: {item.address}</Paragraph>
              </View>

              {renderJobStatus(item.status)}
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" onPress={() => renderJobDetails(item)} style={styles.detailButton}>
                Xem chi tiết
              </Button>
              { item.status === 'in_progress' || item.status === 'canceled' ||item.status === 'completed' ? null : (
                <Button mode="contained" onPress={() => handleJobCancel(item._id, item.scheduled_time)} style={styles.cancelButton}>
                  Hủy công việc
                </Button>
              )}
            </Card.Actions>
          </Card>
        )}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hoạt động</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Chờ làm' && styles.activeTab]}
          onPress={() => setActiveTab('Chờ làm')}
        >
          <Text style={[styles.tabText, activeTab === 'Chờ làm' && styles.activeTabText]}>Chờ làm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Lịch sử' && styles.activeTab]}
          onPress={() => setActiveTab('Lịch sử')}
        >
          <Text style={[styles.tabText, activeTab === 'Lịch sử' && styles.activeTabText]}>Lịch sử</Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: { fontSize: 24, fontWeight: 'bold' },

  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabItem: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#ff8a00',
  },
  tabText: { fontSize: 16, color: '#aaa' },
  activeTabText: { color: '#ff8a00', fontWeight: 'bold' },

  card: {
    marginBottom: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  paragraphText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  detailButton: {
    marginTop: 10,
    marginRight: 10,
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#FF5252',
  },
  ratingButton: {
    marginTop: 10,
    backgroundColor: '#FF8A00',
  },
  noJobsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  noJobsText: {
    fontSize: 16,
    marginBottom: 20,
  },
  statusPending: {
    color: '#FF8A00',
    fontWeight: 'bold',
    marginTop: 10,
  },
  statusAccepted: {
    color: '#FF8A00',
    fontWeight: 'bold',
    marginTop: 10,
  },
  statusInProgress: {
    color: '#FF8A00',
    fontWeight: 'bold',
    marginTop: 10,
  },
  statusCompleted: {
    color: '#FF8A00',
    fontWeight: 'bold',
    marginTop: 10,
  },
  statusCanceled: {
    color: '#FF8A00',
    fontWeight: 'bold',
    marginTop: 10,
  },
  statusUnknown: {
    color: '#FF8A00',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ActivityScreen;
