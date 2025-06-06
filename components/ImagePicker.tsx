import { useState, useEffect } from 'react';
import { Pressable, Image, View, StyleSheet, Alert, Text, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useTheme } from '@/components/ThemeSet';
import { PictureIcon } from '@/components/MyIcons';

interface ImagePickProps {
    value: string;
    onChange: (uri: string | null) => void;
}

export const ImagePick = ({ value, onChange }: ImagePickProps) => {
    const [image, setImage] = useState<string | null>(null);
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    const { showActionSheetWithOptions } = useActionSheet();
    const { themeColors } = useTheme();

    useEffect(() => {
        (async () => {
            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
            const mediaPermission = await MediaLibrary.requestPermissionsAsync();

            if (cameraPermission.status !== 'granted' || mediaPermission.status !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'Camera access is needed to take photos for your boxes',
                    [{ text: 'OK' }]
                );
            }
        })();
    }, []);

    useEffect(() => {
        setImage(value);
    }, [value]);

    const pickImage = async () => {
        if (!status?.granted) {
            const { status } = await requestPermission();
            if (status !== 'granted') {
                Alert.alert('perms needed')
                return;
            }
        }

        const options = ['Camera', 'Photo Library', 'Cancel']
        const cancelButtonIndex = 2;

        showActionSheetWithOptions({
            options,
            cancelButtonIndex
        }, async (selectedIndex?: number) => {
            if (selectedIndex === undefined) return;
            let result;
            switch (selectedIndex) {
                case 0:
                    result = await ImagePicker.launchCameraAsync({
                        mediaTypes: ['images'],
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1,
                    });
                    break;

                case 1:
                    result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ['images'],
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1,
                    });
                    break;

                case cancelButtonIndex:
                    return;
            }

            if (result && !result.canceled) {
                const selectedUri = result.assets[0].uri;
                setImage(selectedUri);

                if (onChange) {
                    onChange(selectedUri);
                }
            }
        });
    };

    return (
        <View>
            <Text style={styles.label}>Box Image</Text>
            <View style={[styles.imageContainer, { backgroundColor: themeColors.search }]}>
                {value ? (
                    <View>
                        <Image
                            source={{ uri: value }}
                            style={{ width: 200, height: 200, marginBottom: 10 }}
                        />
                        <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
                            <Pressable onPress={pickImage}>
                                <Text style={[styles.text, { color: '#3ea8f4' }]}>Change</Text>
                            </Pressable>
                            <Pressable onPress={() => onChange(null)}>
                                <Text style={[styles.text, { color: '#d00000' }]}>Remove</Text>
                            </Pressable>
                        </View>
                    </View>
                ) : (
                    <Pressable onPress={pickImage} style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <PictureIcon />
                    </Pressable>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Pixellari',
        fontSize: 24,
        marginBottom: 10,
    },
    image: {
        width: 200,
        height: 200,
        margin: 10,
    },
    button: {
        minHeight: 60,
        borderWidth: 1,
        padding: 10,
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Pixellari',
        fontSize: 24,
        color: '#aaaaaa'
    },
    imageContainer: {
        padding: 20,
        borderStyle: 'solid',
        borderWidth: 1,
    }
});