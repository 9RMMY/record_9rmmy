import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, StatusBar, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NewTicket from './NewTicket';
import MyPage from './MyPage';
import CalendarView from '../components/CalenderView';

interface Event { id: string; title: string; date: string; time: string; location: string; }

const Calendar: React.FC<{onBack?:()=>void; onHome?:()=>void}> = ({onBack, onHome}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()+1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [showMyPage, setShowMyPage] = useState(false);
  const [events] = useState<Event[]>([
    {id:'1', title:'Any Good Music Here?', date:'2025-07-06', time:'17:00', location:'우주천지창 홍대'},
    {id:'2', title:'Summer Concert', date:'2025-07-23', time:'19:00', location:'올림픽공원'},
  ]);

  if (showNewTicket) return <NewTicket onBack={()=>setShowNewTicket(false)} />;
  if (showMyPage) return <MyPage onBack={()=>setShowMyPage(false)} />;

  const navigateMonth = (direction:'prev'|'next') => {
    if(direction==='prev'){ currentMonth===1 ? (setCurrentMonth(12), setCurrentYear(currentYear-1)) : setCurrentMonth(currentMonth-1); }
    else { currentMonth===12 ? (setCurrentMonth(1), setCurrentYear(currentYear+1)) : setCurrentMonth(currentMonth+1); }
    setSelectedDate(null);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{backgroundColor:'#F2F2F7'}} edges={['top']} />
      <View style={{flex:1, backgroundColor:'#F2F2F7'}}>
        <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7"/>
        <ScrollView style={{flex:1}}>
          <Text style={{fontSize:28, fontWeight:'700', color:'#000', margin:28}}>캘린더</Text>
          <CalendarView
            currentMonth={currentMonth}
            currentYear={currentYear}
            selectedDate={selectedDate}
            events={events}
            onSelectDate={setSelectedDate}
            navigateMonth={navigateMonth}
          />
          {/* 이벤트 리스트 */}
          <View style={{paddingHorizontal:28, paddingBottom:40}}>
            {selectedDate ?
              <Text style={{fontSize:18,fontWeight:'700',color:'#000',marginTop:20, marginBottom:12}}>{currentMonth}월 {selectedDate}일</Text>
            : <Text style={{fontSize:18,fontWeight:'700',color:'#000',marginTop:20, marginBottom:12}}>다가오는 일정</Text>}
            {/* ... 이벤트 아이템 mapping */}
          </View>
        </ScrollView>

        {/* Bottom Nav */}
        <View style={{flexDirection:'row', justifyContent:'space-around', paddingVertical:12, backgroundColor:'#26282B', borderTopLeftRadius:15, borderTopRightRadius:15, paddingBottom:34}}>
          <TouchableOpacity onPress={onBack||onHome}><Text style={{fontSize:28, color:'#8E8E93'}}>🎫</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>setShowNewTicket(true)}><Text style={{fontSize:28, color:'#8E8E93'}}>➕</Text></TouchableOpacity>
          <TouchableOpacity><Text style={{fontSize:28, color:'#007AFF'}}>📅</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>setShowMyPage(true)}><Text style={{fontSize:28, color:'#8E8E93'}}>👤</Text></TouchableOpacity>
        </View>
      </View>
      <SafeAreaView style={{backgroundColor:'#26282B'}} edges={['bottom']} />
    </SafeAreaProvider>
  );
};

export default Calendar;
