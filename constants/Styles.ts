import Colors from './Colors';
import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFFFF',
  },
  inputField: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ABABAB',
    borderRadius: 5,
    paddingVertical:15,
    paddingHorizontal:13,
    backgroundColor: 'rgba(0,0,0,0.02)',
    color: '#000',
  },
  btn: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'roboto-condensed-sb',
  },
  btnIcon: {
    position: 'absolute',
    left: 16,
  },

  btnStyleBorder:{
    backgroundColor:'#fff',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:2,
    borderColor:Colors.primary,
    flexGrow:1,
    
  },
  btnTextBorder:{
    color:Colors.primary,
    fontSize: 16,
    fontFamily: 'roboto-condensed-sb',
  },
  ThirdPartyBtn:{
    backgroundColor:'rgba(0,0,0,0.03)',
    height: 50,
    borderRadius: 10,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap:8
  },
  footer: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: Colors.grey,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
