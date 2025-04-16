import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SearchBar from '@/components/SearchBar';
import { BoxItem } from '@/components/BoxItem';

/* search bar, frequent searches, search for items */

export default function SearchScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: "DigitalDisco" }}>Search</ThemedText>
        <SearchBar width="100%" icon={false} />
      </ThemedView>

      <ScrollView>
        <ThemedView style={styles.boxContainer}>
          <View style={styles.boxWrapper}>
            <BoxItem name="Test 1" description="Description 1" />
          </View>
          <View style={styles.boxWrapper}>
            <BoxItem name="Test 2" description="Description 2" />
          </View>
          <View style={styles.boxWrapper}>
            <BoxItem name="Test 3" description="Description 3" />
          </View>
          <View style={styles.boxWrapper}>
            <BoxItem name="Test 4" description="Description 4" />
          </View>
          <View style={styles.boxWrapper}>
            <BoxItem name="Test 5" description="Description 5" />
          </View>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0B7FF'
  },
  titleContainer: {
    paddingTop: 28,
    paddingVertical: 12,
    paddingHorizontal: '8%',
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '2%',
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    marginHorizontal: 'auto',
    marginVertical: 16,
    backgroundColor: '#D0B7FF'
  },
  boxWrapper: {
    width: '45%',
    marginHorizontal: '2.5%',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    maxWidth: 400,
  },
});