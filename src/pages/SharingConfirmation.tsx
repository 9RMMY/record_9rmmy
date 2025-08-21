import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { ticketsAtom } from '../recoil/atoms';
import TicketCard from '../components/TicketCard';

interface SharingConfirmationProps {
  onBack?: () => void;
  onComplete?: () => void;
}

const SharingConfirmation: React.FC<SharingConfirmationProps> = ({ onBack, onComplete }) => {
  const [tickets, setTickets] = useRecoilState(ticketsAtom);

  const handleShare = () => {
    const newTicket = {
      id: Date.now(),
      title: 'JAMONG SALGU CLUB',
      date: 'TOMORROW AT 5PM',
      isShared: true,
    };
    setTickets([...tickets, newTicket]);
    onComplete?.();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>"들리와요 비밀함주실! vol.1"{'\n'}친구들에게 공개할까요?</Text>
          <Text style={styles.subtitle}>친구들이 내가 쓴 후기를 볼 수 있어요.</Text>

          <View style={styles.ticketContainer}>
            <TicketCard
              title="JAMONG SALGU CLUB"
              circleText="Jamong{'\n'}Salgu{'\n'}Club"
              secretText="SECRET CLUB OF THOSE WHO WANT TO DIE (IT'S NOT ACTUALLY WANT TO DIE) (PLEASE)"
              dateText="IF YOU JOIN TO OUR, BRING THE TICKET ON THE STAGE AND COME THE MUSIC ROOM"
              timeText="TOMORROW★ AT 5PM"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.privateButton} onPress={onComplete}>
              <Text style={styles.privateButtonText}>아니요</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareButtonText}>공개할게요</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F2F7' },
  container: { flex: 1, backgroundColor: '#F2F2F7', paddingHorizontal: 28 },
  header: { flexDirection: 'row', paddingTop: 8, marginBottom: 12 },
  backIcon: { fontSize: 24, color: '#000' },
  content: { flex: 1, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', color: '#000', textAlign: 'center', marginTop: 20, marginBottom: 8 },
  subtitle: { fontSize: 14, fontWeight: '400', color: '#666', textAlign: 'center', marginBottom: 40 },
  ticketContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
  buttonContainer: { flexDirection: 'row', gap: 12, width: '100%', paddingBottom: 40 },
  privateButton: { flex: 1, backgroundColor: '#FFE5E5', borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  privateButtonText: { fontSize: 16, fontWeight: '600', color: '#FF3B30' },
  shareButton: { flex: 1, backgroundColor: '#FF3B30', borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  shareButtonText: { fontSize: 16, fontWeight: '600', color: '#FFF' },
});

export default SharingConfirmation;
