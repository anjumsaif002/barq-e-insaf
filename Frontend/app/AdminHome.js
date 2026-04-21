import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from './AdminHome.styles';

export default function AdminHome() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState('dashboard');

  const stats = [
    { label: 'Total Users',      value: '2,841', delta: '+142 this week', color: '#5C1A1A' },
    { label: 'Verified Lawyers', value: '217',   delta: '+12 pending',    color: '#0F2744' },
    { label: 'Active Cases',     value: '1,094', delta: '+88 this month', color: '#1B4332' },
    { label: 'Uptime',           value: '98.2%', delta: 'Last 30 days',   color: '#1A0533' },
  ];

  const verificationQueue = [
    { name: 'Ali Hassan',  sbc: '#8821', specialty: 'Property' },
    { name: 'Nadia Memon', sbc: '#9043', specialty: 'Family'   },
    { name: 'Tariq Shah',  sbc: '#7711', specialty: 'Civil'    },
  ];

  const flaggedItems = [
    { type: 'red',   title: 'Fake evidence upload detected',   detail: 'Case #1042 · User: xyz123 · 2h ago' },
    { type: 'amber', title: 'Lawyer reported by 3 users',      detail: 'Imran K. · 3 complaints · 1d ago'   },
    { type: 'amber', title: 'Biometric failure — 4 failed logins', detail: 'User: ab991 · 5h ago'          },
  ];

  const mgmtItems = [
    { icon: '⚖️', label: 'Lawyer Panel',    sub: 'Verify & manage' },
    { icon: '🚩', label: 'Reports Queue',   sub: 'Review flags'    },
    { icon: '🗃️', label: 'Legal Database',  sub: 'Update laws'     },
    { icon: '⚙️', label: 'System Config',   sub: 'App settings'    },
  ];

  const activityLog = [
    { color: '#4ade80', title: 'Lawyer #L-0218 Verified',    sub: '10 mins ago · Auto-matched SBC' },
    { color: '#ef4444', title: 'User Report Filed',           sub: '32 mins ago · Awaiting review'  },
    { color: '#3b82f6', title: 'New Case Filed — Karachi',   sub: '1 hour ago · Property dispute'  },
    { color: '#f59e0b', title: 'Biometric Auth Failed',      sub: '2 hours ago · User: ab991'       },
  ];

  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'users',     icon: '👥', label: 'Users'     },
    { id: 'lawyers',   icon: '⚖️', label: 'Lawyers'   },
    { id: 'reports',   icon: '🚩', label: 'Reports'   },
    { id: 'settings',  icon: '⚙️', label: 'Settings'  },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1A0533" />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Barq-e-Insaf ⚡</Text>
          <Text style={styles.headerSub}>Admin Control Panel</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Live</Text>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AD</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ALERT BADGES */}
        <View style={styles.alertRow}>
          <View style={[styles.alertBadge, { backgroundColor: '#fee2e2' }]}>
            <Text style={[styles.alertBadgeText, { color: '#991b1b' }]}>5 Flagged</Text>
          </View>
          <View style={[styles.alertBadge, { backgroundColor: '#fef3c7' }]}>
            <Text style={[styles.alertBadgeText, { color: '#92400e' }]}>8 Pending</Text>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.statsGrid}>
          {stats.map((s, i) => (
            <View key={i} style={styles.statCard}>
              <View style={[styles.statAccent, { backgroundColor: s.color }]} />
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
              <Text style={styles.statDelta}>{s.delta}</Text>
            </View>
          ))}
        </View>

        {/* VERIFICATION QUEUE */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Lawyer Verification Queue</Text>
            <View style={styles.pendingPill}>
              <Text style={styles.pendingPillText}>3 pending</Text>
            </View>
          </View>
          {verificationQueue.map((item, i) => (
            <View key={i} style={styles.verifyRow}>
              <View style={styles.verifyAvatar}>
                <Text style={styles.verifyAvatarText}>
                  {item.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.verifyInfo}>
                <Text style={styles.verifyName}>{item.name}</Text>
                <Text style={styles.verifySub}>SBC {item.sbc} · {item.specialty}</Text>
              </View>
              <View style={styles.verifyBtns}>
                <TouchableOpacity style={styles.approveBtn}>
                  <Text style={styles.approveBtnText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectBtn}>
                  <Text style={styles.rejectBtnText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* FLAGGED CONTENT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Flagged Content & Reports</Text>
          {flaggedItems.map((item, i) => (
            <View key={i} style={styles.flagCard}>
              <View style={[
                styles.flagDot,
                { backgroundColor: item.type === 'red' ? '#ef4444' : '#f59e0b' }
              ]} />
              <View style={styles.flagInfo}>
                <Text style={styles.flagTitle}>{item.title}</Text>
                <Text style={styles.flagDetail}>{item.detail}</Text>
              </View>
              <TouchableOpacity style={styles.reviewBtn}>
                <Text style={styles.reviewBtnText}>Review</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* MANAGEMENT GRID */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Management</Text>
          <View style={styles.mgmtGrid}>
            {mgmtItems.map((item, i) => (
              <TouchableOpacity key={i} style={styles.mgmtCard}>
                <Text style={styles.mgmtIcon}>{item.icon}</Text>
                <Text style={styles.mgmtLabel}>{item.label}</Text>
                <Text style={styles.mgmtSub}>{item.sub}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ACTIVITY LOG */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {activityLog.map((item, i) => (
            <View key={i} style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: item.color }]} />
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activitySub}>{item.sub}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => setActiveNav(item.id)}
          >
            <Text style={styles.navIcon}>{item.icon}</Text>
            <Text style={[
              styles.navLabel,
              activeNav === item.id && styles.navLabelActive
            ]}>
              {item.label}
            </Text>
            {activeNav === item.id && <View style={styles.navActiveDot} />}
          </TouchableOpacity>
        ))}
      </View>

    </SafeAreaView>
  );
}