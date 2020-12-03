import React, {Fragment, useState, useEffect} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Alert} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import cstyles from '../../components/cstyles';
import {Fonts} from '../../utils/Fonts';
import {primaryColor} from '../../components/colors';
import {Loading} from '../../components/Loading';
import Snackbar from 'react-native-snackbar';
//redux
import {connect} from 'react-redux';
import {getInterests, saveInterests} from '../../redux/actions/app';

function Interests({navigation, getInterests, interests, saveInterests}) {
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [localInterests, setInterests] = useState([]);
  selectInterest = (interest) => {
    setSelected([...selected, interest]);
    const newInterest = localInterests.filter(
      (item) => interest.Id !== item.Id,
    );
    setInterests(newInterest);
  };
  useEffect(() => {
    setLoading(true);
    new Promise((rsl, rej) => {
      getInterests(rsl, rej);
    })
      .then((res) => {
        setInterests(interests);
        console.log('Local', res);
        setLoading(false);
        // navigation.navigate('Home');
      })
      .catch((errorData) => {
        setLoading(false);

        Snackbar.show({
          text: errorData,
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  }, []);
  const handleSave = () => {
    setLoading(true);
    const formData = new FormData();
    selected.map((item) => {
      formData.append('interest[]', item.Id);
    });

    new Promise((rsl, rej) => {
      saveInterests(formData, rsl, rej);
    })
      .then((res) => {
        setLoading(false);
        Snackbar.show({
          text: res,
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.navigate('Home');
      })
      .catch((errorData) => {
        setLoading(false);

        Snackbar.show({
          text: errorData,
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };

  return (
    <Fragment>
      <SafeAreaView style={[cstyles.container, {backgroundColor: 'white'}]}>
        <ScrollView style={cstyles.container}>
          <View style={(cstyles.container, cstyles.padder)}>
            <View style={cstyles.contentContainer}>
              <Text style={styles.mainText}>Select Your Interests</Text>
              <Text style={styles.subtitle}>
                Choose the topics you like to follow..
              </Text>
            </View>
            {selected.length > 0 && (
              <View style={[cstyles.container, cstyles.mt_15]}>
                <Text style={styles.boldText}>Selected Interests</Text>
                <View style={[cstyles.row, styles.buttonContainer]}>
                  {selected.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.gradiantButton}
                      // onPress={() => deSelectInterest(item)}
                    >
                      <Text style={cstyles.gradientButtonText}>
                        {item.Interest}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
            <View style={[cstyles.container, cstyles.mt_15]}>
              <Text style={styles.boldText}>Interests to Select..</Text>
              <View style={[cstyles.row, styles.buttonContainer]}>
                {localInterests &&
                  localInterests.map((interest) => (
                    <TouchableOpacity
                      key={interests.Id}
                      style={styles.buttonStyle}
                      onPress={() => selectInterest(interest)}>
                      <Text>{interest.Interest}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          </View>
          {selected.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                handleSave();
              }}
              style={[
                styles.textinput,
                {
                  padding: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: primaryColor,
                },
              ]}>
              <Text style={{fontFamily: Fonts.CenturyBold, color: 'white'}}>
                Save
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        <Loading visible={loading} />
      </SafeAreaView>
    </Fragment>
  );
}
const mapStateToProps = (state) => {
  const {interests} = state.app;
  return {
    interests,
  };
};
export default connect(mapStateToProps, {getInterests, saveInterests})(
  Interests,
);

const styles = StyleSheet.create({
  input: {
    flex: 1,
    backgroundColor: 'white',
    height: 40,
  },
  mainText: {
    fontSize: 30,
    fontFamily: Fonts.centuryBold,
  },
  textinput: {
    margin: 10,
    backgroundColor: 'white',
    paddingLeft: 10,
    borderRadius: 10,
    width: '75%',
    fontFamily: 'geometriaBold',
    alignSelf: 'center',
    elevation: 5,
  },
  subtitle: {
    fontSize: 15,
    color: 'lightgrey',
  },
  boldText: {
    fontSize: 20,
  },
  buttonContainer: {
    flexWrap: 'wrap',
  },
  buttonStyle: {
    backgroundColor: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 40,
    marginTop: 5,
    marginRight: 10,
    elevation: 3,
    shadowOpacity: 0.9,
    shadowColor: '#b3b2b1',
    margin: 10,
  },
  gradiantButton: {
    backgroundColor: primaryColor,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 40,
    marginTop: 5,
    marginRight: 10,
    elevation: 3,
  },
  gradiant: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
});
