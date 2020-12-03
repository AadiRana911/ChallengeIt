import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  TextInput,
  DeviceEventEmitter,
  NativeModules,
  Button,
  Platform,
} from 'react-native';
import styles from './styles';
import Share from 'react-native-share';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OptionsMenu from 'react-native-options-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import {Divider, Avatar} from 'react-native-elements';
import TabBar from '../../components/navigation';
import {ProfilePlaceholder} from '../../components/Placeholder';
import {primaryColor} from '../../components/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Header} from 'react-native-elements';
import {Loading} from '../../components/Loading';
import {useFocusEffect} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {BASE_URL} from '../../redux/base-url';
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';

//redux
import {connect} from 'react-redux';
import {
  visitingProfile,
  addBio,
  updatePic,
  followUser,
} from '../../redux/actions/app';
import {logoutSuccess} from '../../redux/actions/auth';
const User = ({
  navigation,
  visitingProfile,
  user,
  visiting,
  addBio,
  updatePic,
  followUser,
  route,
  token,
  userChallenges,
  acceptedChallenges,
  logoutSuccess,
}) => {
  const {height, width} = Dimensions.get('window');
  const [challenges, setChallenges] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [image, setImage] = useState(null);
  const [isEnd, setIsEnd] = useState(false);
  const [bio, setBio] = useState('');
  const [isEditing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(false);
  const [areChallengesSelected, setAreChallengesSelected] = useState(true);
  const uid = route.params && route.params.uid;
  const [uploadProgress, setProgress] = useState(0);
  const [response, setResponse] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  console.log(uploadProgress);
  console.log(response);
  const showIcon = () => {
    if (isEditing && bio !== '') {
      return 'check';
    } else if (isEditing && bio === '') {
      return '';
    } else {
      return 'pencil';
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = getData();

      return () => unsubscribe;
    }, []),
  );

  const getData = () => {
    setLoading(true);
    console.log('within getData');
    const formData = new FormData();
    formData.append('u_id', uid);
    new Promise((rsl, rej) => {
      visitingProfile(formData, token, rsl, rej);
    })
      .then((res) => {
        visiting && setBio(visiting.bio);
        visiting && setImage(`${BASE_URL}${visiting.dp}`);
      })
      .then((res) => {
        setLoading(false);
      })
      .catch((errorData) => {
        console.log(errorData);
        setLoading(false);
        Snackbar.show({
          text: errorData,
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };
  //add bio
  const handleBio = () => {
    if (bio === '') {
      Snackbar.show({
        text: 'Kindly enter bio',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      const formData = new FormData();
      formData.append('bio', bio);
      new Promise((rsl, rej) => {
        setLoading(true);
        addBio(formData, token, rsl, rej);
      })
        .then((res) => {
          Snackbar.show({
            text: res,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: primaryColor,
          });
          setLoading(false);
        })
        .catch((errorData) => {
          setLoading(false);
          Snackbar.show({
            text: errorData,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: primaryColor,
          });
        });
    }
  };
  const handleProgress = (event) => {
    setProgress(Math.floor((event.loaded * 100) / event.total));
  };
  //handle Profile Pic
  const handleProfilePic = (type) => {
    setModalVisible(true);
    const xhr = new XMLHttpRequest();
    const date = new Date();
    const ext = type.split('/');
    const formData = new FormData();
    formData.append('files', {
      uri: image,
      type: type,
      name: 'image',
      // +
      // Math.floor(date.getTime() + date.getSeconds() / 2) +
      // '.' +
      // ext[1],
    });
    xhr.upload.addEventListener('progress', (event) => handleProgress(event));
    xhr.addEventListener('load', () => {
      setProgress(100);
      setResponse(xhr.response);
      setModalVisible(false);
      setProgress(0);
      setResponse('');
    });
    xhr.open('POST', `${BASE_URL}Authentication/addpicture`);
    xhr.setRequestHeader('auth', token);
    xhr.send(formData);
    // console.log(formData);
    // new Promise((rsl, rej) => {
    //   setLoading(true);
    //   updatePic(formData, token, rsl, rej);
    // })
    //   .then((res) => {
    //     Snackbar.show({
    //       text: res,
    //       duration: Snackbar.LENGTH_SHORT,
    //       backgroundColor: primaryColor,
    //     });
    //     setLoading(false);
    //   })
    //   .catch((errorData) => {
    //     setLoading(false);
    //     Snackbar.show({
    //       text: errorData,
    //       duration: Snackbar.LENGTH_SHORT,
    //       backgroundColor: primaryColor,
    //     });
    //   });
  };

  //share profile
  const shareProfile = async () => {
    if (token) {
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
    } else {
      Snackbar.show({
        text: 'Kindly login first',
        backgroundColor: primaryColor,
      });
      navigation.navigate('Signin');
    }
  };
  //image picker
  const pickImage = async () => {
    const {isConnected} = await NetInfo.fetch();
    const date = new Date();
    ImagePicker.openPicker({mediaType: 'photo'}).then((image) => {
      setImage(image.path);
      if (isConnected) {
        image && handleProfilePic(image.mime);
      } else {
        Snackbar.show({
          text: 'You are not connected to internet',
          backgroundColor: primaryColor,
        });
      }

      // image && handleProfilePic(image.mime);
    });
  };
  // return <ProfilePlaceholder />;
  // follow user
  const handleFollow = () => {
    if (token) {
      const formData = new FormData();
      user && formData.append('u_id', user.u_id);
      new Promise((rsl, rej) => {
        setLoading(true);
        followUser(formData, token, rsl, rej);
      })
        .then((res) => {
          Snackbar.show({
            text: res,
            duration: Snackbar.LENGTH_SHORT,
          });
          setFollowing(true);
          setLoading(false);
        })
        .catch((errorData) => {
          setLoading(false);
          Snackbar.show({
            text: errorData,
            duration: Snackbar.LENGTH_SHORT,
          });
        });
    } else {
      Snackbar.show({
        text: 'Kindly login first',
        backgroundColor: primaryColor,
      });
      navigation.navigate('Signin');
    }
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setProgress(0);
  };
  const handleLogout = () => {
    new Promise((rsl, rej) => {
      logoutSuccess(rsl, rej);
    }).then((res) => {
      navigation.navigate('Signin');
    });
  };
  const renderModal = () => {
    return (
      <Modal
        isVisible={modalVisible}
        coverScreen={true}
        hasBackdrop={true}
        // animationIn="slideInUp"
        // onSwipeComplete={() => toggleModal()}
        swipeDirection="up">
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 4,
            height: Dimensions.get('window').height / 3.2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          contentContainerStyle={{flex: 0.4}}>
          {/* <AntDesign
            onPress={() => {
              XMLHttpRequest.abort();
            }}
            name="close"
            size={24}
            color={primaryColor}
            onPress={toggleModal}
            style={{padding: 10}}
          /> */}
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Progress.Circle
              progress={uploadProgress / 10}
              size={100}
              showsText={uploadProgress == 0 ? '0' : uploadProgress / 100}
              style={{justifyContent: 'center', alignItems: 'center'}}
              color={primaryColor}
              textStyle={[
                styles.largeText,
                {alignSelf: 'center', color: primaryColor, fontSize: 20},
              ]}></Progress.Circle>
          </View>
          <Text style={[styles.mediumText, {margnTop: 4}]}>Uploading...</Text>
          {/* <Progress.Circle progress={uploadProgress} width={200} sty/> */}
        </View>
      </Modal>
    );
  };
  return (
    // <SafeAreaView style={{flex: 1}}>
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{flex: 1}}
      showsVerticalScrollIndicator={false}>
      <Header
        containerStyle={{
          paddingTop: 0,
          height: Platform.select({
            android: 66,
            default: 44,
          }),
        }}
        backgroundColor={'transparent'}
        leftComponent={
          <AntDesign
            onPress={() => {
              navigation.goBack();
            }}
            name="arrowleft"
            style={{
              fontSize: 26,
              color: 'black',
            }}
          />
        }
        rightComponent={
          <OptionsMenu
            customButton={
              <Entypo
                name="dots-three-horizontal"
                style={{
                  fontSize: 25,
                  color: 'black',
                  // marginVertical: 4,
                  alignSelf: 'center',
                  // marginRight: 10,
                }}
              />
            }
            options={
              visiting && visiting.is_edit === 'Yes'
                ? ['My Playlists', 'Settings', 'Logout']
                : ['Share Profile', 'Report Profile']
            }
            actions={
              visiting && visiting.is_edit === 'Yes'
                ? [
                    () => navigation.navigate('Playlists'),
                    () => navigation.navigate('Settings'),
                    () => {
                      handleLogout();
                    },
                  ]
                : [
                    () => shareProfile(),
                    () =>
                      Snackbar.show({
                        text: 'Profile Reported',
                        backgroundColor: primaryColor,
                      }),
                  ]
            }
          />
        }
      />

      <View style={[styles.head]}>
        <View
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 10, height: 10},
            shadowOpacity: 0.1,
            shadowRadius: 5,
            // elevation: 10,
            borderRadius: 70,
            borderWidth: 3,
            borderColor: '#fff',
          }}>
          <Avatar
            rounded
            source={{
              uri: image,
              // uri: `${BASE_URL}${this.props.user.dp}`,
            }}
            size={100}
            containerStyle={{alignSelf: 'flex-start'}}
          />
          {/* {visiting && visiting.dp === '' ? (
            <TouchableOpacity style={styles.imageStyle}>
              <Image
                source={{
                  uri: image,
                }}
                style={[styles.imageStyle, {borderColor: 'white'}]}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.imageStyle}>
              <Image
                source={visiting && {uri: `${BASE_URL}/${visiting.dp}`}}
                style={[styles.imageStyle, {borderColor: 'white'}]}
              />
            </TouchableOpacity>
          )} */}
          {visiting && visiting.is_edit === 'Yes' && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 5,
                color: primaryColor,
                right: -2,
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 4,
                height: 20,
                width: 20,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 2,
              }}
              onPress={() => {
                pickImage();
              }}>
              <MaterialCommunityIcons
                name="pencil"
                style={{
                  alignSelf: 'center',
                  fontSize: 14,
                  color: 'black',

                  color: primaryColor,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={[styles.largeText, {marginVertical: 5, color: 'black'}]}>
          {visiting && visiting.f_name + ' ' + visiting.l_name}
        </Text>
        <Text
          style={[
            styles.mediumText,
            {marginVertical: 2, color: 'black', fontSize: 14},
          ]}>
          {visiting && visiting.username}
        </Text>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder={
              visiting && visiting.is_edit === 'No' && visiting.bio !== ''
                ? 'Add Bio'
                : 'No Bio found'
            }
            value={bio}
            multiline
            editable={isEditing ? true : false}
            numberOfLines={2}
            maxLength={30}
            placeholderTextColor={isEditing ? 'black' : 'gray'}
            style={{
              width: '33%',
              textAlign: 'center',
              // backgroundColor: 'tomato',
            }}
            onChangeText={(bio) => {
              setBio(bio);
            }}
          />
          {visiting && visiting.is_edit === 'Yes' && (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                padding: 10,
              }}
              onPress={() => {
                setEditing(!isEditing);
                isEditing && handleBio();
              }}>
              <MaterialCommunityIcons
                name={showIcon()}
                style={{
                  fontSize: isEditing ? 20 : 16,
                  color: 'black',

                  color: primaryColor,
                }}
              />
            </TouchableOpacity>
          )}
        </View>

        {visiting && visiting.is_edit === 'No' && (
          <TouchableOpacity
            style={styles.buttonStyle}
            disabled={visiting && visiting.follow_status === 'Following'}
            onPress={() => {
              handleFollow();
            }}>
            <Text style={[styles.mediumText, {color: 'white', fontSize: 15}]}>
              {visiting && visiting.follow_status === 'Following'
                ? 'Following'
                : 'Follow'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.statsContainer}>
        <Text
          style={[
            styles.mediumText,
            {textAlign: 'center', color: 'red', fontSize: 15},
          ]}>
          {visiting && visiting.followers}
          {`\n`}Followers
        </Text>
        <Divider style={{height: 50, width: 2, color: 'black'}} />
        <Text
          style={[
            styles.mediumText,
            {textAlign: 'center', color: 'red', fontSize: 15},
          ]}>
          {visiting && visiting.applauses}
          {`\n`}Appllauses
        </Text>
        <Divider style={{height: 50, width: 2, color: 'black'}} />

        <Text
          style={[
            styles.mediumText,
            {textAlign: 'center', color: 'red', fontSize: 15},
          ]}>
          {visiting && visiting.following}
          {`\n`}Following
        </Text>
      </View>

      <View style={styles.userStatsContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setChallenges(true);
            setAccepted(false);
            setAreChallengesSelected(true);
          }}
          style={[
            styles.categoryContainer,
            {
              backgroundColor: areChallengesSelected ? '#f3f5f7' : '#fff',
              borderRightWidth: 1,
              borderColor: '#eee',
            },
          ]}>
          <Text
            style={[styles.mediumText, {textAlign: 'center', fontSize: 16}]}>
            Challenges{`\n`}
            {visiting && visiting.challenges}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setAccepted(true);
            setChallenges(false);
            setAreChallengesSelected(false);
          }}
          style={[
            styles.categoryContainer,
            {
              backgroundColor: areChallengesSelected ? '#fff' : '#f3f5f7',
            },
          ]}>
          <Text
            style={[styles.mediumText, {textAlign: 'center', fontSize: 16}]}>
            Accepted{`\n`}
            {visiting && visiting.accepted}
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={accepted ? acceptedChallenges : userChallenges}
          keyExtractor={(item) => item}
          numColumns={3}
          onEndReached={() => {
            setIsEnd(true);
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  height: 140,
                  width: '33.1%',
                  margin: 0.5,
                }}
                onPress={() => {
                  navigation.navigate('Feed', {from: 'yes'});
                }}>
                <Image
                  source={{uri: `${BASE_URL}${item.thumbnail}`}}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
            );
          }}
        />
        <Loading visible={loading} />
      </View>
      {modalVisible && renderModal()}
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  const {user, token} = state.auth;
  const {visiting, userChallenges, acceptedChallenges} = state.app;
  return {
    user,
    visiting,
    userChallenges,
    token,
    acceptedChallenges,
  };
};
export default connect(mapStateToProps, {
  visitingProfile,
  addBio,
  updatePic,
  followUser,
  logoutSuccess,
})(User);
