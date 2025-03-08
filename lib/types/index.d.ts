export type LogLevel = 'log' | 'warn' | 'error' | 'info' | 'debug';
export interface LogEntry {
    timestamp: number;
    level: LogLevel;
    message: string;
    stack?: string;
    metadata?: Record<string, any>;
}
export interface DebugConsoleConfig {
    enabled: boolean;
    enabledInRelease?: boolean;
    allowedAppVersions?: string[];
    logFilters?: {
        levels?: LogLevel[];
        search?: string;
    };
    gesture?: {
        enabled: boolean;
        type: 'shake' | 'longPress' | 'triple-tap';
    };
    memoryLeakDetection?: {
        enabled: boolean;
        threshold?: number;
        checkInterval?: number;
    };
}
