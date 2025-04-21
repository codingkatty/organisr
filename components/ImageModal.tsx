import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { CloseIcon } from '@/components/MyIcons';

interface ImageDetailModalProps {
    visible: boolean;
    image: string;
    onClose: () => void;
    themeColors: any;
}

export const ImageModal: React.FC<ImageDetailModalProps> = ({
    visible,
    image,
    onClose,
    themeColors
}) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={[styles.modal, { backgroundColor: themeColors.search }]}>
                        <View style={styles.header}>
                            <Text style={{
                                fontFamily: 'DigitalDisco',
                                fontSize: 30,
                                fontWeight: 'bold',
                                flex: 1,
                            }}>Image</Text>
                            <Pressable
                                onPress={onClose}
                            >
                                <CloseIcon color={themeColors.dark} />
                            </Pressable>
                        </View>
                    <Image source={{ uri: image }} style={{ width: 400, height: 400}} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        width: '85%',
        maxHeight: '70%',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
});