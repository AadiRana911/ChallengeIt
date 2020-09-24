import React, {Fragment, useState, useEffect} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Alert} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import cstyles from '../../components/cstyles';
import {Fonts} from '../../utils/Fonts';
import {primaryColor} from '../../components/colors';
function Interests({navigation}) {
  const [interests, setInterests] = useState([
    {id: 0, name: 'Entertainment'},
    {id: 1, name: 'Art'},
    {id: 2, name: 'Talent'},
    {id: 3, name: 'Religious'},
    {id: 4, name: 'Technology'},
    {id: 5, name: 'Skill'},
    {id: 6, name: 'Food'},
    {id: 7, name: 'Travelling'},
  ]);
  const [selected, setSelected] = useState([]);

  selectInterest = (interest) => {
    setSelected([...selected, interest]);
    const newInterest = interests.filter((item) => interest.id !== item.id);
    setInterests(newInterest);
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
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
            <View style={[cstyles.container, cstyles.mt_15]}>
              <Text style={styles.boldText}>Interests to Select..</Text>
              <View style={[cstyles.row, styles.buttonContainer]}>
                {interests &&
                  interests.map((interest) => (
                    <TouchableOpacity
                      key={interest}
                      style={styles.buttonStyle}
                      onPress={() => selectInterest(interest)}>
                      <Text>{interest.name}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          </View>
          {selected.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
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
      </SafeAreaView>
    </Fragment>
  );
}

export default Interests;

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
