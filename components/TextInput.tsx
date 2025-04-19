import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { useTheme } from '@/components/ThemeSet';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

interface FormInputProps {
  label: string;
  placeholder?: string;
  width: number;
  required?: boolean;
  slctdata?: Promise<Array<{name: string, info: { id: string }}>>;
  value?: string;
  onChange?: (text: string) => void;
}

const FormInput = ({ label, placeholder, width, required, value, onChange }: FormInputProps) => {
  const { themeColors } = useTheme();

  return (
    <View style={{ width: `${(width * 100) / 3}%` }}>
      <Text style={styles.label}>
        {required ? (
          <>
            {label}<Text style={styles.required}>*</Text>
          </>
        ) : (
          label
        )}
      </Text>
      <TextInput
        style={[styles.input, { backgroundColor: themeColors.search }]}
        placeholder={placeholder}
        placeholderTextColor="#aaaaaa"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const FormSelect = ({ label, required, slctdata }: FormInputProps) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [dropdownData, setDropdownData] = useState(data);
  const { themeColors } = useTheme();

  const fetchData = async () => {
    if (slctdata) {
      const data = await slctdata;
      setDropdownData(data.map(item => ({ label: item.name, value: item.info.id })));
      console.log(data);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, [slctdata]);

  const renderLabel = () => {
    return (
      <Text style={[styles.label, isFocus && { color: themeColors.dark }]}>
        {required ? (
          <>
            {label}<Text style={styles.required}>*</Text>
          </>
        ) : (
          label
        )}
      </Text>
    );
  };
  return (
    <View>
      {renderLabel()}
      <Dropdown
        style={[[styles.dropdown, { backgroundColor: themeColors.search }], isFocus && { borderColor: themeColors.dark }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={styles.itemTextStyle}
        data={dropdownData || data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  )
}

interface FormMultiProps extends Omit<FormInputProps, 'value' | 'onChange' | 'width'> {
  width?: number;
  value?: string[];
  onChange?: (values: string[]) => void;
}

const FormMulti = ({ label, width, value = [], onChange }: FormMultiProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const { themeColors } = useTheme();

  const categories = [
    { label: 'Tools', value: 'tools' },
    { label: 'Food', value: 'food' },
    { label: 'Cleaning', value: 'cleaning' },
    { label: 'Leisure', value: 'leisure' },
    { label: 'Travel', value: 'travel' },
    { label: 'Hobby', value: 'hobby' },
    { label: 'Sports', value: 'sports' },
    { label: 'Decoration', value: 'decoration' },
    { label: 'Work', value: 'work' },
    { label: 'School', value: 'school' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Stationery', value: 'stationery' },
  ];

  const renderLabel = () => {
    return (
      <Text style={[styles.label, isFocus && { color: themeColors.dark }]}>
        {label}
      </Text>
    );
  };

  return (
    <View>
      {renderLabel()}
      <MultiSelect
        style={[[styles.dropdown, { backgroundColor: themeColors.search }], isFocus && { borderColor: themeColors.dark }]}
        placeholderStyle={styles.placeholderStyle}
        selectedStyle={{ backgroundColor: themeColors.search }}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={styles.itemTextStyle}
        search
        data={categories}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select categories' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={items => {
          onChange?.(items);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Pixellari',
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    fontFamily: 'Pixellari',
    fontSize: 24,
    height: 60,
    borderWidth: 1,
    padding: 10,
  },
  required: {
    color: 'red',
  },
  dropdown: {
    height: 60,
    borderWidth: 1,
    padding: 10,
  },
  placeholderStyle: {
    fontFamily: 'Pixellari',
    fontSize: 24,
    color: '#aaaaaa',
  },
  selectedTextStyle: {
    fontFamily: 'Pixellari',
    fontSize: 24,
  },
  itemTextStyle: {
    fontFamily: 'Pixellari',
    fontSize: 18,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    fontFamily: 'Pixellari',
    fontSize: 18,
    padding: 10,
  },
});

export { FormInput, FormSelect, FormMulti };