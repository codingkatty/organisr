import React, { useState } from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, Text, StyleSheet, View, Pressable, useColorScheme } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { FormInput, FormSelect, FormMulti } from '@/components/TextInput';
import { useTheme } from '@/components/ThemeSet';
import { getBoxes, createBox, createItem } from '@/utils/filesys';
import { ColorPick } from '@/components/ColorPicker';
import { ImagePick } from '@/components/ImagePicker';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BoxEvents } from '@/utils/events';
import { router } from 'expo-router';

const Stack = createNativeStackNavigator();

type RootStackParamList = {
    Menu: undefined;
    NewBox: undefined;
    NewItem: undefined;
};

type MenuProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Menu'>;
};

const Menu = ({ navigation }: any) => {
    const { themeColors } = useTheme();
    return (
        <View style={[styles.menu, { backgroundColor: themeColors.main }]}>
            <Pressable onPress={() => navigation.navigate('NewBox')} style={[styles.button, { borderColor: themeColors.dark }]}>
                <Text style={styles.buttonText}>New Box</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('NewItem')} style={[styles.button, { borderColor: themeColors.dark, backgroundColor: themeColors.search }]}>
                <Text style={styles.buttonText}>New Item</Text>
            </Pressable>
        </View>
    );
}

const NewBox = ({ navigation }: any) => {
    const { themeColors } = useTheme();
    const [boxData, setBoxData] = useState({
        name: '',
        desc: '',
        remarks: '',
        categories: [],
        color: '#d00000',
        image: ''
    })

    const updateField = (field: string, value: any) => {
        setBoxData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!boxData.name || !boxData.desc) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            const newBoxId = await createBox(
                boxData.name,
                boxData.desc,
                boxData.categories,
                boxData.color,
                boxData.remarks,
                boxData.image
            );

            BoxEvents.emitBoxesChanged();
            navigation.goBack();
            router.push(`/box/${newBoxId}`);
        } catch (e) {
            console.error('error:', e);
        }
    }

    return (
        <ActionSheetProvider>
        <ScrollView style={[styles.form, { backgroundColor: themeColors.main }]}>
            <Pressable onPress={() => navigation.goBack()} style={styles.back}>
                <Text style={{ fontFamily: 'Pixellari', fontSize: 20 }}>Back</Text>
            </Pressable>
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
                        value={boxData.remarks}
                        onChange={(text) => updateField('remarks', text)}
                    />
                </View>
                <FormMulti
                    label={'Select Catagories'}
                    value={boxData.categories}
                    onChange={(catag) => updateField('categories', catag)}
                />
                <ImagePick
                    value={boxData.image}
                    onChange={(image) => updateField('image', image)}
                />
                <View style={{ flexDirection: 'row', gap: 20 }}>
                    <ColorPick
                        value={boxData.color}
                        onChange={(color) => updateField('color', color)}
                    />
                    <Pressable style={styles.submit} onPress={handleSubmit}>
                        <Text style={styles.submitText}>Submit</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
        </ActionSheetProvider>
    );
}

const NewItem = ({ navigation }: MenuProps) => {
    const { themeColors } = useTheme();
    const [itemData, setItemData] = useState({
        name: '',
        boxId: '',
        data: {
            status: '',
            date: '',
            custom: ['', ''],
            weight: ''
        }
    })

    const updateField = (field: string, value: any) => {
        setItemData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!itemData.name || !itemData.boxId || !itemData.data.status) {
            alert('Please fill in all required fields.');
            return;
        }

        if ((!itemData.data.custom[0] && itemData.data.custom[1]) || (itemData.data.custom[0] && !itemData.data.custom[1])) {
            alert('Please fill in both custom fields.');
            return;
        }

        try {
            await createItem(itemData.boxId, itemData.name, itemData.data);
            BoxEvents.emitBoxesChanged();
            navigation.goBack();
        } catch (e) {
            console.error('error:', e);
        }
    }
    return (
        <ScrollView style={[styles.form, { backgroundColor: themeColors.main }]}>
            <Pressable onPress={() => navigation.goBack()} style={styles.back}>
                <Text style={{ fontFamily: 'Pixellari', fontSize: 20 }}>Back</Text>
            </Pressable>
            <View style={{ gap: 20, marginBottom: 100 }}>
                <FormInput
                    label={'Name of Item'}
                    placeholder={'4mm screwdriver'}
                    width={3}
                    required={true}
                    value={itemData.name}
                    onChange={(text) => updateField('name', text)}
                />
                <View style={{ flexDirection: 'row', gap: 20 }}>
                    <FormInput 
                        label={'Status'}
                        placeholder={'new, lended to bob'}
                        width={2}
                        required={true}
                        value={itemData.data.status}
                        onChange={(text) => updateField('data', { ...itemData.data, status: text })}
                    />
                    <FormInput 
                        label={'Date (Any)'}
                        placeholder={'MM/DD/YY'}
                        width={0.9}
                        value={itemData.data.date}
                        onChange={(text) => updateField('data', { ...itemData.data, date: text })}
                    />
                </View>
                <FormSelect
                    label="Select a box"
                    required={true}
                    width={3}
                    slctdata={getBoxes()}
                    value={itemData.boxId}
                    onChange={(box) => updateField('boxId', box)}
                />
                <View style={{ flexDirection: 'row', gap: 20 }}>
                    <FormInput
                        label={'Custom Field'}
                        placeholder={'dimensions'}
                        width={2}
                        value={itemData.data.custom[0]}
                        onChange={(text) => updateField('data', { ...itemData.data, custom: [text] })}
                    />
                    <FormInput
                        label={'Value'}
                        placeholder={'3.5cm'}
                        width={0.9}
                        value={itemData.data.custom[1]}
                        onChange={(text) => updateField('data', { ...itemData.data, custom: [itemData.data.custom[0], text] })}
                    />
                </View>
                <View style={{ flexDirection: 'row', gap: 20 }}>
                    <FormInput 
                        label={'Weight'}
                        placeholder={'300g'}
                        width={1.2}
                        value={itemData.data.weight}
                        onChange={(text) => updateField('data', { ...itemData.data, weight: text })}
                    />
                    <Pressable style={styles.submit} onPress={handleSubmit}>
                        <Text style={styles.submitText}>Submit</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}

export default function AddScreen() {
    const { themeColors } = useTheme();
    return (
        <ThemedView style={[styles.container, { backgroundColor: themeColors.main }]}>
            <ThemedView style={styles.titleContainer}>
                <Text style={{ fontFamily: "DigitalDisco", marginTop: 50, fontSize: 40, color: useColorScheme() === "dark" ? themeColors.main : "#000" }}>Add Item/Box</Text>
            </ThemedView>
            <Stack.Navigator
                screenOptions={{
                    "headerShown": false,
            }}>
                <Stack.Screen name="Menu" component={Menu} />
                <Stack.Screen name="NewBox" component={NewBox} />
                <Stack.Screen name="NewItem" component={NewItem} />
            </Stack.Navigator>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        paddingHorizontal: '8%',
        height: 110
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
    back: {
        marginVertical: 20,
        padding: 12,
        backgroundColor: '#ffffff',
        width: 100
    },
    sub: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginVertical: 20,
        padding: 30,
        backgroundColor: '#ffffff',
        width: 350,
        borderWidth: 6,
    },
    buttonText: {
        fontFamily: 'Pixellari',
        fontSize: 30,
        textAlign: 'center',
        color: '#000000'
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
