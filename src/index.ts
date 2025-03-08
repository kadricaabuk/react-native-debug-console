import DebugConsole from './components/DebugConsole';
import { useLogger } from './hooks/useLogger';
import { useMemoryLeakDetection } from './hooks/useMemoryLeakDetection';
import logInterceptor from './utils/logInterceptor';
import memoryLeakDetector from './utils/memoryLeakDetector';

export {
  DebugConsole,
  useLogger,
  useMemoryLeakDetection,
  logInterceptor,
  memoryLeakDetector,
};

export default DebugConsole; 