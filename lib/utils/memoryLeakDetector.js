import logInterceptor from './logInterceptor';
class MemoryLeakDetector {
    static instance;
    components = new Map();
    thresholds = {
        instanceLimit: 10,
        timeLimit: 5000, // 5 seconds
    };
    constructor() { }
    static getInstance() {
        if (!MemoryLeakDetector.instance) {
            MemoryLeakDetector.instance = new MemoryLeakDetector();
        }
        return MemoryLeakDetector.instance;
    }
    trackComponent(component) {
        const componentName = component.constructor.name;
        let info = this.components.get(componentName);
        if (!info) {
            info = {
                name: componentName,
                mountCount: 0,
                unmountCount: 0,
                lastMountTime: Date.now(),
                instances: new Set(),
            };
            this.components.set(componentName, info);
        }
        info.mountCount++;
        info.lastMountTime = Date.now();
        info.instances.add(component);
        this.checkForLeaks(componentName);
    }
    untrackComponent(component) {
        const componentName = component.constructor.name;
        const info = this.components.get(componentName);
        if (info) {
            info.unmountCount++;
            info.instances.delete(component);
        }
    }
    checkForLeaks(componentName) {
        const info = this.components.get(componentName);
        if (!info)
            return;
        // Check for too many instances
        if (info.instances.size > this.thresholds.instanceLimit) {
            logInterceptor.log('warn', [
                `Potential memory leak detected: ${componentName} has ${info.instances.size} instances. This might indicate a memory leak.`,
                {
                    component: componentName,
                    instanceCount: info.instances.size,
                    mountCount: info.mountCount,
                    unmountCount: info.unmountCount,
                },
            ]);
        }
        // Check for components that haven't been unmounted for a long time
        const now = Date.now();
        info.instances.forEach((instance) => {
            const mountTime = info.lastMountTime;
            if (now - mountTime > this.thresholds.timeLimit) {
                logInterceptor.log('warn', [
                    `Potential memory leak detected: ${componentName} instance has been mounted for more than ${this.thresholds.timeLimit / 1000} seconds.`,
                    {
                        component: componentName,
                        mountedFor: `${(now - mountTime) / 1000} seconds`,
                    },
                ]);
            }
        });
    }
    setThresholds(thresholds) {
        this.thresholds = { ...this.thresholds, ...thresholds };
    }
    reset() {
        this.components.clear();
    }
}
export default MemoryLeakDetector.getInstance();
