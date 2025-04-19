import { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ColorPicker, { Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import { useTheme } from '@/components/ThemeSet';

interface ColorPickProps {
    value: string;
    onChange: (color: string) => void;
}

export const ColorPick = ({ value, onChange }: ColorPickProps) => {
    const { themeColors } = useTheme();

    const onSelectColor = ({ hex }: { hex: string }) => {
        'worklet';
        console.log(hex);
        onChange(hex);
    };

    return (
        <View>
            <Text style={styles.label}>Color Tag</Text>
            <ColorPicker style={{ width: '70%' }} value='#d00000' onComplete={onSelectColor}>
                <View style={[styles.field, { backgroundColor: themeColors.search }]}>
                    <View style={styles.preview}>
                        <Preview hideInitialColor={true} hideText={true} style={styles.prev} />
                    </View>
                    <View style={styles.slct}>
                        <Swatches colors={["#d00000", "#ff9a26", "#f2f223", "#46da32", "#72d3f6", "#b459ed"]} />
                    </View>
                </View>
            </ColorPicker>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Pixellari',
        fontSize: 24,
        marginBottom: 10,
    },
    field: {
        width: 450,
        height: 60,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderWidth: 1,
    },
    prev: {
        width: 30,
        height: 30,
        borderRadius: 20,
    },
    preview: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRightWidth: 1,
    },
    slct: {
        flex: 1,
        justifyContent: 'space-evenly',
        marginVertical: 10,
        marginHorizontal: 20
    },
});