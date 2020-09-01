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
  playButton: {
    opacity: 0.7,
    fontSize: 70,
    color: 'white',
    top: 0,
    left: 0
  },
  mediaPlayer: {
    position: 'absolute',
    width: _reactNative.Dimensions.get('window').width,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black'
  },
  imageStyle: {
    height: 60,
    width: 60,
    // alignSelf: 'center',
    borderRadius: 30,
    borderWidth: 2,
    position: 'absolute',
    borderColor: 'white',
    top: _reactNative.Dimensions.get('window').height / 6,
    left: _reactNative.Dimensions.get('window').width - 80
  },
  AnimatedViewStyle: {
    backgroundColor: 'red',
    // alignSelf: 'center',
    position: 'absolute',
    top: _reactNative.Dimensions.get('window').height / 6,
    left: _reactNative.Dimensions.get('window').width - 80
  },
  textStyle: {
    fontSize: 18
  },
  switchTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: _reactNative.Dimensions.get('window').height / 8
  }
});

exports["default"] = _default;