# EmojiPicker.js

Visit <http://lacodon.github.io/EmojiPicker/> for Demo

> EmojiPicker.js does not require jQuery!

## Minimal

Store emojis, for example as `*.png` files, in the `/emojis/` folder

```
⎮- index.html
⎮- EmojiPicker.js
⎮- EmojiPicker.css
⎮- emojis/
     ⎮- bowtie.png
     ⎮- smile.png
     ⎮- laughing.png
     ⎮- blush.png
     ⎮- smiley.png
```

### Include CSS an JavaScript files.

```
<script src="EmojiPicker.js"></script>
<link rel="stylesheet" type="text/css" href="EmojiPicker.css">
```

Add the following JavaScript Code to your index.html

```
function initEmojiPicker() {
     EmojiPickerSettings.path = 'emojis/';
     EmojiPickerSettings.icons = {'bowtie': 'bowtie.png',
          'smile': 'smile.png',
          'laughing': 'laughing.png',
          'blush': 'blush.png',
          'smiley': 'smiley.png'};

     var ep = new EmojiPicker();
}
```

And the following HTML body tag

```
<body onload="initEmojiPicker()">
     <div id="emojiArea"></div>
</body>
```

## Advanced

### Including emojis

Save all emojis in a folder and add each one with a shortcut code and it's filename to EmojiPickerSettings.icons as seen in [Minimal section](#minimal) in the following format:

```
{'shortcut': 'filename.png'};
```

You can also copy the `/emojis/` folder from the source and include this [JavaScript Snippet](https://github.com/LaCodon/EmojiPicker/blob/master/snippet.txt) after including EmojiPicker.js in your HTML.

The last step you have to do is to tell EmojiPicker.js where to find the the emoji images. To do so, replace `path/to/png/` with yours.

```
EmojiPickerSettings.path = 'path/to/png/';
```

> Sometimes it's necessary to also set `EmojiPickerSettings.renderPath`.
> For example if you store your JavaScript files in a `/js/` folder.

```
EmojiPickerSettings.path = '../path/to/png/';
EmojiPickerSettings.renderPath = 'path/to/png/';
```

### Determine WYSIWYG div

The div which to use as the editor needs the id `emojiArea`

```
<div id="emojiArea"></div>
```

You can either use the original CSS file or create an own one. The following list shows each element and it's selector.

- **#emojiArea** - The editor div
- **#emojiMenu** - The emoji menu wrapper
- **#emojiMenu \> div** - The emoji icon list
- **#emojiMenu img**, #emojiArea img - The img tags of WYSIWYG emojis
- **#emojiMenu a** - The link behind the emoji's icon
- **#emojiMenuBtnWrapper** - The wrapper of the button which opens the menu
- **#emojiMenuBtn** - The button himself

> If you face a selector issue because your page already uses the selectors of EmojiPicker.js, you can set a prefix:

```
EmojiPickerSettings.prefix = 'yourPrefix_';
```

Don't forget to add the prefix in your CSS!

> EmojiPicker.js always requires this CSS:
> 
> .visible { display: block; }
> .hidden { display: none; }
