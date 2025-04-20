import * as FileSystem from "expo-file-system";
const uri = FileSystem.documentDirectory;

/*
data.json
boxes/
    box1/
        info.json
        photo.jpg
        items/
            item1.json
            item2.json
*/

/*
ideas on info

box/info.json
name, desc
info: catagory/label, color, expiry date, owner, loaned, weight, custom, etc

slight idea of what to do (wip)
box/info.json
{
    name: "name",
    desc: "desc",
    photo: true, ah well needs some..thinking
    info: {
        id: "1000", <- 4 number id (unique)
        catag: ['tools', 'cleaning', 'stationery'], (for filter function)
        color: "#ffffff", <- color picker?
        remarks: ""
    }
}

form fields: name*, desc*, catag(?), color, remarks, photo

*************************************
item1.json
{
    name: "name",
    data: {
        expiryDate: "", <- uhh not sure yet about the format..
        status: "lended to bob", <- remarks (prob)
        weight: "3.5g", <- maybe useful
        customField: ["dimensions", "3.5cmx3.5cmx3.5cm"]
    }
}

form fields: name*, expiryDate, status, weight, customField
catagories: tools, food, cleaning, leisure, travel, hobby, sports, decoration, work, school, clothing, books, micc, containers, electrical, components, small items, snack, device, seeds, soil, stationery, luggage, bags, plastic, instruments
*/

// deletes files for testing
export const deleteData = async () => {
    try {
        await FileSystem.deleteAsync(uri + "data.json", { idempotent: true });
        await FileSystem.deleteAsync(uri + "boxes", { idempotent: true });
    } catch (e) {
        console.error("error:", e);
    }
};

// default
export const init = async () => {
    // if directory not there
    if (!(await FileSystem.getInfoAsync(uri + "/boxes")).exists) {
        try {
            // settings
            await FileSystem.writeAsStringAsync(
                uri + "data.json",
                JSON.stringify({
                    data: {
                        theme: "purple",
                    },
                })
            );

            // boxes and starter
            await FileSystem.makeDirectoryAsync(uri + "boxes", {
                intermediates: true,
            });
            await FileSystem.makeDirectoryAsync(uri + "boxes/starter_box", {
                intermediates: true,
            });
            await FileSystem.writeAsStringAsync(
                uri + "boxes/starter_box/info.json",
                JSON.stringify({
                    data: {
                        name: "Starter Box",
                        desc: "Check out this example box!",
                        info: {
                            "id": 1000,
                            "color": "#d00000",
                            "catag": ["tools", "stationery"]
                        }
                    },
                })
            );
            await FileSystem.makeDirectoryAsync(uri + "boxes/starter_box/items", {
                intermediates: true,
            });
            await FileSystem.writeAsStringAsync(
                uri + "boxes/starter_box/items/item1.json",
                JSON.stringify({
                    data: {
                        name: "Example item",
                        data: {
                            date: "4/20/2025",
                            status: "Available",
                            weight: "1kg",
                            custom: ["Dimensions", "10cm x 10cm x 10cm"],
                        },
                    },
                })
            );
        } catch (e) {
            console.error("error:", e);
        }
    }
};

// work darn work!!!!
export const getBoxes = async () => {
    try {
        const dir = await FileSystem.readDirectoryAsync(uri + "boxes");
        const boxes = await Promise.all(
            dir.map(async (box) => {
                try {
                    const info = await FileSystem.readAsStringAsync(
                        uri + "boxes/" + box + "/info.json"
                    );
                    const boxData = JSON.parse(info).data;
                    return {
                        name: boxData.name,
                        desc: boxData.desc,
                        info: {
                            id: (boxData.info?.id || '').toString(),
                            color: boxData.info?.color,
                        }
                    };
                } catch (e) {
                    console.error(`error at ${box}:`, e);
                    return null;
                }
            })
        );

        return boxes.filter((box) => box !== null);
    } catch (e) {
        console.error("Error getting boxes:", e);
        return [];
    }
};

export const getBoxData = async (boxId) => {
    try {
        for (const boxdata of await FileSystem.readDirectoryAsync(uri + "boxes")) {
            try {
                const info = await FileSystem.readAsStringAsync(uri + "boxes/" + boxdata + "/info.json");
                const boxInfo = JSON.parse(info).data;
                if (boxInfo.info.id == boxId) {
                    return boxInfo;
                }
            } catch (e) {
                console.error(`error at box ${boxdata}:`, e);
            }
        }
    } catch (e) {
        console.error("error:", e);
    }
}

// gets items of a box from box id
export const getItems = async (boxId) => {
    try {
        for (const boxdata of await FileSystem.readDirectoryAsync(uri + "boxes")) {
            try {
                const info = await FileSystem.readAsStringAsync(uri + "boxes/" + boxdata + "/info.json");
                const boxInfo = JSON.parse(info).data;
                const itemsPath = uri + "boxes/" + boxdata + "/items";
                console.log(await FileSystem.readDirectoryAsync(itemsPath));

                if (boxInfo.info.id == boxId) {
                    const items = await FileSystem.readDirectoryAsync(uri + "boxes/" + boxdata + "/items");

                    const itemData = await Promise.all(
                        items.map(async (item) => {
                            const itemPath = `${itemsPath}/${item}`;
                            const itemInfo = await FileSystem.readAsStringAsync(itemPath);
                            const itemData = JSON.parse(itemInfo).data;

                            return {
                                name: itemData.name,
                                data: itemData.data,
                            };
                        })
                    );
                    return itemData;
                }
            } catch (e) {
                console.error(`error at box ${boxdata}:`, e);
            }
        }
    } catch (e) {
        console.error("error:", e);
    }
};

