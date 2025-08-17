import React from 'react';
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

interface NewTicketProps {
  onBack?: () => void;
}

const NewTicket: React.FC<NewTicketProps> = ({ onBack }) => {
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
          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* 공연명 */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>공연명</Text>
              <TextInput
                style={styles.textInput}
                placeholder="녹리와오우 비밀주식 vol.1"
                placeholderTextColor="#000"
              />
            </View>

            {/* 일시 */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>일시</Text>
              <TextInput
                style={styles.textInput}
                placeholder="2025년 7월 23일 20시 30분"
                placeholderTextColor="#000"
              />
            </View>

            {/* 장소 */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>장소</Text>
              <TextInput
                style={styles.textInput}
                placeholder="사운드시티 합정"
                placeholderTextColor="#000"
              />
            </View>

            {/* 출연 */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>출연</Text>
              <TextInput
                style={styles.textInput}
                placeholder="투 데이 운드 스니커즈"
                placeholderTextColor="#000"
              />
            </View>

            {/* 좌석번호 */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>좌석번호</Text>
              <TextInput
                style={styles.textInput}
                placeholder="22번"
                placeholderTextColor="#000"
              />
            </View>

            {/* 공연장르 */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>공연장르</Text>
              <TextInput
                style={styles.textInput}
                placeholder="밴드"
                placeholderTextColor="#000"
              />
            </View>

            {/* 예매처 */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>예매처</Text>
              <TextInput
                style={styles.textInput}
                placeholder="네이버 티켓"
                placeholderTextColor="#000"
              />
            </View>
          </View>

          {/* Complete Button */}
          <TouchableOpacity style={styles.completeButton}>
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
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  textInput: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
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