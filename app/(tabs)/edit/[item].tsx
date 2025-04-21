import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { Text } from "react-native";

export default function EditBoxScreen() {
    const { item } = useLocalSearchParams<{ item: string }>();
    return (
        <ThemedView style={{ flex: 1 }}>
            <Text>Edit Item {item}</Text>
        </ThemedView>
    );
}