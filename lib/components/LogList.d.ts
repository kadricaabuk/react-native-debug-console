import React from 'react';
import { LogEntry } from './LogItem';
interface LogListProps {
    logs: LogEntry[];
    onEndReached?: () => void;
}
declare const LogList: React.FC<LogListProps>;
export default LogList;
