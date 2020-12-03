import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Video from 'react-native-video';
import {primaryColor} from '../../components/colors';
import {Fonts} from '../../utils/Fonts';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Picker} from '@react-native-community/picker';
import Snackbar from 'react-native-snackbar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Divider} from 'react-native-elements';
//redux
import {connect} from 'react-redux';
import {postChallenge, getCategories, getUsers} from '../../redux/actions/app';
import {Loading} from '../../components/Loading';
import {ActivityIndicator} from 'react-native-paper';
import {BASE_URL} from '../../redux/base-url';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';
import NetInfo from '@react-native-community/netinfo';

const Challenge = ({
  route,
  navigation,
  postChallenge,
  token,
  getCategories,
  categories,
  getUsers,
}) => {
  const {height, width} = Dimensions.get('window');
  const [isPrivate, setIsPrivate] = useState(true);
  const [isOpen, setisOpen] = useState(true);
  const [isChanging, setIsChanging] = useState(false);
  const [pasue, setPause] = useState(true);
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const video = route.params && route.params.video;
  const challengeId = route.params && route.params.challengeId;
  const [modalVisible, setModalVisible] = useState(false);

  const [interest, setInterest] = useState('1');
  const [name, setName] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [searched, setSearched] = useState([]);
  const [username, setuserName] = useState('');
  const [userId, setuserId] = useState('');
  const [uploadProgress, setProgress] = useState(0);
  const [response, setResponse] = useState('');
  // const [categories, setCategories] = useState([
  //   {id: 0, name: 'Entertainment'},
  //   {id: 1, name: 'Art'},
  //   {id: 2, name: 'Talent'},
  //   {id: 3, name: 'Religious'},
  //   {id: 4, name: 'Technology'},
  //   {id: 5, name: 'Skill'},
  //   {id: 6, name: 'Food'},
  //   {id: 7, name: 'Travelling'},
  // ]);
  const placesRef = useRef(true);
  const nameRef = useRef(true);
  const [location, setLocation] = useState('Select your Location');
  console.log(response);
  // const [heigh, setHeigh] = useState(40)
  useEffect(() => {
    // // Subscribe
    // const unsubscribe = NetInfo.addEventListener((state) => {
    //   console.log('Connection type', state.type);
    //   console.log('Is connected?', state.isConnected);
    // });
    new Promise((rsl, rej) => {
      getCategories(token, rsl, rej);
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {});
    // return () => unsubscribe;
  }, []);
  useEffect(() => {
    console.log('within another useeffect');
    username === '' && setSearched([]);
    console.log(searched);
  }, [username]);

  //calculate progress
  const handleProgress = (event) => {
    setProgress(Math.floor((event.loaded * 100) / event.total));
  };

  const handlePost = async () => {
    const isConnected = await NetInfo.fetch();
    if (!isConnected.isConnected) {
      Snackbar.show({
        text: 'You are not connected to internet',
        backgroundColor: primaryColor,
      });
    } else if (!token) {
      Snackbar.show({
        text: 'Kindly login first',
        backgroundColor: primaryColor,
      });
      navigation.navigate('Signin');
    } else if (name === '') {
      Snackbar.show({
        text: 'Kindly enter challenge name',
        backgroundColor: primaryColor,
      });
    } else if (location === 'Select your Location') {
      Snackbar.show({
        text: 'Kindly select your location',
        backgroundColor: primaryColor,
      });
    } else if (!isOpen && userId === '') {
      Snackbar.show({
        text: 'Kindly mention the specific user',
        backgroundColor: primaryColor,
      });
    } else {
      try {
        setModalVisible(true);
        let time = new Date();
        let vidExt = video.split('.');
        const formData = new FormData();
        const xhr = new XMLHttpRequest();
        formData.append('challengename', name);
        formData.append('privacy', isPrivate ? 'Public' : 'Private');
        formData.append('type', isOpen ? 'Open' : 'Specific');
        formData.append('location', location);
        formData.append('category', interest);
        formData.append('files', {
          uri: video,
          type: `video/${vidExt[2]}`,
          name:
            'vid_' +
            Math.floor(time.getTime() + time.getSeconds() / 2) +
            '.' +
            vidExt[2],
        });
        formData.append('chlng_lati', coords.lat);
        formData.append('chlng_longi', coords.lng);
        challengeId && formData.append('challenge_id', challengeId);
        !isOpen && userId !== '' && formData.append('user_id', userId);
        //uploading challenge
        xhr.upload.addEventListener('progress', (event) => {
          handleProgress(event);
        });

        xhr.addEventListener('load', () => {
          setProgress(100);
          setResponse(xhr.response);
          setModalVisible(false);
          // setProgress(0);
          navigation.navigate('Home');
        });
        xhr.open('POST', `${BASE_URL}Authentication/addchallenge`);
        xhr.setRequestHeader('auth', token);
        xhr.send(formData);

        // setLoading(true);
        // new Promise((rsl, rej) => {
        //   postChallenge(formData, token, rsl, rej);
        // })
        //   .then((res) => {
        //     console.log(res);
        //     setLoading(false);
        //     Snackbar.show({
        //       text: res,
        //       backgroundColor: primaryColor,
        //       duration: Snackbar.LENGTH_SHORT,
        //     });
        //     navigation.navigate('Home');
        //   })
        //   .catch((errorData) => {
        //     setLoading(false);
        //     Snackbar.show({
        //       text: errorData,
        //       backgroundColor: primaryColor,
        //       duration: Snackbar.LENGTH_SHORT,
        //     });
        //   });
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleSearch = (e) => {
    setuserName(e);
    if (username.length > 3) {
      const formData = new FormData();
      formData.append('text', username);
      new Promise((rsl, rej) => {
        getUsers(formData, token, rsl, rej);
      })
        .then((res) => {
          setSearched(res);
        })
        .catch((err) => {
          setSearched([]);
        });
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setProgress(0);
  };
  const renderModal = () => {
    return (
      <Modal
        isVisible={modalVisible}
        coverScreen={true}
        hasBackdrop={true}
        // animationIn="slideInUp"
        // onSwipeComplete={() => toggleModal()}
        // swipeDirection="up"
      >
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
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Progress.Circle
              progress={uploadProgress}
              size={100}
              showsText={uploadProgress == 0 ? '0' : uploadProgress}
              style={{justifyContent: 'center', alignItems: 'center'}}
              color={primaryColor}
              textStyle={[
                styles.largeText,
                {alignSelf: 'center', color: primaryColor, fontSize: 20},
              ]}></Progress.Circle>
          </View>
          <Text
            style={[styles.mediumText, {alignSelf: 'center', marginTop: 4}]}>
            Uploading...
          </Text>

          {/* <Progress.Circle progress={uploadProgress} width={200} sty/> */}
        </View>
      </Modal>
    );
  };
  return (
    <ScrollView style={[styles.container]} keyboardShouldPersistTaps="always">
      <AntDesign
        name="arrowleft"
        style={{fontSize: 30, marginTop: 20}}
        onPress={() => {
          navigation.goBack();
        }}
      />

      <View style={{alignItems: 'flex-end'}}>
        {/* <Entypo name="dots-three-vertical" style={{fontSize: 20}} /> */}
      </View>
      <Text
        style={{
          fontSize: 15,
          fontFamily: Fonts.CenturyBold,
          marginVertical: 10,
        }}>
        Enter Challenge Name
      </Text>
      <TextInput
        style={{
          // height: heigh,
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 0},
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 1,
          borderRadius: 3,
          borderWidth: 0.3,
          borderColor: '#eee',
          padding: 10,
          fontFamily: Fonts.CenturyRegular,
        }}
        placeholder=" #ChallengeName"
        value={name}
        onChangeText={(e) => {
          setName(e);
        }}
      />

      <View style={{width: '100%', marginVertical: 10}}>
        <Text
          style={{
            fontSize: 15,
            fontFamily: Fonts.CenturyBold,
            marginVertical: 10,
          }}>
          Challenge Privacy
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '50%',
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setIsPrivate(true)}>
            <Entypo
              name="globe"
              style={{fontSize: 17, color: isPrivate ? '#F03C00' : 'gray'}}
            />
            <Text
              style={{
                color: isPrivate ? '#F03C00' : 'black',
                fontFamily: Fonts.CenturyRegular,
              }}>
              {' '}
              Public
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => setIsPrivate(false)}>
            <Fontisto
              name="locked"
              style={{fontSize: 15, color: !isPrivate ? '#F03C00' : 'black'}}
            />
            <Text
              style={{
                color: !isPrivate ? '#F03C00' : 'black',
                fontFamily: Fonts.CenturyRegular,
              }}>
              {' '}
              Private
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{width: '100%', marginVertical: 10}}>
        <Text
          style={{
            fontSize: 15,
            fontFamily: Fonts.CenturyBold,
            marginVertical: 10,
          }}>
          Challenge Type
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '50%',
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => setisOpen(true)}>
            <Fontisto
              name="locked"
              style={{fontSize: 15, color: isOpen ? '#F03C00' : 'black'}}
            />
            <Text
              style={{
                color: isOpen ? '#F03C00' : 'black',
                fontFamily: Fonts.CenturyRegular,
              }}>
              {' '}
              Open
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setisOpen(false)}>
            <Entypo
              name="globe"
              style={{fontSize: 17, color: !isOpen ? '#F03C00' : 'black'}}
            />
            <Text
              style={{
                color: !isOpen ? '#F03C00' : 'black',
                fontFamily: Fonts.CenturyRegular,
              }}>
              {' '}
              Specific
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {!isOpen && (
        <TouchableOpacity
          onPress={() => {
            nameRef.current.open();
            // alert('hi');
          }}>
          <TextInput
            value={selectedName}
            editable={false}
            placeholderTextColor="black"
            style={{
              // height: heigh,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 0},
              shadowOpacity: 0.3,
              shadowRadius: 5,
              elevation: 1,
              borderRadius: 3,
              borderWidth: 0.3,
              borderColor: '#eee',
              padding: 10,
              marginVertical: 10,
              color: 'black',
              fontFamily: Fonts.CenturyRegular,
            }}
            placeholder=" @Name"
          />
        </TouchableOpacity>
      )}

      <View style={{marginBottom: height / 60}}>
        <Text style={{fontFamily: Fonts.CenturyBold, fontSize: 15}}>
          Location
        </Text>
        <TouchableOpacity
          onPress={() => {
            placesRef.current.open();
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: height / 50,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Ionicons
              name="md-location-sharp"
              style={{fontSize: 20, color: 'skyblue'}}
            />
            <Text
              style={{
                color: 'skyblue',
                fontFamily: Fonts.CenturyBold,
              }}>
              {`${location.substr('0', '30')}${
                location.length > 30 ? '..' : ''
              }`}
            </Text>
          </View>

          <Text
            style={{
              color: '#F03C00',
              alignSelf: 'center',
              marginRight: 5,
              fontFamily: Fonts.CenturyRegular,
            }}>
            change
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 15,
          fontFamily: Fonts.CenturyBold,
          marginBottom: 10,
        }}>
        This video relates to
      </Text>
      <View
        style={{
          width: '99%',
          padding: 10,
          backgroundColor: 'white',
          elevation: 4,
          borderRadius: 2,
          marginBottom: 10,
        }}>
        <Picker
          selectedValue={interest}
          style={{
            height: 25,
            color: 'black',
          }}
          prompt={'Select Category'}
          placeholder={'none'}
          onValueChange={(value) => {
            setInterest(value);
          }}>
          {categories &&
            categories.map((item, index) => {
              switch (index) {
                case index === '0':
                  return (
                    <Picker.Item
                      key={index}
                      label={item.cat_name}
                      value={item.cat_id}
                    />
                  );
                default:
                  return (
                    <Picker.Item
                      key={index}
                      label={item.cat_name}
                      value={item.cat_id}
                    />
                  );
              }
            })}
        </Picker>
      </View>
      <TouchableOpacity onPress={() => setPause(!pasue)} activeOpacity={1}>
        <Video
          paused={pasue}
          source={{
            uri: video,
          }}
          style={{width: '100%', height: 200}}
          volume={1}
          resizeMode={'cover'}
          // muted
          style={{
            backgroundColor: 'black',
            aspectRatio: 1,
            width: '100%',
          }}
        />
      </TouchableOpacity>
      {/* {pasue && (
        <TouchableWithoutFeedback onPress={() => setPause(!pasue)}>
          <Entypo
            name="controller-play"
            color="white"
            style={styles.playButton}
          />
        </TouchableWithoutFeedback>
      )} */}

      <TouchableOpacity
        onPress={() => {
          handlePost();
        }}
        style={{
          marginVertical: height / 20,
          paddingVertical: 10,
          marginBottom: 30,
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
        <Text style={{color: 'white'}}>Post Challenge</Text>
      </TouchableOpacity>

      <RBSheet
        ref={placesRef}
        height={400}
        openDuration={250}
        customStyles={{
          container: {
            // borderTopRightRadius: 30,
            // borderTopLeftRadius: 30,
            paddingTop: 10,
          },
        }}>
        <GooglePlacesAutocomplete
          //ref = {ref => setSearchTextRef(ref)}
          placeholder="Search for Challenge"
          styles={{
            textInputContainer: {
              borderTopWidth: 0,
              // borderBottomWidth: 0,
              backgroundColor: '#ffffff',
            },
            container: {backgroundColor: 'transparent'},
          }}
          keyboardShouldPersistTaps={'handled'}
          listUnderlayColor={'transparent'}
          textInputProps={
            {
              //onFocus: () => focusInput(),
              //onBlur: () => blurInput(),
              //onChangeText: (text) => onChange(text)
            }
          }
          minLength={1} // minimum length of text to search
          returnKeyType={'search'}
          listViewDisplayed={'auto'} // true/false/undefined
          fetchDetails={true}
          renderDescription={(row) => row.description} // custom description render
          onPress={(data, details = null) => {
            let coordinates = details.geometry.location;
            setCoords(coordinates);
            setLocation(details.formatted_address), placesRef.current.close();
            //display details in console!
            //sendCoordinates(coordinates, {data, details});
          }}
          getDefaultValue={() => ''}
          query={{
            key: 'AIzaSyCMMLQ0eIHkhBeOXAqY4mnjGKoR1PPuVrU',
            language: 'en', // language of the results
            components: 'country:pk',
            // types: '(cities)' // default: 'geocode'
          }}
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GooglePlacesSearchQuery={{
            rankby: 'distance',
            types: '',
          }}
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
          ]}
          debounce={200}
        />
      </RBSheet>

      <RBSheet
        ref={nameRef}
        height={400}
        openDuration={250}
        customStyles={{
          container: {
            // borderTopRightRadius: 30,
            // borderTopLeftRadius: 30,
            paddingTop: 10,
          },
        }}>
        <TextInput
          style={{
            // height: heigh,
            shadowColor: '#000',
            shadowOffset: {width: 1, height: 0},
            shadowOpacity: 0.3,
            shadowRadius: 5,
            borderRadius: 3,
            borderWidth: 0.3,
            borderColor: '#212121',
            padding: 10,
            // marginVertical: 10,
            margin: 10,
            width: '95%',
          }}
          placeholder="Enter Name to Search User"
          onChangeText={(e) => {
            handleSearch(e);
          }}
          value={username}
        />
        {username.length > 3 && (
          <FlatList
            data={searched}
            extraData={searched}
            keyExtractor={(item, index) => {
              item.toString();
            }}
            renderItem={({item, index}) => {
              return (
                <View style={{flex: 1, margin: 10}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      resizeMode="cover"
                      source={{uri: `${BASE_URL}${item.dp}`}}
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        marginRight: 3,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedName(item.f_name + ' ' + item.l_name);
                        setuserId(item.u_id);
                        nameRef.current.close();
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: Fonts.CenturyRegular,
                          alignSelf: 'center',
                        }}>
                        {item.f_name + ' ' + item.l_name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Divider style={{width: '100%', height: 1, marginTop: 4}} />
                </View>
              );
            }}
          />
        )}
      </RBSheet>
      {modalVisible && renderModal()}
    </ScrollView>
  );
};
const mapStateToProps = (state) => {
  const {token} = state.auth;
  const {categories} = state.app;
  return {token, categories};
};
export default connect(mapStateToProps, {
  postChallenge,
  getCategories,
  getUsers,
})(Challenge);
