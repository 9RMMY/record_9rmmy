import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface NewTicketFormProps {
  selectedGenre: '밴드' | '연극/뮤지컬';
  setSelectedGenre: (genre: '밴드' | '연극/뮤지컬') => void;
  onNext: () => void;
}

const NewTicketForm: React.FC<NewTicketFormProps> = ({ selectedGenre, setSelectedGenre, onNext }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
      {['공연명', '일시', '장소', '출연', '좌석번호', '예매처'].map(label => (
        <View style={styles.inlineField} key={label}>
          <Text style={styles.inlineLabel}>{label}</Text>
          <TextInput style={styles.inlineInput} placeholder={`${label}을 입력하세요.`} placeholderTextColor="#A0A0A0" />
        </View>
      ))}

      <View style={styles.radioField}>
        <Text style={styles.inlineLabel}>공연장르</Text>
        <View style={styles.radioGroup}>
          {['밴드', '연극/뮤지컬'].map(genre => (
            <TouchableOpacity key={genre} style={styles.radioOption} onPress={() => setSelectedGenre(genre as '밴드' | '연극/뮤지컬')}>
              <View style={styles.radioCircle}>{selectedGenre === genre && <View style={styles.radioDot} />}</View>
              <Text style={styles.radioLabel}>{genre}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.completeButton} onPress={onNext}>
        <Text style={styles.completeButtonText}>완료</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: { flex: 1 },
  inlineField: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E5E5EA', marginBottom: 20 },
  inlineLabel: { width: 80, fontSize: 14, fontWeight: '600' },
  inlineInput: { flex: 1, fontSize: 16, paddingVertical: 8 },
  radioField: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  radioGroup: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  radioOption: { flexDirection: 'row', alignItems: 'center' },
  radioCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#FF3B30', justifyContent: 'center', alignItems: 'center', marginRight: 6 },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF3B30' },
  radioLabel: { fontSize: 16 },
  completeButton: { backgroundColor: '#FF3B30', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 20 },
  completeButtonText: { color: '#FFF', fontWeight: '600', fontSize: 16 },
});

export default NewTicketForm;
