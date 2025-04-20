import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from '@/components/ThemeSet';
import { useRouter } from 'expo-router';

interface BoxItemProps {
    name: string;
    description: string;
    boxId?: string;
    color?: string;
}

export function BoxItem({ name, description, boxId, color }: BoxItemProps) {
    const { themeColors } = useTheme();
    const router = useRouter();
    return (
        <View style={{
            backgroundColor: '#ffffff',
            paddingHorizontal: 40,
            paddingVertical: 30,
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
            <Pressable onPress={() => router.navigate(`./box/${boxId}`)}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.desc}>{description}</Text>
                <View style={{
                    backgroundColor: color || "#ffffff",
                    width: 25,
                    height: 25,
                    borderRadius: 15,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    position: 'absolute',
                    right: 0
                }}></View>
            </Pressable>
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