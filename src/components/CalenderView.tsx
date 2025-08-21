import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Event { id: string; title: string; date: string; time: string; location: string; }

interface CalendarViewProps {
  currentMonth: number;
  currentYear: number;
  selectedDate: number | null;
  events: Event[];
  onSelectDate: (day: number) => void;
  navigateMonth: (direction: 'prev' | 'next') => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  currentMonth,
  currentYear,
  selectedDate,
  events,
  onSelectDate,
  navigateMonth,
}) => {
  const monthNames = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  const dayNames = ['월','화','수','목','금','토','일'];

  const getDaysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month-1, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };
  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && currentMonth === today.getMonth() + 1 && currentYear === today.getFullYear();
  };
  const hasEvent = (day: number) => {
    const dateString = `${currentYear}-${String(currentMonth).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return events.some(e => e.date === dateString);
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const cells = [];

    for (let i = 0; i < firstDay; i++) cells.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    for (let day = 1; day <= daysInMonth; day++) {
      const todayStyle = isToday(day) ? styles.todayNumber : {};
      const selectedStyle = selectedDate === day ? styles.selectedNumber : {};
      cells.push(
        <TouchableOpacity key={day} style={styles.dayCell} onPress={() => onSelectDate(day)}>
          <View style={[styles.dayNumber, todayStyle, selectedStyle]}>
            <Text style={[styles.dayText, todayStyle, selectedStyle]}>{day}</Text>
          </View>
          {hasEvent(day) && <Text style={styles.eventDot}>•</Text>}
        </TouchableOpacity>
      );
    }
    return cells;
  };

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.monthNavigation}>
        <TouchableOpacity onPress={() => navigateMonth('prev')}><Text style={styles.navButtonText}>‹</Text></TouchableOpacity>
        <Text style={styles.monthTitle}>{currentYear}년 {monthNames[currentMonth-1]}</Text>
        <TouchableOpacity onPress={() => navigateMonth('next')}><Text style={styles.navButtonText}>›</Text></TouchableOpacity>
      </View>
      <View style={styles.dayHeaders}>
        {dayNames.map(d => <Text key={d} style={styles.dayHeaderText}>{d}</Text>)}
      </View>
      <View style={styles.calendarGrid}>{renderDays()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: { backgroundColor:'#FFF', borderRadius:16, padding:20, marginBottom:24 },
  monthNavigation: { flexDirection:'row', justifyContent:'space-between', marginBottom:20 },
  navButtonText: { fontSize:18, fontWeight:'600', color:'#007AFF' },
  monthTitle: { fontSize:18, fontWeight:'600', color:'#000' },
  dayHeaders: { flexDirection:'row', marginBottom:16 },
  dayHeaderText: { flex:1, textAlign:'center', fontSize:12, fontWeight:'500', color:'#8E8E93' },
  calendarGrid: { flexDirection:'row', flexWrap:'wrap' },
  dayCell: { width:'14.28%', aspectRatio:1, alignItems:'center', justifyContent:'center' },
  dayNumber: { width:32, height:32, borderRadius:16, justifyContent:'center', alignItems:'center' },
  todayNumber: { backgroundColor:'#FF3B30', color:'#FFF' },
  selectedNumber: { backgroundColor:'#007AFF', color:'#FFF' },
  dayText: { fontSize:14, fontWeight:'500', color:'#000' },
  eventDot: { position:'absolute', bottom:2, fontSize:12, color:'#FF3B30' },
});

export default CalendarView;
