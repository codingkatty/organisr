import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import SearchBar from '@/components/SearchBar';
import { Item } from '@/components/ItemList';
import { useTheme } from '@/components/ThemeSet';
import { getAllItems } from '@/utils/filesys';

/* search bar, frequent searches, search for items */

export default function SearchScreen() {
  const { themeColors } = useTheme();
  interface Item {
    name: string;
  }
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const itemsData = await getAllItems();
      setItems(itemsData || null);
    };
    fetchItems();
  }, []);
  return (
    <ThemedView style={[styles.container, { backgroundColor: themeColors.main }]}>
      <ThemedView style={styles.titleContainer}>
        <SearchBar width="100%" icon={false} />
      </ThemedView>

      <ScrollView>
        <ThemedView style={styles.boxContainer}>
          {items && items.map((item, index) => (
            <View key={index} style={styles.boxWrapper}>
              <Item name={item.name} />
            </View>
          ))}
          <View style={styles.boxWrapper}>
            <Item name="Test" />
          </View>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 50,
    paddingVertical: 20,
    paddingHorizontal: '8%',
    height: 140,
  },
  boxContainer: {
    padding: '2%',
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    marginHorizontal: 'auto',
    marginVertical: 16,
    backgroundColor: 'transparent',
  },
  boxWrapper: {
    marginHorizontal: '2.5%',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
});