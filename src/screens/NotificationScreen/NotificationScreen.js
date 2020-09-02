
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TabBar from '../../components/navigation';
const NotificationScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        data={new Array(30)}
        keyExtractor={(item) => item}
        renderItem={({item, index}) => {
          return (
            <View
              style={[
                styles.notifContainer,
                {backgroundColor: index % 2 === 0 ? '#cfcfcf' : 'white'},
              ]}
              key={index}>
              <Text style={styles.mediumText}>Hi this is new notification</Text>
              <AntDesign name="close" size={13} color="red" />
            </View>
          );
        }}
      />
      <TabBar navigation={navigation} params={'Chat'} />
    </SafeAreaView>
  );
};
export default NotificationScreen;
