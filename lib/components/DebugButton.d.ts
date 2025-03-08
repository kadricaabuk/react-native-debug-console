import { ViewStyle } from 'react-native';
interface DebugButtonProps {
    onPress: () => void;
    style?: ViewStyle;
}
declare function DebugButton({ onPress, style }: DebugButtonProps): JSX.Element;
export default DebugButton;
