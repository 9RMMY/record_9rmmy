import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface TicketCardProps {
  title: string;
  stars?: number;
  circleText?: string;
  secretText?: string;
  dateText?: string;
  timeText?: string;
  width?: number;   // <- 추가
  height?: number;  // <- 추가
}

const TicketCard: React.FC<TicketCardProps> = ({
  title,
  stars = 8,
  circleText,
  secretText,
  dateText,
  timeText,
  width = 240,     // 기본값
  height = 340,    // 기본값
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [scaleAnim]);

  return (
    <Animated.View style={[styles.card, { width, height, transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.starsContainer}>
          {[...Array(stars)].map((_, i) => (
            <Text key={i} style={styles.star}>★</Text>
          ))}
        </View>
      </View>

      <View style={styles.body}>
        {circleText && (
          <View style={styles.circle}>
            <Text style={styles.circleText}>{circleText}</Text>
          </View>
        )}

        <View style={styles.info}>
          {secretText && <Text style={styles.secretText}>{secretText}</Text>}
          {dateText && <Text style={styles.dateText}>{dateText}</Text>}
          {timeText && <Text style={styles.timeText}>{timeText}</Text>}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#7CB342',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  header: { alignItems: 'flex-start', marginBottom: 16 },
  title: { fontSize: 16, fontWeight: '900', color: '#000', letterSpacing: 1 },
  starsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 6, width: 70 },
  star: { fontSize: 10, color: '#000', marginRight: 3, marginBottom: 2 },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  circle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#FF6B35', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  circleText: { fontSize: 14, fontWeight: '700', color: '#FFF', textAlign: 'center', fontStyle: 'italic' },
  info: { alignItems: 'center' },
  secretText: { fontSize: 7, fontWeight: '600', color: '#000', textAlign: 'center', marginBottom: 6 },
  dateText: { fontSize: 7, fontWeight: '500', color: '#000', textAlign: 'center', marginBottom: 6 },
  timeText: { fontSize: 9, fontWeight: '700', color: '#000', textAlign: 'center' },
});

export default TicketCard;
