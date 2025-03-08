class LogInterceptor {
    static instance;
    callbacks = new Set();
    originalConsoleMethods = {
        log: console.log.bind(console),
        info: console.info.bind(console),
        warn: console.warn.bind(console),
        error: console.error.bind(console),
        debug: console.debug.bind(console),
    };
    constructor() {
        this.interceptConsoleMethods();
    }
    static getInstance() {
        if (!LogInterceptor.instance) {
            LogInterceptor.instance = new LogInterceptor();
        }
        return LogInterceptor.instance;
    }
    subscribe(callback) {
        this.callbacks.add(callback);
        return () => {
            this.callbacks.delete(callback);
        };
    }
    clear() {
        this.callbacks.clear();
    }
    restore() {
        Object.entries(this.originalConsoleMethods).forEach(([method, originalFn]) => {
            console[method] = originalFn;
        });
    }
    log(level, args) {
        const entry = {
            timestamp: Date.now(),
            level,
            message: this.formatMessage(args[0]),
            data: args.length > 1 ? args.slice(1) : undefined,
        };
        this.callbacks.forEach((callback) => callback(entry));
    }
    interceptConsoleMethods() {
        const methodsToIntercept = [
            'log',
            'info',
            'warn',
            'error',
            'debug',
        ];
        methodsToIntercept.forEach((method) => {
            const originalFn = this.originalConsoleMethods[method];
            console[method] = (...args) => {
                this.log(method, args);
                originalFn(...args);
            };
        });
    }
    formatMessage(message) {
        if (typeof message === 'string') {
            return message;
        }
        try {
            return JSON.stringify(message, null, 2);
        }
        catch (error) {
            return String(message);
        }
    }
}
export default LogInterceptor.getInstance();
