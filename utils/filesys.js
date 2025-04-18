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
                    const boxData = JSON.parse(info).data;
                    return {
                        name: boxData.name,
                        desc: boxData.desc,
                        info: {
                            id: (boxData.info?.id || '').toString()
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
                id: newId.toString()
            }
            },
            })
        );
    } catch (e) {
        console.error("error:", e);
    }
};

// new items
export const createItem = async (boxId, itemname, itemdata = {}) => {
    try {
        for (const boxdata of await FileSystem.readDirectoryAsync(uri + "boxes")) {
            try {
                const info = await FileSystem.readAsStringAsync(uri + "boxes/" + boxdata + "/info.json");
                const boxInfo = JSON.parse(info).data;
                if (boxInfo.info.id === boxId) {
                    const items = await FileSystem.readDirectoryAsync(uri + "boxes/" + boxdata + "/items");
                    const itemName = "item" + (items.length + 1) + ".json";

                    try {
                        await FileSystem.writeAsStringAsync(
                            uri + "boxes/" + boxdata + "/items/" + itemName,
                            JSON.stringify({
                                data: {
                                    name: itemname,
                                    data: itemdata
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
