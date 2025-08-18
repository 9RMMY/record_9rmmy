import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

interface RecordingOptionsProps {
  onBack?: () => void;
  onNext?: () => void;
}

const RecordingOptions: React.FC<RecordingOptionsProps> = ({ onBack, onNext }) => {
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
            <Text style={styles.headerTitle}>공연후기 작성하기</Text>
            <Text style={styles.headerSubtitle}>오늘 공연에서 가장에 남는 장면은 무엇인가요?</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          {/* 음성녹음 옵션 */}
          <TouchableOpacity style={[styles.optionCard, styles.highlightedCard]} onPress={onNext}>
            <View style={styles.iconContainer}>
              <View style={styles.iconPlaceholder} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>음성녹음</Text>
              <Text style={styles.optionDescription}>
                마이크를 켜고 음성으로 사용하세요.{'\n'}
                마이크를 켜고 녹음을 해보세요!{'\n'}
                AMRO 아직메뉴는 못
              </Text>
            </View>
          </TouchableOpacity>

          {/* 녹음 파일 업로드 옵션 */}
          <TouchableOpacity style={styles.optionCard}>
            <View style={styles.iconContainer}>
              <View style={styles.iconPlaceholder} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>녹음 파일 업로드</Text>
              <Text style={styles.optionDescription}>
                녹음한 파일을 업로드해서 정리하고 그것으로{'\n'}
                이걸 쓰세요 쓰세요 쓰세요 쓰세요
              </Text>
            </View>
          </TouchableOpacity>

          {/* 직접 작성 옵션 */}
          <TouchableOpacity style={styles.optionCard}>
            <View style={styles.iconContainer}>
              <View style={styles.iconPlaceholder} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>직접 작성</Text>
              <Text style={styles.optionDescription}>
                마이크로 못쓰고 녹음도 없으면 직접{'\n'}
                키보드로 직접 작성을
              </Text>
            </View>
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
  placeholder: {
    width: 44,
    height: 44,
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
  },
  highlightedCard: {
    backgroundColor: '#FFE5E5',
    borderWidth: 1,
    borderColor: '#FF3B30',
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

export default RecordingOptions;
