import { StyleSheet, Pressable, View } from 'react-native';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { FilterIcon, NewIcon } from './MyIcons'
import { useTheme } from '@/components/ThemeSet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    add: undefined;
};

interface SearchBarProps {
    width?: number | `${number}%`;
    icon: boolean;
}
export default function SearchBar({ width = '65%', icon }: SearchBarProps) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { themeColors } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = (query: string) => setSearchQuery(query);

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={[styles.searchBar, { width, backgroundColor: themeColors.search }]}
                inputStyle={{ fontFamily: 'Pixellari', fontSize: 20 }}
            />
            {icon && (
                <View
                    style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        right: 0
                    }}>
                    <FilterIcon style={styles.icon} color={themeColors.main} />
                    <Pressable
                        onPress={() => navigation.navigate('add')}>
                        <NewIcon style={styles.icon} color={themeColors.main} />
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        marginBottom: 20
    },
    searchBar: {
        fontFamily: 'Pixellari',
        height: 55,
        marginVertical: 20,
        marginRight: 20,
        borderRadius: 0,
        alignSelf: 'flex-start'
    },
    icon: {
        backgroundColor: 'transparent',
        alignSelf: 'flex-end'
    }
})