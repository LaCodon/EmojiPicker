/**
 * This class makes a textarea supporting emojis (WYSIWYG)
 * Copyright (c) 2015 LaCodon
 * 
 * Licensed under the MIT License.
 * 
 * @author Fabian Maier <fabian.maier@lacodon.de>
 */

/**
 * The default EmojiPicker settings.
 */
var EmojiPickerSettings = {
    path: 'emojis/',
    renderPath: 'NULL/',
    icons: {},
    prefix: ''
};

/**
 * Create the EmojiPicker menu and prepare the WYSIWYG div.
 * @returns {EmojiPicker}
 */
var EmojiPicker = function () {

    this.editor = document.getElementById(EmojiPickerSettings.prefix + 'emojiArea');
    this.editor.setAttributeNode(document.createAttribute('contenteditable'));

    if (EmojiPickerSettings.path.length && EmojiPickerSettings.path.charAt(EmojiPickerSettings.path.length - 1) !== '/') {
        EmojiPickerSettings.path += '/';
    }

    if (EmojiPickerSettings.renderPath.length && EmojiPickerSettings.renderPath.charAt(EmojiPickerSettings.renderPath.length - 1) !== '/') {
        EmojiPickerSettings.renderPath += '/';
    }

    this.createMenu();

};

/**
 * Create and show the emoji menu.
 */
EmojiPicker.prototype.createMenu = function () {
    this.menu = document.createElement('div');
    this.iconContainer = document.createElement('div');
    this.menu.appendChild(this.iconContainer);
    this.addAttribute(this.menu, 'id', EmojiPickerSettings.prefix + 'emojiMenu');
    this.hide(this.menu);
    this.menuDisplay = false;
    var parent = this.editor.parentNode;

    this.menuButton = document.createElement('button');
    this.addAttribute(this.menuButton, 'id', EmojiPickerSettings.prefix + 'emojiMenuBtn');
    var buttonContainer = document.createElement('div');
    this.addAttribute(buttonContainer, 'id', EmojiPickerSettings.prefix + 'emojiMenuBtnWrapper');
    buttonContainer.appendChild(this.menuButton);
    buttonContainer.appendChild(this.menu);

    parent.insertBefore(buttonContainer, this.editor);
    this.loadEmojisIntoMenu();

    this.menuButton.addEventListener('click', function () {
        EmojiPicker.prototype.show(document.getElementById(EmojiPickerSettings.prefix + 'emojiMenu'));
    });

    this.editor.addEventListener('click', function () {
        EmojiPicker.prototype.hide(document.getElementById(EmojiPickerSettings.prefix + 'emojiMenu'));
    });
};

EmojiPicker.prototype.loadEmojisIntoMenu = function () {
    var icons = EmojiPickerSettings.icons;
    for (var key in icons) {
        var icon = document.createElement('a');
        this.addAttribute(icon, 'href', 'javascript:void(EmojiPicker.prototype.emoji_click("' + key + '"))');
        this.addAttribute(icon, 'title', key);
        icon.appendChild(this.createIcon(key));
        this.iconContainer.appendChild(icon);
    }
};

EmojiPicker.prototype.emoji_click = function (emoji) {
    document.getElementById(EmojiPickerSettings.prefix + 'emojiArea').appendChild(this.createIcon(emoji));
};

EmojiPicker.prototype.getCaretPosition = function (editableDiv) {
    var caretPos = 0,
            sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            if (range.commonAncestorContainer.parentNode === editableDiv) {
                caretPos = range.endOffset;
            }
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        if (range.parentElement() === editableDiv) {
            var tempEl = document.createElement('span');
            editableDiv.insertBefore(tempEl, editableDiv.firstChild);
            var tempRange = range.duplicate();
            tempRange.moveToElementText(tempEl);
            tempRange.setEndPoint('EndToEnd', range);
            caretPos = tempRange.text.length;
        }
    }
    return caretPos;
};

EmojiPicker.prototype.addAttribute = function (el, name, value) {
    var attr = document.createAttribute(name);
    attr.value = value;
    el.setAttributeNode(attr);
};

EmojiPicker.prototype.show = function (el) {
    this.removeClass(el, 'hidden');
    this.addClass(el, 'visible');
};

EmojiPicker.prototype.hide = function (el) {
    this.removeClass(el, 'visible');
    this.addClass(el, 'hidden');
};

EmojiPicker.prototype.addClass = function (el, cls) {
    el.classList.add(cls);
};

EmojiPicker.prototype.removeClass = function (el, cls) {
    el.classList.remove(cls);
};

/**
 * Get img tag for given emoji.
 * @param {String} emoji The emoji identifier
 * @returns {Element} The img tag
 */
EmojiPicker.prototype.createIcon = function (emoji) {
    var filename = EmojiPickerSettings.icons[emoji];
    var path = EmojiPickerSettings.path;
    var imgTag = document.createElement('img');
    imgTag.innerHTML = ':' + emoji + ':';
    this.addAttribute(imgTag, 'src', path + filename);
    this.addAttribute(imgTag, 'alt', emoji);
    return imgTag;
};

/**
 * This function returns the editor's content.
 * @returns {String} The text without HTML tags
 */
EmojiPicker.prototype.getValue = function () {
    return document.getElementById(EmojiPickerSettings.prefix + 'emojiArea').textContent;
};

/**
 * Reconverts a text from getValue() into HTML useable code.
 * @param {String} text The string with :emoji: elements
 * @returns {String} The HTML code
 */
EmojiPicker.prototype.render = function (text) {
    if (EmojiPickerSettings.renderPath === 'NULL/') {
        EmojiPickerSettings.renderPath = EmojiPickerSettings.path;
    }
    return text.replace(/:([^{\s::}]*):/g, function (a, b) {
        var r = EmojiPickerSettings.icons[b];
        return typeof r === 'string' ? '<img src="' + EmojiPickerSettings.renderPath + r + '" alt="emoji">' : a;
    });
};