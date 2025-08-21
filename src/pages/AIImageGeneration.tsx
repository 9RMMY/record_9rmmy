import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AIImageLoading from './AIImageLoading';

interface AIImageGenerationProps {
  onBack?: () => void;
  onComplete?: () => void;
}

const AIImageGeneration: React.FC<AIImageGenerationProps> = ({ onBack, onComplete }) => {
  const [showLoading, setShowLoading] = useState(false);
  const [pressedCard, setPressedCard] = useState<string | null>(null);

  const handleAIImageSelect = () => {
    setShowLoading(true);
  };

  if (showLoading) {
    return (
      <AIImageLoading 
        onBack={() => setShowLoading(false)}
        onComplete={onComplete}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

        {/* Header Back Button */}
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

        <View style={styles.content}>
          {/* AI 생성형 이미지 옵션 */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              styles.highlightedCard,
              pressedCard === 'ai' && styles.pressedCard
            ]}
            onPress={handleAIImageSelect}
            onPressIn={() => setPressedCard('ai')}
            onPressOut={() => setPressedCard(null)}
          >
            <View style={styles.iconContainer}>
              <View style={styles.iconPlaceholder} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>AI 생성형 이미지</Text>
              <Text style={styles.optionDescription}>
                관람한 공연에 맞는 이미지를{'\n'}
                AI가 생성해드립니다.
              </Text>
            </View>
          </TouchableOpacity>

          {/* 파일 업로드 옵션 */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              pressedCard === 'file' && styles.pressedCard
            ]}
            onPress={() => {}}
            onPressIn={() => setPressedCard('file')}
            onPressOut={() => setPressedCard(null)}
          >
            <View style={styles.iconContainer}>
              <View style={styles.iconPlaceholder} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>파일 업로드</Text>
              <Text style={styles.optionDescription}>
                사진첩에서 파일을 업로드 하세요.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const CARD_HEIGHT = 120; // 카드 높이 고정

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

  // Title & Subtitle
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

  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 20,
  },
  optionCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    height: CARD_HEIGHT, // 카드 높이 고정
  },
  highlightedCard: {
    backgroundColor: '#FFE5E5',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  pressedCard: {
    backgroundColor: '#FFCCCC', // 눌렀을 때 진해지는 효과
  },
  iconContainer: {
    marginRight: 16,
    marginTop: 4,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#E5E5EA',
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666',
    lineHeight: 16,
  },
});

export default AIImageGeneration;
