import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Video from 'react-native-video';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
const AddScreen = ({navigation, route}) => {
  const [pasue, setPause] = useState(false);
  const {video} = route.params;

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={() => setPause(!pasue)} activeOpacity={1}>
        <Video
          paused={pasue}
          source={{uri: video.path}}
          style={styles.mediaPlayer}
          volume={1}
          resizeMode="cover"
          style={{height: 200, width: '100%'}}
        />
      </TouchableOpacity>
      {pasue && (
        <TouchableWithoutFeedback onPress={() => setPause(!pasue)}>
          <Entypo
            name="controller-play"
            color="white"
            style={styles.playButton}
          />
        </TouchableWithoutFeedback>
      )}
      <TouchableOpacity style={styles.buttonStyle}>
        <Text style={[styles.largeText, {color: 'white'}]}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AddScreen;
