import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import { ActivityIndicator } from 'react-native-paper'
import * as SecureStore from 'expo-secure-store'
import React, { useState, useEffect } from 'react'
import { API_URL } from '@env'

export default function EmployeeReport({ navigation }) {
  const [loading, setLoading] = useState(false)
  const [dashboard, setDashboard] = useState()

  const getDashboard = async () => {
    setLoading(true)
    try {
      const token = await SecureStore.getItemAsync('authToken')
      if (!token) {
        throw new Error('Token not found. Please login again.')
      }

      const response = await fetch(`${API_URL}/jobs/dashboard`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      if (response.ok) {
        setDashboard(data)
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDashboard()
  }, [])

  return !loading ? (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Báo cáo tháng</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Date Selector */}
          <TouchableOpacity style={styles.dateSelector}>
            <Text style={styles.dateText}>
              {moment().startOf('month').format('DD/MM/YYYY')} -{' '}
              {moment().endOf('month').format('DD/MM/YYYY')}
            </Text>
          </TouchableOpacity>

          {/* Metrics */}
          <View style={styles.metricsContainer}>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Công việc hoàn thành</Text>
              <Text style={styles.metricValue}>{dashboard?.current_month_completed_jobs}/5</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Thu nhập tháng này</Text>
              <Text style={styles.metricValue}>{dashboard?.month_income}đ</Text>
            </View>
          </View>

          {/* Ratings */}
          <View style={styles.ratingsContainer}>
            <Text style={styles.ratingCount}>
              {dashboard?.good_jobs + dashboard?.average_jobs} đánh giá
            </Text>

            {dashboard?.ratings && Object.entries(dashboard.ratings).map(([ratingValue, ratingCount]) => (
              <View key={ratingValue} style={styles.ratingBar}>
                <Text>{ratingValue} ⭐</Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progress,
                      {
                        width: `${
                          (ratingCount /
                            Object.values(dashboard?.ratings).reduce((sum, val) => sum + val, 0)) *
                          100
                        }%`,
                      },
                    ]}
                  />
                </View>
                <Text>
                  {Math.round(
                    (ratingCount /
                      Object.values(dashboard?.ratings).reduce((sum, val) => sum + val, 0)) *
                      100
                  )}
                  %
                </Text>
              </View>
            ))}
          </View>

          {/* Rating Summary */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>Tốt</Text>
              <Text style={styles.summarySubtitle}>5 ⭐</Text>
              <Text style={styles.summaryValue}>{dashboard?.good_jobs}</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>Trung bình</Text>
              <Text style={styles.summarySubtitle}>1~4 ⭐</Text>
              <Text style={styles.summaryValue}>{dashboard?.average_jobs}</Text>
            </View>
          </View>

          {/* Achievements */}
          <View style={styles.achievementsContainer}>
            <Text style={styles.achievementsTitle}>Thành tích</Text>
            <View style={styles.achievementsGrid}>
              {['Đúng giờ', 'Sạch sẽ', 'Vui vẻ', 'Thân thiện'].map((achievement) => (
                <View key={achievement} style={styles.achievementItem}>
                  <View style={styles.achievementIcon}>
                    <Image
                      source={{ uri: 'https://picsum.photos/200/300' }}
                      style={styles.cardImage}
                    />
                  </View>
                  <Text style={styles.achievementText}>{achievement}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B5ED9',
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
  dateText: {
    fontSize: 16,
  },
  cardImage: {
    width: 60,
    height: 60,
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
