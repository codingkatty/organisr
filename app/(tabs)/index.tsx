import { ScrollView, StyleSheet, View, Text, useColorScheme } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import SearchBar from '@/components/SearchBar';
import { BoxItem } from '@/components/BoxItem';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeSet';
import { init, getBoxes } from '@/utils/filesys';
import { BoxEvents } from '@/utils/events';

export default function HomeScreen() {
  const { themeColors } = useTheme();
  interface Box {
    name: string;
    desc: string;
    info: {
      id: string;
      color: string;
    };
  }
  const [boxes, setBoxes] = useState<Box[] | null>(null);

  useEffect(() => {
    const initializeData = async () => {
      await init();
      const boxesData = await getBoxes();
      setBoxes(boxesData || null);
    };
    initializeData();

    const unsubscribe = BoxEvents.onBoxesChanged(refreshBoxes);
    return () => {
      unsubscribe();
    };
  }, []);

  const refreshBoxes = async () => {
    await init(); // test only
    const boxesData = await getBoxes();
    setBoxes(boxesData || null);
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: themeColors.main }]}>
      <ThemedView style={styles.titleContainer}>
        <Text style={{ fontFamily: "DigitalDisco", marginTop: 50, fontSize: 40, color: useColorScheme() === "dark" ? themeColors.main : "#000" }}>Home</Text>
        {/*<Text style={{ fontFamily: "DigitalDisco", marginVertical: 20, fontSize: 40, color: useColorScheme() === "dark" ? themeColors.main : "#000" }}>Home</Text>*/}
        {/*<SearchBar icon={true} />*/}
      </ThemedView>

      <ScrollView>
        <ThemedView style={styles.boxContainer}>
          {boxes && boxes.map((box, index) => (
            <View key={index} style={styles.boxWrapper}>
              <BoxItem name={box.name} description={box.desc} boxId={box.info.id} color={box.info.color} />
            </View>
          ))}
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
    //paddingTop: 20,
    //paddingVertical: 20,
    paddingHorizontal: '8%',
    height: 110
    //height: 180,
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
    backgroundColor: 'transparent'
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