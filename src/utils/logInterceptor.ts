import { LogEntry, LogLevel } from '../components/LogItem';

type LogCallback = (entry: LogEntry) => void;
type ConsoleMethod = 'log' | 'info' | 'warn' | 'error' | 'debug';
type ConsoleMethodFunction = (...args: any[]) => void;

class LogInterceptor {
  private static instance: LogInterceptor;
  private callbacks: Set<LogCallback> = new Set();
  private originalConsoleMethods: Record<ConsoleMethod, ConsoleMethodFunction> = {
    log: console.log.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    debug: console.debug.bind(console),
  };

  private constructor() {
    this.interceptConsoleMethods();
  }

  public static getInstance(): LogInterceptor {
    if (!LogInterceptor.instance) {
      LogInterceptor.instance = new LogInterceptor();
    }
    return LogInterceptor.instance;
  }

  public subscribe(callback: LogCallback): () => void {
    this.callbacks.add(callback);
    return () => {
      this.callbacks.delete(callback);
    };
  }

  public clear(): void {
    this.callbacks.clear();
  }

  public restore(): void {
    (Object.entries(this.originalConsoleMethods) as [ConsoleMethod, ConsoleMethodFunction][]).forEach(
      ([method, originalFn]) => {
        (console as Record<ConsoleMethod, ConsoleMethodFunction>)[method] = originalFn;
      }
    );
  }

  public log(level: LogLevel, args: any[]): void {
    const entry: LogEntry = {
      timestamp: Date.now(),
      level,
      message: this.formatMessage(args[0]),
      data: args.length > 1 ? args.slice(1) : undefined,
    };

    this.callbacks.forEach((callback) => callback(entry));
  }

  private interceptConsoleMethods(): void {
    const methodsToIntercept: ConsoleMethod[] = [
      'log',
      'info',
      'warn',
      'error',
      'debug',
    ];

    methodsToIntercept.forEach((method) => {
      const originalFn = this.originalConsoleMethods[method];
      
      (console as Record<ConsoleMethod, ConsoleMethodFunction>)[method] = (...args: any[]) => {
        this.log(method as LogLevel, args);
        originalFn(...args);
      };
    });
  }

  private formatMessage(message: any): string {
    if (typeof message === 'string') {
      return message;
    }
    try {
      return JSON.stringify(message, null, 2);
    } catch (error) {
      return String(message);
    }
  }
}

export default LogInterceptor.getInstance(); 