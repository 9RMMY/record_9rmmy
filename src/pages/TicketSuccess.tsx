import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';

interface TicketSuccessProps {
  onBack?: () => void;
  onNext?: () => void;
  onRestart?: () => void;
}

const TicketSuccess: React.FC<TicketSuccessProps> = ({ onBack, onNext }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Auto-navigate to next screen after 5 seconds
    const timer = setTimeout(() => {
      onNext?.();
    }, 5000);

    // Scale animation for ticket
    const scaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.05, duration: 2000, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    );

    scaleAnimation.start();

    return () => {
      clearTimeout(timer);
      scaleAnimation.stop();
    };
  }, [onNext, scaleAnim]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>새로운 티켓 생성 완료~!</Text>
          <Text style={styles.subtitle}>하나의 추억을 저장했어요.</Text>

          {/* Ticket Preview */}
          <Animated.View
            style={[
              styles.ticketCard,
              { transform: [{ scale: scaleAnim }] }
            ]}
          >
            {/* Mock ticket content */}
            <View style={styles.ticketInner}>
              <View style={styles.ticketHeader}>
                <Text style={styles.ticketTitle}>JAMONG{'\n'}SALGU CLUB</Text>
                <View style={styles.starsContainer}>
                  {[...Array(8)].map((_, i) => (
                    <Text key={i} style={styles.star}>★</Text>
                  ))}
                </View>
              </View>

              <View style={styles.ticketBody}>
                <View style={styles.circleDesign}>
                  <Text style={styles.circleText}>Jamong{'\n'}Salgu{'\n'}Club</Text>
                </View>

                <View style={styles.ticketInfo}>
                  <Text style={styles.secretText}>
                    SECRET CLUB OF THOSE WHO{'\n'}WANT TO DIE (IT'S NOT ACTUALLY{'\n'}WANT TO DIE) (PLEASE)
                  </Text>
                  <Text style={styles.dateText}>
                    IF YOU JOIN TO OUR, BRING THE TICKET{'\n'}ON THE STAGE AND COME THE MUSIC ROOM
                  </Text>
                  <Text style={styles.timeText}>TOMORROW★{'\n'}AT 5PM</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: '#F2F2F7' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  backIcon: { fontSize: 24, color: '#000' },
  content: { alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', color: '#000', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, fontWeight: '400', color: '#666', textAlign: 'center', marginBottom: 40 },
  ticketCard: {
    width: 280,
    height: 400,
    backgroundColor: '#7CB342',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  ticketInner: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' },
  ticketHeader: { alignItems: 'center', marginBottom: 20 },
  ticketTitle: { fontSize: 18, fontWeight: '900', color: '#000', textAlign: 'center', letterSpacing: 1 },
  starsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 8, width: 80 },
  star: { fontSize: 12, color: '#000', margin: 2 },
  ticketBody: { alignItems: 'center', justifyContent: 'center' },
  circleDesign: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#FF6B35', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  circleText: { fontSize: 16, fontWeight: '700', color: '#FFF', textAlign: 'center', fontStyle: 'italic' },
  ticketInfo: { alignItems: 'center' },
  secretText: { fontSize: 8, fontWeight: '600', color: '#000', textAlign: 'center', marginBottom: 8 },
  dateText: { fontSize: 8, fontWeight: '500', color: '#000', textAlign: 'center', marginBottom: 8 },
  timeText: { fontSize: 10, fontWeight: '700', color: '#000', textAlign: 'center' },
});

export default TicketSuccess;
