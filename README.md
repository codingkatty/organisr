# Organisr 📦📦📦

(idk put some images here)

## Concept
Organisr is an elegant way to take notes for storage. It would be extremely useful for those with a lot of items, specifically small ones. The app allows users to create 'boxes' which represent real life storage containers and add their items. Then, when they want to search for a specific item, they can use the search function to find the location of the item.

## Story
Being really bad at storing items, I was often scolded and well, most frequently, I would forget where I have stored the item and fail to find the item. The idea is from a short. It was a tips video, and one of them was about using notes to record places of items.

Whenever I try to find something but its hidden somewhere,... deep and never-to-be-seen, I always think: *my life would be so much better if I had airtags on everything lol.* Though airtags for everything are definitely out of reach (as of now), but this is the alternative!

I thought that it would be really useful to have an app dedicated to storage, it'd feature more advanced capabilities such as adding images, remarks, AI searching, filters and more. Everything can be put into 'boxes' and moved around to other boxes. For example, there could be a 'box' for the bottom most layer of your snack trolley so you would never miss an expiry date! Or you could also add unused items, so that whenever you want to find them, it would be easy as a small search in the app! Though there are some issues, for example too many items would take a very long time to add (btw users can snap a pic of the box and attach it too >w<), in which I will try my best to improve!

## Pages
### Home
The home page consists of a grid like list of all boxes along with a search bar and some buttons. The filter icon allows users to quickly access specific boxes, while the add icon will bring users to the add page.

### Search
This page has a search bar and returns list of boxes and items from search. They are displayed in a collapsible. It is for easy searching. I will add more advanced functions to assist search in the future!

### Add
The add page is used to create boxes and add new items. Two buttons navigate to respective forms. It took quite some time though, as it uses more modules like dropdown, images and more.

### Themes
The themes page can be used to change themes, which I would also add more in the future. Currently, it has 4 themes: purple, blue, pink and yellow. Also the main theme for the whole app is pixel, icons are in svg for easy editing.

### Box Viewer
This page is not shown in nav bar as it is hidden. It can be opened from home page by clicking on a box! It opens the page containing information of the box as well as a list of items stored in the box. From there, users can edit/delete the box, as well as move items to other boxes.

## Functions/To Add

### Basic functions

- [ ] create boxes and add items
- [ ] search
- [ ] move items to other box

<br>

### Pages

- [ ] home
- [ ] search
- [ ] new box/item
- [x] themes
- [ ] info page (box/item)

<br>

### Expanding functions

- [x] advanced settings like images and expiry date, etc
- [ ] visual to differenciate boxes (eg, boxes with more items are more blue)
- [ ] image search, if possible
- [ ] siri integration (how??)
- [x] themes

## Developement
After you fork and clone the repository... (from original README)

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

> Web will not work, as some functions cannot be used. If you encounter issues opening project in Expo Go, use `npx expo start --tunnel` instead.

### reanimated-color-picker
I messed around and couldn't figure out how to edit some styles for the swatch, so I've edited `style.ts` (starts line 93) in `node_modules\reanimated-color-picker\lib\src`. Code here:

```
// Swatches
swatchesContainer: {
   flexDirection: 'row',
   flexWrap: 'wrap',
   justifyContent: 'space-between',
},
swatch: {
   width: 30,
   height: 30,
   borderRadius: 5,
   marginHorizontal: 5,
   borderStyle: 'solid',
   borderWidth: 1,
},
```

the edted style is to match the overall theme <3

## Credits
We've used many resources from the internet to create this project. Here's a list of them!

### Fonts
- Digital Disco by [jeti](https://fontenddev.com/fonts/digital-disco/)
- Pixellari by [Zacchary Dempsey-Plante](https://www.dafont.com/pixellari.font)

### Tools
- Vscode
- Figma
- Hackatime
- [svg to jsx](https://react-svgr.com/playground/?native=true)

### Contact
if you encounter any bugs or so, please feel free to open an issue or email me at m001720@permatapintar.ukm.edu.my<br>
hope you liked the idea of the app!! -candy

<br>

---

Huge thanks to [Hack Club](https://hackclub.com) and the [Cider](https://cider.hackclub.com) team </3
