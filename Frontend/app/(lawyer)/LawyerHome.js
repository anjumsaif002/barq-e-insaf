import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f3ef' },

  header: {
    backgroundColor: '#0F2744',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { flexDirection: 'column' },
  brandName: { fontSize: 18, fontWeight: '800', color: '#fff', letterSpacing: -0.3 },
  brandSub: { fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 1, fontWeight: '500' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  notifBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  notifIcon: { fontSize: 16 },
  avatar: {
    width: 42, height: 42, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 14, fontWeight: '800', color: '#fff' },

  nameRow: { marginTop: 16 },
  lawyerName: { fontSize: 18, fontWeight: '800', color: '#fff' },
  stars: { color: '#FFD700', fontSize: 13, marginTop: 4, letterSpacing: 1 },
  verifiedPill: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  verifiedText: { fontSize: 10, fontWeight: '700', color: '#fff' },

  statsRow: { flexDirection: 'row', gap: 8, marginTop: 16 },
  statChip: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  statNum: { fontSize: 18, fontWeight: '800', color: '#fff' },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2, fontWeight: '500' },

  scroll: { flex: 1 },
  scrollContent: { padding: 14, paddingBottom: 100 },

  sectionLabel: {
    fontSize: 10, fontWeight: '700', letterSpacing: 0.08,
    color: '#aaa', textTransform: 'uppercase',
    marginTop: 18, marginBottom: 10,
  },
  sectionHeaderRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 18, marginBottom: 10,
  },
  seeAllText: { fontSize: 11, fontWeight: '700', color: '#0F2744' },

  reqCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 13,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ece9e4',
  },
  reqTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  reqName: { fontSize: 13, fontWeight: '700', color: '#1a1a1a' },
  reqDesc: { fontSize: 11, color: '#888' },
  badgeNew: {
    fontSize: 10, fontWeight: '700',
    backgroundColor: '#fef9c3', color: '#713f12',
    borderWidth: 1, borderColor: '#fde68a',
    paddingHorizontal: 9, paddingVertical: 3, borderRadius: 50,
  },

  pipeItem: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ece9e4',
  },
  pipeTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pipeLeft: { flexDirection: 'row', alignItems: 'center', gap: 7, flex: 1 },
  pipeDot: { width: 7, height: 7, borderRadius: 4, flexShrink: 0 },
  pipeTitle: { fontSize: 13, fontWeight: '600', color: '#1a1a1a', flexShrink: 1 },
  pipeSub: { fontSize: 11, color: '#999', marginTop: 4 },
  statusBadge: {
    fontSize: 10, fontWeight: '700',
    paddingHorizontal: 9, paddingVertical: 3, borderRadius: 50,
  },
  badgeBlue: { backgroundColor: '#dbeafe', color: '#1e40af' },
  badgeAmber: { backgroundColor: '#fef3c7', color: '#92400e' },
  badgeGreen: { backgroundColor: '#dcfce7', color: '#166534' },

  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  quickCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 14,
    width: (width - 42) / 2,
    borderWidth: 1, borderColor: '#ece9e4',
  },
  quickIcon: { fontSize: 22, marginBottom: 8 },
  quickTitle: { fontSize: 13, fontWeight: '700', color: '#1a1a1a' },
  quickSub: { fontSize: 11, color: '#999', marginTop: 2 },

  bottomNav: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ece9e4',
    flexDirection: 'row', height: 68, paddingBottom: 8,
  },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  navIcon: { fontSize: 20 },
  navLabel: { fontSize: 9, fontWeight: '600', color: '#bbb', letterSpacing: 0.2 },
  navLabelActive: { color: '#0F2744' },
  navActiveDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#0F2744', marginTop: 1 },
});