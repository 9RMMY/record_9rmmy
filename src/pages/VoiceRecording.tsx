import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

interface VoiceRecordingProps {
  onBack?: () => void;
  onNext?: () => void;
}

const VoiceRecording: React.FC<VoiceRecordingProps> = ({ onBack, onNext }) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordToggle = () => {
    setIsRecording(!isRecording);
  };

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

        {/* Title & Subtitle */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>공연후기 작성하기</Text>
          <Text style={styles.subtitle}>
            오늘 공연에서 가장 기억에 남는 장면은 무엇인가요?
          </Text>
        </View>

        {/* Recording Area */}
        <View style={styles.recordingArea}>
          <View style={styles.recordingCard}>
            {/* Empty recording space */}
          </View>
        </View>

        {/* Complete Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.completeButton} onPress={onNext}>
            <Text style={styles.completeButtonText}>완료</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 0,
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

  // Title & Subtitle NewTicket 스타일 동일 적용
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

  recordingArea: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 20,
  },
  recordingCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  bottomContainer: {
    paddingHorizontal: 28,
    paddingBottom: 40,
  },
  completeButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default VoiceRecording;
