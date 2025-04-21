import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { CloseIcon } from '@/components/MyIcons';
import { FormSelect } from '@/components/TextInput';
import { getBoxes, moveItem } from '@/utils/filesys';
import { BoxEvents } from '@/utils/events';

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
    const [selectedBoxId, setSelectedBoxId] = useState('');

    if (!item) return null;

    const handleMoveItem = async () => {
        if (!selectedBoxId || selectedBoxId === item.data?.boxId) {
            return;
        }

        const itemMoveStat = await moveItem(item, selectedBoxId);
        if (!itemMoveStat) {
            Alert.alert('Failed', 'Cannot move item to same box.')
        } else {
            BoxEvents.emitBoxesChanged();
        }
    }

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

                        <View style={{
                            borderBottomColor: '#000000',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            marginVertical: 20,
                        }} />

                        <FormSelect
                            label={'Move Box'}
                            onChange={(boxId) => setSelectedBoxId(boxId)}
                            slctdata={getBoxes()}
                            value={selectedBoxId}
                            width={200}
                        />

                        <View style={{ flexDirection: 'row', gap: 20 }}>                      
                            <Pressable style={styles.submit} onPress={() => { handleMoveItem(); onClose(); }}>
                                <Text style={styles.submitText}>Move</Text>
                            </Pressable>
                            <Pressable style={[styles.submit, { backgroundColor: '#d00000' }]}>
                                <Text style={styles.submitText}>Delete</Text>
                            </Pressable>
                        </View>
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