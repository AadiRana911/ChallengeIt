import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {Divider} from 'react-native-elements';
import TabBar from '../../components/navigation';
import {ProfilePlaceholder} from '../../components/Placeholder';
import {primaryColor} from '../../components/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
const User = ({params, navigation}) => {
  const {height, width} = Dimensions.get('window');
  const [challenges, setChallenges] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
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
  // return <ProfilePlaceholder />;
  return (
    <ScrollView
      // style={styles.mainContainer}

      contentContainerStyle={{flexGrow: 1}}>
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: primaryColor,
          paddingVertical: 10,
          marginBottom: 4,
        }}>
        <AntDesign
          onPress={() => {
            navigation.goBack();
          }}
          name="arrowleft"
          style={{
            alignSelf: 'center',
            fontSize: 26,
            color: 'black',
            marginHorizontal: width / 30,
          }}
        />
        {/* */}
      </View>
      <View style={styles.head}>
        <View
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 10, height: 10},
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 10,
            borderRadius: 70,
            borderWidth: 3,
            borderColor: '#fff',
          }}>
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/41.jpg'}}
            style={styles.imageStyle}
          />
        </View>
        <Text style={[styles.largeText, {marginVertical: 5, color: 'black'}]}>
          Zaheer Hassan
        </Text>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={[styles.mediumText, {color: 'white', fontSize: 15}]}>
            follow
          </Text>
        </TouchableOpacity>
        <View style={styles.statsContainer}>
          <Text
            style={[
              styles.mediumText,
              {textAlign: 'center', color: 'red', fontSize: 15},
            ]}>
            3000{`\n`}Followers
          </Text>
          <Divider style={{height: 50, width: 2, color: 'black'}} />
          <Text
            style={[
              styles.mediumText,
              {textAlign: 'center', color: 'red', fontSize: 15},
            ]}>
            3000{`\n`}Appllauses
          </Text>
          <Divider style={{height: 50, width: 2, color: 'black'}} />

          <Text
            style={[
              styles.mediumText,
              {textAlign: 'center', color: 'red', fontSize: 15},
            ]}>
            3000{`\n`}Followers
          </Text>
        </View>
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
            Challenges{`\n`}3004
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
            Accepted{`\n`}3000
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
              onPress={() => {
                navigation.navigate('Responses');
              }}>
              <Image style={styles.thumbnailStyle} source={{uri: item.url}} />
            </TouchableOpacity>
          );
        }}
      />

      {!isEnd && <TabBar navigation={navigation} />}
    </ScrollView>
  );
};

export default User;
