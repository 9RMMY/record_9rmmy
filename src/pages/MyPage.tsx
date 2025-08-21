import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { ticketsAtom } from '../recoil/atoms';
import TicketCard from '../components/TicketCard';
import BottomNav from '../components/BottomNav';
import Calendar from './Calendar';
import NewTicket from './NewTicket';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 56 - 16) / 3;
const CARD_HEIGHT = (CARD_WIDTH * 5) / 4;

const MyPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const tickets = useRecoilValue(ticketsAtom);

  if (showCalendar) return <Calendar onBack={() => setShowCalendar(false)} />;
  if (showNewTicket) return <NewTicket onBack={() => setShowNewTicket(false)} />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.topSafeArea} edges={['top']} />
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.title}>내 티켓</Text>
          <View style={styles.gridContainer}>
            {tickets.map((ticket, i) => (
              <TicketCard key={i} title={ticket.title} dateText={ticket.date} circleText={ticket.isShared ? '공유됨' : undefined} />
            ))}
          </View>
        </ScrollView>

        <BottomNav
          onBack={onBack}
          onCalendar={() => setShowCalendar(true)}
          onNewTicket={() => setShowNewTicket(true)}
        />
      </View>
      <SafeAreaView style={styles.bottomSafeArea} edges={['bottom']} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  topSafeArea: { backgroundColor: '#F2F2F7' },
  bottomSafeArea: { backgroundColor: '#26282B' },
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  title: { fontSize: 24, fontWeight: '700', margin: 16 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 16 },
});

export default MyPage;
