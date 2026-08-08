import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Get phone screen dimensions
const { width, height } = Dimensions.get('window');

// Style configurations based on the selected role
const roleConfig = {
  citizen: { label: 'Citizen Portal', color: '#5C1A1A' },
  lawyer: { label: 'Lawyer Portal', color: '#0F2744' },
  ngo: { label: 'NGO / Media Portal', color: '#1B4332' },
  admin: { label: 'Admin Panel', color: '#1A0533' },
};

export default function LoginScreen() {
  const { role } = useLocalSearchParams(); // Reads the selected role parameter
  const router = useRouter(); // Navigation helper
  
  // ── FORM STATES ──
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Extra signup fields
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [barCouncilNumber, setBarCouncilNumber] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');

  // Default to citizen configuration if role parameter is missing
  const config = roleConfig[role] || roleConfig.citizen;

  // Handle Login & Signup verification
  const handleSubmit = () => {
    if (activeTab === 'login') {
      // --- LOGIN SUBMISSION ---
      // Checks if email or password are empty
      if (email.trim() === '' || password.trim() === '') {
        alert("Please enter both your email address and password to log in.");
        return;
      }
      
      // Navigate to the respective dashboard
      if (role === 'admin') router.replace('/(Admin)');
      else if (role === 'lawyer') router.replace('/(lawyer)/LawyerHome');
      else if (role === 'citizen') router.replace('/(citizen)/CitizenHome');
      else if (role === 'ngo') router.replace('/(ngo)/NGOHome');

    } else {
      // --- SIGNUP SUBMISSION ---
      if (role === 'lawyer') {
        // Lawyer Signup: requires all 7 fields
        if (
          fullName.trim() === '' ||
          email.trim() === '' ||
          phoneNumber.trim() === '' ||
          barCouncilNumber.trim() === '' ||
          experienceYears.trim() === '' ||
          officeAddress.trim() === '' ||
          password.trim() === ''
        ) {
          alert("Please fill in all the registration fields and upload your license details.");
          return;
        }
        
        // Success: Redirect lawyer to the Verification Pending screen
        alert("Registration submitted successfully!");
        router.replace('/(lawyer)/VerificationPending');

      } else {
        // Citizen / NGO / Admin Signup: requires Name, Email, Password
        if (fullName.trim() === '' || email.trim() === '' || password.trim() === '') {
          alert("Please enter your name, email, and password to sign up.");
          return;
        }

        alert("Account created successfully!");
        // Go straight to dashboard since they don't need Bar Council verification
        if (role === 'admin') router.replace('/(Admin)');
        else if (role === 'citizen') router.replace('/(citizen)/CitizenHome');
        else if (role === 'ngo') router.replace('/(ngo)/NGOHome');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        {/* Background Image and Gradient */}
        <Image
          source={require('../assets/images/login-bg.jpeg')}
          style={styles.bgImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(20,5,5,0.15)', 'rgba(20,5,5,0.5)', 'rgba(20,5,5,0.92)', '#140505']}
          style={styles.gradient}
        />

        {/* Top Section: Back Button and Logo */}
        <View style={styles.topSection}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Barq-e-Insaf</Text>
          <Text style={styles.portalName}>{config.label}</Text>
        </View>

        {/* Bottom Form Section */}
        <View style={styles.formPanel}>
          {/* Tabs for Login / Sign Up */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'login' && styles.tabActive]}
              onPress={() => setActiveTab('login')}
            >
              <Text style={[styles.tabText, activeTab === 'login' && styles.tabTextActive]}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'signup' && styles.tabActive]}
              onPress={() => setActiveTab('signup')}
            >
              <Text style={[styles.tabText, activeTab === 'signup' && styles.tabTextActive]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields container - Scrollable because Sign Up has many fields */}
          <ScrollView 
            style={styles.formScroll} 
            contentContainerStyle={styles.formScrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            
            {/* 1. Name Field (Shown ONLY on Signup) */}
            {activeTab === 'signup' && (
              <View>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Adv. Ahmed Khan"
                  placeholderTextColor="#aaa"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            )}

            {/* 2. Email Field (Always shown on both Login and Signup) */}
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* 3. Lawyer Fields (Shown ONLY on Sign Up AND if role is 'lawyer') */}
            {activeTab === 'signup' && role === 'lawyer' && (
              <View>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="+92 300 1234567"
                  placeholderTextColor="#aaa"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />

                <Text style={styles.inputLabel}>Sindh Bar Council Registration No.</Text>
                <TextInput
                  style={styles.input}
                  placeholder="SBC-12345-Karachi"
                  placeholderTextColor="#aaa"
                  value={barCouncilNumber}
                  onChangeText={setBarCouncilNumber}
                  autoCapitalize="characters"
                />

                <Text style={styles.inputLabel}>Years of Experience</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 5"
                  placeholderTextColor="#aaa"
                  value={experienceYears}
                  onChangeText={setExperienceYears}
                  keyboardType="numeric"
                />

                <Text style={styles.inputLabel}>Office Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Chamber 402, High Court, Karachi"
                  placeholderTextColor="#aaa"
                  value={officeAddress}
                  onChangeText={setOfficeAddress}
                />
              </View>
            )}

            {/* 4. Password Field (Always shown on both Login and Signup) */}
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Forgot password link (Shown only on Login) */}
            {activeTab === 'login' && (
              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.loginBtn, { backgroundColor: config.color }]}
              activeOpacity={0.85}
              onPress={handleSubmit}
            >
              <Text style={styles.loginBtnText}>
                {activeTab === 'login' ? 'LOGIN' : 'CREATE ACCOUNT'}
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// Styling definitions
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#140505' },
  bgImage: { position: 'absolute', width: width, height: height * 0.40, top: 0 },
  gradient: { position: 'absolute', width: width, height: height },
  topSection: { alignItems: 'center', paddingTop: 45, paddingBottom: 15, height: height * 0.32, justifyContent: 'center' },
  backBtn: { position: 'absolute', top: 48, left: 24 },
  backText: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '600' },
  logo: { width: 55, height: 55, marginBottom: 8 },
  appName: { fontSize: 20, fontWeight: '800', color: '#fff', letterSpacing: -0.3 },
  portalName: { fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2, fontWeight: '500', letterSpacing: 0.5 },
  formPanel: { backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, flex: 1 },
  tabRow: { flexDirection: 'row', marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  tabBtn: { flex: 1, paddingBottom: 12, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: '#5C1A1A' },
  tabText: { fontSize: 15, fontWeight: '600', color: '#bbb' },
  tabTextActive: { color: '#1a1a1a' },
  formScroll: { flex: 1 },
  formScrollContent: { paddingBottom: 32 },
  inputLabel: { fontSize: 10, fontWeight: '700', color: '#aaa', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4, marginTop: 12 },
  input: { borderBottomWidth: 1, borderBottomColor: '#e0e0e0', paddingVertical: 8, fontSize: 14, color: '#1a1a1a', marginBottom: 6 },
  forgotText: { color: '#5C1A1A', fontSize: 13, fontWeight: '600', marginTop: 10, textAlign: 'right' },
  loginBtn: { marginTop: 24, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  loginBtnText: { color: '#fff', fontSize: 13, fontWeight: '800', letterSpacing: 1.2 },
});