import React, { useContext } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/Colors';
import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
// import useTranslation from 'react-i18next'

const LogoutConfirmationModal = ({ visible, onCancel, onConfirm }) => {
  const theme = useContext(themeContext);
  // const { t } = useTranslation();


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={[styles.modalContainer, {
        // backgroundColor: theme?.colors?.transparent
      }]}>
        <View style={[styles.modalContent, {
          backgroundColor: theme?.colors?.bg_color_onBoard 
        }]}>
           <View style={{
            width: '20%',
            height: 3,
            backgroundColor: theme?.colors?.grey,
            // borderWidth:1,
            alignSelf: 'center',
            marginTop: 5,
            marginBottom: 10
          }}></View>
          <Text style={[styles.modalTitle ,{
            color:"#E35D5E"
            // color:theme?.colors?.textColor
          }]}>Logout</Text>
          <Text style={[styles.modalText,{
                        color:theme?.colors?.textColor

          }]}>Are you sure you want to log out?</Text>
          <View style={styles.buttonContainer}>
          <VegUrbanCommonBtn
              height={40}
              width={'48%'}
              borderRadius={20}
              textSize={16}
              // textColor={COLORS?.white}

              textColor={theme.colors?.textColor}

              text={('Cancel')}
              backgroundColor={theme?.colors?.bg}
              onPress={onCancel}
              // onPress={() => {
              //   navigation.navigate('Checkout');
              // }}
              textStyle={{
                fontFamily: FONTS?.bold,

                // textTransform: 'uppercase',
              }}
            />
            <VegUrbanCommonBtn
              height={40}
              width={'48%'}
              borderRadius={20}
              textSize={16}
              // textColor={COLORS?.white}

              textColor={theme.colors?.btnTextColor}

              text={('Yes, Logout')}
              backgroundColor={theme?.colors?.colorPrimary}
              onPress={onConfirm}
              // onPress={() => {
              //   navigation.navigate('Checkout');
              // }}
              textStyle={{
                fontFamily: FONTS?.bold,

              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  divLine: {
    height: 0.5,
    width: '100%',
    backgroundColor: COLORS.gray,
    alignSelf: 'center',
    marginVertical: 5,
    marginTop: 10,
    marginBottom: 10
  },
  modalContent: {
    backgroundColor: COLORS?.white,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical:30
  },
  modalTitle: {

    fontFamily: FONTS?.medium,
    fontSize: 20,
      color: COLORS.black,
      marginBottom: 10,
      textAlign: 'center'
    
  },
  modalText: {
    fontFamily: FONTS?.bold,
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: COLORS.colorPrimary,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
});

export default LogoutConfirmationModal;
