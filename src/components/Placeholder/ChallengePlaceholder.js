import React, {Component} from 'react';
import {StyleSheet, FlatList, Dimensions, Image, View} from 'react-native';
import {Card} from 'react-native-elements';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class ChallengePlaceholder extends Component {
  keyExtractor = (item, index) => {
    return `${index}`;
  };
  renderItem = () => {
    return (
      <Card containerStyle={styles.cardStyle}>
        <View style={{flexDirection: 'row'}}>
          <ShimmerPlaceHolder
            width={50}
            height={50}
            style={{width: 50, height: 50, borderRadius: 100}}
            autoRun
            backgroundColorBehindBorder={'white'}
          />
          <View style={{marginTop: 10}}>
            <Line
              style={{
                marginTop: 0,
                marginBottom: 7,
                marginLeft: 10,
                width: SCREEN_WIDTH / 4,
              }}
            />
            <Line
              style={{
                marginTop: 12,
                marginBottom: 7,
                marginLeft: 10,
                width: SCREEN_WIDTH / 6,
              }}
            />
          </View>
        </View>
        <ShimmerPlaceHolder
          style={{
            width: '100%',
            height: 200,
            marginVertical: 10,
          }}
          autoRun
          backgroundColorBehindBorder={'white'}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Line
            style={{
              //   marginTop: 20,
              marginBottom: 7,
              marginLeft: 10,
              width: 50,
            }}
          />
          <Line
            style={{
              //   marginTop: 10,
              marginBottom: 7,
              marginLeft: 10,
              width: 50,
            }}
          />
          <Line
            style={{
              //   marginTop: 10,
              marginBottom: 7,
              marginLeft: 10,
              width: 50,
            }}
          />
        </View>
      </Card>
    );
  };

  render() {
    return (
      <View>
        {this.props.type === 'question' ? (
          <View>
            <View style={{flexDirection: 'row', margin: 8}}>
              <ShimmerPlaceHolder
                width={50}
                height={50}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                }}
                autoRun
                backgroundColorBehindBorder={'white'}
              />
              <ShimmerPlaceHolder
                width={50}
                height={50}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  marginLeft: 10,
                }}
                autoRun
                backgroundColorBehindBorder={'white'}
              />
              <ShimmerPlaceHolder
                width={50}
                height={50}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  marginLeft: 10,
                }}
                autoRun
                backgroundColorBehindBorder={'white'}
              />
              <ShimmerPlaceHolder
                width={50}
                height={50}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  marginLeft: 10,
                }}
                autoRun
                backgroundColorBehindBorder={'white'}
              />
              <ShimmerPlaceHolder
                width={50}
                height={50}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  marginLeft: 10,
                }}
                autoRun
                backgroundColorBehindBorder={'white'}
              />
              <ShimmerPlaceHolder
                width={50}
                height={50}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  marginLeft: 10,
                }}
                autoRun
                backgroundColorBehindBorder={'white'}
              />
              <ShimmerPlaceHolder
                width={50}
                height={50}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  marginLeft: 10,
                }}
                autoRun
                backgroundColorBehindBorder={'white'}
              />
            </View>
            <View style={{flexDirection: 'row', margin: 8}}>
              <ShimmerPlaceHolder
                width={SCREEN_WIDTH / 3}
                height={40}
                style={{borderRadius: 100}}
                autoRun
                backgroundColorBehindBorder={'white'}
              />
              <ShimmerPlaceHolder
                width={SCREEN_WIDTH / 3}
                height={40}
                style={{borderRadius: 100, marginLeft: 10}}
                autoRun
                backgroundColorBehindBorder={'white'}
              />
              <ShimmerPlaceHolder
                width={SCREEN_WIDTH / 3.5}
                height={40}
                style={{
                  borderRadius: 100,
                  marginLeft: 10,
                }}
                autoRun
                backgroundColorBehindBorder={'white'}
              />
            </View>
          </View>
        ) : null}

        <FlatList
          data={new Array(10)}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          contentContainerStyle={{
            alignItems: 'center',
          }}
        />
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
        marginTop,
        marginBottom: 7,
        marginLeft: 10,
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
    paddingTop: 40,
    paddingBottom: 0,
    backgroundColor: 'white',
  },
  cardStyle: {
    width: SCREEN_WIDTH - 15,
    height: SCREEN_HEIGHT / 2.3,
    margin: 15,
    padding: 15,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#BDBDBD',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    // borderWidth: 1,
    // borderColor: theme.colors.lightGray,
    borderRadius: 5,
  },
});

export {ChallengePlaceholder};
