import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TabBar from '../../components/navigation';
import {CheckBox, Avatar, Badge, Header} from 'react-native-elements';
import {Divider} from 'react-native-paper';
import {Fonts} from '../../utils/Fonts';
import {primaryColor} from '../../components/colors';
import Swipeout from 'react-native-swipeout';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BASE_URL} from '../../redux/base-url';
import Snackbar from 'react-native-snackbar';
import {Loading} from '../../components/Loading';
import Moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';

//redux
import {connect} from 'react-redux';
import {getMsg} from '../../redux/actions/app';

const Chat = ({navigation, getMsg, messages, token}) => {
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = getData();

      return () => unsubscribe;
    }, []),
  );
  const getData = () => {
    setLoading(true);
    new Promise((rsl, rej) => {
      getMsg(1111, rsl, rej);
    })
      .then((res) => {
        setLoading(false);
      })
      .catch((errorData) => {
        setLoading(false);
      });
  };
  let swipeoutBtns = [
    {
      component: (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <MaterialIcons name="delete" size={30} color="white" />
        </View>
      ),
      backgroundColor: primaryColor,
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => {
        alert('deleted');
      },
    },
  ];
  const renderItem = ({item, index}) => {
    return (
      <Swipeout right={swipeoutBtns} style={styles.mainContianer} autoClose>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('Conversation', {
              name: item.f_name,
              id: item.recv_id,
            })
          }>
          <View style={{flexDirection: 'row'}}>
            {/* // Avatar with mini badge */}
            <View style={{marginLeft: 10}}>
              <Avatar
                rounded
                source={{
                  uri: `${BASE_URL}${item.dp}`,
                }}
                size="medium"
                containerStyle={{marginTop: 10}}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                margin: 10,
                alignSelf: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    color: primaryColor,
                    fontFamily: Fonts.CenturyBold,
                  }}>
                  {item.f_name + ' ' + item.l_name}
                </Text>
                <Text>{Moment(item.date).format('LT')}</Text>
              </View>
              <Text style={{marginTop: 5, fontFamily: Fonts.CenturyRegular}}>
                {item.content}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  };

  return (
    <SafeAreaView style={styles.mainContianer}>
      <Header
        containerStyle={{
          paddingTop: 0,
          height: Platform.select({
            android: 66,
            default: 44,
          }),
        }}
        backgroundColor={primaryColor}
        centerComponent={
          <Text
            style={[
              styles.largeText,
              {
                color: 'white',
                alignSelf: 'center',
                fontSize: 17,
              },
            ]}>
            Inbox
          </Text>
        }
      />

      {messages ? (
        <FlatList
          data={messages}
          keyExtractor={(item) => item}
          renderItem={renderItem}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[styles.largeText]}>No Messages Found</Text>
        </View>
      )}
      <Loading visible={loading} />
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  const {messages} = state.app;
  const {token} = state.auth;
  return {messages, token};
};
export default connect(mapStateToProps, {getMsg})(Chat);
