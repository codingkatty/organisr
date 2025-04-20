import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from '@/components/ThemeSet';

interface BoxItemProps {
    name: string;
    backgroundColor?: string;
    onPress?: () => void;
}

export function Item({ name, backgroundColor, onPress }: BoxItemProps) {
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
            <Pressable
                onPress={onPress}
            >
                <Text style={styles.name}>{name}</Text>
            </Pressable>
        </View>
    );
}

const styles = {
    container: {
        paddingHorizontal: 40,
        paddingVertical: 18,
        marginVertical: 5,
        borderWidth: 4,
    },
    name: {
        fontFamily: 'Pixellari',
        fontSize: 26,
        marginBottom: 8,
    },
}