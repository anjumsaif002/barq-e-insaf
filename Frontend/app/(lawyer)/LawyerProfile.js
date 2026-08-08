import React, { useState } from 'react';
// ScrollView: allows user to scroll the form vertically
// TextInput: input field where users can type text (similar to <input type="text"> in web)
// Switch: visual toggler (similar to a checkbox switch in settings)
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Switch, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

export default function LawyerProfile() {
  const router = useRouter();
  
  // React Hooks (useState): local variables holding our form inputs. 
  // e.g. state variable "fee", and update function "setFee"
  const [fee, setFee] = useState('PKR 5,000 / Consultation');
  const [isAvailable, setIsAvailable] = useState(true); // Availability toggle (true/false)
  const [address, setAddress] = useState('Office 204, Gulsher Heights, Gulshan-e-Iqbal, Karachi');
  const [bio, setBio] = useState('Specialized in property registration, transfer disputes, and family inheritance distribution in Sindh High Court.');

  // Alert is triggered when they click Save
  const handleSave = () => {
    alert("Profile changes saved successfully!");
    router.back(); // Redirect back to previous screen
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0F2744" />
      
      {/* Custom Title Bar header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      {/* Main Form content is scrollable */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        
        {/* Availability Toggle card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <View>
              <Text style={styles.cardTitle}>Accepting New Clients</Text>
              <Text style={styles.cardSub}>Toggle whether clients can hire you</Text>
            </View>
            <Switch
              value={isAvailable} // Binds the switch state to isAvailable state variable
              onValueChange={setIsAvailable} // Updates the variable when user flips the switch
              trackColor={{ false: '#767577', true: '#1B4332' }}
              thumbColor={isAvailable ? '#4ade80' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* TextInput fields */}
        <Text style={styles.label}>Consultation Fee Structure</Text>
        <TextInput
          style={styles.input}
          value={fee}
          onChangeText={setFee} // Saves whatever user types into state variable 'fee'
          placeholder="e.g. PKR 5,000 / Hour"
        />

        <Text style={styles.label}>Office Address</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={address}
          onChangeText={setAddress}
          multiline // Allows multiple lines of text
          numberOfLines={3} // Initial height is 3 lines
        />

        <Text style={styles.label}>Professional Biography</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={4}
        />

        {/* Clickable Save button */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>SAVE CHANGES</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F2744' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  backBtn: { marginRight: 16 },
  backText: { color: '#fff', fontSize: 24, fontWeight: '700' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  scroll: { flex: 1, backgroundColor: '#F5F3EF' },
  content: { padding: 20, gap: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    elevation: 3,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  cardSub: { fontSize: 12, color: '#888', marginTop: 2 },
  label: { fontSize: 11, fontWeight: '700', color: '#aaa', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 10 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: { textAlignVertical: 'top' }, // Aligns text to the top-left in multiline input
  saveBtn: {
    backgroundColor: '#0F2744',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: { color: '#fff', fontSize: 14, fontWeight: '800', letterSpacing: 1 },
});