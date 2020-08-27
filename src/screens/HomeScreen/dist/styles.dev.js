"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _default = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    height: _reactNative.Dimensions.get('window').height,
    width: _reactNative.Dimensions.get('window').width
  }
});

exports["default"] = _default;