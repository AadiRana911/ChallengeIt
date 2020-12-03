import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import styles from './styles';
import {Header, Divider, Avatar} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {primaryColor} from '../../components/colors';
import {BASE_URL} from '../../redux/base-url';
//redux
import {connect} from 'react-redux';
import {getDetailedSearch} from '../../redux/actions/app';
const SearchDetail = ({
  navigation,
  getDetailedSearch,
  route,
  token,
  searchedUsers,
  searchedChallenges,
}) => {
  const [users, setUsers] = useState(true);
  const [challenges, setChallenges] = useState(false);
  const text = route.params && route.params.text;
  useEffect(() => {
    const formData = new FormData();
    formData.append('text', text);
    new Promise((rsl, rej) => {
      getDetailedSearch(formData, token, rsl, rej);
    })
      .then((res) => {})
      .catch((err) => {});
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Header
        backgroundColor={primaryColor}
        leftComponent={
          <AntDesign
            onPress={() => {
              navigation.goBack();
            }}
            name="arrowleft"
            style={{
              fontSize: 26,
              color: 'white',
            }}
          />
        }
      />
      <View style={styles.horizontal}>
        <TouchableOpacity
          activeOpacity={1}
          style={{flex: 0.5}}
          onPress={() => {
            setUsers(true), setChallenges(false);
          }}>
          <Text style={styles.mediumText}>Users</Text>
          {users && (
            <Divider
              style={{
                width: 170,
                // alignSelf: 'center',
                height: 2,
                borderRadius: 3.5,
                backgroundColor: primaryColor,
                marginVertical: 20,
                alignSelf: 'flex-start',
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{flex: 0.5}}
          onPress={() => {
            setUsers(false), setChallenges(true);
          }}>
          <Text style={styles.mediumText}>Challenges</Text>
          {challenges && (
            <Divider
              style={{
                width: 170,
                // alignSelf: 'center',
                height: 2,
                borderRadius: 3.5,
                backgroundColor: primaryColor,
                marginVertical: 20,
                alignSelf: 'flex-end',
              }}
            />
          )}
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={users ? searchedUsers : searchedChallenges}
          keyExtractor={(item) => item}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.item}
                key={index}
                onPress={() => {
                  users
                    ? navigation.navigate('User', {uid: item.u_id})
                    : navigation.navigate('ProfileScreen', {
                        challenge_id: item.challenge_id,
                      });
                }}>
                <Avatar
                  rounded
                  source={{
                    uri: `${BASE_URL}${users ? item.dp : item.file}`,
                  }}
                  size={50}
                  containerStyle={{alignSelf: 'flex-start'}}
                />
                <Text style={[styles.mediumText, {marginLeft: 5}]}>
                  {users ? item.f_name : item.challengename}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};
const mapStateToProps = (state) => {
  const {token} = state.auth;
  const {searchedUsers, searchedChallenges} = state.app;
  return {token, searchedChallenges, searchedUsers};
};
export default connect(mapStateToProps, {getDetailedSearch})(SearchDetail);
