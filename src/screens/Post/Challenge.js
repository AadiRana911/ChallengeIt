import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Video from 'react-native-video';
import primaryColor from '../../components/colors';
import {Fonts} from '../../utils/Fonts';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Picker} from '@react-native-community/picker';
import Snackbar from 'react-native-snackbar';
//redux
import {connect} from 'react-redux';
import {postChallenge} from '../../redux/actions/app';
import {Loading} from '../../components/Loading';
import {ActivityIndicator} from 'react-native-paper';

const Challenge = ({route, navigation, postChallenge, token}) => {
  const {height, width} = Dimensions.get('window');
  const [isPrivate, setIsPrivate] = useState(true);
  const [isOpen, setisOpen] = useState(true);
  const [isChanging, setIsChanging] = useState(false);
  const [pasue, setPause] = useState(true);
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const {video} = route.params;
  const [interest, setInterest] = useState('');
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([
    {id: 0, name: 'Entertainment'},
    {id: 1, name: 'Art'},
    {id: 2, name: 'Talent'},
    {id: 3, name: 'Religious'},
    {id: 4, name: 'Technology'},
    {id: 5, name: 'Skill'},
    {id: 6, name: 'Food'},
    {id: 7, name: 'Travelling'},
  ]);
  const placesRef = useRef(true);
  const [location, setLocation] = useState('Select your Location');
  // const [heigh, setHeigh] = useState(40)
  const handlePost = () => {
    try {
      let time = new Date();
      const formData = new FormData();
      formData.append('challengename', name);
      formData.append('privacy', isPrivate ? 'Public' : 'Private');
      formData.append('type', isOpen ? 'Open' : 'Specific');
      formData.append('location', location);
      formData.append('category', interest);
      formData.append('files', {
        uri: video,
        type: 'video/mp4',
        name: 'vid_' + Math.floor(time.getTime() + time.getSeconds() / 2),
      });
      formData.append('chlng_lati', coords.lat);
      formData.append('chlng_longi', coords.lng);
      console.log(JSON.stringify(formData));
      setLoading(true);
      new Promise((rsl, rej) => {
        postChallenge(formData, token, rsl, rej);
      })
        .then((res) => {
          setLoading(false);
          Snackbar.show({
            text: res,
            duration: Snackbar.LENGTH_SHORT,
          });
          navigation.navigate('Home');
        })
        .catch((errorData) => {
          setLoading(false);
          Snackbar.show({
            text: errorData,
            duration: Snackbar.LENGTH_SHORT,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ScrollView style={[styles.container]} keyboardShouldPersistTaps="always">
      <View>
        <Ionicons
          name="chevron-back"
          style={{fontSize: 30}}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
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
            marginVertical: 10,
          }}
          placeholder=" @Name"
        />
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
            <Text style={{color: 'skyblue', fontFamily: Fonts.CenturyBold}}>
              {location}
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
          prompt={'Select Categories'}
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
                      label={item.name}
                      value={item.name}
                    />
                  );
                default:
                  return (
                    <Picker.Item
                      key={index}
                      label={item.name}
                      value={item.name}
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
            uri:
              'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          }}
          style={{width: '100%', height: 200}}
          volume={1}
          resizeMode={'cover'}
          muted
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
          backgroundColor: 'red',
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
        {loading ? (
          <ActivityIndicator animating color={'white'} />
        ) : (
          <Text style={{color: 'white'}}>Post challenge</Text>
        )}
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
            setLocation(details.address_components[0].long_name),
              placesRef.current.close();
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
    </ScrollView>
  );
};
const mapStateToProps = (state) => {
  const {token} = state.auth;
  return {token};
};
export default connect(mapStateToProps, {postChallenge})(Challenge);
