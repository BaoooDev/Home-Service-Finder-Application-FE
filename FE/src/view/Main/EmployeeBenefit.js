import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const EmployeeBenefitScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Phúc Lợi</Text>
      </View>


      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.cardImage} />
          <Text style={styles.cardTitle}>bReward</Text>
          <Text style={styles.cardDescription}>
            Nhận "vô vàn quà tặng" khi tích bPoint đổi quà cùng bRewards.
          </Text>
        </View>

        <View style={styles.card}>
          <Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.cardImage} />
          <Text style={styles.cardTitle}>Đào tạo</Text>
          <Text style={styles.cardDescription}>
            Cùng thăng hạng chất lượng với các khóa đào tạo của bTaskee nào!
          </Text>
        </View>

        <View style={styles.card}>
          <Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.cardImage} />
          <Text style={styles.cardTitle}>bCare</Text>
          <Text style={styles.cardDescription}>
            Tasker không thể thỏa thuận với rủi ro, vì vậy hãy để bCare hỗ trợ Tasker.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerText: { fontSize: 24, fontWeight: 'bold' },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
})

export default EmployeeBenefitScreen
