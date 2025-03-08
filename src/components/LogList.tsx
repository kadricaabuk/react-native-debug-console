import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import LogItem, { LogEntry } from './LogItem';

interface LogListProps {
  logs: LogEntry[];
  onEndReached?: () => void;
}

const LogList: React.FC<LogListProps> = ({ logs, onEndReached }) => {
  const renderItem = ({ item }: { item: LogEntry }) => (
    <LogItem entry={item} />
  );

  const keyExtractor = (item: LogEntry) => `${item.timestamp}-${item.message}`;

  return (
    <View style={styles.container}>
      <FlatList
        data={logs}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        initialNumToRender={20}
        maxToRenderPerBatch={10}
        windowSize={5}
        inverted
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
});

export default LogList; 