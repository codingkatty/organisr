import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';
import { FilterIcon, NewIcon } from './MyIcons'

interface SearchBarProps {
    width?: number | `${number}%`;
    icon: boolean;
}

export default function SearchBar({ width = '65%', icon }: SearchBarProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = (query: string) => setSearchQuery(query);

    return (
        <ThemedView style={styles.container}>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={[styles.searchBar, { width }]}
                inputStyle={{ fontFamily: 'Pixellari', fontSize: 20 }}
            />
            {icon && (
                <ThemedView
                    style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        right: 0
                    }}>
                    <FilterIcon style={styles.icon} />
                    <NewIcon style={styles.icon} />
                </ThemedView>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    searchBar: {
        fontFamily: 'Pixellari',
        height: 55,
        marginVertical: 20,
        marginRight: 20,
        borderRadius: 0,
        backgroundColor: '#ebe5f8',
        alignSelf: 'flex-start'
    },
    icon: {
        alignSelf: 'flex-end'
    }
})