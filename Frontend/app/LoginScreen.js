import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '../constants/api';

const { width, height } = Dimensions.get('window');

const roleConfig = {
  citizen: { label: 'Citizen Portal',     color: '#5C1A1A', topColor: '#7B2020' },
  lawyer:  { label: 'Lawyer Portal',      color: '#0F2744', topColor: '#1A3A5C' },
  ngo:     { label: 'NGO / Media Portal', color: '#1B4332', topColor: '#245C42' },
  admin:   { label: 'Admin Panel',        color: '#1A0533', topColor: '#2D0D52' },
};

export default function LoginScreen() {
  const { role } = useLocalSearchParams();
  const router = useRouter();
  const config = roleConfig[role] || roleConfig.citizen;

  const [activeTab, setActiveTab]   = useState('login');
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [name, setName]             = useState('');
  const [phone, setPhone]           = useState('');
  const [district, setDistrict]     = useState('');
  const [sbcNumber, setSbcNumber]   = useState('');
  const [specialty, setSpecialty]   = useState('');
  const [loading, setLoading]       = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    try {
      setLoading(true);
      const res = await api.post('/auth/login', { email, password });
      const user = res.data;

      // Check role matches selected portal
      if (user.role !== role) {
        Alert.alert('Wrong Portal', `This account is a ${user.role} account. Please go back and select the correct portal.`);
        return;
      }

      // Navigate based on role
      if (user.role === 'citizen') router.replace('/(citizen)/CitizenHome');
      if (user.role === 'lawyer')  router.replace('/(lawyer)/LawyerHome');
      if (user.role === 'admin')   router.replace('/AdminHome');
      if (user.role === 'ngo')     router.replace('/(ngo)/NGOHome');

    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed. Check your credentials.';
      Alert.alert('Login Failed', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Name, email and password are required');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    if (role === 'lawyer' && (!sbcNumber || !specialty)) {
      Alert.alert('Error', 'SBC number and specialty are required for lawyers');
      return;
    }
    try {
      setLoading(true);
      const body = { name, email, password, role, phone, district };
      if (role === 'lawyer') {
        body.sbcNumber = sbcNumber;
        body.specialty = specialty;
      }
      const res = await api.post('/auth/register', body);
      const user = res.data;

      Alert.alert('Success', 'Account created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            if (user.role === 'citizen') router.replace('/(citizen)/CitizenHome');
            if (user.role === 'lawyer')  router.replace('/(lawyer)/LawyerHome');
            if (user.role === 'admin')   router.replace('/AdminHome');
          },
        },
      ]);
    } catch (error) {
      const msg = error.response?.data?.message || 'Signup failed. Try again.';
      Alert.alert('Signup Failed', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={[config.topColor, config.color, '#0d0d0d']}
          style={styles.topGradient}
        />
        <View style={styles.circle1} />
        <View style={styles.circle2} />

        {/* TOP SECTION */}
        <View style={styles.topSection}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>⚡</Text>
          </View>
          <Text style={styles.appName}>Barq-e-Insaf</Text>
          <Text style={styles.portalName}>{config.label}</Text>
        </View>

        {/* FORM */}
        <ScrollView
          contentContainerStyle={styles.formWrapper}
          style={styles.formScroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* TABS */}
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

          {/* SIGNUP EXTRA FIELDS */}
          {activeTab === 'signup' && (
            <>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your full name"
                placeholderTextColor="#bbb"
                value={name}
                onChangeText={setName}
              />
              <Text style={styles.inputLabel}>Phone</Text>
              <TextInput
                style={styles.input}
                placeholder="03001234567"
                placeholderTextColor="#bbb"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <Text style={styles.inputLabel}>District</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Karachi, Hyderabad"
                placeholderTextColor="#bbb"
                value={district}
                onChangeText={setDistrict}
              />
              {role === 'lawyer' && (
                <>
                  <Text style={styles.inputLabel}>SBC Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. SBC-4421"
                    placeholderTextColor="#bbb"
                    value={sbcNumber}
                    onChangeText={setSbcNumber}
                  />
                  <Text style={styles.inputLabel}>Specialty</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Property / Family / Civil / Inheritance"
                    placeholderTextColor="#bbb"
                    value={specialty}
                    onChangeText={setSpecialty}
                  />
                </>
              )}
            </>
          )}

          {/* COMMON FIELDS */}
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor="#bbb"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#bbb"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {activeTab === 'login' && (
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          )}

          {/* SUBMIT BUTTON */}
          <TouchableOpacity
            style={[styles.loginBtn, { backgroundColor: config.color }]}
            activeOpacity={0.85}
            onPress={activeTab === 'login' ? handleLogin : handleSignup}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.loginBtnText}>
                  {activeTab === 'login' ? 'LOGIN' : 'CREATE ACCOUNT'}
                </Text>
            }
          </TouchableOpacity>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#140505',
  },
  topGradient: {
    position: 'absolute',
    width: width,
    height: height * 0.52,
    top: 0,
  },
  circle1: {
    position: 'absolute',
    width: 300, height: 300, borderRadius: 150,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    top: -80, right: -80,
  },
  circle2: {
    position: 'absolute',
    width: 200, height: 200, borderRadius: 100,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
    top: 40, left: -60,
  },
  topSection: {
    alignItems: 'center',
    paddingTop: 64,
    paddingBottom: 24,
    height: height * 0.38,
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 52, left: 24,
  },
  backText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14, fontWeight: '600',
  },
  logoCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 14,
  },
  logoEmoji: { fontSize: 30 },
  appName: {
    fontSize: 22, fontWeight: '800', color: '#fff', letterSpacing: -0.3,
  },
  portalName: {
    fontSize: 12, color: 'rgba(255,255,255,0.5)',
    marginTop: 4, fontWeight: '500', letterSpacing: 0.5,
  },
  formScroll: {
    flex: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#fff',
  },
  formWrapper: {
    padding: 28,
    paddingBottom: 48,
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0ece8',
  },
  tabBtn: {
    flex: 1, paddingBottom: 12, alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#5C1A1A',
  },
  tabText: {
    fontSize: 15, fontWeight: '600', color: '#ccc',
  },
  tabTextActive: {
    color: '#1a1a1a',
  },
  inputLabel: {
    fontSize: 11, fontWeight: '700', color: '#aaa',
    letterSpacing: 0.5, textTransform: 'uppercase',
    marginBottom: 6, marginTop: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#e8e4e0',
    paddingVertical: 10,
    fontSize: 14, color: '#1a1a1a',
  },
  forgotText: {
    color: '#5C1A1A', fontSize: 13, fontWeight: '600',
    marginTop: 14, textAlign: 'right',
  },
  loginBtn: {
    marginTop: 28, borderRadius: 14,
    paddingVertical: 16, alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 8,
    elevation: 4,
  },
  loginBtnText: {
    color: '#fff', fontSize: 14,
    fontWeight: '800', letterSpacing: 1.5,
  },
});