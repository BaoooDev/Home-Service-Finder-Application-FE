import { API_URL } from '@env'
import * as SecureStore from 'expo-secure-store'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator, Avatar, Card } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const EmployeeMessage = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(1)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchNotifications = async () => {
    setLoading(true)
    try {
      const token = await SecureStore.getItemAsync('authToken')
      if (!token) {
        throw new Error('Token not found. Please login again.')
      }

      const response = await fetch(`${API_URL}/notification`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        setNotifications(data.results)
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === 2) {
      fetchNotifications()
    }
  }, [activeTab])

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

    if (activeTab === 2) {
      if (notifications.length > 0) {
        return (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Card style={styles.card}>
                <Card.Title
                  title={item.sender.full_name}
                  subtitle={item.message}
                  left={(props) => (
                    <Avatar.Image size={48} source={{ uri: 'https://via.placeholder.com/48' }} />
                  )}
                />
              </Card>
            )}
            contentContainerStyle={{ marginTop: 8 }}
          />
        )
      } else {
        return (
          <View style={styles.noJobsContainer}>
            <Text style={styles.noJobsText}>Hiện không có thông báo nào</Text>
          </View>
        )
      }
    } else {
      return (
        <View style={styles.noJobsContainer}>
          <Text style={styles.noJobsText}>Hiện không có tin nhắn nào</Text>
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hộp thư</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 1 && styles.activeTab]}
          onPress={() => setActiveTab(1)}
        >
          <Text style={[styles.tabText, activeTab === 1 && styles.activeTabText]}>CHAT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 2 && styles.activeTab]}
          onPress={() => setActiveTab(2)}
        >
          <Text style={[styles.tabText, activeTab === 2 && styles.activeTabText]}>THÔNG BÁO</Text>
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

export default EmployeeMessage
