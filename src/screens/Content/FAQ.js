import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import {STRING} from '../../constants';

const About = ({navigation}) => {
  return (
    <SafeAreaView style={GlobalStyle.mainContainerBgColor}>
      <View style={GlobalStyle.commonToolbarBG}>
        <ToolBarIcon
          title={Ionicons}
          iconName={'chevron-back'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            marginEnd: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar title={STRING.about} />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <Text
          style={{
            marginHorizontal: 15,
            marginTop: 20,
            fontFamily: 'OpenSans-Medium',
            color: COLORS.black,
            fontSize: 18,
          }}>
          {STRING.about} Page
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default About;
