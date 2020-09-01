import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  Linking,
} from 'react-native';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OptionsMenu from 'react-native-options-menu';
import {more, dummy, clap} from '../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {primaryColor} from '../../components/colors';
const width = Dimensions.get('window').width;
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import {Divider} from 'react-native-paper';
import Share from 'react-native-share';

const Challenges = ({navigation}) => {
  // useEffect(() => {
  //   (async () => {
  //     requestMultiple(
  //       (Platform.OS = 'android' && [
  //         PERMISSIONS.ANDROID.CAMERA,
  //         PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  //         PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  //       ]),
  //     ).then((res) => {
  //       if (
  //         res[PERMISSIONS.ANDROID.CAMERA] == 'granted' &&
  //         res[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] == 'granted' &&
  //         res[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] == 'granted'
  //       ) {
  //       } else {
  //         Alert.alert('ChallengeIt', 'Please allow all permission', [
  //           {
  //             text: 'OPEN SETTINGS',
  //             onPress: () => Linking.openSettings(),
  //           },
  //         ]);
  //       }
  //     });
  //   })();
  // }, []);

  const [isclapped, setClapp] = useState(false);
  const [camVisible, setCamVisible] = useState(false);

  const renderPosts = ({item, index}) => {
    return (
      <View key={index} activeOpacity={0.9} style={[styles.cardStyle]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Image source={dummy} style={styles.userImgStyle} />

          <Text
            numberOfLines={3}
            style={[
              styles.largeText,
              {
                alignSelf: 'center',
                // padding: 10,
                // textAlign: 'center',
                marginTop: '-2%',
                width: '75%',
                // backgroundColor: 'red'
              },
            ]}>
            <Text
              style={[
                styles.largeText,
                {
                  // color: theme.colors.primary,
                  alignSelf: 'center',
                  textAlign: 'center',
                  marginTop: 0,
                },
              ]}>
              Zeeshan
            </Text>{' '}
            <Text style={[styles.largeText]}> Challenged </Text>
            <Text style={[styles.largeText]}>{`Ali Khan\n`}</Text>
            <Text
              style={[
                styles.mediumText,
                {
                  // alignSelf: 'flex-start',
                  // marginLeft: '15.5%',
                  // color: theme.colors.gray,
                },
              ]}>
              3 km away
            </Text>
          </Text>

          <OptionsMenu
            button={more}
            buttonStyle={{
              width: 20,
              height: 25,
              resizeMode: 'contain',
              // marginTop: '5%',
              alignSelf: 'flex-end',
            }}
            destructiveIndex={0}
            options={['Report', 'Delete']}
            actions={[
              () => {
                alert('Reported');
              },

              () => {
                alert('Deleted');
              },
            ]}
          />
        </View>

        <View style={[styles.horizontalContainer, {marginTop: 15}]}></View>
        <View>
          <Image
            style={[styles.questionImage]}
            source={dummy}
            // resizeMode={'contain'}
          />

          {/* <Text style={styles.mediumText}>{item.text}</Text> */}
        </View>

        <View
          style={[
            styles.horizontalContainer,
            {justifyContent: 'space-between'},
          ]}>
          <View style={[styles.bottomContainer]}>
            <TouchableOpacity onPress={() => toggleCamModal()}>
              <MaterialIcons
                name="videocam"
                style={{fontSize: width / 16.45714, color: 'gray'}}
              />
              {/* <MaterialIcons
                name="reply"
                color="orange"
                style={{
                  fontSize: width / 20.57142,
                  // position: 'absolute',
                  // top: '50%',
                  // left: '50%',
                }}
              /> */}
              <Text style={[styles.smallText, {marginTop: -3}]}>200</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setClapp(!isclapped)}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 4,
              }}>
              <Image
                resizeMode={'contain'}
                source={clap}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: isclapped ? primaryColor : 'gray',
                  marginRight: 4,
                }}
              />
              <Text style={[styles.smallText, {marginTop: 2}]}>200</Text>
            </View>
          </TouchableOpacity>
          <View
            style={[
              styles.bottomContainer,
              {flexDirection: 'row', paddingHorizontal: 10},
            ]}>
            <TouchableOpacity onPress={handleShare}>
              <FontAwesome
                name="share"
                style={{fontSize: width / 18.70129, color: 'gray'}}
              />
              <Text style={[styles.smallText, {marginTop: -3}]}>200</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.bottomContainer,
              {flexDirection: 'row', paddingHorizontal: 10},
            ]}>
            <TouchableOpacity>
              <Entypo
                name="eye"
                style={{fontSize: width / 18.70129, color: 'gray'}}
              />
              <Text style={[styles.smallText, {marginTop: -3}]}>200</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const toggleCamModal = () => {
    setCamVisible(!camVisible);
  };

  const renderModal = () => {
    return (
      <Modal
        isVisible={camVisible}
        coverScreen={true}
        hasBackdrop={true}
        animationIn="slideInUp"
        onSwipeComplete={toggleCamModal}
        swipeDirection="up">
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 4,
            height: Dimensions.get('window').height / 5,
            width: '80%',
            alignSelf: 'center',
          }}>
          <AntDesign
            name="close"
            size={24}
            color={'tomato'}
            onPress={toggleCamModal}
            style={{padding: 15}}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
              setCamVisible(!camVisible);
            }}
            style={[styles.horizontalContainer, {marginLeft: 4}]}>
            <AntDesign
              name="eye"
              size={24}
              color={'gray'}
              onPress={toggleCamModal}
              style={{alignSelf: 'center', margin: 5}}
            />
            <Text
              style={[
                styles.large,
                {alignSelf: 'center', fontSize: 18, margin: 5},
              ]}>
              View Challenge responses
            </Text>
          </TouchableOpacity>
          <Divider
            style={{
              width: '95%',
              height: 1,
              marginVertical: 5,
              alignSelf: 'center',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              _captureVideo();
              setCamVisible(!camVisible);
            }}
            style={[styles.horizontalContainer, {marginLeft: 4}]}>
            <MaterialIcons
              name="videocam"
              size={24}
              color={'gray'}
              onPress={toggleCamModal}
              style={{alignSelf: 'center', margin: 5}}
            />
            <Text
              style={[
                styles.large,
                {alignSelf: 'center', fontSize: 18, margin: 5},
              ]}>
              Record your response
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  const _captureVideo = async () => {
    try {
      ImagePicker.openCamera({
        mediaType: 'video',
      }).then((result) => {
        console.log(result);
        // setTimeout(() => {
        //   setImages(medai);
        // }, 200);
      });
    } catch (E) {
      console.log(E);
    }
  };
  const handleShare = async () => {
    let options = {
      title: 'Challenge IT',
      message: 'Hello',
    };
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View
        style={{
          flex: 0.1,

          justifyContent: 'center',
          paddingLeft: 5,
        }}>
        <MaterialIcons
          size={30}
          color="#000"
          name="keyboard-backspace"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={{flex: 0.9}}>
        <FlatList
          data={new Array(100)}
          keyExtractor={(item, index) => item + index.toString()}
          renderItem={renderPosts}
        />
      </View>
      {camVisible && renderModal()}
    </SafeAreaView>
  );
};

export default Challenges;
