import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';

import { HomeIcon, SearchIcon, NewIcon, ThemeIcon } from '@/components/MyIcons';
import { useTheme } from '@/components/ThemeSet';

export default function TabLayout() {
  const { themeColors } = useTheme();
  const iconsize = 40;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColors.main,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarShowLabel: false,
        tabBarLabelPosition:"beside-icon",
        tabBarItemStyle: {
          alignSelf: 'center',                        
        },
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            borderTopWidth: 0,
            height: 80,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <View style={{ 
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}>
              <HomeIcon width={iconsize} height={iconsize} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen 
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <View style={{ 
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}>
              <SearchIcon width={iconsize} height={iconsize} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen 
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => (
            <View style={{ 
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}>
              <NewIcon width={iconsize} height={iconsize} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen 
        name="themes"
        options={{
          title: 'Theme',
          tabBarIcon: ({ color }) => (
            <View style={{ 
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}>
              <ThemeIcon width={iconsize} height={iconsize} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen 
        name="box/[id]"
        options={{
          href: null
        }}
      />
      <Tabs.Screen 
        name="edit/[box]"
        options={{
          href: null
        }}
      />
      <Tabs.Screen 
        name="edit/[item]"
        options={{
          href: null
        }}
      />
    </Tabs>
  );
}
