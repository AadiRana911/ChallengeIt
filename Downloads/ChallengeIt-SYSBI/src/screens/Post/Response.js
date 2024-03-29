import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Video from 'react-native-video';
import primaryColor from '../../components/colors';
const Response = ({navigation, route}) => {
  const {height, width} = Dimensions.get('window');
  const [isPrivate, setIsPrivate] = useState(true);
  const [pasue, setPause] = useState(false);
  const [heigh, setHeigh] = useState(40);
  const {video} = route.params;
  return (
    <View style={[styles.container]}>
      <View>
        <Ionicons
          name="chevron-back"
          style={{fontSize: 30}}
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Entypo name="dots-three-vertical" style={{fontSize: 20}} />
      </View>
      <View style={{marginBottom: height / 30}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: height / 50,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Ionicons
              name="md-location-sharp"
              style={{fontSize: 20, color: 'skyblue'}}
            />
            <Text style={{color: 'skyblue'}}>Giga Mall, Islamabad</Text>
          </View>
          <Text
            style={{color: '#F03C00'}}
            onPress={() => alert('Here you can change your location')}>
            change
          </Text>
        </View>
      </View>
      <View style={{width: '100%', marginBottom: height / 40}}>
        <Text>Make this challenge</Text>
        <View
          style={{
            flexDirection: 'row',
            width: '50%',
            justifyContent: 'space-around',
            marginTop: height / 50,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => setIsPrivate(true)}>
            <Fontisto
              name="locked"
              style={{fontSize: 15, color: isPrivate ? '#F03C00' : 'gray'}}
            />
            <Text style={{color: isPrivate ? '#F03C00' : 'gray'}}>
              {' '}
              private
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setIsPrivate(false)}>
            <Entypo
              name="globe"
              style={{fontSize: 17, color: !isPrivate ? '#F03C00' : 'gray'}}
            />
            <Text style={{color: !isPrivate ? '#F03C00' : 'gray'}}>
              {' '}
              public
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => setPause(!pasue)} activeOpacity={1}>
        <Video
          paused={pasue}
          source={{uri: video}}
          style={styles.mediaPlayer}
          volume={0}
          muted
          resizeMode={'cover'}
          style={{
            aspectRatio: 1,
            width: '100%',
          }}
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

      <TouchableOpacity
        style={{
          marginTop: height / 20,
          paddingVertical: 10,
          width: '35%',
          backgroundColor: primaryColor,
          borderRadius: 100,
          alignSelf: 'center',
          marginVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {width: 10, height: 10},
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 10,
        }}>
        <Text style={{color: 'white'}}>Post response</Text>
      </TouchableOpacity>
    </View>
  );
};

export {Response};
