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
box/info.json
{
    name: "name",
    desc: "desc",
    image: "", <- uri
    info: {
        id: "1000", <- 4 number id (unique)
        catag: ['tools', 'cleaning', 'stationery'],
        color: "#ffffff", <- color picker?
        remarks: ""
    }
}

*************************************
item1.json
{
    boxId: "1000"
    name: "name",
    data: {
        date: "",
        status: "lended to bob", <- remarks (prob)
        weight: "3.5g", <- maybe useful
        custom: ["dimensions", "3.5cmx3.5cmx3.5cm"]
    }
}
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
            const initBoxId = await createBox(
                "Starter Box",
                "This is a starter box",
                ["tools"],
                "#d00000",
                "",
                null
            );

            await createItem(
                initBoxId,
                "Example item",
                {
                    date: "4/20/2025",
                    status: "Available",
                    weight: "1kg",
                    custom: ["Dimensions", "10cm x 10cm x 10cm"],
                }
            )
        } catch (e) {
            console.error("error:", e);
        }
    }
};

// work darn work!!!!
export const getBoxes = async () => {
    init();
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
                            id: (boxData.info?.id || "").toString(),
                            color: boxData.info?.color,
                        },
                    };
                } catch (e) {
                    console.error(`error at ${box}:`, e);
                    return null;
                }
            })
        );

        return boxes.filter((box) => box !== null);
    } catch (e) {
        console.error("error:", e);
        return [];
    }
};

