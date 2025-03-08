import React, { useState, useCallback } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import LogList from './LogList';
import DebugButton from './DebugButton';
import { LogEntry } from './LogItem';

interface DebugConsoleProps {
  isEnabled?: boolean;
}

const MODAL_HEIGHT = Dimensions.get('window').height * 0.7;

function DebugConsole({ isEnabled = __DEV__ }: DebugConsoleProps): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const translateY = React.useRef(new Animated.Value(MODAL_HEIGHT)).current;

  const animatedStyle = {
    transform: [{ translateY }],
  };

  const handleOpen = useCallback(() => {
    setIsVisible(true);
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  const handleClose = useCallback(() => {
    Animated.spring(translateY, {
      toValue: MODAL_HEIGHT,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
    });
  }, [translateY]);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <Modal
        visible={isVisible}
        transparent
        animationType="none"
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, animatedStyle]}>
            <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.title}>Debug Console</Text>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={clearLogs} style={styles.button}>
                    <Text style={styles.buttonText}>Clear</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleClose} style={styles.button}>
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <LogList logs={logs} />
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>
      <DebugButton onPress={handleOpen} />
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: MODAL_HEIGHT,
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2C2C2E',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actions: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 15,
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 17,
  },
});

export default DebugConsole; 