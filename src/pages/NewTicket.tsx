import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import WritingOptions from '../pages/WritingOptions';
import VoiceRecording from './VoiceRecording';
import AIImageGeneration from './AIImageGeneration';
import NewTicketForm from '../components/NewTicketForm';

interface NewTicketProps { onBack: () => void }

const NewTicket: React.FC<NewTicketProps> = ({ onBack }) => {
  const [currentScreen, setCurrentScreen] = useState<'form' | 'options' | 'recording' | 'ai'>('form');
  const [selectedGenre, setSelectedGenre] = useState<'밴드' | '연극/뮤지컬'>('밴드');

  if (currentScreen === 'options') return <WritingOptions onBack={() => setCurrentScreen('form')} onNext={() => setCurrentScreen('recording')} />;
  if (currentScreen === 'recording') return <VoiceRecording onBack={() => setCurrentScreen('options')} onNext={() => setCurrentScreen('ai')} />;
  if (currentScreen === 'ai') return <AIImageGeneration onBack={() => setCurrentScreen('recording')} onComplete={onBack} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>공연 정보 입력하기</Text>
        <Text style={styles.subtitle}>관람하신 공연의 정보를 입력해주세요.</Text>

        <NewTicketForm selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} onNext={() => setCurrentScreen('options')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F2F7' },
  container: { flex: 1, padding: 20 },
  backButton: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  backIcon: { fontSize: 24, color: '#000' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#8E8E93', marginBottom: 20 },
});

export default NewTicket;
