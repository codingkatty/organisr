import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/components/ThemeSet';

interface BoxItemProps {
    name: string;
    backgroundColor?: string;
}

export function Item({ name, backgroundColor }: BoxItemProps) {
    const { themeColors } = useTheme();
    return (
        <View style={[styles.container, {
            backgroundColor: backgroundColor || '#ffffff',
            borderColor: themeColors.dark,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
        }]}>
            <Text style={styles.name}>{name}</Text>
        </View>
    );
}

const styles = {
    container: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        marginHorizontal: 5,
        marginVertical: 5,
        borderWidth: 6,
    },
    name: {
        fontFamily: 'Pixellari',
        fontSize: 26,
        marginBottom: 8,
    }
}