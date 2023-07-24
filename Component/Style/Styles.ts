import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    boderLogin: {

    },
    viewTextLogin: {
        justifyContent: "center",
        alignContent: "center",
    },
    textLogin: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
    },
    headerForm: {
        height: "10%",
    },
    bodyForm: {
        height: "75%",
        marginLeft: "8%",
        marginRight: "8%",
        marginTop: "2%"
    },
    footerForm: {
        height: "15%",
    },
    styleView: {
        justifyContent: "center",
        alignContent: "center",
    },
    viewRowInput: {
        flexDirection: "row",
        borderBottomColor: "grey",
        borderBottomWidth: 1,
    },
    viewIcon: {
        justifyContent: "center",
        padding: 10,
    },
    textFormLogin: {
        fontSize: 15,
        fontWeight: "bold",
    },
    forgotPassWord: {
        textAlign: "right",
        marginTop: "3%",
        textDecorationLine: "underline",
    },
    buttonLogin: {
        marginTop: "8%",
        backgroundColor: "#E591D7",
        justifyContent: "center",
        padding: 10,
        width: "100%",
        alignItems: "center",
        borderRadius: 50,
    },
    textRegister: {
        textAlign: "center",
        fontWeight: "bold",
    },
    viewRow: {
        flexDirection: "row",
        justifyContent: "center",
    },
    colorTextWhite: {
        color: "white"
    },
    syleLoading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(100, 100, 100, 0.6)',
        zIndex: 99,
    },
    textLoading: {
        fontSize: 18,
        marginTop: 12,
    },
});
export default styles;