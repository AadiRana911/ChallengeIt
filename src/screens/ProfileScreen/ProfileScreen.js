import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  Image,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Video from 'react-native-video';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import TabBar from '../../components/navigation';
import styles from './styles';
import primaryColor from '../../components/colors';
const ProfileScreen = ({
  translateScreen,
  paused,
  setPaused,
  translateXImg,
  translateYImg,
  navigation,
}) => {
  const [followState, setFollowState] = useState('follow');
  const [responses, setResponses] = useState(0);
  const [applauses, setApplauses] = useState(0);
  const [shares, setShares] = useState(0);
  const [views, setViews] = useState(0);
  const [totalChallenges, setTotalChallenges] = useState(0);
  const [acceptedChallenges, setAcceptedChallenges] = useState(0);

  const {width, height} = Dimensions.get('window');
  const results = [
    {
      url:
        'https://image.shutterstock.com/image-photo/islamabad-pakistan-april-25-2019-260nw-1407461093.jpg',
    },
    {
      url:
        'https://i.pinimg.com/originals/ca/76/0b/ca760b70976b52578da88e06973af542.jpg',
    },
    {
      url:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
    },
    {
      url:
        'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
    },
    {
      url:
        'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
    },
    {
      url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRFU7U2h0umyF0P6E_yhTX45sGgPEQAbGaJ4g&usqp=CAU',
    },
  ];
  useEffect(() => {
    console.log(width, ' ', height);
  }, []);
  const toggleFollowState = () => {
    switch (followState) {
      case 'follow':
        setFollowState('followed');
        break;
      case 'followed':
        setFollowState('follow');
        break;
    }
  };
  return (
    <Animated.ScrollView
      style={[styles.container, {transform: [{translateX: translateScreen}]}]}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.videoContainer}>
        <TouchableWithoutFeedback
          style={styles.videoTouchableContainer}
          onPress={() => setPaused(!paused)}>
          <Video
            paused={paused}
            source={{uri: 'https://www.w3schools.com/html/mov_bbb.mp4'}}
            style={styles.mediaPlayer}
            volume={1}
            resizeMode="cover"
            // repeat = {true}
          />
        </TouchableWithoutFeedback>

        <Animated.Image
          onPress={() => {
            navigation.navigate('User');
          }}
          source={require('../../assets/images/samplechallenger.jpg')}
          style={[
            styles.imageStyle,
            {
              transform: [
                {translateX: translateXImg},
                {translateY: translateYImg},
              ],
            },
          ]}
          resizeMode="cover"
        />

        {paused && (
          <TouchableWithoutFeedback onPress={() => setPaused(!paused)}>
            <Entypo
              name="controller-play"
              color="white"
              style={styles.playButton}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
      <View style={styles.screenIconContainer}>
        
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/clap.png')}
              style={{height: width / 18.70129, width: width / 18.70129, tintColor: '#f03c00'}}
            />
          </TouchableOpacity>
          <Text style={{fontSize: width / 45.71428}}>{applauses}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity>
            <FontAwesome name="share" style={{fontSize: width / 18.70129}} />
          </TouchableOpacity>
          <Text style={{fontSize: width / 45.71428}}>{shares}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity>
            <Entypo name="eye" style={{fontSize: width / 18.70129}} />
          </TouchableOpacity>
          <Text style={{fontSize: width / 45.71428}}>{views}</Text>
        </View>
      </View>
      {/* <Text style = {{top: height/25}}>Icons go here</Text> */}
      <View style={styles.userNameContainer}>
        <Text
          style={{color: 'black', fontSize: width / 20.57143}}
          onPress={() => {
            navigation.navigate('User');
          }}>
          Zaheer01
        </Text>
        <TouchableOpacity
          style={styles.followButtonStyle}
          onPress={() => toggleFollowState()}>
          <Text
            style={{
              fontSize: width / 26.57143,
              color: 'white',
              alignSelf: 'center',
            }}>
            {followState}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.userStatsContainer}>
      <View style={{justifyContent: 'space-between', flexDirection: 'row', width: '90%', height: height/20, alignItems: 'center'}}>
          <View style = {{flexDirection: 'row'}}>
            <TouchableOpacity style = {{height: height/30}}>
              <MaterialIcons
                name="videocam"
                style={{fontSize: width / 16}}
              />
              <MaterialIcons
                name="reply"
                style={{
                  fontSize: width / 20,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  color: '#f03c00'
                }}
              />
            </TouchableOpacity>
            <Text style = {{marginLeft: 10}}>All Responses</Text>

          </View>
          <Text style={{fontSize: width / 30}}>({responses})</Text>
        </View>
      </View>
      <View style={{top: height / 4.5, flex: 1}}>
        <FlatList
          style={{width: width - 20, top: height / 11.67755}}
          showsVerticalScrollIndicator={false}
          data={results}
          keyExtractor={(result) => result.url}
          numColumns={3}
          contentContainerStyle={{flexGrow: 1}}
          style={{flex: 1}}
          renderItem={({item}) => {
            return (
              <Image style={styles.thumbnailStyle} source={{uri: item.url}} />
            );
          }}
        />
      </View>

      <View style={{height: height / 3.8}}></View>
    </Animated.ScrollView>
  );
};

export default ProfileScreen;
