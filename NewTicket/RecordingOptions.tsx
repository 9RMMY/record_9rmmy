import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  RecordingOptions: undefined;
  WriteReview: { method: 'record' | 'upload' | 'write' };
};

type RecordingOptionsScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'RecordingOptions'
>;

const RecordingOptions: React.FC = () => {
  const navigation = useNavigation<RecordingOptionsScreenProp>();

  const handleSelect = (option: 'record' | 'upload' | 'write') => {
    navigation.navigate('WriteReview', { method: option });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>공연 후기 작성하기</Text>
          <Text style={styles.subtitle}>
            오늘 공연에서 기억에 남는 장면은 무엇인가요?
          </Text>
        </View>

        {/* Options */}
        <View style={styles.content}>
          {/* 음성녹음 */}
          <TouchableOpacity
            style={[styles.optionCard, styles.highlightedCard]}
            onPress={() => handleSelect('record')}
          >
            <View style={styles.iconPlaceholder} />
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>음성녹음</Text>
              <Text style={styles.optionDescription}>
                마이크를 켤 수 있으면 사용하세요.{'\n'}
                마이크를 켜고 녹음을 해보자
              </Text>
            </View>
          </TouchableOpacity>

          {/* 녹음 파일 업로드 */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => handleSelect('upload')}
          >
            <View style={styles.iconPlaceholder} />
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>녹음 파일 업로드</Text>
              <Text style={styles.optionDescription}>
                녹음한 파일을 모아 정리하고 싶다면{'\n'}
                업로드해서 후기를 작성하세요.
              </Text>
            </View>
          </TouchableOpacity>

          {/* 직접 작성 */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => handleSelect('write')}
          >
            <View style={styles.iconPlaceholder} />
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>직접 작성</Text>
              <Text style={styles.optionDescription}>
                마이크도 없고 녹음도 없다면{'\n'}
                키보드로 직접 작성하세요.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
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
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#000',
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
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
    paddingTop: 10,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  highlightedCard: {
    backgroundColor: '#E85C5C',
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E5E5EA',
    marginRight: 16,
  },
  textContainer: { flex: 1 },
  optionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  optionDescription: {
    fontSize: 12,
    color: '#444',
    lineHeight: 16,
  },
});

export default RecordingOptions;
