import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import TicketCard from '../components/TicketCard';
import BottomNav from '../components/BottomNav';

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const Detail: React.FC<DetailScreenProps> = ({ navigation, route }) => {
  const { ticketId } = route.params || {};

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('.././assets/back.png')} style={styles.backIconImage} />
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('.././assets/share.png')} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('.././assets/pending.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Ticket Card */}
      <TicketCard title="제목을 입력해주세요." dateText="날짜를 입력해주세요." />

      {/* Event Details */}
      <View style={styles.detailsSection}>
        {[
          ['일시', '날짜를 입력해주세요.'],
          ['장소', '장소를 입력해주세요.'],
          ['출연', '밴드명을 입력해주세요.'],
          ['좌석번호', '좌석번호를 입력해주세요.'],
          ['예매처', '예매처를 입력해주세요.'],
        ].map(([label, value]) => (
          <View key={label} style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
          </View>
        ))}
      </View>

      <BottomNav
        onNewTicket={() => console.log('New Ticket')}
        onCalendar={() => console.log('Calendar')}
        onMyPage={() => console.log('My Page')}
        onBack={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16, backgroundColor: '#F2F2F7', justifyContent: 'space-between' },
  backButton: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  backIconImage: { width: 36, height: 36, resizeMode: 'contain' },
  headerRight: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  iconButton: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  headerIcon: { width: 32, height: 32, resizeMode: 'contain' },
  detailsSection: { marginTop: 20, width: '90%', alignSelf: 'center' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 0.5, borderBottomColor: '#ccc' },
  detailLabel: { fontSize: 14, color: '#444', fontWeight: '600' },
  detailValue: { fontSize: 14, color: '#666' },
});

export default Detail;
