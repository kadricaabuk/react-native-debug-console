import { LogEntry } from '../components/LogItem';
interface UseLoggerOptions {
    maxLogs?: number;
    filter?: (entry: LogEntry) => boolean;
}
export declare const useLogger: (options?: UseLoggerOptions) => {
    logs: LogEntry[];
    clearLogs: () => void;
    exportLogs: () => string;
};
export {};
