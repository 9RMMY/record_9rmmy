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
  // 🎯 공연장르 기본값을 "밴드"로 설정
  const [selectedGenre, setSelectedGenre] = useState<'밴드' | '연극/뮤지컬'>('밴드');
  const [currentScreen, setCurrentScreen] = useState<'form' | 'options' | 'recording' | 'ai'>('form');

  // Screen navigation handlers
  const handleCompleteForm = () => setCurrentScreen('options');
  const handleOptionsNext = () => setCurrentScreen('recording');
  const handleRecordingNext = () => setCurrentScreen('ai');
  const handleBackToForm = () => setCurrentScreen('form');
  const handleBackToOptions = () => setCurrentScreen('options');
  const handleBackToRecording = () => setCurrentScreen('recording');

  // Render different screens based on current state
  if (currentScreen === 'options') {
    return (
      <RecordingOptions 
        onBack={handleBackToForm}
        onNext={handleOptionsNext}
      />
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
      <AIImageGeneration 
        onBack={handleBackToRecording}
        onComplete={onBack}
      />
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
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>공연 정보 입력하기</Text>
            <Text style={styles.headerSubtitle}>관람하신 공연의 정보를 입력해주세요.</Text>
          </View>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>저장</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            {/* 공연명 */}
            <View style={styles.inlineField}>
              <Text style={styles.inlineLabel}>공연명</Text>
              <TextInput
                style={styles.inlineInput}
                placeholder="공연명을 입력하세요."
                placeholderTextColor="#A0A0A0"
              />
            </View>

            {/* 일시 */}
            <View style={styles.inlineField}>
              <Text style={styles.inlineLabel}>일시</Text>
              <TextInput
                style={styles.inlineInput}
                placeholder="일시를 입력하세요."
                placeholderTextColor="#A0A0A0"
              />
            </View>

            {/* 장소 */}
            <View style={styles.inlineField}>
              <Text style={styles.inlineLabel}>장소</Text>
              <TextInput
                style={styles.inlineInput}
                placeholder="장소를 입력하세요."
                placeholderTextColor="#A0A0A0"
              />
            </View>

            {/* 출연 */}
            <View style={styles.inlineField}>
              <Text style={styles.inlineLabel}>출연</Text>
              <TextInput
                style={styles.inlineInput}
                placeholder="아티스트명을 입력하세요."
                placeholderTextColor="#A0A0A0"
              />
            </View>

            {/* 좌석번호 */}
            <View style={styles.inlineField}>
              <Text style={styles.inlineLabel}>좌석번호</Text>
              <TextInput
                style={styles.inlineInput}
                placeholder="좌석번호를 입력하세요."
                placeholderTextColor="#A0A0A0"
              />
            </View>

            {/* 공연장르 - 라벨 + 라디오 버튼 인라인 */}
            <View style={styles.inlineField}>
              <Text style={styles.inlineLabel}>공연장르</Text>
              <View style={styles.radioGroup}>
                {['밴드', '연극/뮤지컬'].map((genre) => (
                  <TouchableOpacity
                    key={genre}
                    style={styles.radioOption}
                    onPress={() => setSelectedGenre(genre as '밴드' | '연극/뮤지컬')}
                  >
                    <View style={styles.radioCircle}>
                      {selectedGenre === genre && <View style={styles.radioDot} />}
                    </View>
                    <Text style={styles.radioLabel}>{genre}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* 예매처 */}
            <View style={styles.inlineField}>
              <Text style={styles.inlineLabel}>예매처</Text>
              <TextInput
                style={styles.inlineInput}
                placeholder="예매처를 입력하세요."
                placeholderTextColor="#A0A0A0"
              />
            </View>
          </View>

          {/* Complete Button */}
          <TouchableOpacity style={styles.completeButton} onPress={handleCompleteForm}>
            <Text style={styles.completeButtonText}>완료</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
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
  backIcon: {
    fontSize: 24,
    fontWeight: '400',
    color: '#000',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#8E8E93',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#FF3B30',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  scrollContent: {
    flex: 1,
  },
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
    elevation: 4,
  },
  // 🎯 inline 스타일 (모든 필드 공통)
  inlineField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingBottom: 8,
  },
  inlineLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginRight: 12,
    width: 80, // 라벨 고정폭 → 정렬 맞추기
  },
  inlineInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    paddingVertical: 8,
  },
  // 라디오 버튼
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
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
  radioLabel: {
    fontSize: 16,
    color: '#000',
  },
  completeButton: {
    backgroundColor: '#FF3B30',
    marginHorizontal: 28,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default NewTicket;
