import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { View } from 'react-native';
import styled from 'styled-components/native';

interface BoxItemProps {
    name: string;
    description: string;
    backgroundColor?: string;
    borderColor?: string;
}

const pixelBorderSvgUrl = "data:image/svg+xml," + encodeURIComponent('<svg width="6" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 2h2v2H0zM2 0h2v2H2zM4 2h2v2H4zM2 4h2v2H2z" fill="#2b096b"/></svg>');

const Container = styled.View`
    background-color:rgba(255, 255, 255, 0);
    border-style: solid;
    border-width: 6px;
    border-image-slice: 2;
    display: inline-block;
    position: relative;
    padding: 0;
    margin: 0;
    border-image-source: url('${pixelBorderSvgUrl}');
    text-align: center;
    width: 100%;
    box-sizing: border-box;
`;

const Shadow = styled.View`
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
`;

const Name = styled(ThemedText)`
    font-family: 'Pixellari';
    font-size: 20px;
    font-weight: bold;
`;

const Description = styled(ThemedText)`
    font-family: 'Pixellari';
    font-size: 16px;
    color: #666;
`;

export function BoxItem({ name, description }: BoxItemProps) {
    return (
        <View style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
        }}>
            <Container>
                <View style={{
                    backgroundColor: 'transparent',
                    padding: 0,
                    width: '100%',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        padding: 15,
                        width: '100%',
                    }}>
                        <Name>{name}</Name>
                        <Description>{description}</Description>
                    </View>
                </View>
                <Shadow />
            </Container>
        </View>
    );
}