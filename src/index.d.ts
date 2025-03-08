declare module 'react-native-debug-console' {
  import { ReactNode } from 'react';
  import { ViewProps } from 'react-native';

  interface DebugConsoleProps extends ViewProps {
    children?: ReactNode;
  }

  function DebugConsole(props: DebugConsoleProps): JSX.Element;

  export const useLogger: () => {
    log: (...args: any[]) => void;
    error: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    info: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    clear: () => void;
  };

  export const useMemoryLeakDetection: () => void;
  export const logInterceptor: {
    setup: () => void;
    teardown: () => void;
  };
  export const memoryLeakDetector: {
    setup: () => void;
    teardown: () => void;
  };

  export default DebugConsole;
} 