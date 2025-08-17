import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Calendar from './Calendar';
import NewTicket from './NewTicket';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 56 - 16) / 3;
const CARD_HEIGHT = (CARD_WIDTH * 5) / 4;

interface MyPageProps {
  onBack?: () => void;
}

const MyPage: React.FC<MyPageProps> = ({ onBack }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showNewTicket, setShowNewTicket] = useState(false);

  if (showCalendar) return <Calendar onBack={() => setShowCalendar(false)} />;
  if (showNewTicket) return <NewTicket onBack={() => setShowNewTicket(false)} />;

  const renderGridCard = (index: number) => (
    <TouchableOpacity key={index} style={styles.gridCard}>
      <View style={{ flex: 1, backgroundColor: index === 0 ? '#7CB342' : 'transparent', borderRadius: 16 }} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      {/* 상단 SafeArea */}
      <SafeAreaView style={styles.topSafeArea} edges={['top']} />

      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Re:cord</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.headerIconButton}>
              <Image source={require('./img/person_add.png')} style={styles.headerIconImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconButton}>
              <Image source={require('./img/settings.png')} style={styles.headerIconImage} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Scroll Content */}
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}><Text style={styles.avatarEmoji}>👩🏻‍💻</Text></View>
              <View style={styles.notificationBadge}><Text style={styles.notificationText}>2</Text></View>
            </View>
            <Text style={styles.userName}>9RMMY</Text>
            <Text style={styles.userID}>@9RMMY</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}><Text style={styles.statLabel}>tickets</Text><Text style={styles.statValue}>N개</Text></View>
              <View style={styles.statItem}><Text style={styles.statLabel}>친구들</Text><Text style={styles.statValue}>10명</Text></View>
            </View>
            <View style={styles.profileDivider} />
          </View>

          {/* Grid */}
          <View style={styles.gridContainer}>
            {Array.from({ length: 9 }).map((_, i) => renderGridCard(i))}
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNavWrapper}>
          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem} onPress={onBack}>
              <Text style={[styles.navIcon, { color: '#8E8E93' }]}>🎫</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => setShowNewTicket(true)}>
              <Text style={styles.navIcon}>➕</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => setShowCalendar(true)}>
              <Text style={[styles.navIcon, { color: '#8E8E93' }]}>📅</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Text style={[styles.navIcon, { color: '#8E8E93' }]}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 하단 SafeArea */}
      <SafeAreaView style={styles.bottomSafeArea} edges={['bottom']} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  topSafeArea: { backgroundColor: '#F2F2F7' },
  bottomSafeArea: { backgroundColor: '#26282B' },
  container: { flex: 1, backgroundColor: '#F2F2F7' },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 28, paddingTop: 8, paddingBottom: 16 },
  logo: { fontSize: 20, fontWeight: '700', color: '#000' },
  headerIcons: { flexDirection: 'row', gap: 8 },
  headerIconButton: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  headerIconImage: { width: 28, height: 28, resizeMode: 'contain' },

  scrollContent: { flex: 1 },
  profileSection: { alignItems: 'center', paddingVertical: 40, paddingHorizontal: 28 },
  avatarContainer: { position: 'relative', marginBottom: 16 },
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#E5E5EA', justifyContent: 'center', alignItems: 'center' },
  avatarEmoji: { fontSize: 80 },
  notificationBadge: { position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: 12, backgroundColor: '#FF3B30', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#F2F2F7' },
  notificationText: { fontSize: 12, fontWeight: '600', color: '#FFF' },
  userName: { fontSize: 32, fontWeight: '700', color: '#000' },
  userID: { fontSize: 16, fontWeight: '400', color: '#8c8c8cff' },
  statsContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24, marginBottom: 20, gap: 56 },
  statItem: { alignItems: 'center' },
  statLabel: { fontSize: 14, fontWeight: '400', color: '#8c8c8cff', marginBottom: 4 },
  statValue: { fontSize: 24, fontWeight: '700', color: '#000' },
  profileDivider: { width: '100%', height: StyleSheet.hairlineWidth, backgroundColor: '#9e9e9eff' },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 28, paddingBottom: 40, gap: 8 },
  gridCard: { width: CARD_WIDTH, height: CARD_HEIGHT, borderRadius: 16, backgroundColor: '#FFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 },

  bottomNavWrapper: { backgroundColor: '#26282B', paddingBottom: 34 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, backgroundColor: '#26282B', borderTopLeftRadius: 15, borderTopRightRadius: 15, minHeight: 46 },
  navItem: { alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 22 },
  navIcon: { fontSize: 28, color: '#007AFF' },
});

export default MyPage;
