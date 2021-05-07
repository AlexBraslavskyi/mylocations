import {getRandomDouble, getRandomNumber} from "../Utils/random";
//Data for testing

export const testCategories = [{name: "Museums"}, {name: "Playgrounds"}, {name: "Parks"}, {name: "Shops"}, {name: "Malls"}, {name:"Restaurants"}];

export const testLocations = () => {
    let itemsArr = [];
    let randomCount = getRandomNumber(1, 30);
    testCategories.forEach((category) => {
        for (let i = 0; i < randomCount; i++) {
            itemsArr.push({
                name: category.name.substr(0, category.name.length - 1) + " - " + i, address: "Address - " + i,
                coordinates: {
                    latitude: getRandomDouble(30.0000, 32.0000),
                    longitude: getRandomDouble(34.0000, 37.0000)
                },
                category: category.name
            });
        }
    })

    return itemsArr;
}