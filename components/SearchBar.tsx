import { StyleSheet, Pressable, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { FilterIcon, NewIcon } from './MyIcons'
import { useTheme } from '@/components/ThemeSet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { deleteData } from '@/utils/filesys';
import { BoxEvents } from '@/utils/events';

type RootStackParamList = {
    add: undefined;
};

interface SearchBarProps {
    width?: number | `${number}%`;
    icon: boolean;
    value?: string;
    onChange?: (text: string) => void;
}
export default function SearchBar({ width = '65%', icon, value, onChange }: SearchBarProps) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { themeColors } = useTheme();

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search"
                style={[styles.searchBar, { width, backgroundColor: themeColors.search }]}
                inputStyle={{ fontFamily: 'Pixellari', fontSize: 20 }}
                value={value ?? ''}
                onChangeText={onChange}
            />
            {icon && (
                <View
                    style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        right: 0
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable onPress={() => [deleteData(), BoxEvents.emitBoxesChanged()]}>
                            <FilterIcon style={styles.icon} color={themeColors.main} />
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('add')}>
                            <NewIcon style={styles.icon} color={themeColors.main} />
                        </Pressable>
                    </View>
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