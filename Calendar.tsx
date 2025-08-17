import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import NewTicket from './NewTicket';
import MyPage from './MyPage';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

interface CalendarProps {
  onBack?: () => void;
  onHome?: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ onBack, onHome }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [showMyPage, setShowMyPage] = useState(false);
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Any Good Music Here?',
      date: '2025-07-06',
      time: '17:00',
      location: '우주천지창 홍대',
    },
    {
      id: '2',
      title: 'Summer Concert',
      date: '2025-07-23',
      time: '19:00',
      location: '올림픽공원',
    },
  ]);

  if (showNewTicket)
    return <NewTicket onBack={() => setShowNewTicket(false)} />;
  if (showMyPage) return <MyPage onBack={() => setShowMyPage(false)} />;

  const monthNames = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];
  const dayNames = ['월', '화', '수', '목', '금', '토', '일'];

  const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month - 1, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 1) {
        setCurrentMonth(12);
        setCurrentYear(currentYear - 1);
      } else setCurrentMonth(currentMonth - 1);
    } else {
      if (currentMonth === 12) {
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
      } else setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() + 1 &&
    currentYear === today.getFullYear();
  const hasEvent = (day: number) => {
    const dateString = `${currentYear}-${String(currentMonth).padStart(
      2,
      '0',
    )}-${String(day).padStart(2, '0')}`;
    return events.some(event => event.date === dateString);
  };
  const getEventsForDate = (day: number) => {
    const dateString = `${currentYear}-${String(currentMonth).padStart(
      2,
      '0',
    )}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateString);
  };
  const getSelectedDateEvents = () =>
    selectedDate ? getEventsForDate(selectedDate) : [];
  const formatDateForDisplay = (day: number) => `${currentMonth}월 ${day}일`;

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days: React.ReactElement[] = [];

    for (let i = 0; i < firstDay; i++)
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    for (let day = 1; day <= daysInMonth; day++) {
      const isTodayDate = isToday(day);
      const hasEventDate = hasEvent(day);
      const isSelected = selectedDate === day;

      days.push(
        <TouchableOpacity
          key={day}
          style={styles.dayCell}
          onPress={() => setSelectedDate(day)}
        >
          <View
            style={[
              styles.dayNumber,
              isTodayDate && styles.todayNumber,
              isSelected && styles.selectedNumber,
            ]}
          >
            <Text
              style={[
                styles.dayText,
                isTodayDate && styles.todayText,
                isSelected && styles.selectedText,
              ]}
            >
              {day}
            </Text>
          </View>
          {hasEventDate && (
            <View style={styles.eventDot}>
              <Text style={styles.eventDotText}>•</Text>
            </View>
          )}
        </TouchableOpacity>,
      );
    }
    return days;
  };

  return (
    <SafeAreaProvider>
      {/* 상단 SafeArea */}
      <SafeAreaView style={styles.topSafeArea} edges={['top']} />

      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Re:cord</Text>
          <View style={styles.headerRight}>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>👥 2개</Text>
            </View>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Calendar Title */}
          <View style={styles.titleSection}>
            <Text style={styles.pageTitle}>캘린더</Text>
          </View>

          {/* Calendar */}
          <View style={styles.calendarContainer}>
            <View style={styles.monthNavigation}>
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigateMonth('prev')}
              >
                <Text style={styles.navButtonText}>‹</Text>
              </TouchableOpacity>
              <Text style={styles.monthTitle}>
                {currentYear}년 {monthNames[currentMonth - 1]}
              </Text>
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigateMonth('next')}
              >
                <Text style={styles.navButtonText}>›</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dayHeaders}>
              {dayNames.map(day => (
                <View key={day} style={styles.dayHeader}>
                  <Text style={styles.dayHeaderText}>{day}</Text>
                </View>
              ))}
            </View>

            <View style={styles.calendarGrid}>{renderCalendarDays()}</View>
          </View>

          {/* Events List */}
          <View style={styles.eventsSection}>
            {selectedDate ? (
              <>
                <Text style={styles.eventDate}>
                  {formatDateForDisplay(selectedDate)}
                </Text>
                {getSelectedDateEvents().length > 0 ? (
                  getSelectedDateEvents().map(event => (
                    <TouchableOpacity key={event.id} style={styles.eventItem}>
                      <View style={styles.eventContent}>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                        <Text style={styles.eventDetails}>
                          {event.date} {event.time} @{event.location}
                        </Text>
                      </View>
                      <Text style={styles.eventArrow}>›</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={styles.noEventItem}>
                    <Text style={styles.noEventText}>
                      이 날짜에는 일정이 없습니다
                    </Text>
                  </View>
                )}
              </>
            ) : (
              <>
                <Text style={styles.eventDate}>다가오는 일정</Text>
                {events
                  .filter(e => new Date(e.date) >= today)
                  .slice(0, 3)
                  .map(event => {
                    const eventDate = new Date(event.date);
                    const month = eventDate.getMonth() + 1;
                    const day = eventDate.getDate();
                    return (
                      <TouchableOpacity key={event.id} style={styles.eventItem}>
                        <View style={styles.eventContent}>
                          <Text style={styles.eventTitle}>{event.title}</Text>
                          <Text style={styles.eventDetails}>
                            {month}월 {day}일 {event.time} @{event.location}
                          </Text>
                        </View>
                        <Text style={styles.eventArrow}>›</Text>
                      </TouchableOpacity>
                    );
                  })}
              </>
            )}
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNavWrapper}>
          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem} onPress={onBack || onHome}>
              <Text style={[styles.navIcon, { color: '#8E8E93' }]}>🎫</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => setShowNewTicket(true)}
            >
              <Text style={[styles.navIcon, { color: '#8E8E93' }]}>➕</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Text style={styles.navIcon}>📅</Text>
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

      {/* 하단 SafeArea */}
      <SafeAreaView style={styles.bottomSafeArea} edges={['bottom']} />
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
    paddingTop: 8,
    paddingBottom: 16,
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.41,
  },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  countBadge: {
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  countText: { fontSize: 12, fontWeight: '500', color: '#000' },

  scrollContent: { flex: 1 },
  titleSection: { paddingHorizontal: 28, marginBottom: 24 },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.5,
  },

  calendarContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 28,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: { fontSize: 18, fontWeight: '600', color: '#007AFF' },
  monthTitle: { fontSize: 18, fontWeight: '600', color: '#000' },
  dayHeaders: { flexDirection: 'row', marginBottom: 16 },
  dayHeader: { flex: 1, alignItems: 'center' },
  dayHeaderText: { fontSize: 12, fontWeight: '500', color: '#8E8E93' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dayNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayNumber: { backgroundColor: '#FF3B30' },
  selectedNumber: { backgroundColor: '#007AFF' },
  dayText: { fontSize: 14, fontWeight: '500', color: '#000' },
  todayText: { color: '#FFF' },
  selectedText: { color: '#FFF' },
  eventDot: {
    position: 'absolute',
    bottom: 2,
    left: '50%',
    transform: [{ translateX: -15 }],
  },
  eventDotText: { fontSize: 12, fontWeight: '700', color: '#FF3B30' },

  eventsSection: { paddingHorizontal: 28, paddingBottom: 40 },
  eventDate: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
    marginTop: 20,
  },
  eventItem: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  eventContent: { flex: 1 },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  eventDetails: { fontSize: 12, fontWeight: '400', color: '#8E8E93' },
  noEventItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  noEventText: { fontSize: 14, fontWeight: '500', color: '#8E8E93' },
  eventArrow: { fontSize: 18, fontWeight: '600', color: '#8E8E93' },

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

export default Calendar;
