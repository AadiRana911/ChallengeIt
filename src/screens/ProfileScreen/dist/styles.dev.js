"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _default = styles = _reactNative.StyleSheet.create({
  mediaPlayer: {
    position: 'absolute',
    width: _reactNative.Dimensions.get('window').width - 20,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black'
  },
  playButton: {
    opacity: 0.7,
    fontSize: 70,
    color: 'white',
    position: 'absolute',
    left: _reactNative.Dimensions.get('window').width / 2 - 35,
    top: _reactNative.Dimensions.get('window').height / 6 - 35
  }
});

exports["default"] = _default;