export const getBoxData = async (boxId) => {
    try {
        for (const boxdata of await FileSystem.readDirectoryAsync(uri + "boxes")) {
            try {
                const info = await FileSystem.readAsStringAsync(
                    uri + "boxes/" + boxdata + "/info.json"
                );
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
};

// gets items of a box from box id
export const getItems = async (boxId) => {
    try {
        for (const boxdata of await FileSystem.readDirectoryAsync(uri + "boxes")) {
            try {
                const info = await FileSystem.readAsStringAsync(
                    uri + "boxes/" + boxdata + "/info.json"
                );
                const boxInfo = JSON.parse(info).data;
                const itemsPath = uri + "boxes/" + boxdata + "/items";
                //console.log(await FileSystem.readDirectoryAsync(itemsPath));

                if (boxInfo.info.id == boxId) {
                    const items = await FileSystem.readDirectoryAsync(
                        uri + "boxes/" + boxdata + "/items"
                    );

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
            if (!(await FileSystem.getInfoAsync(itemsPath)).exists) {
                continue;
            }

            let items = [];
            items = await FileSystem.readDirectoryAsync(itemsPath);
            for (const itemFile of items) {
                const itemPath = `${itemsPath}/${itemFile}`;
                const itemContent = await FileSystem.readAsStringAsync(itemPath);
                const parsedItem = JSON.parse(itemContent).data;

                const item = {
                    boxId: boxId,
                    name: parsedItem.name,
                    data: parsedItem.data,
                };

                allItems.push(item);
            }
        }

        return allItems;
    } catch (e) {
        console.error("getAllItems:", e);
        return [];
    }
};

// create box, wip
export const createBox = async (
    name,
    desc,
    catag,
    color,
    remarks,
    imageUri
) => {
    const boxName = name
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/ /g, "_")
        .toLowerCase();

    try {
        // id then box directory
        const boxes = await getBoxes();
        const existingIds = boxes.map((box) => box.info.id).filter((id) => id);

        // prevent same folder
        let finalBoxName = boxName;
        let counter = 1;
        while (
            await FileSystem.getInfoAsync(uri + "boxes/" + finalBoxName).then(
                (info) => info.exists
            )
        ) {
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

        await FileSystem.makeDirectoryAsync(
            uri + "boxes/" + finalBoxName + "/items",
            {
                intermediates: true,
            }
        );

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
                        remarks: remarks,
                    },
                },
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
                const info = await FileSystem.readAsStringAsync(
                    uri + "boxes/" + boxdata + "/info.json"
                );
                const boxInfo = JSON.parse(info).data;

                if (boxInfo.info.id === boxId) {
                    if (boxInfo.image) {
                        if (boxInfo.image.startsWith('file://')) {
                            return boxInfo.image;
                        } else {
                            const imagePath = uri + "boxes/" + boxdata + "/" + boxInfo.image;
                            const fileInfo = await FileSystem.getInfoAsync(imagePath);
                            if (fileInfo.exists) {
                                return imagePath;
                            }
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
};

// new items
export const createItem = async (boxId, itemname, itemdata = {}) => {
    try {
        for (const boxdata of await FileSystem.readDirectoryAsync(uri + "boxes")) {
            try {
                const info = await FileSystem.readAsStringAsync(
                    uri + "boxes/" + boxdata + "/info.json"
                );
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
                                    boxId: boxInfo.info.id,
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

export const moveItem = async (item, boxId) => {
    try {
        let sourceBox = null;
        let itemFile = null;
        let itemData = null;

        for (const boxdata of await FileSystem.readDirectoryAsync(uri + "boxes")) {
            const itemsPath = uri + "boxes/" + boxdata + "/items";
            const items = await FileSystem.readDirectoryAsync(itemsPath);

            // look for item
            for (const itemFileName of items) {
                const itemPath = `${itemsPath}/${itemFileName}`;
                const itemContent = await FileSystem.readAsStringAsync(itemPath);
                const parsedItem = JSON.parse(itemContent).data;

                if (parsedItem.name === item.name) {
                    sourceBox = boxdata;
                    itemFile = itemFileName;
                    itemData = parsedItem;

                    if (parsedItem.boxId == boxId) {
                        return false;
                    }

                    break;
                }
            }

            if (sourceBox) break;
        }

        let destBox = null;
        for (const boxdata of await FileSystem.readDirectoryAsync(uri + "boxes")) {
            const info = await FileSystem.readAsStringAsync(
                uri + "boxes/" + boxdata + "/info.json"
            )
            const boxInfo = JSON.parse(info).data;

            if (boxInfo.info.id == boxId) {
                destBox = boxdata;
                break;
            }
        }

        itemData.boxId = boxId;

        await FileSystem.writeAsStringAsync(
            uri + "boxes/" + destBox + "/items/" + itemFile,
            JSON.stringify({
                data: itemData,
            })
        )

        await FileSystem.deleteAsync(
            uri + "boxes/" + sourceBox + "/items/" + itemFile,
            { idempotent: true }
        )

        return true;
    } catch (e) {
        console.error("error:", e);
    }

}

export const editBox = async (
    boxId,
    name,
    desc,
    catag,
    color,
    remarks,
    imageUri
) => {
    try {
        for (const boxdata of await FileSystem.readDirectoryAsync(uri + "boxes")) {
            try {
                const info = await FileSystem.readAsStringAsync(
                    uri + "boxes/" + boxdata + "/info.json"
                );
                const boxInfo = JSON.parse(info).data;

                if (boxInfo.info.id == boxId) {
                    const updated = {
                        data: {
                            name: name,
                            desc: desc,
                            image: imageUri,
                            info: {
                                id: boxInfo.info.id,
                                catag: catag,
                                color: color,
                                remarks: remarks,
                            },
                        },
                    };

                    await FileSystem.writeAsStringAsync(
                        uri + "boxes/" + boxdata + "/info.json",
                        JSON.stringify(updated)
                    );
                    return true;
                }
            } catch (e) {
                console.error(`error at box ${boxdata}:`, e);
            }
        }
    } catch (e) {
        console.error("error:", e);
    }
};

export const deleteBox = async (boxId) => {
    try {
        for (const boxdata of await FileSystem.readDirectoryAsync(uri + "boxes")) {
            try {
                const info = await FileSystem.readAsStringAsync(
                    uri + "boxes/" + boxdata + "/info.json"
                );
                const boxInfo = JSON.parse(info).data;

                if (boxInfo.info.id == boxId) {
                    await FileSystem.deleteAsync(uri + "boxes/" + boxdata, { idempotent: true })
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
};

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
};
