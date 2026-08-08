import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

const hearings = [
  { time: '09:30 AM', title: 'Raza vs. Malik — Property Dispute', court: 'Civil Court 4, Karachi', status: 'Today' },
  { time: '11:45 AM', title: 'Khan Divorce Proceedings', court: 'Family Court 2, Karachi', status: 'Today' },
  { time: '10:00 AM (Tomorrow)', title: 'Memon Inheritance Case', court: 'District Court, Sukkur', status: 'Upcoming' },
];

export default function Schedule() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0F2744" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Court Schedule</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Scheduled Hearings</Text>
        {hearings.map((h, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.timeText}>⏰ {h.time}</Text>
              <Text style={[styles.statusBadge, h.status === 'Today' ? styles.badgeToday : styles.badgeNext]}>{h.status}</Text>
            </View>
            <Text style={styles.titleText}>{h.title}</Text>
            <Text style={styles.courtText}>🏛️ {h.court}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F2744' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 18 },
  backBtn: { marginRight: 16 },
  backText: { color: '#fff', fontSize: 24, fontWeight: '700' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  scroll: { flex: 1, backgroundColor: '#F5F3EF' },
  content: { padding: 20, gap: 14 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#0F2744', marginBottom: 4 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#ece9e4', elevation: 2 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  timeText: { fontSize: 13, fontWeight: '800', color: '#3b82f6' },
  statusBadge: { fontSize: 10, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 50 },
  badgeToday: { backgroundColor: '#fef3c7', color: '#92400e' },
  badgeNext: { backgroundColor: '#dbeafe', color: '#1e40af' },
  titleText: { fontSize: 15, fontWeight: '800', color: '#1a1a1a', marginBottom: 4 },
  courtText: { fontSize: 12, color: '#666' },
});