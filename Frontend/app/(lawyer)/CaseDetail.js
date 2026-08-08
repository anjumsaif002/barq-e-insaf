import React, { useState } from 'react';
// Modal: A dialog box popup overlaying the current screen
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

export default function CaseDetail() {
  const router = useRouter();
  
  // State hook to toggle biometric signature popup visibility (true=visible / false=hidden)
  const [modalVisible, setModalVisible] = useState(false);
  const [agreed, setAgreed] = useState(false); // True if signed
  const [signing, setSigning] = useState(false); // Controls fingerprint validation delay state

  // Simulate scanning fingerprint
  const startBiometricSign = () => {
    setSigning(true);
    // Simulates a 2-second fingerprint scanning lag
    setTimeout(() => {
      setSigning(false);
      setModalVisible(false); // Closes popup
      setAgreed(true); // Changes state to Signed
      alert("Agreement Biometrically Signed Successfully!");
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0F2744" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Case File: Raza vs. Malik</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        
        {/* Client Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Client Information</Text>
          <Text style={styles.detailText}>👤 Ahmed Raza</Text>
          <Text style={styles.detailText}>📍 Hyderabad, Sindh</Text>
          <Text style={styles.detailText}>📞 +92 333 1234567</Text>
        </View>

        {/* Case Evidence Vault */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Evidence Vault (Client Uploads)</Text>
          
          <TouchableOpacity style={styles.evidenceRow} onPress={() => alert("Downloading: Land deed.pdf")}>
            <Text style={styles.docText}>📎 Land deed.pdf</Text>
            <Text style={styles.verifiedBadge}>Verified Timestamp</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.evidenceRow} onPress={() => alert("Downloading: Boundary wall photos.zip")}>
            <Text style={styles.docText}>📎 Boundary wall photos.zip</Text>
            <Text style={styles.verifiedBadge}>Verified Timestamp</Text>
          </TouchableOpacity>
        </View>

        {/* Digital Agreement Block */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Legal Representation Agreement</Text>
          
          {/* Conditional rendering: If signed, show success badge. Else, show "Sign" button */}
          {agreed ? (
            <View style={styles.signedPill}>
              <Text style={styles.signedText}>✓ Biometrically Signed (SBC-Secured)</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.signBtn} onPress={() => setModalVisible(true)}>
              <Text style={styles.signBtnText}>BIOMETRIC SIGN AGREEMENT</Text>
            </TouchableOpacity>
          )}
        </View>

      </ScrollView>

      {/* Biometric Verification Simulation Modal (Popup) */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Biometric Handshake Authentication</Text>
            <Text style={styles.modalSub}>Place your finger on scanner to attach your digital signature</Text>
            
            {/* Simulated Scanner scanner touch area */}
            <TouchableOpacity style={styles.fingerprintArea} onPress={startBiometricSign}>
              <Text style={styles.fingerprintIcon}>👆</Text>
              <Text style={styles.fingerprintText}>
                {signing ? "Verifying SBC Credentials..." : "Tap to Scan Fingerprint"}
              </Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  scrollContent: { padding: 20, gap: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    elevation: 3,
  },
  cardHeader: { fontSize: 15, fontWeight: '800', color: '#0F2744', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 8, marginBottom: 12 },
  detailText: { fontSize: 14, color: '#333', marginBottom: 8 },
  evidenceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: '#F9F8F6', borderRadius: 8, marginBottom: 8 },
  docText: { fontSize: 13, color: '#0F2744', fontWeight: '600' },
  verifiedBadge: { fontSize: 9, color: '#1B4332', backgroundColor: '#D8F3DC', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 4, fontWeight: '600' },
  signBtn: { backgroundColor: '#1A0533', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  signBtnText: { color: '#fff', fontSize: 13, fontWeight: '800', letterSpacing: 0.5 },
  signedPill: { backgroundColor: '#D8F3DC', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  signedText: { color: '#1B4332', fontSize: 14, fontWeight: '700' },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' }, // Creates a dark translucent background
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 30, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#0F2744', marginBottom: 8 },
  modalSub: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 24, paddingHorizontal: 10 },
  fingerprintArea: { 
    width: 140, 
    height: 140, 
    borderRadius: 70, 
    backgroundColor: '#F5F3EF', 
    borderStyle: 'dashed', 
    borderWidth: 2, 
    borderColor: '#0F2744', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8, 
    marginBottom: 24 
  },
  fingerprintIcon: { fontSize: 44 },
  fingerprintText: { fontSize: 10, color: '#0F2744', fontWeight: '700' },
  cancelBtn: { paddingVertical: 10 },
  cancelText: { color: '#ef4444', fontSize: 14, fontWeight: '700' },
});