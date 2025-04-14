import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';
import FilterIcon from './MyIcons'

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = (query: string) => setSearchQuery(query);

    return (
        <ThemedView style={styles.container}>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchBar}
            />
            <ThemedView
                style={{
                    position: 'absolute',
                    right: 20
                }}>
                <FilterIcon />
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    searchBar: {
        width: '80%',
        height: 50,
        marginVertical: 20,
        borderRadius: 0,
        backgroundColor: '#cccccc'
    },
})