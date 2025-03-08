import { useEffect } from 'react';
import { Component } from 'react';
import memoryLeakDetector from '../utils/memoryLeakDetector';

export const useMemoryLeakDetection = (component: Component) => {
  useEffect(() => {
    memoryLeakDetector.trackComponent(component);
    return () => {
      memoryLeakDetector.untrackComponent(component);
    };
  }, [component]);
}; 