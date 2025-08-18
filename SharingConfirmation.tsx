import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

interface SharingConfirmationProps {
  onBack?: () => void;
  onComplete?: (isPublic: boolean) => void;
}

const SharingConfirmation: React.FC<SharingConfirmationProps> = ({ onBack, onComplete }) => {
  const handlePrivateSelect = () => {
    onComplete?.(false); // false = private
  };

  const handlePublicSelect = () => {
    onComplete?.(true); // true = public
  };

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
          <Text style={styles.title}>"들리와요 비밀함주실! vol.1"{'\n'}친구들에게 공개할까요?</Text>
          <Text style={styles.subtitle}>친구들이 내가 쓴 후기를 볼 수 있어요.</Text>

          {/* Ticket Preview */}
          <View style={styles.ticketContainer}>
            <View style={styles.ticketCard}>
              {/* Mock ticket design */}
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
            <TouchableOpacity style={styles.privateButton} onPress={onComplete}>
              <Text style={styles.privateButtonText}>아니요</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={onComplete}>
              <Text style={styles.shareButtonText}>공개할게요</Text>
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
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
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
    width: 240,
    height: 340,
    backgroundColor: '#7CB342',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  ticketHeader: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 1,
  },
  starsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    width: 70,
  },
  star: {
    fontSize: 10,
    color: '#000',
    marginRight: 3,
    marginBottom: 2,
  },
  ticketBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDesign: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  circleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  ticketInfo: {
    alignItems: 'center',
  },
  secretText: {
    fontSize: 7,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 6,
  },
  dateText: {
    fontSize: 7,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    marginBottom: 6,
  },
  timeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 40,
    width: '100%',
  },
  privateButton: {
    flex: 1,
    backgroundColor: '#FFE5E5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  privateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default SharingConfirmation;
