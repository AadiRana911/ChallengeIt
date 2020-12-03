import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Header} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Fonts} from '../../utils/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {primaryColor} from '../../components/colors';
import OptionsMenu from 'react-native-options-menu';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';
import Moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import io from 'socket.io-client';
//redux
import {connect} from 'react-redux';
import {sendMsg, getConvo} from '../../redux/actions/app';

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {message: '', messages: [], name: '', id: ''};
  }
  componentDidMount() {
    this.connectSocket();
    const name = this.props.route.params && this.props.route.params.name;
    const id = this.props.route.params && this.props.route.params.id;
    this.setState({
      name: name,
      id: id,
    });
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
      this.connectSocket();

      this.getConversation();
    });
  }

  //connecting to socket server
  connectSocket = () => {
    console.log(this.props.user.u_id, this.state.id);
    this.socket = io('http://192.168.1.5:3000', {
      query: {
        device: 'android',
        role: 'customer',
      },
      autoConnect: true,
      transports: ['websocket'],
    });
    this.socket.emit('join_room', {
      userid: this.props.user && this.props.user.u_id,
      recver_id: this.state.id,
    });
  };

  sendMessage = () => {
    const {id, message, messages} = this.state;
    let newList = [...messages];

    this.socket.emit('chat_message', {
      msg: message,
      date: Moment(new Date()).format('YYYY-MM-DD h:mm:ss'),
      userId: this.props.user && this.props.user.u_id,
      recver_id: JSON.stringify(id),
    });
    this.socket.on('receive_message', (data) => {
      console.log('zaid Qureshi', data.data);
      newList.push(data.data);

      this.setState({messages: newList, message: ''});
    });

    // const {user, token} = this.props;
    // console.log(id);
    // let msg = {
    //   recv_id: id,
    //   send_id: user.u_id,
    //   content: message,
    //   date: new Date(),
    // };
    // this.setState(
    //   {
    //     messages: newList,
    //   },
    //   () => {
    //     const formData = new FormData();
    //     formData.append('recv_id', id);
    //     formData.append('send_id', user.u_id);
    //     formData.append('content', message);
    //     this.setState({message: ''});
    //     new Promise((rsl, rej) => {
    //       this.props.sendMsg(formData, this.props.token, rsl, rej);
    //     })
    //       .then((res) => {
    //         console.log(res);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   },
    // );
  };
  getConversation = () => {
    const {token} = this.props;
    const id = this.props.route.params && this.props.route.params.id;

    // const formData = new FormData();
    // formData.append('recv_id', id);
    const formData = {recver_id: id};
    console.log(formData);
    new Promise((rsl, rej) => {
      this.props.getConvo(formData, 1111, rsl, rej);
    })
      .then((res) => {
        this.setState({messages: this.props.conversation, id: res[0].send_id});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentWillUnmount() {
    this._unsubscribe;
  }
  renderItem = ({item, index}) => {
    return (
      <View key={index}>
        <View
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            borderBottomRightRadius:
              item.recv_id === this.props.user.u_id ? 20 : 0,
            borderTopRightRadius:
              item.recv_id === this.props.user.u_id ? 30 : 20,
            borderBottomLeftRadius:
              item.recv_id === this.props.user.u_id ? 0 : 20,
            borderTopLeftRadius:
              item.recv_id === this.props.user.u_id ? 20 : 20,
            alignSelf:
              item.recv_id === this.props.user.u_id ? 'flex-start' : 'flex-end',
            backgroundColor:
              item.recv_id === this.props.user.u_id ? '#5C6C96' : primaryColor,
          }}>
          <Text
            style={{
              textAlign:
                item.send_id === this.props.user.u_id ? 'left' : 'right',
              color: '#fff',
            }}>
            {item.content}
          </Text>
        </View>
        <Text
          style={{
            textAlign: item.recv_id === this.props.user.u_id ? 'left' : 'right',
            color: item.recv_id === this.props.user.u_id ? '#000' : '#000',
            fontSize: 12,
            //padding: 10,
            margin: 10,
            marginTop: 0,
          }}>
          {Moment(item.date).format('LT')}
        </Text>
      </View>
    );
  };

  render() {
    const {message} = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          translucent={false}
          backgroundColor={primaryColor}
          barStyle={'light-content'}
        />
        <Header
          containerStyle={{
            paddingTop: 0,
            height: Platform.select({
              android: 66,
              default: 44,
            }),
          }}
          backgroundColor={primaryColor}
          leftComponent={
            <AntDesign
              name="arrowleft"
              size={25}
              color="white"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={
            <Text style={{fontFamily: Fonts.CenturyRegular, color: 'white'}}>
              {this.state.name}
            </Text>
          }
        />

        <FlatList
          data={this.state.messages}
          renderItem={this.renderItem}
          extraData={this.state}
          ref={(ref) => (this.flatList = ref)}
          onContentSizeChange={() =>
            this.flatList.scrollToEnd({animated: true})
          }
          onLayout={() => this.flatList.scrollToEnd({animated: true})}
        />

        <View
          style={{
            flexDirection: 'row',
            padding: Platform.OS === 'ios' ? 15 : 6,
            backgroundColor: '#F5F5F5',
            borderTopWidth: 1,
            borderTopColor: 'gray',
          }}>
          <TextInput
            style={{width: '80%', marginLeft: 5}}
            placeholder={'Type a messages'}
            value={message}
            onChangeText={(text) => this.setState({message: text})}
          />
          <TouchableOpacity
            onPress={() => this.sendMessage()}
            activeOpacity={0.7}
            disabled={message === '' ? true : false}
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginLeft: 20,
                color: message === '' ? primaryColor : primaryColor,
                fontWeight: '700',
              }}>
              {'Send'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  const {token, user} = state.auth;
  const {conversation} = state.app;
  return {token, conversation, user};
};
export default connect(mapStateToProps, {sendMsg, getConvo})(Conversation);
