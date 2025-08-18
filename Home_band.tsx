import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DetailModal from './Detail';
import NewTicket from './NewTicket/NewTicket';
import Calendar from './Calendar';
import MyPage from './MyPage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  topSafeArea: { backgroundColor: '#F2F2F7' },
  bottomSafeArea: { backgroundColor: '#26282B' },
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 8,
    paddingBottom: 16,
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.41,
  },
  dropdownButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    width: 110,
    height: 36,
  },
  dropdownButtonOpen: {
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    width: 110,
    height: 36,
  },
  dropdownText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  dropdownIcon: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  dropdownArrowText: { fontSize: 10, color: '#8E8E93', fontWeight: '600' },
  dropdownOverlay: { flex: 1, backgroundColor: 'transparent' },
  dropdownModal: {
    position: 'absolute',
    top: 110,
    right: 28,
    backgroundColor: '#FFF',
    borderRadius: 8,
    width: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F2F2F7',
    borderRadius: 8,
    height: 36,
  },
  dropdownItemText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  selectedDropdownItem: { backgroundColor: '#F2F2F7' },
  selectedDropdownItemText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#007AFF',
    flex: 1,
    textAlign: 'center',
  },

  titleSection: {
    alignItems: 'flex-start',
    marginTop: 28,
    marginBottom: 16,
    marginHorizontal: 28,
    paddingHorizontal: 16,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    letterSpacing: -0.34,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#8E8E93',
    textAlign: 'left',
  },

  cardContainer: { flex: 1 },
  cardWrapper: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 320,
    height: 400,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  cardPlaceholder: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8E8E93',
    textAlign: 'center',
  },
  dateButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  dateText: { fontSize: 16, fontWeight: '500', color: '#000' },

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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  navIcon: { fontSize: 28, color: '#007AFF' },
});

const App = () => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('밴드');
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMyPage, setShowMyPage] = useState(false);

  const getCurrentMonth = () => new Date().getMonth() + 1;

  const categories = [
    { id: 1, name: '밴드' },
    { id: 2, name: '연극◦뮤지컬' },
  ];

  const tickets = [
    { id: 1, date: '8월 9일', title: '티켓 1' },
    { id: 2, date: '8월 9일', title: '티켓 2' },
    { id: 3, date: '8월 10일', title: '티켓 3' },
    { id: 4, date: '8월 16일', title: '티켓 4' },
    { id: 5, date: '8월 31일', title: '티켓 4' },
  ];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownVisible(false);
  };

  const renderDropdownItem = ({ item, index }: any) => {
    const isSelected = selectedCategory === item.name;
    const isLastItem = index === categories.length - 1;
    return (
      <TouchableOpacity
        style={[
          styles.dropdownItem,
          isSelected && styles.selectedDropdownItem,
          isLastItem && { borderBottomWidth: 0 },
        ]}
        onPress={() => handleCategorySelect(item.name)}
      >
        <Text
          style={
            isSelected
              ? styles.selectedDropdownItemText
              : styles.dropdownItemText
          }
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderTicketItem = ({ item }: any) => (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => setIsDetailVisible(true)}
      >
        <Text style={styles.cardPlaceholder}>{item.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dateButton}>
        <Text style={styles.dateText}>{item.date}</Text>
      </TouchableOpacity>
    </View>
  );

  if (showNewTicket)
    return <NewTicket onBack={() => setShowNewTicket(false)} />;
  if (showCalendar) return <Calendar onBack={() => setShowCalendar(false)} />;
  if (showMyPage) return <MyPage onBack={() => setShowMyPage(false)} />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.topSafeArea} edges={['top']} />
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Re:cord</Text>
          <TouchableOpacity
            style={
              isDropdownVisible
                ? styles.dropdownButtonOpen
                : styles.dropdownButton
            }
            onPress={() => setIsDropdownVisible(true)}
          >
            <Text style={styles.dropdownText}>{selectedCategory}</Text>
            <View style={styles.dropdownIcon}>
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
            </View>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>
            {getCurrentMonth()}월에 관람한 공연
          </Text>
          <Text style={styles.subtitle}>
            한 달의 기록, 옆으로 넘기며 다시 만나보세요
          </Text>
        </View>

        {/* Ticket FlatList */}
        <FlatList
          data={tickets}
          renderItem={renderTicketItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />

        {/* Bottom Nav */}
        <View style={styles.bottomNavWrapper}>
          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem}>
              <Text style={[styles.navIcon, { color: '#8E8E93' }]}>🎫</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => setShowNewTicket(true)}
            >
              <Text style={styles.navIcon}>➕</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => setShowCalendar(true)}
            >
              <Text style={[styles.navIcon, { color: '#8E8E93' }]}>📅</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => setShowMyPage(true)}
            >
              <Text style={[styles.navIcon, { color: '#8E8E93' }]}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <SafeAreaView style={styles.bottomSafeArea} edges={['bottom']} />

      {/* Dropdown */}
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
            <FlatList
              data={categories}
              renderItem={renderDropdownItem}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Detail Modal */}
      <DetailModal
        visible={isDetailVisible}
        onClose={() => setIsDetailVisible(false)}
      />
    </SafeAreaProvider>
  );
};

export default App;
