import React from "react";

export function getRandomNumber(min, max) {
    return min +
        Math.round(Math.random() * (max - min));
}

export function getRandomItem(item, min, max) {
    return item + getRandomNumber(min, max);;
}

export function getRandomDouble(min, max) {
    return (min + Math.random() * (max - min)).toFixed(4);
}