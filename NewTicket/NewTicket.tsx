import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';
import RecordingOptions from './RecordingOptions';
import VoiceRecording from './VoiceRecording';
import AIImageGeneration from './AIImageGeneration';

interface NewTicketProps {
  onBack?: () => void;
}

const NewTicket: React.FC<NewTicketProps> = ({ onBack }) => {
  const [selectedGenre, setSelectedGenre] = useState<'밴드' | '연극/뮤지컬'>(
    '밴드',
  );
  const [currentScreen, setCurrentScreen] = useState<
    'form' | 'options' | 'recording' | 'ai'
  >('form');

  const handleCompleteForm = () => setCurrentScreen('options');
  const handleOptionsNext = () => setCurrentScreen('recording');
  const handleRecordingNext = () => setCurrentScreen('ai');
  const handleBackToForm = () => setCurrentScreen('form');
  const handleBackToOptions = () => setCurrentScreen('options');
  const handleBackToRecording = () => setCurrentScreen('recording');

  if (currentScreen === 'options') {
    return (
      <RecordingOptions onBack={handleBackToForm} onNext={handleOptionsNext} />
    );
  }

  if (currentScreen === 'recording') {
    return (
      <VoiceRecording
        onBack={handleBackToOptions}
        onNext={handleRecordingNext}
      />
    );
  }

  if (currentScreen === 'ai') {
    return (
      <AIImageGeneration onBack={handleBackToRecording} onComplete={onBack} />
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>공연 정보 입력하기</Text>
          <Text style={styles.subtitle}>
            관람하신 공연의 정보를 입력해주세요.
          </Text>
        </View>

        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            {['공연명', '일시', '장소', '출연', '좌석번호', '예매처'].map(
              label => (
                <View style={styles.inlineField} key={label}>
                  <Text style={styles.inlineLabel}>{label}</Text>
                  <TextInput
                    style={styles.inlineInput}
                    placeholder={`${label}을 입력하세요.`}
                    placeholderTextColor="#A0A0A0"
                  />
                </View>
              ),
            )}

            {/* 공연장르 - 라디오 버튼 (밑줄 제거) */}
            <View style={styles.radioField}>
              <Text style={styles.inlineLabel}>공연장르</Text>
              <View style={styles.radioGroup}>
                {['밴드', '연극/뮤지컬'].map(genre => (
                  <TouchableOpacity
                    key={genre}
                    style={styles.radioOption}
                    onPress={() =>
                      setSelectedGenre(genre as '밴드' | '연극/뮤지컬')
                    }
                  >
                    <View style={styles.radioCircle}>
                      {selectedGenre === genre && <View style={styles.radioDot} />}
                    </View>
                    <Text style={styles.radioLabel}>{genre}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleCompleteForm}
          >
            <Text style={styles.completeButtonText}>완료</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: '#F2F2F7' },
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  backIcon: { fontSize: 24, fontWeight: '400', color: '#000' },

  titleContainer: { 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#8E8E93',
    textAlign: 'center',
  },

  scrollContent: { flex: 1 },
  
  formContainer: {
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
  inlineField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  inlineLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginRight: 12,
    width: 80,
  },
  inlineInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    paddingVertical: 8,
  },

  // 라디오 버튼 전용 필드 (밑줄 없음)
  radioField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioGroup: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  radioOption: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF3B30',
  },
  radioLabel: { fontSize: 16, color: '#000' },

  completeButton: {
    backgroundColor: '#FF3B30',
    marginHorizontal: 28,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  completeButtonText: { fontSize: 16, fontWeight: '600', color: '#FFF' },
});

export default NewTicket;
