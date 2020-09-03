import React, {Component} from 'react';
import {StyleSheet, FlatList, Dimensions, Image, View} from 'react-native';
import {Card} from 'react-native-elements';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class ProfilePlaceholder extends Component {
  keyExtractor = (item, index) => {
    return `${index}`;
  };
  renderItem = () => {
    return (
      <Card containerStyle={styles.cardStyle}>
        <ShimmerPlaceHolder
          style={{height: 100, width: 105, opacity: 0.3, backgroundColor: 'rgba(175,175,175,0.55)'}}
          autoRun
          backgroundColorBehindBorder={'red'}
        />
      </Card>
    );
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-around'}}>
        <View>
          <View
            style={{
              marginVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ShimmerPlaceHolder
              width={50}
              height={50}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                opacity: 0.3,
                marginVertical: 10,
              }}
              autoRun
              backgroundColorBehindBorder={'white'}
            />
            <Line
              style={{
                marginTop: 10,
                width: 90,
                marginLeft: 0,
              }}
            />
            <ShimmerPlaceHolder
              width={SCREEN_WIDTH / 3}
              height={40}
              style={{
                borderRadius: 100,
                opacity: 0.3,
                marginVertical: 10,
              }}
              autoRun
              backgroundColorBehindBorder={'white'}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                marginTop: 10,
              }}>
              <Line
                style={{
                  marginTop: 10,
                  width: 90,
                  marginLeft: 0,
                }}
              />
              <Line
                style={{
                  marginTop: 10,
                  width: 90,
                  marginLeft: 0,
                }}
              />
              <Line
                style={{
                  marginTop: 10,
                  width: 90,
                  marginLeft: 0,
                }}
              />
            </View>
          </View>
        </View>
        <View>
          <FlatList
            data={new Array(3)}
            style={{alignSelf: 'center', marginVertical: 5}}
            showsVerticalScrollIndicator={false}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <FlatList
            data={new Array(3)}
            style={{alignSelf: 'center', marginVertical: 5}}
            showsVerticalScrollIndicator={false}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <FlatList
            data={new Array(3)}
            style={{alignSelf: 'center', marginVertical: 5}}
            showsVerticalScrollIndicator={false}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

const Line = ({style}) => {
  const {width, marginTop} = style;
  return (
    <ShimmerPlaceHolder
      width={width}
      height={5}
      style={{
        marginBottom: 7,
        // marginLeft: 10,
        opacity: 0.3,
        borderRadius: 100,
      }}
      autoRun
      backgroundColorBehindBorder={'white'}>
      <View
        style={[
          {
            height: 5,
            backgroundColor: 'rgba(154, 154, 154, 0.29)',
            overflow: 'hidden',
            
          },
          style,
        ]}>
        <View style={[style]} />
      </View>
    </ShimmerPlaceHolder>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // paddingTop: 40,
    // paddingBottom: 0,
    backgroundColor: 'white',
  },
  cardStyle: {
    height: 100,
    width: 105,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderRadius: 3,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#BDBDBD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    // borderWidth: 1,
    // borderColor: theme.colors.lightGray,
    borderRadius: 5,
  },
});

export {ProfilePlaceholder};
