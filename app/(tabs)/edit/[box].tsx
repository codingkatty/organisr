import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, Pressable, useColorScheme, Alert } from 'react-native';
import { FormInput, FormSelect, FormMulti } from '@/components/TextInput';
import { useTheme } from '@/components/ThemeSet';
import { editBox, getBoxData, getBoxImage } from '@/utils/filesys';
import { ColorPick } from '@/components/ColorPicker';
import { ImagePick } from '@/components/ImagePicker';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BoxEvents } from '@/utils/events';
import { router, useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';

export default function EditBoxScreen() {
    const { box } = useLocalSearchParams<{ box: string }>();
    const { themeColors } = useTheme();
    const [boxData, setBoxData] = useState({
        name: '',
        desc: '',
        image: null as string | null,
        info: {
            id: box,
            catag: [] as string[],
            color: '#d00000',
            remarks: '',
        },
    });

    useEffect(() => {
        const loadData = async () => {
            const data = await getBoxData(box);

            let crntImageUri = null;
            crntImageUri = data.info?.id ? await getBoxImage(data.info.id) : null;

            setBoxData({
                name: data.name,
                desc: data.desc,
                image: crntImageUri,
                info: {
                    id: box,
                    catag: data.info.catag || [],
                    color: data.info.color || '',
                    remarks: data.info.remarks || '',
                },
            });
        };
        loadData();
    }, [box]);

    const updateField = (field: string, value: any) => {
        if (field === 'name' || field === 'desc' || field === 'image') {
            setBoxData(prev => ({ ...prev, [field]: value }));
        } else if (field === 'color' || field === 'remarks' || field === 'categories') {
            setBoxData(prev => ({
                ...prev,
                info: {
                    ...prev.info,
                    [field === 'categories' ? 'catag' : field]: value
                }
            }));
        }
    };

    const handleSubmit = async () => {
        if (!boxData.name || !boxData.desc) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            await editBox(
                box,
                boxData.name,
                boxData.desc,
                boxData.info.catag,
                boxData.info.color,
                boxData.info.remarks,
                boxData.image
            );

            BoxEvents.emitBoxesChanged();
            router.push(`/box/${box}`);
        } catch (e) {
            console.error('error:', e);
        }
    }

    const getColor6 = (color: string) => {
        if (color.length > 7) {
            return color.substring(0, 7);
        }
        return color;
    }

    return (
        <ActionSheetProvider>
            <ThemedView style={[styles.container, { backgroundColor: themeColors.main }]}>
                <ThemedView style={styles.titleContainer}>
                    <Text style={{ fontFamily: "DigitalDisco", marginTop: 50, fontSize: 40, color: useColorScheme() === "dark" ? themeColors.main : "#000" }}>Edit Box: {boxData?.name}</Text>
                </ThemedView>
            <ScrollView style={styles.form}>
                <View style={{ gap: 20, marginBottom: 100 }}>
                    <FormInput
                        label={'Name of Box'}
                        placeholder={'blue flower box'}
                        width={3}
                        required={true}
                        value={boxData.name}
                        onChange={(text) => updateField('name', text)}
                    />
                    <View style={{ flexDirection: 'row', gap: 20 }}>
                        <FormInput
                            label={'Description/Location'}
                            placeholder={'3rd shelf in garage'}
                            width={2}
                            required={true}
                            value={boxData.desc}
                            onChange={(text) => updateField('desc', text)}
                        />
                        <FormInput
                            label={'Remarks'}
                            placeholder={'for picnic'}
                            width={0.9}
                            value={boxData.info.remarks}
                            onChange={(text) => updateField('remarks', text)}
                        />
                    </View>
                    <FormMulti
                        label={'Select Catagories'}
                        value={boxData.info.catag}
                        onChange={(catag) => updateField('categories', catag)}
                    />
                    <ImagePick
                        value={boxData.image as string}
                        onChange={(image) => updateField('image', image)}
                    />
                    <View style={{ flexDirection: 'row', gap: 20 }}>
                        <ColorPick
                            value={getColor6(boxData.info.color)}
                            onChange={(color) => updateField('color', color)}
                        />
                        <Pressable style={styles.submit} onPress={handleSubmit}>
                            <Text style={styles.submitText}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            </ThemedView>
        </ActionSheetProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        paddingHorizontal: '8%',
        height: 110,
    },
    menu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        flex: 1,
        padding: 30,
    },
    submit: {
        marginVertical: 30,
        padding: 12,
        backgroundColor: '#1a1e66',
        width: 110,
        height: 60
    },
    submitText: {
        fontFamily: 'Pixellari',
        fontSize: 26,
        color: '#ffffff'
    }
});