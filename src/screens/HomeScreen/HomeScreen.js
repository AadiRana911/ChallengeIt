import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Feed from '../../screens/Feed';
import styles from './styles';
import TabBar from '../../components/navigation';

class HomeScreen extends Component {
  render() {
    return <Feed />;
  }
}

export default HomeScreen;
