import { LogEntry, LogLevel } from '../components/LogItem';
type LogCallback = (entry: LogEntry) => void;
declare class LogInterceptor {
    private static instance;
    private callbacks;
    private originalConsoleMethods;
    private constructor();
    static getInstance(): LogInterceptor;
    subscribe(callback: LogCallback): () => void;
    clear(): void;
    restore(): void;
    log(level: LogLevel, args: any[]): void;
    private interceptConsoleMethods;
    private formatMessage;
}
declare const _default: LogInterceptor;
export default _default;
