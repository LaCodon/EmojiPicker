/**
 * This class makes a textarea supporting emojis (WYSIWYG)
 * Copyright (c) 2015 LaCodon
 * 
 * Licensed under the MIT License.
 * 
 * @author Fabian Maier <fabian.maier@lacodon.de>
 */

var EmojiPickerSettings = {
    path: '',
    icons: {},
    prefix: ''
};

var EmojiPicker = function () {

    this.editor = document.getElementById(EmojiPickerSettings.prefix + 'emojiArea');
    this.editor.setAttributeNode(document.createAttribute('contenteditable'));
    this.createMenu();

};

EmojiPicker.prototype.createMenu = function () {
    this.menu = document.createElement('div');
    var container = document.createElement('div');
    this.menu.appendChild(container);
    this.addAttribute(this.menu, 'id', EmojiPickerSettings.prefix + 'emojiMenu');
//    this.hide(this.menu);
    var parent = this.editor.parentNode;
    parent.insertBefore(this.menu, this.editor);
};

EmojiPicker.prototype.addAttribute = function (el, name, value) {
    var attr = document.createAttribute(name);
    attr.value = value;
    el.setAttributeNode(attr);
};

EmojiPicker.prototype.show = function (el) {
    this.removeClass(el, 'hide');
    this.addClass(el, 'show');
};

EmojiPicker.prototype.hide = function (el) {
    this.removeClass(el, 'show');
    this.addClass(el, 'hide');
};

EmojiPicker.prototype.addClass = function (el, cls) {
    el.classList.add(cls);
};

EmojiPicker.prototype.removeClass = function (el, cls) {
    el.classList.remove(cls);
};