import React from 'react';
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
declare const LogItem: React.FC<LogItemProps>;
export default LogItem;
