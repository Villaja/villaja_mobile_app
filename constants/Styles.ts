import Colors from "./Colors";
import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFFFF",
  },
  inputField: {
    height: 45,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.10)",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 13,
    backgroundColor: "rgba(0,0,0,0.02)",
    color: "#000",
    fontFamily: 'roboto-condensed',
    
  },
  btn: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "roboto-condensed-sb",
  },
  btnIcon: {
    position: "absolute",
    left: 12,
  },

  btnStyleBorder: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
    flexBasis: '49%',
  },
  btnTextBorder: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: "roboto-condensed-sb",
  },
  ThirdPartyBtn: {
    backgroundColor: "rgba(0,0,0,0.03)",
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  footer: {
    position: "absolute",
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: Colors.grey,
    borderTopWidth: StyleSheet.hairlineWidth,
  },


  container11: {
    position: "absolute",
    flexShrink: 0,
    top: 36,
    left: 0,
    right: 0,
    alignItems: "flex-start",
    rowGap: 292,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },

  arrowiconcontainer: {
    flexShrink: 0,
    height: 20,
    width: 20,
    alignItems: "flex-start",
    rowGap: 0,
  },
  arrowicon: {
    position: "absolute",
    flexShrink: 0,
    top: 4,
    right: 7,
    bottom: 4,
    left: 7,
    overflow: "visible",
  },
  passwordcontainer: {
    position: "absolute",
    flexShrink: 0,
    top: 80,
    left: 65,
    alignItems: "center",
    rowGap: 8,
  },
  enternewpassword: {
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(2, 84, 146, 1)",
    fontFamily: "Roboto",
    fontSize: 25,
    fontWeight: "500",
    letterSpacing: 0,
  },
  enteranewpasswordthatworkforyou: {
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.4)",
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "400",
    letterSpacing: 0,
  },
  container136: {
    position: "absolute",
    flexShrink: 0,
    top: 152,
    left: 20,
    alignItems: "flex-start",
    rowGap: 16,
  },
  container13: {
    flexShrink: 0,
    alignItems: "flex-start",
    rowGap: 4,
  },
  password: {
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.7)",
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "400",
    letterSpacing: 0,
  },
  container9: {
    flexShrink: 0,
    width: 335,
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    paddingVertical: 15,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 5,
  },
  passwordinput: {
    flexShrink: 0,
    height: 12,
    width: 9,
  },
  enteryourpassword: {
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.2)",
    fontFamily: "Roboto",
    fontSize: 13,
    fontWeight: "400",
    letterSpacing: 0,
  },
  eyeicon1: {
    position: "absolute",
    flexShrink: 0,
    top: 18,
    left: 309,
    width: 13,
    height: 9,
    overflow: "visible",
  },
  confirmpasswordcontainer: {
    flexShrink: 0,
    alignItems: "flex-start",
    rowGap: 4,
  },
  confirmpassword: {
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.7)",
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "400",
    letterSpacing: 0,
  },
  confirmpasswordinput: {
    flexShrink: 0,
    width: 335,
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    paddingVertical: 15,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 5,
  },
  padlockicon: {
    flexShrink: 0,
    height: 12,
    width: 9,
  },
  passwordconfirmation: {
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.2)",
    fontFamily: "Roboto",
    fontSize: 13,
    fontWeight: "400",
    letterSpacing: 0,
  },
  eyeicon2: {
    position: "absolute",
    flexShrink: 0,
    top: 18,
    left: 309,
    width: 13,
    height: 9,
    overflow: "visible",
  },
  confirmbutton: {
    flexShrink: 0,
    height: 50,
    width: 335,
    backgroundColor: "rgba(2, 84, 146, 1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  confirmtext: {
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0,
  },

  frame11: {
    position: "absolute",
    flexShrink: 0,
    top: 36,
    left: 0,
    right: 0,
    alignItems: "flex-start",
    rowGap: 292,
    paddingVertical: 8,
    paddingHorizontal: 20
  },
  mobileencryptionPana: {
    position: "absolute",
    flexShrink: 0,
    top: 137,
    height: 139,
    left: 119,
    width: 136
  },
  rectangle1: {
    flexShrink: 0,
    width: 306,
    height: 646,
    transform: [
      {
        rotateZ: "12.70deg"
      }
    ],
    backgroundColor: "rgba(255, 255, 255, 0.02)"
  },

  rectangletwo: {
    flexShrink: 0,
    width: 196,
    height: 802,
    position: "fixed",
    transform: [
      {
        rotateZ: "12.70deg"
      }
    ],
    backgroundColor: "rgba(255, 255, 255, 0.02)"
  },
  rectanglethree: {
    flexShrink: 0,
    width: 196,
    height: 354,
    position: "fixed",
    transform: [
      {
        rotateZ: "12.70deg"
      }
    ],
    backgroundColor: "rgba(255, 255, 255, 0.02)"
  },
  landingpagelogo: {
    flexShrink: 0,
    height: 74,
    width: 144,
    alignItems: "flex-start",
    rowGap: 0
  },

});
