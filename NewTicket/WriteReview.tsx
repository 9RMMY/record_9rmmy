import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  WriteReview: undefined;
  AIImageGeneration: { review: string };
};

type WriteReviewScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'WriteReview'
>;

const WriteReview: React.FC = () => {
  const navigation = useNavigation<WriteReviewScreenProp>();
  const [review, setReview] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleComplete = () => {
    // 작성한 리뷰를 AIImageGeneration 화면으로 전달하며 이동
    navigation.navigate('AIImageGeneration', { review });
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

        {/* Recording Button + TextArea */}
        <View style={styles.content}>
          <TouchableOpacity style={styles.recordButton}>
            <Text style={styles.recordIcon}>⏺</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.textArea}
            multiline
            placeholder="여기에 후기를 작성하세요..."
            value={review}
            onChangeText={setReview}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleComplete}>
          <Text style={styles.submitText}>완료</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingBottom: 16,
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
    alignItems: 'flex-start',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  recordButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    backgroundColor: '#FEECEC',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordIcon: {
    fontSize: 20,
    color: '#D32F2F',
  },
  textArea: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#FFF',
    padding: 16,
    textAlignVertical: 'top',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  submitButton: {
    backgroundColor: '#B71C1C',
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WriteReview;
