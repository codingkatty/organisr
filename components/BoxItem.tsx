import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { View } from 'react-native';
import { useTheme } from '@/components/ThemeSet';

interface BoxItemProps {
    name: string;
    description: string;
    backgroundColor?: string;
}

export function BoxItem({ name, description, backgroundColor }: BoxItemProps) {
    const { themeColors } = useTheme();
    return (
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
            <ThemedText style={styles.name}>{name}</ThemedText>
            <ThemedText style={styles.desc}>{description}</ThemedText>
        </View>
    );
}

const styles = {
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