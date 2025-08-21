import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface OptionCardProps {
  title: string;
  description: string;
  highlighted?: boolean;
  onPress: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ title, description, highlighted, onPress }) => (
  <TouchableOpacity
    style={[styles.card, highlighted && styles.highlightedCard]}
    onPress={onPress}
  >
    <View style={styles.iconPlaceholder} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
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
  highlightedCard: { backgroundColor: '#E85C5C' },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E5E5EA',
    marginRight: 16,
  },
  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', color: '#000', marginBottom: 6 },
  description: { fontSize: 12, color: '#444', lineHeight: 16 },
});

export default OptionCard;
