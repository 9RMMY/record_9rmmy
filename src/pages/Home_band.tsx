import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { ticketsAtom } from '../recoil/atoms';
import TicketCard from '../components/TicketCard';
import BottomNav from '../components/BottomNav';
import NewTicket from './NewTicket';
import Calendar from './Calendar';
import MyPage from './MyPage';

const Home_band = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('밴드');
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMyPage, setShowMyPage] = useState(false);

  const tickets = useRecoilValue(ticketsAtom);
  
  const getCurrentMonth = () => new Date().getMonth() + 1;

  const categories = [
    { id: 1, name: '밴드' },
    { id: 2, name: '연극◦뮤지컬' },
  ];

  if (showNewTicket)
    return <NewTicket onBack={() => setShowNewTicket(false)} />;
  if (showCalendar) return <Calendar onBack={() => setShowCalendar(false)} />;
  if (showMyPage) return <MyPage onBack={() => setShowMyPage(false)} />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.topSafeArea} edges={['top']} />
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

        <View style={styles.header}>
          <Text style={styles.logo}>Re:cord</Text>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setIsDropdownVisible(true)}
          >
            <Text style={styles.dropdownText}>{selectedCategory}</Text>
            <Text
              style={[
                styles.dropdownArrowText,
                {
                  transform: [
                    { rotate: isDropdownVisible ? '180deg' : '0deg' },
                  ],
                },
              ]}
            >
              ▼
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>
            {getCurrentMonth()}월에 관람한 공연
          </Text>
          <Text style={styles.subtitle}>
            한 달의 기록, 옆으로 넘기며 다시 만나보세요
          </Text>
        </View>

        <FlatList
          data={tickets}
          style={{flex : 1}}
          renderItem={({ item }) => (
            <TicketCard
              title={item.title}
              dateText={item.date}
              circleText={item.isShared ? '공유됨' : undefined}
            />
          )}
          keyExtractor={item => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <Text>티켓을 추가해보세요!</Text>
            </View>
          )}
        />

        <BottomNav
          onBack={() => {}} // Empty function since we're on the home screen
          onNewTicket={() => setShowNewTicket(true)}
          onCalendar={() => setShowCalendar(true)}
          onMyPage={() => setShowMyPage(true)}
        />
      </View>
      <SafeAreaView style={styles.bottomSafeArea} edges={['bottom']} />

      <Modal
        visible={isDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.dropdownOverlay}
          activeOpacity={1}
          onPress={() => setIsDropdownVisible(false)}
        >
          <View style={styles.dropdownModal}>
            {categories.map(item => (
              <TouchableOpacity
                key={item.id}
                style={
                  selectedCategory === item.name
                    ? styles.selectedDropdownItem
                    : styles.dropdownItem
                }
                onPress={() => {
                  setSelectedCategory(item.name);
                  setIsDropdownVisible(false);
                }}
              >
                <Text
                  style={
                    selectedCategory === item.name
                      ? styles.selectedDropdownItemText
                      : styles.dropdownItemText
                  }
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  topSafeArea: { backgroundColor: '#F2F2F7' },
  bottomSafeArea: { backgroundColor: '#26282B' },
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 12,
  },
  logo: { fontSize: 20, fontWeight: '700', color: '#000' },
  dropdownButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: 110,
    justifyContent: 'center',
  },
  dropdownText: { fontSize: 12, color: '#000', textAlign: 'center', flex: 1 },
  dropdownArrowText: { fontSize: 10, color: '#8E8E93', fontWeight: '600' },
  titleSection: { marginTop: 28, marginHorizontal: 28, marginBottom: 16 },
  mainTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: { fontSize: 12, color: '#8E8E93' },
  dropdownOverlay: { flex: 1 },
  dropdownModal: {
    position: 'absolute',
    top: 110,
    right: 28,
    backgroundColor: '#FFF',
    borderRadius: 8,
    width: 110,
    elevation: 8,
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F2F2F7',
    alignItems: 'center',
  },
  dropdownItemText: { fontSize: 12, color: '#000' },
  selectedDropdownItem: {
    backgroundColor: '#F2F2F7',
    paddingVertical: 10,
    alignItems: 'center',
  },
  selectedDropdownItemText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#007AFF',
  },
});

export default Home_band;
