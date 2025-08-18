import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import TicketCompletion from './TicketCompletion';
import TicketSuccess from './TicketSuccess';
import SharingConfirmation from './SharingConfirmation';

interface AIImageLoadingProps {
  onBack?: () => void;
  onComplete?: () => void;
}

const AIImageLoading: React.FC<AIImageLoadingProps> = ({ onBack, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentScreen, setCurrentScreen] = useState<'loading' | 'completion' | 'success' | 'sharing'>('loading');

  useEffect(() => {
    // Simulate AI image generation progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Auto-navigate to completion after a short delay
          setTimeout(() => {
            setCurrentScreen('completion');
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Navigation handlers
  const handleCompletionNext = () => setCurrentScreen('success');
  const handleSuccessNext = () => setCurrentScreen('sharing');
  const handleBackToLoading = () => setCurrentScreen('loading');
  const handleBackToCompletion = () => setCurrentScreen('completion');
  const handleBackToSuccess = () => setCurrentScreen('success');

  // Render different screens based on current state
  if (currentScreen === 'completion') {
    return (
      <TicketCompletion 
        onBack={handleBackToLoading}
        onNext={handleCompletionNext}
      />
    );
  }

  if (currentScreen === 'success') {
    return (
      <TicketSuccess 
        onBack={handleBackToCompletion}
        onNext={handleSuccessNext}
      />
    );
  }

  if (currentScreen === 'sharing') {
    return (
      <SharingConfirmation 
        onBack={handleBackToSuccess}
        onComplete={onComplete}
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
            <Text style={styles.headerTitle}>티켓 이미지 선택하기</Text>
            <Text style={styles.headerSubtitle}>생성할 이미지를 티켓을 부탁하세요.</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addIcon}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Loading Content */}
        <View style={styles.content}>
          <View style={styles.loadingCard}>
            <View style={styles.loadingArea}>
              <ActivityIndicator size="large" color="#FF3B30" />
              <Text style={styles.loadingText}>AI가 이미지를 생성중입니다...</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.progressText}>{progress}%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Complete Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.completeButton} disabled={progress < 100}>
            <Text style={[styles.completeButtonText, progress < 100 && styles.disabledText]}>
              완료
            </Text>
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
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  addIcon: {
    fontSize: 20,
    fontWeight: '400',
    color: '#FF3B30',
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 20,
  },
  loadingCard: {
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
  loadingArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 20,
    marginBottom: 30,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF3B30',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
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
  disabledText: {
    opacity: 0.5,
  },
});

export default AIImageLoading;
