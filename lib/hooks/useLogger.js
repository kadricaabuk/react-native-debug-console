import { useState, useEffect, useCallback } from 'react';
import logInterceptor from '../utils/logInterceptor';
export const useLogger = (options = {}) => {
    const { maxLogs = 1000, filter } = options;
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        const unsubscribe = logInterceptor.subscribe((entry) => {
            if (filter && !filter(entry)) {
                return;
            }
            setLogs((currentLogs) => {
                const newLogs = [entry, ...currentLogs];
                return newLogs.slice(0, maxLogs);
            });
        });
        return () => {
            unsubscribe();
        };
    }, [maxLogs, filter]);
    const clearLogs = useCallback(() => {
        setLogs([]);
    }, []);
    const exportLogs = useCallback(() => {
        const logText = logs
            .map((log) => `[${new Date(log.timestamp).toISOString()}] ${log.level.toUpperCase()}: ${log.message}${log.data ? '\n' + JSON.stringify(log.data, null, 2) : ''}`)
            .join('\n\n');
        // You can implement different export methods here
        console.log('Exported Logs:\n', logText);
        return logText;
    }, [logs]);
    return {
        logs,
        clearLogs,
        exportLogs,
    };
};
