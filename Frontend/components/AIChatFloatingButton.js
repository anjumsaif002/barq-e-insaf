import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  PanResponder,
  Animated,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { usePathname } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function AIChatFloatingButton() {
  const pathname = usePathname();

  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: 'السلام علیکم! I am your Barq-e-Insaf AI Legal Assistant. Ask me any Pakistan legal law question in Urdu, Sindhi, or English!',
    },
  ]);

  // DRAGGABLE PAN RESPONDER
  const pan = useRef(new Animated.ValueXY({ x: SCREEN_WIDTH - 84, y: SCREEN_HEIGHT - 170 })).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  // 🛑 HIDE FLOATING BUTTON ON SPLASH & STARTUP SCREENS
  const hiddenRoutes = ['/', '/SplashScreen', '/StartScreen', '/OnboardingScreen'];
  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  const sendMessage = async () => {
    if (inputText.trim() === '' || loading) return;

    const userQuery = inputText.trim();
    const userMsg = { id: Date.now().toString(), sender: 'user', text: userQuery };
    
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userQuery }),
      });

      const data = await response.json();
      const aiResponseText = data.response || data.answer || 'Thank you for your legal query. For formal court filings, connect with a verified advocate on Barq-e-Insaf.';

      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponseText }]);
    } catch (error) {
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: 'Connecting to Barq-e-Insaf AI server... Please ensure run_chatbot.bat is running locally.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ⚡ ULTRA-ATTRACTIVE DRAGGABLE FLOATING BUTTON ⚡ */}
      <Animated.View
        style={[styles.draggableFab, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity style={styles.fabBtn} activeOpacity={0.88} onPress={() => setModalVisible(true)}>
          <LinearGradient
            colors={['#3b82f6', '#1d4ed8', '#0F2744']}
            style={styles.fabGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Inner Glow Circle & Lightning Symbol */}
            <View style={styles.glowCircle}>
              <Text style={styles.fabIcon}>⚡</Text>
            </View>

            {/* AI Assistant Label Tag */}
            <View style={styles.aiTagPill}>
              <Text style={styles.aiTagText}>AI LEGAL</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* POPUP AI CHAT MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView style={styles.modalOverlay} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <SafeAreaView style={styles.modalCard}>
            
            {/* Header Bar */}
            <View style={styles.modalHeader}>
              <View style={styles.headerTitleRow}>
                <View style={styles.headerBadge}>
                  <Text style={styles.headerIcon}>⚡</Text>
                </View>
                <View>
                  <Text style={styles.headerTitle}>Barq-e-Insaf AI Assistant</Text>
                  <Text style={styles.headerSub}>Pakistan Penal Code & Legal Guidance</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Chat Messages */}
            <ScrollView style={styles.chatScroll} contentContainerStyle={styles.chatContent} showsVerticalScrollIndicator={false}>
              {messages.map((msg) => (
                <View key={msg.id} style={[styles.msgBubble, msg.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
                  <Text style={[styles.msgText, msg.sender === 'user' ? styles.userMsgText : styles.aiMsgText]}>{msg.text}</Text>
                </View>
              ))}
              {loading && (
                <View style={[styles.msgBubble, styles.aiBubble, styles.loadingRow]}>
                  <ActivityIndicator size="small" color="#3b82f6" />
                  <Text style={styles.loadingText}>Searching legal database & statutes...</Text>
                </View>
              )}
            </ScrollView>

            {/* Input Bar */}
            <View style={styles.inputBar}>
              <TextInput
                style={styles.textInput}
                placeholder="Type legal question (Urdu / English)..."
                placeholderTextColor="#94a3b8"
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity style={styles.sendBtn} onPress={sendMessage} disabled={loading}>
                <Text style={styles.sendBtnText}>➔</Text>
              </TouchableOpacity>
            </View>

          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  draggableFab: { position: 'absolute', top: 0, left: 0, zIndex: 9999, elevation: 12 },
  fabBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    elevation: 10,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 34,
    justify: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fbbf24',
    padding: 2,
  },
  glowCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justify: 'center',
    alignItems: 'center',
  },
  fabIcon: { fontSize: 24 },
  aiTagPill: {
    backgroundColor: '#fbbf24',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    marginTop: -4,
  },
  aiTagText: { color: '#0F2744', fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.65)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, height: SCREEN_HEIGHT * 0.84 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#0F2744', borderTopLeftRadius: 28, borderTopRightRadius: 28 },
  headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerBadge: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#3b82f6', justifyContent: 'center', alignItems: 'center' },
  headerIcon: { fontSize: 20 },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: '800' },
  headerSub: { color: '#fbbf24', fontSize: 11, fontWeight: '600', marginTop: 1 },
  closeBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255, 255, 255, 0.15)', justifyContent: 'center', alignItems: 'center' },
  closeBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  chatScroll: { flex: 1, backgroundColor: '#F8FAFC' },
  chatContent: { padding: 18, gap: 12 },
  msgBubble: { maxWidth: '84%', padding: 14, borderRadius: 18, marginBottom: 8 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#0F2744', borderBottomRightRadius: 4 },
  aiBubble: { alignSelf: 'flex-start', backgroundColor: '#fff', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: '#e2e8f0' },
  userMsgText: { color: '#fff', fontSize: 13, lineHeight: 19 },
  aiMsgText: { color: '#1e293b', fontSize: 13, lineHeight: 19 },
  loadingRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  loadingText: { color: '#64748b', fontSize: 12, fontStyle: 'italic' },
  inputBar: { flexDirection: 'row', alignItems: 'center', padding: 14, paddingHorizontal: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e2e8f0', gap: 10 },
  textInput: { flex: 1, backgroundColor: '#f1f5f9', borderRadius: 24, paddingHorizontal: 18, paddingVertical: 10, fontSize: 13, color: '#0f172a' },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#3b82f6', justifyContent: 'center', alignItems: 'center' },
  sendBtnText: { color: '#fff', fontSize: 18, fontWeight: '800' },
});