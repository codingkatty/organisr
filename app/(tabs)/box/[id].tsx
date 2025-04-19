import { useLocalSearchParams } from 'expo-router';
import { getBoxData, getBoxImage } from '@/utils/filesys'
import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, useColorScheme, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/components/ThemeSet';

export default function BoxScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [boxData, setBoxData] = useState<any>(null);
    const [image, setImage] = useState<string | null>(null);
    const { themeColors } = useTheme();

    useEffect(() => {
        getBoxData(id).then(data => setBoxData(data));
        getBoxImage(id).then(image => setImage(image || null));
    }, [id]);

    return (
        <ThemedView style={[
            styles.container,
            { backgroundColor: themeColors.main }
        ]}>
            <ThemedView style={styles.titleContainer}>
                <Text style={{ fontFamily: "DigitalDisco", marginTop: 50, fontSize: 40, color: useColorScheme() === "dark" ? themeColors.main : "#000" }}>{boxData?.name}</Text>
            </ThemedView>
            <ScrollView>
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
                        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                    </View>
                ) : null}

                <Text>Items (0)</Text>
            </ScrollView>
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
    h2: {
        fontFamily: "Pixellari",
        fontSize: 24,
        fontWeight: 'bold'
    },
    text: {
        fontFamily: "Pixellari",
        fontSize: 20,
        paddingLeft: 10,
    }
});