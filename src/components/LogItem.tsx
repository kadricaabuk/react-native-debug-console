import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type LogLevel = 'log' | 'warn' | 'error' | 'info' | 'debug';

export interface LogEntry {
  timestamp: number;
  level: LogLevel;
  message: string;
  data?: any;
}

interface LogItemProps {
  entry: LogEntry;
}

const LogItem: React.FC<LogItemProps> = ({ entry }) => {
  const getLogLevelColor = (level: LogLevel): string => {
    switch (level) {
      case 'error':
        return '#FF3B30';
      case 'warn':
        return '#FFCC00';
      case 'info':
        return '#5856D6';
      case 'debug':
        return '#34C759';
      default:
        return '#FFFFFF';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.level, { color: getLogLevelColor(entry.level) }]}>
          {entry.level.toUpperCase()}
        </Text>
        <Text style={styles.timestamp}>
          {new Date(entry.timestamp).toLocaleTimeString()}
        </Text>
      </View>
      <Text style={styles.message}>{entry.message}</Text>
      {entry.data && (
        <Text style={styles.data}>
          {JSON.stringify(entry.data, null, 2)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2C2C2E',
    backgroundColor: '#1C1C1E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  level: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: '#8E8E93',
  },
  message: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  data: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'monospace',
  },
});

export default LogItem; 