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
} from 'react-native';
import styles from './styles';
import Share from 'react-native-share';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OptionsMenu from 'react-native-options-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import {Divider} from 'react-native-elements';
import TabBar from '../../components/navigation';
import {ProfilePlaceholder} from '../../components/Placeholder';
import {primaryColor} from '../../components/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Header} from 'react-native-elements';
import {Loading} from '../../components/Loading';
import {useFocusEffect} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {BASE_URL} from '../../redux/base-url';
//redux
import {connect} from 'react-redux';
import {
  visitingProfile,
  addBio,
  updatePic,
  followUser,
} from '../../redux/actions/app';

const User = ({
  navigation,
  visitingProfile,
  user,
  visiting,
  addBio,
  updatePic,
  followUser,
  route,
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
  const showIcon = () => {
    if (isEditing && bio !== '') {
      return 'check';
    } else if (isEditing && bio === '') {
      return '';
    } else {
      return 'pencil';
    }
  };
  const {uid} = route.params;
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      const formData = new FormData();
      formData.append('u_id', uid);
      const unsubscribe = new Promise((rsl, rej) => {
        visitingProfile(formData, user.auth, rsl, rej);
      })
        .then((res) => {
          setLoading(false);
          visiting && setBio(visiting.bio);
        })
        .catch((errorData) => {
          setLoading(false);
          Snackbar.show({
            text: errorData,
            duration: Snackbar.LENGTH_SHORT,
          });
        });

      return () => unsubscribe;
    }, []),
  );
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
        addBio(formData, user.auth, rsl, rej);
      })
        .then((res) => {
          Snackbar.show({
            text: res,
            duration: Snackbar.LENGTH_SHORT,
          });
          setLoading(false);
        })
        .catch((errorData) => {
          setLoading(false);
          Snackbar.show({
            text: errorData,
            duration: Snackbar.LENGTH_SHORT,
          });
        });
    }
  };

  //handle Profile Pic
  const handleProfilePic = () => {
    const date = new Date();

    const formData = new FormData();
    formData.append('files', {
      uri: image.path,
      type: image.mime,
      name: 'image_' + Math.floor(date.getTime() + date.getSeconds() / 2),
    });
    console.log(formData);
    new Promise((rsl, rej) => {
      setLoading(true);
      updatePic(formData, user.auth, rsl, rej);
    })
      .then((res) => {
        Snackbar.show({
          text: res,
          duration: Snackbar.LENGTH_SHORT,
        });
        setLoading(false);
      })
      .catch((errorData) => {
        setLoading(false);
        Snackbar.show({
          text: errorData,
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };

  //share profile
  const handleShare = async (id) => {
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
  //image picker
  const pickImage = () => {
    ImagePicker.openPicker({mediaType: 'photo'}).then((image) => {
      setImage(image);
      image && handleProfilePic();
    });
  };
  // return <ProfilePlaceholder />;
  // follow user
  const handleFollow = () => {
    const formData = new FormData();
    user && formData.append('u_id', user.u_id);
    new Promise((rsl, rej) => {
      setLoading(true);
      followUser(formData, user.auth, rsl, rej);
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
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
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
      />

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
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
            {visiting && visiting.dp === '' ? (
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
            )}
            {visiting && visiting.is_edit === 'Yes' && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 3,
                  color: primaryColor,
                  right: -4,
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
                visiting && visiting.isEditing === 'No' && visiting.bio !== ''
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

        <FlatList
          showsVerticalScrollIndicator={false}
          data={results}
          keyExtractor={(item) => item}
          numColumns={3}
          onEndReached={() => {
            setIsEnd(true);
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{height: 120, width: '33.1%', margin: 0.5}}
                onPress={() => {
                  navigation.navigate('Responses');
                }}>
                <Image
                  source={{uri: item.url}}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
            );
          }}
        />
        <Loading visible={loading} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const {user} = state.auth;
  const {visiting} = state.app;
  return {
    user,
    visiting,
  };
};
export default connect(mapStateToProps, {
  visitingProfile,
  addBio,
  updatePic,
  followUser,
})(User);
