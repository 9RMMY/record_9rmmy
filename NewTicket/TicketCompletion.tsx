import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';

interface TicketCompletionProps {
  onBack?: () => void;
  onNext?: () => void;
}

const TicketCompletion: React.FC<TicketCompletionProps> = ({ onBack, onNext }) => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>이미지가 완성되었어요!</Text>
          
          {/* Ticket Image */}
          <View style={styles.ticketContainer}>
            <View style={styles.ticketCard}>
              {/* Mock ticket design - replace with actual generated image */}
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
                  <Text style={styles.secretText}>SECRET CLUB OF THOSE WHO{'\n'}WANT TO DIE (IT'S NOT ACTUALLY{'\n'}WANT TO DIE) (PLEASE)</Text>
                  <Text style={styles.dateText}>IF YOU JOIN TO OUR, BRING THE TICKET{'\n'}ON THE STAGE AND COME THE MUSIC ROOM</Text>
                  <Text style={styles.timeText}>TOMORROW★{'\n'}AT 5PM</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.regenerateButton}>
              <Text style={styles.regenerateButtonText}>다시 생성하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onNext}>
              <Text style={styles.confirmButtonText}>확정하기</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '400',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 40,
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  ticketCard: {
    width: 280,
    height: 400,
    backgroundColor: '#7CB342',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  ticketHeader: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 1,
  },
  starsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    width: 80,
  },
  star: {
    fontSize: 12,
    color: '#000',
    marginRight: 4,
    marginBottom: 2,
  },
  ticketBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDesign: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  circleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  ticketInfo: {
    alignItems: 'center',
  },
  secretText: {
    fontSize: 8,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 8,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 40,
  },
  regenerateButton: {
    flex: 1,
    backgroundColor: '#FFE5E5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  regenerateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default TicketCompletion;
