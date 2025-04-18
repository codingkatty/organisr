import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function BoxScreen() {
    const { id } = useLocalSearchParams();
    return (
        <Text>box</Text>
    );
}