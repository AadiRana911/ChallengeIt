import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Animated,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {Header, Divider, SearchBar} from 'react-native-elements';
import {primaryColor} from '../../components/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {Fonts} from '../../utils/Fonts';
const {height, width} = Dimensions.get('window');
//redux
import {connect} from 'react-redux';
import {searchChallenge, addSearchItem} from '../../redux/actions/app';

const Search = ({
  navigation,
  searched,
  searchChallenge,
  token,
  recentSearches,
  addSearchItem,
}) => {
  const [searchWidth, setSearchWidth] = useState(new Animated.Value(0));
  const [searchState, setSearchState] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState(true);
  const [itemPress, setItemPress] = useState(false);
  const [challenge, setChallenges] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleSearch = (e) => {
    setKeyword(e);
    if (keyword.length > 0) {
      const data = new FormData();
      data.append('text', keyword);
      new Promise((rsl, rej) => {
        searchChallenge(token, data, rsl, rej);
      })
        .then((res) => {
          // alert(JSON.stringify(searched));
        })
        .catch((res) => {});
    }
  };
  const handleItem = async (item) => {
    const recent = [...recentSearches];
    recent.push(item);
    new Promise((rsl, rej) => {
      addSearchItem(recent, rsl, rej);
    })
      .then((res) => {
        navigation.navigate('SearchDetail', {text: item.name});

        // console.log('Zaid ----->', res);
      })
      .catch((res) => {
        console.log(res);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
              width: width / 2,
            }}
          />
        }
        rightComponent={
          <SearchBar
            placeholder="Type Here..."
            onChangeText={(e) => handleSearch(e)}
            value={keyword}
            onSubmitEditing={() => {
              navigation.navigate('SearchDetail');
            }}
            returnKeyType={'search'}
            inputContainerStyle={{
              backgroundColor: '#E3E6EC',

              width: width / 1.2,
              borderRadius: 100,
            }}
            inputStyle={{
              fontSize: 14,
              fontFamily: Fonts.CenturyRegular,
            }}
            containerStyle={{
              backgroundColor: 'white',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
          />
          /* <TextInput
                placeholder="Search..."
                placeholderTextColor={'white'}
                clearButtonMode="always"
                keyboardType="web-search"
                onChangeText={(e) => {
                  handleSearch(e);
                }}
                // value={keyword}
                style={{
                  width: '80%',
                  borderRadius: 3,
                  borderBottomWidth: searchState ? 0.8 : 0,
                  borderColor: searchState ? '#ddd' : '#fff',
                  paddingLeft: 10,
                  color: 'white',
                }}
              /> */
        }
      />
      {keyword !== '' && (
        <FlatList
          data={searched}
          extraData={searched}
          keyExtractor={(item) => item}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.item}
                key={index}
                onPress={() => {
                  handleItem(item);
                }}>
                <AntDesign
                  name="search1"
                  color="gray"
                  size={18}
                  style={{marginRight: 10}}
                />
                <Text style={styles.mediumText}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
      {keyword === '' && (
        <View>
          <Text
            style={[
              styles.mediumText,
              {alignSelf: 'flex-start', margin: 10, color: primaryColor},
            ]}>
            Recent Searches
          </Text>
          <FlatList
            data={recentSearches}
            extraData={recentSearches}
            keyExtractor={(item) => item}
            renderItem={({item, index}) => {
              return (
                <View>
                  <TouchableOpacity
                    style={styles.item}
                    key={index}
                    onPress={() => {
                      navigation.navigate('SearchDetail', {text: item.name});
                    }}>
                    <AntDesign
                      name="search1"
                      color="gray"
                      size={18}
                      style={{marginRight: 10}}
                    />
                    <Text style={styles.mediumText}>{item.name}</Text>
                  </TouchableOpacity>
                  {/* <Divider style={{width: '100%', color: '#ddd'}} /> */}
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  const {token} = state.auth;
  const {searched, recentSearches} = state.app;
  return {token, searched, recentSearches};
};
export default connect(mapStateToProps, {
  searchChallenge,
  addSearchItem,
  addSearchItem,
})(Search);
