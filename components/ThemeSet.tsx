import React, { createContext, useState, useContext, useEffect } from 'react';
import { themeColor, updateTheme } from '@/utils/filesys';
import { themes } from '@/utils/themes';

type ThemeContextType = {
    current: string,
    setTheme: (theme: keyof typeof themes) => void;
    themeColors: {
        main: string;
        search: string;
        dark: string;
    }
}

const ThemeContext = createContext<ThemeContextType>({
    current: 'purple',
    setTheme: () => { },
    themeColors: themes.purple
})

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentTheme, setCurrentTheme] = useState<string>('purple');
    const [themeColors, setThemeColors] = useState(themes.purple);

    useEffect(() => {
        const fetchTheme = async () => {
            const theme = await themeColor() as keyof typeof themes;
            setCurrentTheme(theme);
            setThemeColors(themes[theme]);
        };
        fetchTheme();
    }, []);

    const setTheme = async (theme: keyof typeof themes) => {
        setCurrentTheme(theme);
        setThemeColors(themes[theme]);
        await updateTheme(theme);
    };

    return (
        <ThemeContext.Provider value={{ current: currentTheme, setTheme, themeColors }}>
            {children}
        </ThemeContext.Provider>
    );
}