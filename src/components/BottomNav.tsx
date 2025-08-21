import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface BottomNavProps {
  onBack?: () => void;
  onNewTicket?: () => void;
  onCalendar?: () => void;
  onMyPage?: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onBack, onNewTicket, onCalendar, onMyPage }) => {
  return (
    <View style={styles.bottomNavWrapper}>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={onBack}>
          <Text style={[styles.navIcon, { color: '#8E8E93' }]}>🎫</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onNewTicket}>
          <Text style={styles.navIcon}>➕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onCalendar}>
          <Text style={[styles.navIcon, { color: '#8E8E93' }]}>📅</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onMyPage}>
          <Text style={[styles.navIcon, { color: '#8E8E93' }]}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavWrapper: { backgroundColor: '#26282B', paddingBottom: 34 },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#26282B',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    minHeight: 46,
  },
  navItem: { alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 22 },
  navIcon: { fontSize: 28, color: '#007AFF' },
});

export default BottomNav;
