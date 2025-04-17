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
                            "id": 1000
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
                        name: "an item"
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
                    return JSON.parse(info).data;
                } catch (e) {
                    console.error(`Error reading box ${box}:`, e);
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

// gets items of a box from box id
export const getItems = async (boxId) => {
    try {
        for (const boxdata of await FileSystem.readDirectoryAsync(uri + "boxes")) {
            try {
                const info = await FileSystem.readAsStringAsync(uri + "boxes/" + boxdata + "/info.json");
                const boxInfo = JSON.parse(info).data;
                if (boxInfo.info.id === boxId) {
                    const items = await FileSystem.readDirectoryAsync(uri + "boxes/" + boxdata + "/items");
                    const itemData = await Promise.all(
                        items.map(async (item) => {
                            const itemInfo = await FileSystem.readAsStringAsync(
                                uri + "boxes/" + boxdata + "/items/" + item
                            );
                            return JSON.parse(itemInfo).data;
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
        const boxes = await FileSystem.readDirectoryAsync(uri + "boxes");
        const allItems = await Promise.all(
            boxes.map(async (box) => {
                const items = await FileSystem.readDirectoryAsync(
                    uri + "boxes/" + box + "/items"
                );
                const itemData = await Promise.all(
                    items.map(async (item) => {
                        const itemInfo = await FileSystem.readAsStringAsync(
                            uri + "boxes/" + box + "/items/" + item
                        );
                        return JSON.parse(itemInfo).data;
                    })
                );
                return itemData;
            })
        );
        return allItems.flat();
    } catch (e) {
        console.error("error:", e);
    }
};

// create box, wip
export const createBox = async (name, desc) => {
    const boxName = name
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/ /g, "_")
        .toLowerCase(); // no spaces or special chars
    try {
        await FileSystem.makeDirectoryAsync(uri + "boxes/" + boxName, {
            intermediates: true,
        });
        await FileSystem.makeDirectoryAsync(uri + "boxes/" + boxName + "/items", {
            intermediates: true,
        });
        const boxes = await getBoxes();
        const existingIds = boxes.map(box => box.info.id).filter(id => id);
        
        let newId;
        do {
            newId = Math.floor(1000 + Math.random() * 9000);
        } while (existingIds.includes(newId));

        await FileSystem.writeAsStringAsync(
            uri + "boxes/" + boxName + "/info.json",
            JSON.stringify({
            data: {
            name: name,
            desc: desc,
            info: {
                id: newId
            }
            },
            })
        );
    } catch (e) {
        console.error("error:", e);
    }
};

// new items
export const createItem = async (box, itemname, itemdata = []) => {
    const itemName =
        "item" +
        (await FileSystem.readDirectoryAsync(uri + "boxes/" + box + "/items")
            .length) +
        1;
    try {
        await FileSystem.writeAsStringAsync(
            uri + "boxes/" + box + "/items/" + itemName + ".json",
            JSON.stringify({
                data: {
                    name: itemname,
                    data: itemdata,
                },
            })
        );
        return itemName;
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
