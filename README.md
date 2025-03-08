# React Native Debug Console

A development-only debug console for React Native applications that helps you monitor and debug your app in real-time.

[![npm version](https://img.shields.io/npm/v/react-native-debug-console.svg)](https://www.npmjs.com/package/react-native-debug-console)
[![license](https://img.shields.io/npm/l/react-native-debug-console.svg)](https://github.com/kadricabuk/react-native-debug-console/blob/main/LICENSE)

## Features

- 📱 In-app console overlay for real-time debugging
- 🔍 Log inspection without needing external tools
- 🧠 Memory usage monitoring
- 🚨 Error and warning visualization
- 🔄 Network request tracking
- 🔌 Development-only (automatically disabled in production)

## Installation

```bash
# Using npm
npm install react-native-debug-console --save-dev

# Using yarn
yarn add react-native-debug-console --dev
```

## Quick Start

```jsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { DebugConsole, useDebugConsole } from 'react-native-debug-console';

const App = () => {
  const { log, warn, error } = useDebugConsole();

  const triggerLog = () => {
    log('Button pressed', { timestamp: new Date() });
  };

  const triggerWarning = () => {
    warn('This is a warning');
  };

  const triggerError = () => {
    error('This is an error', new Error('Sample error'));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>React Native Debug Console Demo</Text>
      <Button title="Log Message" onPress={triggerLog} />
      <Button title="Trigger Warning" onPress={triggerWarning} />
      <Button title="Trigger Error" onPress={triggerError} />
      
      {/* Add the DebugConsole component at the root of your app */}
      <DebugConsole />
    </View>
  );
};

export default App;
```

## API Reference

### `<DebugConsole />` Component

The main component that renders the debug console overlay.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | boolean | `__DEV__` | Enable or disable the debug console |
| `initiallyVisible` | boolean | `false` | Show the console when the app starts |
| `maxLogs` | number | `100` | Maximum number of logs to keep in history |
| `opacity` | number | `0.9` | Opacity of the console overlay |
| `position` | 'top' \| 'bottom' | `'bottom'` | Position of the console on screen |
| `theme` | 'dark' \| 'light' | `'dark'` | Console color theme |

### `useDebugConsole()` Hook

A hook that provides logging functions to use throughout your app.

#### Returns

| Function | Parameters | Description |
|----------|------------|-------------|
| `log` | `(message: string, data?: any)` | Log informational messages |
| `warn` | `(message: string, data?: any)` | Log warning messages |
| `error` | `(message: string, error?: Error)` | Log error messages |
| `clear` | `()` | Clear all logs |
| `show` | `()` | Show the console |
| `hide` | `()` | Hide the console |
| `toggle` | `()` | Toggle console visibility |

### `DebugConsoleProvider` Component

Provider component that should wrap your app if you want to use the `useDebugConsole` hook.

```jsx
import { DebugConsoleProvider } from 'react-native-debug-console';

const App = () => (
  <DebugConsoleProvider>
    {/* Your app components */}
  </DebugConsoleProvider>
);
```

## Advanced Usage

### Network Request Monitoring

The debug console automatically captures network requests when enabled:

```jsx
import { DebugConsole } from 'react-native-debug-console';

const App = () => (
  <>
    {/* Your app components */}
    <DebugConsole captureNetworkRequests={true} />
  </>
);
```

### Memory Leak Detection

Enable memory leak detection to identify potential issues:

```jsx
import { DebugConsole } from 'react-native-debug-console';

const App = () => (
  <>
    {/* Your app components */}
    <DebugConsole detectMemoryLeaks={true} />
  </>
);
```

### Custom Log Transport

Send logs to a remote service:

```jsx
import { DebugConsole } from 'react-native-debug-console';

const customTransport = (level, message, data) => {
  // Send to your logging service
  MyLoggingService.send({ level, message, data });
};

const App = () => (
  <>
    {/* Your app components */}
    <DebugConsole transport={customTransport} />
  </>
);
```

## Production Usage

The debug console is automatically disabled in production builds. If you need to explicitly control this:

```jsx
import { DebugConsole } from 'react-native-debug-console';

const App = () => (
  <>
    {/* Your app components */}
    <DebugConsole enabled={__DEV__ || someOtherCondition} />
  </>
);
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 