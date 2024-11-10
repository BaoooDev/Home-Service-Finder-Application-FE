import { API_URL } from '@env'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons' // Import icons from expo
import * as SecureStore from 'expo-secure-store'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { ActivityIndicator, Button, Card, Paragraph } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const EmployeeHomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(1)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const token = await SecureStore.getItemAsync('authToken')
      if (!token) {
        throw new Error('Token not found. Please login again.')
      }

      const endpoint =
        activeTab === 1 ? `${API_URL}/worker_jobs?status=pending` : `${API_URL}/worker_jobs`

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        setJobs(data.results)
      } else {
        setJobs([])
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [activeTab])

  const handleReceiveJob = async (item) => {
    Alert.alert('Xác nhận hủy', 'Bạn chắc chắn muốn nhận công việc này?', [
      { text: 'Không', style: 'cancel' },
      {
        text: 'Có',
        onPress: async () => {
          try {
            const token = await SecureStore.getItemAsync('authToken')
            const response = await fetch(`${API_URL}/jobs/${item._id}/receive`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })

            const data = await response.json()

            if (response.ok) {
              fetchJobs()
            } else {
              console.error('Failed to cancel the job:', data.message)
            }
          } catch (error) {
            console.error('Error cancelling job:', error)
          }
        },
      },
    ])
  }

  const renderEmployeeJobDetail = (job) => {
    navigation.navigate('EmployeeJobDetail', { job })
  }

  const renderContent = () => {
    if (loading) {
      return (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <ActivityIndicator animating={true} color="#ff8a00" />
        </View>
      )
    }

    if (jobs.length === 0) {
      return (
        <View style={styles.noJobsContainer}>
          <Text style={styles.noJobsText}>
            {activeTab === 1 ? 'Không có việc mới.' : 'Không có việc đã nhận.'}
          </Text>
        </View>
      )
    }

    return (
      <FlatList
        data={jobs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.service.name} subtitle={item.address} />
            <Card.Content>
              <View style={styles.row}>
                <MaterialIcons name="date-range" size={20} color="#666" />
                <Paragraph style={styles.paragraphText}>
                  Ngày: {new Date(item.scheduled_time).toLocaleDateString()}
                </Paragraph>
              </View>

              <View style={styles.row}>
                <MaterialIcons name="access-time" size={20} color="#666" />
                <Paragraph style={styles.paragraphText}>
                  Thời gian: {new Date(item.scheduled_time).toLocaleTimeString()}
                </Paragraph>
              </View>

              <View style={styles.row}>
                <FontAwesome5 name="money-bill-wave" size={20} color="#666" />
                <Paragraph style={styles.paragraphText}>Giá: {item.price} VND</Paragraph>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => renderEmployeeJobDetail(item)}
                style={styles.detailButton}
              >
                Xem chi tiết
              </Button>
              {item.status === 'pending' && (
                <Button
                  mode="contained"
                  onPress={() => handleReceiveJob(item)}
                  style={styles.ratingButton}
                >
                  Nhận công việc
                </Button>
              )}
            </Card.Actions>
          </Card>
        )}
        contentContainerStyle={{ marginTop: 8 }}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hoạt động</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 1 && styles.activeTab]}
          onPress={() => setActiveTab(1)}
        >
          <Text style={[styles.tabText, activeTab === 1 && styles.activeTabText]}>VIỆC MỚI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 2 && styles.activeTab]}
          onPress={() => setActiveTab(2)}
        >
          <Text style={[styles.tabText, activeTab === 2 && styles.activeTabText]}>ĐÃ NHẬN</Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </SafeAreaView>
  )
}

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
    margin: 16,
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
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#FF5252',
  },
  ratingButton: {
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
})

export default EmployeeHomeScreen
