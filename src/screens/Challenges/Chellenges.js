import React, {useState, useEffect, createRef, useRef} from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import OptionsMenu from 'react-native-options-menu';
import {more, dummy, clap} from '../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {primaryColor} from '../../components/colors';
const width = Dimensions.get('window').width;
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {CheckBox, Avatar, Badge} from 'react-native-elements';
import Textarea from 'react-native-textarea';
import Modal from 'react-native-modal';
import {Divider} from 'react-native-paper';
import Share from 'react-native-share';
import RBSheet from 'react-native-raw-bottom-sheet';
const Challenges = ({navigation}) => {
  const rbsheet = createRef();
  const optionSheet = createRef();
  const playListRef = createRef();
  const reportRef = createRef();

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
  const [isModalVisible, setModalVisible] = useState(false);
  const [bilal, setBilal] = useState(false);
  const [myFav, setmyFav] = useState(false);
  const [daring, setDaring] = useState(false);
  const [best, setBest] = useState(false);
  const [nudity, setNudity] = useState(false);
  const [voilence, setVoilence] = useState(false);
  const [cheat, setCheat] = useState(false);
  const [other, setOther] = useState(false);
  const [reportMsg, setReportMsg] = useState('');
  const [buttons, setButton] = useState([
    {id: 0, name: 'New', isActive: true},
    {id: 1, name: 'week before', isActive: false},
    {id: 2, name: '2 days before', isActive: false},
    {id: 3, name: 'Recent', isActive: false},
  ]);
  const [avatars] = useState([
    {id: 0, status: '', uri: 'https://randomuser.me/api/portraits/men/20.jpg'},
    {
      id: 1,
      status: 'success',
      uri: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
    {
      id: 2,
      status: 'success',
      uri: 'https://randomuser.me/api/portraits/men/42.jpg',
    },
    {
      id: 3,
      status: 'error',
      uri: 'https://randomuser.me/api/portraits/men/10.jpg',
    },
    {
      id: 4,
      status: '',
      uri: 'https://randomuser.me/api/portraits/men/14.jpg',
    },
    {
      id: 5,
      status: 'error',
      uri: 'https://randomuser.me/api/portraits/men/30.jpg',
    },
    {
      id: 6,
      status: '',
      uri: 'https://randomuser.me/api/portraits/men/50.jpg',
    },
  ]);

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
                  // alignSelf: 'center',
                  // textAlign: 'center',
                  marginTop: 0,
                  color: 'red',
                },
              ]}>
              Zeeshan
            </Text>{' '}
            <Text style={[styles.largeText]}>Challenged </Text>
            <Text
              style={[styles.largeText, {color: 'red'}]}>{`Ali Khan \n`}</Text>
            <Text
              style={[
                styles.mediumText,
                {
                  // alignSelf: 'flex-start',
                  // marginLeft: '15.5%',
                  // color: theme.colors.gray,
                },
              ]}>
              3 km away{'    '} 3 mins ago
            </Text>
          </Text>

          <TouchableOpacity
            style={{
              height: 27,
              width: 20,
            }}
            onPress={() => optionSheet.current.open()}>
            <Image
              source={more}
              style={{height: 17, width: 17, tintColor: 'black'}}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.horizontalContainer, {marginTop: 15}]}></View>
        <View>
          <Image
            style={[styles.questionImage]}
            source={dummy}
            // resizeMode={'contain'}
          />
        </View>

        <View
          style={[
            styles.horizontalContainer,
            {justifyContent: 'space-between'},
          ]}>
          <View style={[styles.bottomContainer]}>
            <TouchableOpacity onPress={() => rbsheet.current.open()}>
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
  const handleItemPress = (id) => {
    setButton(
      buttons.map((item) => {
        item.isActive = false;
        if (item.id === id.id)
          return {
            ...item,
            isActive: !item.isActive,
          };
        return item;
      }),
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View
        style={{
          flex: 0.2,

          justifyContent: 'center',
          paddingLeft: 5,
        }}>
        <FlatList
          contentContainerStyle={{marginTop: 5}}
          horizontal
          keyExtractor={(item, index) => {
            item + index.toString();
          }}
          data={avatars}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View>
                <Avatar
                  source={{
                    uri: item.uri,
                  }}
                  size="medium"
                  rounded
                  containerStyle={{margin: 4}}
                />

                <Badge
                  status={item.status}
                  value={item.status === 'error' && 'live'}
                  containerStyle={{
                    position: 'absolute',
                    top: item.status === 'error' ? 2 : 8,
                    right: item.status === 'error' ? 0 : 6,
                  }}
                />
              </View>
            );
          }}
        />
        <FlatList
          contentContainerStyle={{marginVertical: 5}}
          horizontal
          keyExtractor={(item, index) => {
            item + index.toString();
          }}
          data={buttons}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleItemPress(item);
                }}
                style={{
                  margin: 5,
                  paddingHorizontal: 20,
                  backgroundColor: item.isActive ? 'red' : '#e3e3e3',
                  borderRadius: 100,
                  paddingVertical: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 0.4,
                  borderColor: 'gray',
                }}>
                <Text
                  style={[
                    styles.mediumText,
                    {color: item.isActive ? 'white' : 'gray', fontSize: 14},
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={{flex: 0.9}}>
        <FlatList
          data={new Array(10)}
          keyExtractor={(item, index) => item + index.toString()}
          renderItem={renderPosts}
        />
      </View>
      <RBSheet
        ref={rbsheet}
        height={150}
        openDuration={250}
        customStyles={{
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            paddingTop: 10,
          },
        }}>
        <TouchableOpacity
          onPress={() => {
            rbsheet.current.close();
            navigation.navigate('Home');
          }}
          style={[styles.horizontalContainer, {marginLeft: 4, padding: 10}]}>
          <TouchableOpacity
            style={[styles.iconStyle, {backgroundColor: 'teal'}]}>
            <AntDesign
              name="eye"
              size={20}
              color={'white'}
              style={{alignSelf: 'center', margin: 5}}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.large,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            View Challenge responses
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <TouchableOpacity
          onPress={() => {
            // rbsheet.current.close();
            _captureVideo();
          }}
          style={[styles.horizontalContainer, {marginLeft: 4, padding: 10}]}>
          <TouchableOpacity
            style={[styles.iconStyle, {backgroundColor: 'tomato'}]}>
            <MaterialIcons
              name="videocam"
              size={24}
              color={'white'}
              style={{alignSelf: 'center', margin: 5}}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.large,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Record your response
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
      </RBSheet>

      <RBSheet
        ref={optionSheet}
        height={360}
        openDuration={250}
        customStyles={{
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            paddingTop: 20,
          },
        }}>
        <TouchableOpacity
          onPress={() => {
            Snackbar.show({
              text: ' Saved to playlist',
              duration: Snackbar.LENGTH_SHORT,
              action: {
                text: 'Change',
                textColor: 'tomato',
                onPress: () => {
                  playListRef.current.open();
                  optionSheet.current.close();
                },
              },
            });
          }}
          style={[styles.horizontalContainer, {marginLeft: 4, padding: 10}]}>
          <TouchableOpacity style={styles.iconStyle}>
            <MaterialIcons
              name="playlist-add"
              size={23}
              color={'white'}
              style={{alignSelf: 'center', margin: 5}}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.large,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Save to playlist
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
            Snackbar.show({
              text: 'Saved to your device',
              duration: Snackbar.LENGTH_SHORT,
            });
          }}
          style={[styles.horizontalContainer, {marginLeft: 4, padding: 10}]}>
          <TouchableOpacity
            style={[styles.iconStyle, {backgroundColor: 'tomato'}]}>
            <Feather
              name="download"
              size={23}
              color={'white'}
              style={{alignSelf: 'center', margin: 5}}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.large,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Save to your device
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
            Snackbar.show({
              text: 'Hide',
              duration: Snackbar.LENGTH_SHORT,
            });
          }}
          style={[styles.horizontalContainer, {marginLeft: 4, padding: 10}]}>
          <TouchableOpacity
            style={[styles.iconStyle, {backgroundColor: '#4f90f7'}]}>
            <MaterialCommunityIcons
              name="eye-off-outline"
              size={23}
              color={'white'}
              style={{alignSelf: 'center', margin: 5}}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.large,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Hide
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
            Snackbar.show({
              text: 'Link Copied',
              duration: Snackbar.LENGTH_SHORT,
            });
          }}
          style={[styles.horizontalContainer, {marginLeft: 4, padding: 10}]}>
          <TouchableOpacity
            style={[styles.iconStyle, {backgroundColor: '#9661ff'}]}>
            <MaterialCommunityIcons
              name="content-copy"
              size={21}
              color={'white'}
              style={{alignSelf: 'center', margin: 5}}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.large,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Copy Link
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
            reportRef.current.open();
            optionSheet.current.close();
          }}
          style={[styles.horizontalContainer, {marginLeft: 4, padding: 10}]}>
          <TouchableOpacity
            style={[styles.iconStyle, {backgroundColor: '#b53a42'}]}>
            <MaterialIcons
              name="report"
              size={21}
              color={'white'}
              style={{alignSelf: 'center', margin: 5}}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.large,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Report Video
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
      </RBSheet>
      <RBSheet
        ref={playListRef}
        height={420}
        openDuration={250}
        customStyles={{
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            paddingTop: 10,
          },
        }}>
        <TouchableOpacity
          onPress={() => {
            setBilal(!bilal);
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <CheckBox
            center
            checked={bilal}
            checkedColor="red"
            onPress={() => {
              setNudity(!nudity);
            }}
            containerStyle={{padding: 0}}
          />
          <Text
            style={[
              styles.large,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Bilal
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <TouchableOpacity
          onPress={() => {
            setmyFav(!myFav);
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <CheckBox
            center
            checked={myFav}
            checkedColor="red"
            onPress={() => {
              setmyFav(!myFav);
            }}
            containerStyle={{padding: 0}}
          />
          <Text
            style={[
              styles.large,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            My Favourites
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <TouchableOpacity
          onPress={() => {
            setDaring(!daring);
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <CheckBox
            center
            checked={daring}
            checkedColor="red"
            onPress={() => {
              setDaring(!daring);
            }}
            containerStyle={{padding: 0}}
          />
          <Text
            style={[
              styles.large,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Daring
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <TouchableOpacity
          onPress={() => {
            setBest(!best);
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <CheckBox
            center
            checked={best}
            checkedColor="red"
            onPress={() => {
              setBest(!best);
            }}
            containerStyle={{padding: 0}}
          />
          <Text
            style={[
              styles.large,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Best
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <TouchableOpacity
          onPress={() => {
            Snackbar.show({
              text: 'New playlist added',
            });
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <MaterialIcons
            name="playlist-add"
            size={23}
            color={'gray'}
            style={{alignSelf: 'center', margin: 5}}
          />
          <Text
            style={[
              styles.large,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Add new playlist
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => {
            playListRef.current.close();
          }}>
          <Text
            style={[styles.largeText, {color: 'white', alignSelf: 'center'}]}>
            Save
          </Text>
        </TouchableOpacity>
      </RBSheet>

      <RBSheet
        ref={reportRef}
        height={520}
        openDuration={250}
        customStyles={{
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            paddingTop: 10,
          },
        }}>
        <TouchableOpacity
          onPress={() => {
            setNudity(!nudity);
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <CheckBox
            center
            checked={nudity}
            checkedColor="red"
            onPress={() => {
              setNudity(!nudity);
            }}
            containerStyle={{padding: 0}}
          />
          <Text
            style={[
              styles.large,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Nudity
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <TouchableOpacity
          onPress={() => {
            setVoilence(!voilence);
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <CheckBox
            center
            checked={voilence}
            checkedColor="red"
            onPress={() => {
              setVoilence(!voilence);
            }}
            containerStyle={{padding: 0}}
          />
          <Text
            style={[
              styles.large,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Voilence
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <TouchableOpacity
          onPress={() => {
            setCheat(!cheat);
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <CheckBox
            center
            checked={cheat}
            checkedColor="red"
            onPress={() => {
              setCheat(!cheat);
            }}
            containerStyle={{padding: 0}}
          />
          <Text
            style={[
              styles.large,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Cheat
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <TouchableOpacity
          onPress={() => {
            setOther(!other);
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <CheckBox
            center
            checked={other}
            checkedColor="red"
            onPress={() => {
              setOther(!other);
            }}
            containerStyle={{padding: 0}}
          />
          <Text
            style={[
              styles.large,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Other
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <Textarea
          containerStyle={styles.textareaContainer}
          style={styles.textarea}
          onChangeText={(e) => {
            setReportMsg(e);
          }}
          defaultValue={reportMsg}
          maxLength={120}
          placeholder={'write your message'}
          placeholderTextColor={'#c7c7c7'}
          underlineColorAndroid={'transparent'}
        />

        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => {
            reportRef.current.close();
          }}>
          <Text
            style={[styles.largeText, {color: 'white', alignSelf: 'center'}]}>
            Send
          </Text>
        </TouchableOpacity>
      </RBSheet>

      {/* {isModalVisible && renderModal()} */}
    </SafeAreaView>
  );
};

export default Challenges;
