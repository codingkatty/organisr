import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, Text, StyleSheet, View, Button, Pressable, useColorScheme } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import {FormInput, FormSelect, FormMulti} from '@/components/TextInput';
import { useTheme } from '@/components/ThemeSet';

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
    return (
        <ScrollView style={[styles.form, { backgroundColor: themeColors.main }]}>
            <Pressable onPress={() => navigation.goBack()} style={styles.back}>
                <Text style={{ fontFamily: 'Pixellari', fontSize: 20 }}>Back</Text>
            </Pressable>
            <View style={{ gap: 20 }}>
                <FormInput label={'Name'} placeholder={'4mm screwdriver'} width={3} required={true} />
                <View style={{ flexDirection: 'row', gap: 20 }}>
                    <FormInput label={'Description'} placeholder={'4mm screwdriver'} width={2} required={true} />
                    <FormInput label={'Description'} placeholder={'4mm screwdriver'} width={0.91} />
                </View>
                <FormSelect />
                <FormMulti />
            </View>
        </ScrollView>
    );
}

const NewItem = ({ navigation }: MenuProps) => {
    return (
        <View style={styles.sub}>
            <Text style={{ fontSize: 24 }}>Subpage 2</Text>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
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
    }
});
