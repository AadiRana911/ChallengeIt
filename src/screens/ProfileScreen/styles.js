import {StyleSheet, Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window');
export default styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    position: 'absolute',
    backgroundColor: 'white',
    left: width,
    paddingTop: 10,
    paddingHorizontal: 10,
    flex: 1
  },
  videoContainer: {
    backgroundColor: 'red',
    width: width-20,
    height: height/2.5
  },
  videoTouchableContainer: {
    backgroundColor: 'red',
    width: width-20,
    height: height/3
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
  playButton: {
    opacity: 0.7,
    fontSize: 70, 
    color: 'white', 
    position: 'absolute', 
    left: width/2-35, 
    top: height/5-35
  },
  imageStyle: {
    borderRadius: 30,
    borderWidth: width/205.714,
    height: width/6.857,
    width: width/6.857,
    top: height/3+height/27,
    left: width-width/5.2,
    borderColor: 'white',
  },
  screenIconContainer: {
    top: 25,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userNameContainer: {
    flexDirection: 'row',
    left: width/5.14285,
    top: height/10,
    justifyContent: 'space-between',
  },
  followButtonStyle: {
    backgroundColor: 'orange',
    paddingHorizontal: width/27.8,
    paddingVertical: 3,
    borderRadius: 50,
    marginRight: width/4.57142
  },
  userStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: height/5,
    borderColor: 'rgba(125,125,125,0.2)',
    shadowOpacity: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 12},
  },
  individualStatContainer: {
    alignItems: 'center',
    width: '50%'
  },
  thumbnailStyle: {
    height: height/6.8,
    width: width/3.475,
    marginRight: 20,
    marginBottom: 20
  }
});