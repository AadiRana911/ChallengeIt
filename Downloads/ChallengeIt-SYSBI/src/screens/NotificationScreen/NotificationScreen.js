import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TabBar from '../../components/navigation';
import {CheckBox, Avatar, Badge, Header} from 'react-native-elements';
import {Divider} from 'react-native-paper';
import {Fonts} from '../../utils/Fonts';
import {primaryColor} from '../../components/colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import OptionsMenu from 'react-native-options-menu';
import {Loading} from '../../components/Loading';
import HTML from 'react-native-render-html';
import {BASE_URL} from '../../redux/base-url';
import Snackbar from 'react-native-snackbar';
//redux
import {connect} from 'react-redux';
import {getNotif} from '../../redux/actions/app';
const Notification = ({navigation, getNotif, notifications, token}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    new Promise((rsl, rej) => {
      getNotif(token, rsl, rej);
    })
      .then((res) => {
        setLoading(false);
      })
      .catch((errorData) => {
        setLoading(false);
      });
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('NotificationDetail', {
            id: item.noti_id,
          });
        }}
        activeOpacity={0.8}
        style={{
          backgroundColor: item.is_read !== 'Yes' ? '#e8faff' : 'white',
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* // Avatar with mini badge */}
          <View style={{marginLeft: 10}}>
            <Avatar
              rounded
              source={{
                uri: `${BASE_URL}${item.link}`,
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
                width: '100%',
              }}>
              <View style={{width: '90%'}}>
                <HTML html={item.notification} />
              </View>
              <View style={{width: '10%'}}>
                <OptionsMenu
                  customButton={
                    <SimpleLineIcons
                      name="options-vertical"
                      size={12}
                      style={{margin: 4, alignSelf: 'flex-end'}}
                    />
                  }
                  options={['Hide', 'Mute']}
                  actions={[
                    () => {
                      alert('Hided');
                    },
                    () => {
                      alert('Muted');
                    },
                  ]}
                />
              </View>
            </View>

            <Text
              style={[
                styles.smallText,
                {alignSelf: 'flex-start', fontFamily: Fonts.CenturyRegular},
              ]}>
              {item.noti_date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        backgroundColor={primaryColor}
        centerComponent={
          <Text
            style={[
              styles.largeText,
              {
                color: 'white',
                // paddingVertical: 10,
                alignSelf: 'center',
                fontSize: 17,
              },
            ]}>
            Notifications
          </Text>
        }
      />

      {notifications ? (
        <FlatList
          ListFooterComponent={<View style={{margin: 15}} />}
          data={notifications}
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
          <Text style={[styles.largeText]}>No Notification Found</Text>
        </View>
      )}
      <Loading visible={loading} />
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  const {notifications} = state.app;
  const {token} = state.auth;
  return {notifications, token};
};
export default connect(mapStateToProps, {getNotif})(Notification);
