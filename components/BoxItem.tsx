import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from '@/components/ThemeSet';
import { useRouter } from 'expo-router';

interface BoxItemProps {
    name: string;
    description: string;
    backgroundColor?: string;
    boxId?: string;
}

export function BoxItem({ name, description, backgroundColor, boxId }: BoxItemProps) {
    const { themeColors } = useTheme();
    const router = useRouter();
    return (
        <Pressable onPress={() => router.navigate(`./box/${boxId}`)}>
            <View style={{
                backgroundColor: backgroundColor || '#ffffff',
                paddingHorizontal: 40,
                paddingVertical: 20,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                marginHorizontal: 5,
                marginVertical: 5,
                borderColor: themeColors.dark,
                borderWidth: 6,
            }}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.desc}>{description}</Text>
            </View>
        </Pressable>
    );
}

const styles = {
    container: {},
    name: {
        fontFamily: 'Pixellari',
        fontSize: 23,
        marginBottom: 8,
    },
    desc: {
        fontFamily: 'Pixellari',
        fontSize: 16,
    },
}