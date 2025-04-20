import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import SearchBar from '@/components/SearchBar';
import { Item } from '@/components/ItemList';
import { useTheme } from '@/components/ThemeSet';
import { getAllItems, getBoxes } from '@/utils/filesys';
import { Collapsible } from '@/components/Collapsible';
import { ItemModal } from '@/components/ItemModal';
import { BoxEvents } from '@/utils/events';

export default function SearchScreen() {
  const { themeColors } = useTheme();

  interface Item {
    boxId: string;
    name: string;
    data?: any;
  }

  const [items, setItems] = useState<Item[] | null>(null);
  const [filteredItems, setFilteredItems] = useState<Item[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [boxes, setBoxes] = useState<any[]>([]);

  const fetchItems = async () => {
    const itemsData = await getAllItems();
    setItems(itemsData || []);
    setFilteredItems(itemsData || []);

    const boxData = await getBoxes();
    setBoxes(boxData || []);
  }

  useEffect(() => {
    fetchItems();

    const unsubscribe = BoxEvents.onBoxesChanged(() => {
      fetchItems();
    })

    return () => {
      unsubscribe();
    }
  }, []);

  const handleItemPress = (item: Item) => {
    setSelectedItem(item);
    setModalVisible(true);
  }

  const handleSearch = (text: string) => {
    setSearchTerm(text);

    if (!items) return;

    if (!text.trim()) {
      setFilteredItems(items);
      return;
    }

    const searchLower = text.toLowerCase();

    const filtered = items.filter(item => {
      if (item.name.toLowerCase().includes(searchLower)) return true;

      if (item.data) {
        if (item.data.status &&
          item.data.status.toLowerCase().includes(searchLower)) return true;

        if (item.data.date &&
          item.data.date.toLowerCase().includes(searchLower)) return true;

        if (item.data.custom && Array.isArray(item.data.custom)) {
          return item.data.custom.some((field: string) =>
            typeof field === 'string' && field.toLowerCase().includes(searchLower)
          );
        }
      }

      return false;
    });

    setFilteredItems(filtered);
  };

  useEffect(() => {
    const fetchItems = async () => {
      const itemsData = await getAllItems();
      setItems(itemsData || []);
      setFilteredItems(itemsData || []);
    };
    fetchItems();
  }, []);

  return (
    <ThemedView style={[styles.container, { backgroundColor: themeColors.main }]}>
      <ThemedView style={styles.titleContainer}>
        <SearchBar
          width="100%"
          icon={false}
          value={searchTerm}
          onChange={handleSearch}
        />
      </ThemedView>

      <ScrollView>
        <View style={{ marginBottom: 100 }}>
          {boxes && boxes.map(box => (
            <View key={box.info.id} style={{ margin: 30 }}>
              <Collapsible
                title={`${box.name} (${filteredItems?.filter(item => item.boxId == box.info.id).length || 0})`}
                children={
                  <ThemedView style={styles.boxContainer}>
                    {filteredItems && filteredItems.filter(item => item.boxId == box.info.id).length > 0 ? (
                      filteredItems
                        .filter(item => item.boxId == box.info.id)
                        .map((item) => (
                          // :b
                          <View key={`${item.name},${Number(item.boxId)*Math.random()*3}`} style={styles.boxWrapper}>
                            <Item name={item.name} onPress={() => handleItemPress(item)} />
                          </View>
                        ))
                    ) : (
                      <Text style={styles.noResults}>
                        {searchTerm ? 'No matching items found' : 'No items in this box'}
                      </Text>
                    )}
                  </ThemedView>
                }
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <ItemModal
        visible={modalVisible}
        item={selectedItem}
        onClose={() => setModalVisible(false)}
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
  noResults: {
    fontFamily: 'Pixellari',
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
    color: '#aaaaaa',
  },
});