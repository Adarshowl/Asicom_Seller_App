import {
    SafeAreaView,
     StyleSheet,
      View ,
      I18nManager
     } from 'react-native';
 import React, { useContext ,useState} from 'react';
 import GlobalStyle from '../../styles/GlobalStyle';
 import { STRING } from '../../constants';
 import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
 import ToolBarIcon from '../../utils/ToolBarIcon';
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import { COLORS } from '../../constants/Colors';
 import AntDesign from "react-native-vector-icons/AntDesign"
 import themeContext from '../../constants/themeContext';
 import { FONTS } from '../../constants/Fonts';
 
 const WishList = ({ navigation }) => {
 
   const theme = useContext(themeContext);
   const [show, setShow] = useState(false);
 
   return (
     <SafeAreaView
       style={[
         GlobalStyle.mainContainerBgColor,
         {
           backgroundColor: theme?.colors?.bg_color_onBoard,
         },
       ]}>
       <View
         style={[
           GlobalStyle.commonToolbarBG,
           {
             backgroundColor: theme.colors.bg_color_onBoard,
           },
         ]}>
           <Ionicons
             name="ios-arrow-back"
             // color={COLORS.black}
             color={theme.colors.textColor}
 
             size={25}
             style={[
               styles.backIcon,
               {
                 opacity: !show ? 1 : 0.0,
                 transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
                 marginStart:10
               },
             ]}
             onPress={() => {
               navigation.goBack();
               // ShowToastMessage('Coming Soon!');
             }}
           />
         {/* <ToolBarIcon
           title={Ionicons}
           iconName={'chevron-back'}
           icSize={20}
           icColor={COLORS.colorPrimary}
           style={{
             backgroundColor: theme?.colors?.toolbar_icon_bg,
             marginEnd: 10,
           }}
           onPress={() => {
             navigation.goBack();
           }}
         /> */}
         <VegUrbanCommonToolBar
           title="Wish List"
           style={{
             backgroundColor: theme.colors.bg_color_onBoard,
             marginStart:10
 
           }}
           textStyle={{
             color: theme.colors.textColor,
             fontSize: 20,
             fontFamily:FONTS?.bold
           }}
         />
         <AntDesign
          name={'search1'}
          size={26}
          // color={COLORS.colorPrimary} 
          style={{
            marginEnd: 20
          }}
          color={theme?.colors?.textColor}
        />
         {/* <ToolBarIcon
           title={Ionicons}
           iconName={'person'}
           icSize={20}
           icColor={COLORS.colorPrimary}
           style={{
             backgroundColor: theme?.colors?.toolbar_icon_bg,
             marginEnd: 10,
           }}
           onPress={() => {
             navigation.navigate('Profile');
           }}
         /> */}
       </View>
       <TopTabNav />
 
       {/* <View
         style={{
           minHeight: '100%',
           width: '100%',
           marginTop: 5,
           marginBottom:30
 
         }}>
         <TopTabNav />
       </View> */}
     </SafeAreaView>
   );
 };
 
 export default WishList;
 
 const styles = StyleSheet.create({});
 