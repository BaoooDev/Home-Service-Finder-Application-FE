import { API_URL } from '@env'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons' // Import icons from expo
import * as SecureStore from 'expo-secure-store'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { ActivityIndicator, Button, Card, Paragraph } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const EmployeeMessage = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(1)
  const [notifications, setNotications] = useState([])
  const [loading, setLoading] = useState(true)

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
        console.log(data)
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

    if (notifications.length === 0) {
      return (
        <View style={styles.noJobsContainer}>
          <Text style={styles.noJobsText}>
            {activeTab === 1 ? 'Hiện tại không có tin nhắn nào' : 'Hiện không có thông báo nào'}
          </Text>
        </View>
      )
    }

    return (
      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.service_type} subtitle={item.address} />
            <Card.Content>
              <div></div>
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
