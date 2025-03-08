import { Component } from 'react';
import logInterceptor from './logInterceptor';

interface ComponentInfo {
  name: string;
  mountCount: number;
  unmountCount: number;
  lastMountTime: number;
  instances: Set<Component>;
}

class MemoryLeakDetector {
  private static instance: MemoryLeakDetector;
  private components: Map<string, ComponentInfo> = new Map();
  private thresholds = {
    instanceLimit: 10,
    timeLimit: 5000, // 5 seconds
  };

  private constructor() {}

  public static getInstance(): MemoryLeakDetector {
    if (!MemoryLeakDetector.instance) {
      MemoryLeakDetector.instance = new MemoryLeakDetector();
    }
    return MemoryLeakDetector.instance;
  }

  public trackComponent(component: Component): void {
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

  public untrackComponent(component: Component): void {
    const componentName = component.constructor.name;
    const info = this.components.get(componentName);

    if (info) {
      info.unmountCount++;
      info.instances.delete(component);
    }
  }

  private checkForLeaks(componentName: string): void {
    const info = this.components.get(componentName);
    if (!info) return;

    // Check for too many instances
    if (info.instances.size > this.thresholds.instanceLimit) {
      logInterceptor.log('warn', [
        `Potential memory leak detected: ${componentName} has ${
          info.instances.size
        } instances. This might indicate a memory leak.`,
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
          `Potential memory leak detected: ${componentName} instance has been mounted for more than ${
            this.thresholds.timeLimit / 1000
          } seconds.`,
          {
            component: componentName,
            mountedFor: `${(now - mountTime) / 1000} seconds`,
          },
        ]);
      }
    });
  }

  public setThresholds(thresholds: Partial<typeof this.thresholds>): void {
    this.thresholds = { ...this.thresholds, ...thresholds };
  }

  public reset(): void {
    this.components.clear();
  }
}

export default MemoryLeakDetector.getInstance(); 