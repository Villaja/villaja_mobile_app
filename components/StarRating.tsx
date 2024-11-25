import { View, Text } from 'react-native';
import { useState } from 'react';
import React from 'react'
import StarIcon from './StarIcon';

const StarRating = ({ starLength = 5, color = '#000000', size = 24, disabled = false, starStyle = { flexDirection: "row", alignItems: "center", gap: 2 }, starTextStyle = { color: color }, messages = ["Terrible", "Bad", "Okay", "Good", "Amazing"], defaultRating = 1, newRating }: { starLength: number, color: string, size: number, disabled: boolean, starStyle: any, starTextStyle: any, messages: string[], defaultRating: number, newRating: (rating: number) => void }) => {
    const arrayLength = Array.from({ length: starLength });
    const [rating, setRating] = useState<any>(arrayLength);
    const [storedRating, setStoredRating] = useState(defaultRating);

    const handleStoreRating = (rating: number, disabled: boolean) => {
        if (!disabled) {
            setStoredRating(rating);
            if (newRating) {
                newRating(rating);
            } else {
                setStoredRating(rating);
            }
        } else {
            return undefined;
        }
    }

    return (
        <View style={{ alignItems: "center", gap: 10, flexDirection: 'row' }}>
            <View style={starStyle}>
                {
                    rating.map((item: any, index: number) => (<StarIcon key={index} onClick={() => handleStoreRating(index + 1, disabled)} full={storedRating >= index + 1} color={color} size={size} />))
                }
            </View>
            <Text style={starTextStyle}>{messages.length === starLength ? messages[storedRating ? storedRating - 1 : rating - 1] : storedRating}</Text>
        </View>
    )
};

export default StarRating