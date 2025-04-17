import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { useTheme } from '@/components/ThemeSet';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

interface FormInputProps {
  label: string;
  placeholder: string;
  width: number;
  required?: boolean;
}

const FormInput = ({ label, placeholder, width, required }: FormInputProps) => {
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

const FormSelect = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const { themeColors } = useTheme();

  const renderLabel = () => {
    return (
      <Text style={[styles.label, isFocus && { color: themeColors.dark }]}>
        Select Box
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
        data={data}
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

const FormMulti = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const { themeColors } = useTheme();

  const renderLabel = () => {
    return (
      <Text style={[styles.label, isFocus && { color: themeColors.dark }]}>
        Select Catagory
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
        data={data}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={selected}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setSelected(item);
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