import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { ThemeIcon } from '@/components/MyIcons';
import { useTheme } from '@/components/ThemeSet';

interface ThemeSelectorProps {
    theme: 'purple' | 'blue' | 'pink' | 'yellow' | 'green' | 'mint' | 'lavander' | 'candy' | 'boba' | 'grape' | 'beige' | 'pastel' | 'icecream' | 'dirt' | 'neon' | 'water' | 'flame' | 'pine' | 'retro';
    color: string;
}

export function ThemeSelector(props: ThemeSelectorProps) {
    const { current, setTheme, themeColors } = useTheme();
    const isActive = current === props.theme;
    
    return (
        <View style={[
            styles.container,
            isActive && { borderWidth: 10, borderColor: themeColors.dark }
        ]}>
            <Pressable onPress={() => setTheme(props.theme)}>
                <ThemeIcon width={150} height={150} color={props.color} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 8,
        borderColor: 'black',
        margin: 20,
    }
});