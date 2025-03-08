import { useEffect } from 'react';
import memoryLeakDetector from '../utils/memoryLeakDetector';
export const useMemoryLeakDetection = (component) => {
    useEffect(() => {
        memoryLeakDetector.trackComponent(component);
        return () => {
            memoryLeakDetector.untrackComponent(component);
        };
    }, [component]);
};
