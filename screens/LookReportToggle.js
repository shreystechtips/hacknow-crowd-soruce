import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Button } from "react-native";
import ModernHeader from "../components/Header/ModernHeader.js";
import MaterialButtonDanger from "../components/MaterialButtonDanger";
import MaterialButtonViolet1 from "../components/MaterialButtonViolet1";

function Selector({ navigation }) {
	return (
		<View style={styles.root}>
			{/* <ModernHeader style={styles.headerX} /> */}
            
			{/* <Button
				title="Look for Items"
				style={styles.LookButton}
				onPress={() => navigation.navigate('Selector')} // Change this to selector?

			></Button>
			<Button
				title="Report Items"
				style={styles.ReportButton}
				onPress={() => navigation.navigate('Report')}
			></Button> */}

             <MaterialButtonDanger
                text1="Look for Items"
				style={[styles.materialButtonDanger,{backgroundColor:"#F44336"}]}
				onPress={() => navigation.navigate('Selector')}
             />
			 <MaterialButtonDanger
                text1="Report Items"
				style={[styles.materialButtonDanger,{backgroundColor:"#3F51B5"}]}
				onPress={() => navigation.navigate('Report')}
             />
            {/* <MaterialButtonViolet1
                text1="Report Items"
                // style={styles.materialButtonViolet1}
            /> */}

		</View>

	);
}

const styles = StyleSheet.create({
	materialButtonDanger:{
		height:"40%",
		width:"95%",
		marginLeft:"2.5%",
	},
	root: {
		flex: 1,
		backgroundColor: "rgba(255,255,255,1)",
		padding:10
	},
	headerX: {
		width: 360,
		height: 80,
		elevation: 15,
		shadowOffset: {
			height: 7,
			width: 1
		},
		shadowColor: "rgba(0,0,0,1)",
		shadowOpacity: 0.1,
		shadowRadius: 5,
		alignSelf: "center"
	},
	LookButton: {
		width: 287,
		height: 198,
		borderRadius: 19,
		borderColor: "#000000",
		borderWidth: 0,
		marginTop: 92,
        alignSelf: "center",
        backgroundColor: "#F44336",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 16,
        paddingLeft: 16,
        elevation: 2,
        minWidth: 88,
        borderRadius: 2,
	},
	ReportButton: {
		width: 287,
		height: 198,
		borderRadius: 19,
		borderColor: "#000000",
		borderWidth: 0,
		shadowOffset: {
			height: 5,
			width: 5
		},
		shadowColor: "rgba(0,0,0,1)",
		shadowOpacity: 0.01,
		marginTop: 49,
        alignSelf: "center",
        backgroundColor: "#F44336",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 16,
        paddingLeft: 16,
        elevation: 2,
        minWidth: 88,
        borderRadius: 2,
	}
});

export default Selector;
