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
        color:'black',
    },
    headerForm: {
        height: "10%",
    },
    bodyForm: {
        height: "75%",
        marginLeft: "8%",
        marginRight: "8%",
        marginTop: "2%",
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
        alignItems: 'center'
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
    buttonLogout: {
        marginTop: "8%",
        backgroundColor: "#BDB6B6",
        justifyContent: "center",
        padding: 10,
        width: "100%",
        alignItems: "center",
        borderRadius: 50,
    },
    StyleFooterIndividual: {
        paddingHorizontal: 50,
        marginHorizontal: 80,
    },
    //Animation
    scrollContainer: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 5,
        overflow: 'hidden',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#bcbcbc',
        marginHorizontal: 3,
    },
    iconScroll: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:'5%'
    },
    deleteCard: {
        justifyContent: "flex-end",
        alignItems: "flex-end",

    },
    viewCard:{
        flex: 1,
        borderRadius: 5,
        justifyContent: 'center',
    },
    cardNull: {
        flex: 1,
        overflow: 'hidden',
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 10,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        justifyContent: 'center',
        alignItems:"center",
        width: "100%", 
        height: "100%",
    },
    //Animation
});
export default styles;