// list of all items for search
export const getAllItems = async () => {
    try {
        const allItems = [];

        for (const boxdata of await FileSystem.readDirectoryAsync(uri + "boxes")) {
            const boxInfoPath = uri + "boxes/" + boxdata + "/info.json";
            const boxInfoData = await FileSystem.readAsStringAsync(boxInfoPath);
            const boxInfo = JSON.parse(boxInfoData).data;
            const boxId = boxInfo.info.id;

            const itemsPath = uri + "boxes/" + boxdata + "/items";
            let items = [];
            try {
                items = await FileSystem.readDirectoryAsync(itemsPath);
            } catch (dirErr) {
                console.error(`Error reading items directory for box ${boxdata}:`, dirErr);
                continue;
            }

            for (const itemFile of items) {
                const itemPath = `${itemsPath}/${itemFile}`;
                const itemContent = await FileSystem.readAsStringAsync(itemPath);
                const parsedItem = JSON.parse(itemContent).data;

                const item = {
                    boxId: boxId,
                    name: parsedItem.name,
                    data: parsedItem.data
                };

                allItems.push(item);
            }
        }

        console.log(`Found ${allItems.length} total items across all boxes`);
        return allItems;
    } catch (e) {
        console.error("Error in getAllItems:", e);
        return [];
    }
};

// create box, wip
export const createBox = async (name, desc, catag, color, remarks, imageUri) => {
    const boxName = name
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/ /g, "_")
        .toLowerCase();

    try {
        // id then box directory
        const boxes = await getBoxes();
        const existingIds = boxes.map(box => box.info.id).filter(id => id);

        // prevent same folder
        let finalBoxName = boxName;
        let counter = 1;
        while (await FileSystem.getInfoAsync(uri + "boxes/" + finalBoxName).then(info => info.exists)) {
            finalBoxName = `${boxName}${counter}`;
            counter++;
        }

        let newId;
        do {
            newId = Math.floor(1000 + Math.random() * 9000);
        } while (existingIds.includes(newId));

        await FileSystem.makeDirectoryAsync(uri + "boxes/" + finalBoxName, {
            intermediates: true,
        });

        await FileSystem.makeDirectoryAsync(uri + "boxes/" + finalBoxName + "/items", {
            intermediates: true,
        });

        let imagePath = null;
        if (imageUri && typeof imageUri === "string") {
            imagePath = "photo.jpg";
            try {
                await FileSystem.copyAsync({
                    from: imageUri,
                    to: uri + "boxes/" + finalBoxName + "/photo.jpg",
                });
            } catch (e) {
                console.error("error:", e);
            }
        }

        await FileSystem.writeAsStringAsync(
            uri + "boxes/" + finalBoxName + "/info.json",
            JSON.stringify({
                data: {
                    name: name,
                    desc: desc,
                    image: imagePath,
                    info: {
                        id: newId.toString(),
                        catag: catag,
                        color: color,
                        remarks: remarks
                    }
                }
            })
        );

        return newId.toString();
    } catch (e) {
        console.error("error:", e);
        return null;
    }
};

export const getBoxImage = async (boxId) => {
    try {
        for (const boxdata of await FileSystem.readDirectoryAsync(uri + "boxes")) {
            try {
                const info = await FileSystem.readAsStringAsync(uri + "boxes/" + boxdata + "/info.json");
                const boxInfo = JSON.parse(info).data;

                if (boxInfo.info.id === boxId) {
                    if (boxInfo.image) {
                        const imagePath = uri + "boxes/" + boxdata + "/" + boxInfo.image;
                        const fileInfo = await FileSystem.getInfoAsync(imagePath);
                        if (fileInfo.exists) {
                            return imagePath;
                        }
                    }
                    return null;
                }
            } catch (e) {
                console.error(`error at box ${boxdata}:`, e);
            }
        }
        return null;
    } catch (e) {
        console.error("error:", e);
        return null;
    }
}

// new items
export const createItem = async (boxId, itemname, itemdata = {}) => {
    try {
        for (const boxdata of await FileSystem.readDirectoryAsync(uri + "boxes")) {
            try {
                const info = await FileSystem.readAsStringAsync(uri + "boxes/" + boxdata + "/info.json");
                const boxInfo = JSON.parse(info).data;

                if (boxInfo.info.id == boxId) {
                    const time = Date.now();
                    const itemName = `item_${time}`;

                    try {
                        await FileSystem.writeAsStringAsync(
                            uri + "boxes/" + boxdata + "/items/" + itemName,
                            JSON.stringify({
                                data: {
                                    name: itemname,
                                    data: itemdata,
                                    boxId: boxInfo.info.id
                                },
                            })
                        );
                        return itemName;
                    } catch (e) {
                        console.error("error:", e);
                    }
                }
            } catch (e) {
                console.error(`error at box ${boxdata}:`, e);
            }
        }
    } catch (e) {
        console.error("error:", e);
    }
};

// theme page!!
export const themeColor = async () => {
    try {
        const data = await FileSystem.readAsStringAsync(uri + "data.json");
        return JSON.parse(data).data.theme;
    } catch (e) {
        console.error("error:", e);
    }
}

export const updateTheme = async (theme) => {
    try {
        await FileSystem.writeAsStringAsync(
            uri + "data.json",
            JSON.stringify({
                data: {
                    theme: theme,
                },
            })
        );
    } catch (e) {
        console.error("error:", e);
    }
}
