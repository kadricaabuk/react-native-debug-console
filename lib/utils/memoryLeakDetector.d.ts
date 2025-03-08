import { Component } from 'react';
declare class MemoryLeakDetector {
    private static instance;
    private components;
    private thresholds;
    private constructor();
    static getInstance(): MemoryLeakDetector;
    trackComponent(component: Component): void;
    untrackComponent(component: Component): void;
    private checkForLeaks;
    setThresholds(thresholds: Partial<typeof this.thresholds>): void;
    reset(): void;
}
declare const _default: MemoryLeakDetector;
export default _default;
