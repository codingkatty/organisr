import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { CloseIcon } from '@/components/MyIcons';

interface ItemDetailModalProps {
    visible: boolean;
    item: any;
    onClose: () => void;
    themeColors: any;
}

export const ItemModal: React.FC<ItemDetailModalProps> = ({
    visible,
    item,
    onClose,
    themeColors
}) => {
    if (!item) return null;

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
                        }}>{item.name}</Text>
                        <Pressable
                            onPress={onClose}
                        >
                            <CloseIcon color={themeColors.dark} />
                        </Pressable>
                    </View>

                    <ScrollView style={{
                        marginTop: 10,
                    }}>
                        {item.data?.status && (
                            <View style={{
                                marginBottom: 20,
                            }}>
                                <Text style={styles.section}>Status</Text>
                                <Text style={styles.content}>{item.data.status}</Text>
                            </View>
                        )}

                        {item.data?.date && (
                            <View style={{
                                marginBottom: 20,
                            }}>
                                <Text style={styles.section}>Date</Text>
                                <Text style={styles.content}>{item.data.date}</Text>
                            </View>
                        )}

                        {item.data?.weight && (
                            <View style={{
                                marginBottom: 20,
                            }}>
                                <Text style={styles.section}>Weight</Text>
                                <Text style={styles.content}>{item.data.weight}</Text>
                            </View>
                        )}

                        {item.data?.custom && item.data.custom.length === 2 && (
                            <View style={{
                                marginBottom: 20,
                            }}>
                                <Text style={styles.section}>{item.data.custom[0]}</Text>
                                <Text style={styles.content}>{item.data.custom[1]}</Text>
                            </View>
                        )}

                        {(!item.data?.status && !item.data?.date && !item.data?.custom) && (
                            <Text style={styles.noData}>No additional information available</Text>
                        )}
                    </ScrollView>
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
    section: {
        fontFamily: 'Pixellari',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    content: {
        fontFamily: 'Pixellari',
        fontSize: 18,
    },
    noData: {
        fontFamily: 'Pixellari',
        fontSize: 18,
        fontStyle: 'italic',
        textAlign: 'center',
        color: '#aaaaaa',
    }
});