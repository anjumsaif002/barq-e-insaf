import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

// Floating sparkles
const sparkles = [
  { top: '10%', left: '8%' },
  { top: '22%', left: '84%' },
  { top: '34%', left: '14%' },
  { top: '15%', left: '68%' },
];

export default function StartScreen() {
  const router = useRouter();

  // Floating & Pulse Animations
  const floatAnim = useRef(new Animated.Value(0)).current;
  const sparklePulse = useRef(new Animated.Value(0.4)).current;
  const pulseBtn = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Smooth floating animation for the hero image card
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 2. Shimmering sparkle particles
    Animated.loop(
      Animated.sequence([
        Animated.timing(sparklePulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(sparklePulse, { toValue: 0.3, duration: 1200, useNativeDriver: true }),
      ])
    ).start();

    // 3. GET STARTED button pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseBtn, { toValue: 1.04, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseBtn, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F2744" />

      {/* Dark Luxury Gradient */}
      <LinearGradient
        colors={['#0F2744', '#140505', '#080202']}
        style={styles.gradient}
      />

      {/* 1. FLOATING AMBIENT SPARKLES */}
      {sparkles.map((sp, index) => (
        <Animated.View
          key={index}
          style={[
            styles.sparkleParticle,
            {
              top: sp.top,
              left: sp.left,
              opacity: sparklePulse,
              transform: [{ scale: sparklePulse }],
            },
          ]}
        >
          <Text style={styles.sparkleText}>✨</Text>
        </Animated.View>
      ))}
            {/* 2. TOP HERO ANIMATED ILLUSTRATION IMAGE (NO BOX OR BORDER) */}
      <View style={styles.heroCenterArea}>
        <Animated.View style={[styles.heroImageWrapper, { transform: [{ translateY: floatAnim }] }]}>
          <Image
            source={require('../assets/images/scbg.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      {/* 3. BOTTOM CARD WITH URDU POETRY & GET STARTED */}
      <View style={styles.bottomCard}>
        
        {/* Project Tag Pill */}
        <View style={styles.tagPill}>
          <Text style={styles.tagPillText}>BARQ-E-INSAF</Text>
        </View>

        {/* Title & Sub-Name */}
        <Text style={styles.mainTitle}>Barq-e-Insaf</Text>
        <Text style={styles.tagSubtext}>Smart decisions for legal matters</Text>

        {/* URDU POETRY BOX */}
        <View style={styles.poetryBox}>
          <Text style={styles.urduPoetryLine}>اندھیری رات میں امید کا اک دیپ جلے،</Text>
          <Text style={styles.urduPoetryLine}>وکیلِ حق جو ملے تو ہر مسافر چلے۔</Text>
        </View>

        {/* PULSING GET STARTED BUTTON */}
        <Animated.View style={{ transform: [{ scale: pulseBtn }], width: '100%', marginTop: 6 }}>
          <TouchableOpacity
            style={styles.startBtn}
            activeOpacity={0.88}
            onPress={() => router.push('/RoleSelectScreen')}
          >
            <LinearGradient
              colors={['#3b82f6', '#1d4ed8']}
              style={styles.btnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.startBtnText}>GET STARTED ➔</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Secondary Showcase Link */}
        <TouchableOpacity
          style={styles.showcaseBtn}
          onPress={() => router.push('/LandingScreen')}
        >
          <Text style={styles.showcaseText}>Explore Project Showcase</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F2744' },
  gradient: { position: 'absolute', width: width, height: height },
  sparkleParticle: { position: 'absolute', zIndex: 5 },
  sparkleText: { fontSize: 20 },
  heroCenterArea: {
    height: height * 0.40,
    justify: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  heroImageWrapper: {
    width: width * 0.94,
    height: height * 0.35,
    justify: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  bottomCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    padding: 24,
    alignItems: 'center',
    justify: 'space-between',
    elevation: 10,
  },
  tagPill: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 50,
  },
  tagPillText: { color: '#1e40af', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  mainTitle: { fontSize: 28, fontWeight: '900', color: '#0F2744', letterSpacing: -0.5, marginTop: 2 },
  tagSubtext: { fontSize: 13, color: '#3b82f6', fontWeight: '700', marginTop: 2 },
  poetryBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 18,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginVertical: 8,
  },
  urduPoetryLine: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F2744',
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: 0.2,
  },
  startBtn: { width: '100%', borderRadius: 16, overflow: 'hidden' },
  btnGradient: { paddingVertical: 18, alignItems: 'center', borderRadius: 16 },
  startBtnText: { color: '#fff', fontSize: 16, fontWeight: '900', letterSpacing: 1.2 },
  showcaseBtn: { paddingVertical: 4 },
  showcaseText: { color: '#888', fontSize: 12, fontWeight: '700' },
});