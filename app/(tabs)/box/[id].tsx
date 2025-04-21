import { useLocalSearchParams, useFocusEffect, router } from 'expo-router';
import { getBoxData, getBoxImage, getItems, deleteBox } from '@/utils/filesys'
import { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, View, Text, useColorScheme, Image, Pressable, Alert, Modal } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/components/ThemeSet';
import { Item } from '@/components/ItemList';
import { ItemModal } from '@/components/ItemModal';
import { BoxEvents } from '@/utils/events';
import { ImageModal } from '@/components/ImageModal';

interface ItemData {
    name: string;
    data?: any;
    boxId?: string;
}

interface Item {
    name: string;
    data?: any;
}

export default function BoxScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [boxData, setBoxData] = useState<any>(null);
    const [image, setImage] = useState<string | null>(null);
    const [items, setItems] = useState<ItemData[]>([]);
    const { themeColors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [imageModalVisible, setImageModalVisible] = useState(false);

    const handleItemPress = (item: Item) => {
        setSelectedItem(item);
        setModalVisible(true);
    }

    const handleImagePress = () => {
        setImageModalVisible(true);
    }

    const handleDelete = async (id: string) => {
        Alert.alert("Delete Box", "Are you sure you want to delete this box?", [
            { text: "Cancel", style: "cancel" }, { text: "Delete", onPress: async () => {
                deleteBox(id);
                BoxEvents.emitBoxesChanged();
                router.push("../");
            }}])
    }

    const loadBoxData = useCallback(async () => {
        if (!id) return;
        
        try {
            const data = await getBoxData(id);
            setBoxData(data);
            
            const imageUri = await getBoxImage(id);
            setImage(imageUri || null);
            
            const itemsData = await getItems(id);
            setItems(itemsData || []);
        } catch (error) {
            console.error('Error loading box data:', error);
        }
    }, [id]);

    useFocusEffect(
        useCallback(() => {
            loadBoxData();
            
            const unsubscribe = BoxEvents.onBoxesChanged(() => {
                loadBoxData();
            });
            
            return () => {
                unsubscribe();
            };
        }, [loadBoxData])
    );

    return (
        <ThemedView style={[
            styles.container,
            { backgroundColor: themeColors.main }
        ]}>
            <ThemedView style={styles.titleContainer}>
                <Text style={{ fontFamily: "DigitalDisco", marginTop: 50, fontSize: 40, color: useColorScheme() === "dark" ? themeColors.main : "#000" }}>{boxData?.name}</Text>
            </ThemedView>
            <ScrollView>
                {/* upper part, box information */}
                <View style={styles.info}>
                    <Text style={styles.h2}>Description</Text>
                    <Text style={styles.text}>{boxData?.desc}</Text>
                </View>
                <View style={[styles.info, { backgroundColor: themeColors.search }]}>
                    <Text style={styles.h2}>Catagories</Text>
                    <Text style={styles.text}>{boxData?.info?.catag?.join(", ") || "-"}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <View style={[styles.info, {
                        width: 500,
                        marginRight: 0
                    }]}>
                        <Text style={styles.h2}>Remarks</Text>
                        <Text style={styles.text}>{boxData?.info.remarks || "-"}</Text>
                    </View>
                    <View style={styles.info}>
                        <View style={{
                            width: 25,
                            height: 25,
                            borderRadius: 15,
                            backgroundColor: boxData?.info.color || "#ffffff",
                            borderWidth: 1,
                            borderColor: themeColors.dark,
                        }}></View>
                    </View>
                </View>

                {image ? (
                    <View style={[styles.info, { backgroundColor: themeColors.search }]}>
                        <Text style={styles.h2}>Image</Text>
                        <Pressable onPress={() => handleImagePress()}>
                            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                        </Pressable>
                    </View>
                ) : null}

                {/* items */}
                <View style={[styles.info, { backgroundColor: themeColors.search, flexDirection: 'column' }]}>
                    <Text style={styles.h2}>Items</Text>
                    <View>
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <View style={styles.item} key={`item${item.name}-${index}`}>
                                    <Item name={item.name} onPress={() => handleItemPress(item)} />
                                </View>
                            ))
                        ) : (
                            <Text style={{
                                fontFamily: 'Pixellari',
                                fontSize: 20,
                                color: "#a0a0a0",
                                marginVertical: 10
                            }}>no items</Text>
                        )}
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginHorizontal: '5%',
                }}>
                    <Pressable style={styles.submit} onPress={() => router.push(`../edit/${id}`)}>
                        <Text style={styles.submitText}>Edit</Text>
                    </Pressable>
                    <Pressable style={[styles.submit, { backgroundColor: '#d00000' }]} onPress={() => handleDelete(id as string)}>
                        <Text style={styles.submitText}>Delete</Text>
                    </Pressable>
                </View>
            </ScrollView>

            <ItemModal
                visible={modalVisible}
                item={selectedItem}
                onClose={() => setModalVisible(false)}
                themeColors={themeColors}
            />
            <ImageModal
                visible={imageModalVisible}
                image={image || ''}
                onClose={() => setImageModalVisible(false)}
                themeColors={themeColors}
            />
        </ThemedView>
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
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#ffffff',
        marginTop: 20,
        marginHorizontal: '5%',
        borderStyle: 'solid',
        borderWidth: 1,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: '5%',
    },
    h2: {
        fontFamily: "Pixellari",
        fontSize: 24,
        fontWeight: 'bold'
    },
    text: {
        fontFamily: "Pixellari",
        fontSize: 20,
        paddingLeft: 10,
    },
    submit: {
        marginRight: 20,
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