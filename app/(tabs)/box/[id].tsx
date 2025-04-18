import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getBoxData } from '@/utils/filesys'
import { useState, useEffect } from 'react';

export default function BoxScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [boxData, setBoxData] = useState<any>(null);

    useEffect(() => {
        getBoxData(id).then(data => setBoxData(data));
    }, [id]);

    return (
        <View style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>
        <Text>{boxData?.name}</Text></View>
    );
}