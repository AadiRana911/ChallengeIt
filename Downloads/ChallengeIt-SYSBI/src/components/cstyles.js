import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Fonts} from '../utils/Fonts';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsCenter: {
    alignItems: 'center',
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  itemsEnd: {
    alignItems: 'flex-end',
  },
  boxShadow: {
    shadowColor: '#f5f5f5',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
    zIndex: 999,
    backgroundColor: '#0000',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  center: {
    justifyContent: 'center',
    marginBottom: 20,
    alignItems: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  padder: {
    padding: 20,
  },
  bg_white: {
    backgroundColor: 'white',
  },
  pt_30: {
    paddingTop: 30,
  },
  pt_15: {
    paddingTop: 15,
  },
  pl_15: {
    paddingLeft: 15,
  },
  pr_15: {
    paddingRight: 15,
  },
  pb_15: {
    paddingBottom: 15,
  },
  px_5: {
    paddingRight: 5,
    paddingLeft: 5,
  },
  px_10: {
    paddingHorizontal: 10,
  },
  px_15: {
    paddingHorizontal: 15,
  },
  px_20: {
    paddingHorizontal: 20,
  },
  py_10: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  py_20: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  mt_25: {
    marginTop: 25,
  },
  mt_10: {
    marginTop: 10,
  },
  mt_15: {
    marginTop: 15,
  },
  ml_15: {
    marginLeft: 15,
  },
  ml_5: {
    marginLeft: 5,
  },
  mr_15: {
    marginRight: 15,
  },
  mx_15: {
    marginLeft: 15,
    marginRight: 15,
  },
  my_15: {
    marginTop: 15,
    marginBottom: 15,
  },
  my_25: {
    marginVertical: 25,
  },
  my_5: {
    marginVertical: 5,
  },
  ml_10: {
    marginLeft: 10,
  },
  mr_10: {
    marginRight: 10,
  },
  mb_10: {
    marginBottom: 10,
  },
  mb_15: {
    marginBottom: 15,
  },
  mb_20: {
    marginBottom: 20,
  },
  mx_5: {
    marginHorizontal: 5,
  },
  mx_10: {
    marginLeft: 10,
    marginRight: 10,
  },
  my_10: {
    marginTop: 10,
    marginBottom: 10,
  },
  ml_20: {
    marginLeft: 20,
  },
  mr_20: {
    marginRight: 20,
  },
  mx_20: {
    marginLeft: 20,
    marginRight: 20,
  },
  my_20: {
    marginTop: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  selfCenter: {
    alignSelf: 'center',
  },
  flexBetweeen: {
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  flexEnd: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  titleText: {
    fontSize: 20,
    fontFamily: Fonts.CenturyBold,
  },
  titlePrimaryText: {
    fontSize: 20,
    fontFamily: Fonts.CenturyBold,
  },
  sloganText: {
    fontSize: 10,
    letterSpacing: 5,
  },
  sloganPriamryText: {
    fontSize: 10,
    letterSpacing: 5,
  },

  bottomFooter: {
    // height: 100,
    position: 'absolute',
    bottom: 0,
    paddingBottom: 20,
    // backgroundColor: "green",
  },

  buttonText: {
    fontSize: 12,
    fontFamily: Fonts.CenturyBold,
  },
  linkText: {
    fontSize: 13,
    fontFamily: Fonts.CenturyBold,
  },
  linkDarkText: {
    fontSize: 13,
    fontFamily: Fonts.CenturyBold,
  },
  inputUnderLineContainer: {
    // flex: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 3,
    borderBottomWidth: 0.3,
  },
  pickerUnderLineContainer: {
    // flex: 1,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 3,
    borderBottomWidth: 0.3,
  },
  inputUnderLineIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  inputUnderLineIcon: {
    fontSize: 14,
  },

  gradientButton: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  gradientButtonText: {
    // backgroundColor: 'transparent',
    fontSize: 14,
    color: 'white',
    fontFamily: Fonts.CenturyBold,
  },
  testBorder: {
    borderWidth: 1,
    borderColor: 'red',
  },
  userContainer: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#e98180',
  },

  errorText: {
    paddingLeft: 25,
    fontSize: 12,
    color: 'red',
  },
});
