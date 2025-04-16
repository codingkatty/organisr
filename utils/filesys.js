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
                        info: {}
                    },
                })
            );
            await FileSystem.makeDirectoryAsync(uri + "boxes/starter_box/items", {
                intermediates: true,
            });
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

export const getItems = async (box) => {
    try {
        // check for info name instead
        for (const boxdata of await FileSystem.readDirectoryAsync(uri + "boxes")) {
            const info = await FileSystem.readAsStringAsync(
                uri + "boxes/" + box + "/info.json"
            );

            if (JSON.parse(info).data.name === boxdata) {
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
            }
        }
    } catch (e) {
        console.error("error:", e);
    }
};

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
        await FileSystem.writeAsStringAsync(
            uri + "boxes/" + boxName + "/info.json",
            JSON.stringify({
                data: {
                    name: name,
                    desc: desc,
                },
            })
        );
    } catch (e) {
        console.error("error:", e);
    }
};

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
