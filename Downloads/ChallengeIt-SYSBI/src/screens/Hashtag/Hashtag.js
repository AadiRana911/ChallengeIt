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
  Platform,
} from 'react-native';
import styles from './styles';
const {width, height} = Dimensions.get('window');
import {Header} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {primaryColor} from '../../components/colors';
import {BASE_URL} from '../../redux/base-url';
import {Loading} from '../../components/Loading';
//redux
import {connect} from 'react-redux';
import {hastagChallenges} from '../../redux/actions/app';

const Hashtag = ({navigation, route, hastagChallenges, hashtagVids, token}) => {
  const hashtag = route.params && route.params.hashtag;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const formData = new FormData();
    formData.append('challengename', hashtag);
    console.log(formData);
    setLoading(true);
    new Promise((rsl, rej) => {
      hastagChallenges(token, formData, rsl, rej);
    })
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
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
              // alignSelf: 'center',
              fontSize: 26,
              color: 'black',

              // marginHorizontal: width / 30,
            }}
          />
        }
      />

      <Text style={[styles.largeText, {padding: 10, color: primaryColor}]}>
        #{hashtag}
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={hashtagVids}
        keyExtractor={(item) => item}
        numColumns={3}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{height: 120, width: '33.1%', margin: 0.5}}
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
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  const {hashtagVids} = state.app;
  const {token} = state.auth;
  return {
    hashtagVids,
    token,
  };
};
export default connect(mapStateToProps, {hastagChallenges})(Hashtag);
