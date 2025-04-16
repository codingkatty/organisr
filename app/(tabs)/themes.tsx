import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { themes } from '@/utils/themes';
import { ThemeSelector } from '@/components/ThemeColor';
import { useTheme } from '@/components/ThemeSet';

export default function ThemeScreen() {
    const { themeColors } = useTheme();
    return (
        <ThemedView style={[
            styles.container,
            { backgroundColor: themeColors.main }
        ]}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={{ fontFamily: "DigitalDisco", marginTop: 50 }}>Themes</ThemedText>
            </ThemedView>

            <ScrollView>
                <ThemedView style={styles.boxContainer}>
                    {Object.entries(themes).map((theme) => (
                        <ThemeSelector key={theme[0]} theme={theme[0] as 'purple' | 'blue' | 'pink' | 'yellow'} color={theme[1].main} />
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
        paddingHorizontal: '8%',
        height: 100,
    },
    boxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '2%',
        paddingHorizontal: '16%',
        maxWidth: 1200,
        width: '100%',
        alignSelf: 'center',
        marginHorizontal: 'auto',
        marginVertical: 16,
        backgroundColor: 'transparent',
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