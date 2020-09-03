import {StyleSheet, Dimensions} from 'react-native'
const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: width/15,
        paddingVertical: height/20,
        justifyContent: 'space-around'
    },
    textInputStyle: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 0},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
        borderRadius: 3,
        borderWidth: 0.5,
        borderColor: '#eee',
    },
    nextButtonStyle: {
        backgroundColor: '#fff',
        paddingVertical: 7,
        alignItems: 'center',
        width: '65%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 0},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
        borderRadius: 7,
        borderWidth: 0.5,
        borderColor: '#eee'
    },
    bottomContainer: {
        paddingBottom: 10,
        justifyContent: 'space-around',
        alignSelf: 'center',
        flexDirection: 'row',
        width: '40%',
        alignItems: 'center',
        marginTop: 20,
    },
    socialIconsStyle: {
        backgroundColor: '#fff',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 0},
        shadowOpacity: 0.3,
        shadowRadius: 25,
        elevation: 3,
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: '#eee'
    }
});
export default styles;