import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, Text, StyleSheet, View, Button, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import TextInputExample from '@/components/TextInput';
import { useTheme } from '@/components/ThemeSet';

const Stack = createNativeStackNavigator();

type RootStackParamList = {
    Menu: undefined;
    SubPage1: undefined;
    SubPage2: undefined;
};

type MenuProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Menu'>;
};

const Menu = ({ navigation, route }: any) => {
    const theme = route.params.theme.main;
    return (
        <View style={[styles.menu, { backgroundColor: theme }]}>
            <Pressable onPress={() => navigation.navigate('NewBox')} style={styles.button}>
                <Text>New Box</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('NewItem')} style={styles.button}>
                <Text>New Item</Text>
            </Pressable>
        </View>
    );
}

const NewBox = ({ navigation }: MenuProps) => {
    return (
        <View style={styles.sub}>
            <ThemedText style={{ fontSize: 24 }}>Subpage 1</ThemedText>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
}

const NewItem = ({ navigation }: MenuProps) => {
    return (
        <View style={styles.sub}>
            <ThemedText style={{ fontSize: 24 }}>Subpage 2</ThemedText>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
}

export default function AddScreen() {
    const { themeColors } = useTheme();
    return (
        <ThemedView style={[styles.container, { backgroundColor: themeColors.main }]}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={{ fontFamily: "DigitalDisco", marginTop: 50 }}>New Item</ThemedText>
            </ThemedView>
            <Stack.Navigator
                screenOptions={{
                    "headerShown": false,
            }}>
                <Stack.Screen name="Menu" component={Menu} initialParams={{ theme: themeColors }} />
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
        height: 100
    },
    menu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sub: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginVertical: 20,
        padding: 20,
        backgroundColor: '#ffffff',
        width: 300,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#000000',
        fontWeight: 'bold',
    }
});
