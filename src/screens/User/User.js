import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import styles from './styles';
import {Divider} from 'react-native-paper';
import TabBar from '../../components/navigation';
import {ProfilePlaceholder} from '../../components/Placeholder';

const User = ({params, navigation}) => {
  const [challenges, setChallenges] = useState(true);
  const [accepted, setAccepted] = useState(false);
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
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.head}>
        <Image
          source={{uri: 'https://randomuser.me/api/portraits/men/41.jpg'}}
          style={styles.imageStyle}
        />
        <Text style={[styles.largeText, {marginVertical: 5, color: 'black'}]}>
          Zaheer Hassan
        </Text>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={[styles.largeText, {color: 'white'}]}>Follow</Text>
        </TouchableOpacity>
        <View style={styles.statsContainer}>
          <Text style={[styles.largeText, {textAlign: 'center', color: 'red'}]}>
            3000{`\n`}Followers
          </Text>
          <Divider style={{height: 50, width: 2, color: 'black'}} />
          <Text style={[styles.largeText, {textAlign: 'center', color: 'red'}]}>
            3000{`\n`}Appllauses
          </Text>
          <Divider style={{height: 50, width: 2, color: 'black'}} />

          <Text style={[styles.largeText, {textAlign: 'center', color: 'red'}]}>
            3000{`\n`}Followers
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', flex: 0.07}}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setChallenges(true);
            setAccepted(false);
          }}
          style={[
            styles.categoryContainer,
            {
              backgroundColor: challenges ? 'tomato' : '#303030',
            },
          ]}>
          <Text
            style={[
              styles.mediumText,
              {color: 'white', textAlign: 'center', fontSize: 16},
            ]}>
            Challenges{`\n`}3004
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setAccepted(true);
            setChallenges(false);
          }}
          style={[
            styles.categoryContainer,
            {
              backgroundColor: accepted ? 'tomato' : '#303030',
            },
          ]}>
          <Text
            style={[
              styles.mediumText,
              {color: 'white', textAlign: 'center', fontSize: 16},
            ]}>
            Accepted{`\n`}3000
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={results}
          keyExtractor={(item) => item}
          numColumns={3}
          contentContainerStyle={{margin: 10}}
          renderItem={({item}) => {
            return (
              <Image style={styles.thumbnailStyle} source={{uri: item.url}} />
            );
          }}
        />
      </View>
      <TabBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default User;
