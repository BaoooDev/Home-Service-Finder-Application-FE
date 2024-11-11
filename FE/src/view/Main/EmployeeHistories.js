import { API_URL } from '@env'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { Card, ActivityIndicator, Paragraph } from 'react-native-paper'

export default function EmployeeHistories({ navigation }) {
  const [loading, setLoading] = useState(false)
  const [histories, setHistories] = useState([])

  const fetchJobHistories = async () => {
    setLoading(true)
    try {
      const token = await SecureStore.getItemAsync('authToken')
      if (!token) {
        throw new Error('Token not found. Please login again.')
      }

      const response = await fetch(`${API_URL}/jobs/history`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      if (response.ok) {
        setHistories(data.results)
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobHistories()
  }, [])

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
          <ActivityIndicator animating={true} color="#5A62D5" />
        </View>
      )
    }

    if (histories.length > 0) {
      return (
        <FlatList
          data={histories}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Title title={item.client.full_name} subtitle={item.service.name} />
              <Card.Content>
                <View style={styles.row}>
                  <MaterialIcons name="date-range" size={20} color="#666" />
                  <Paragraph style={styles.paragraphText}>
                    Ngày: {new Date(item.scheduled_time).toLocaleDateString()}
                  </Paragraph>
                </View>
                <View style={styles.row}>
                  <MaterialIcons name="timer" size={20} color="#666" />
                  <Paragraph style={styles.paragraphText}>
                    Thời gian làm việc: {item.duration_hours}
                  </Paragraph>
                </View>
                <View style={styles.row}>
                  <MaterialIcons name="schedule" size={20} color="#666" />
                  <Paragraph style={styles.paragraphText}>
                    Thời gian kết thúc: {item.completion_time}
                  </Paragraph>
                </View>
                <View style={styles.row}>
                  <MaterialIcons name="payments" size={20} color="#666" />
                  <Paragraph style={styles.paragraphText}>
                    Giá: {item.price}
                  </Paragraph>
                </View>
              </Card.Content>
            </Card>
          )}
          contentContainerStyle={{ marginTop: 8 }}
        />
      )
    } else {
      return (
        <View style={styles.noJobsContainer}>
          <Text style={styles.noJobsText}>Hiện không có công việc nào</Text>
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sử thu nhập</Text>
      </View>

      {renderContent()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B5ED9',
  },
  paragraphText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  dateSelector: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
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
  dateText: {
    fontSize: 16,
  },
  cardImage: {
    width: 60,
    height: 60,
  },
  card: {
    marginBottom: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ratingsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  ratingScore: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  ratingTotal: {
    fontSize: 16,
    color: '#666',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  ratingCount: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  progress: {
    height: '100%',
    backgroundColor: '#6B5ED9',
    borderRadius: 4,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summarySubtitle: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  achievementsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  achievementsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFB74D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 12,
    textAlign: 'center',
  },
})
