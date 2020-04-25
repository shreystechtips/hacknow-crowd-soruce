import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	Alert,
	SafeAreaView,
} from "react-native";
import Header from "../components/Header/Header.js";

export default function HomeScreen({ navigation }) {
	return (
		<SafeAreaView style={styles.container}>
			{/* <Header /> */}
			<View style={styles.box}>
				<View
					style={{
						backgroundColor: "#FCFFFC",
						height: 10,
						marginLeft: "25%",
						marginRight: "25%",
						borderRadius: 10,
						marginBottom: 15,
					}}
				/>
				<Text style={{ color: "#ffffff" }}>
					Open up App.js to start working on your app!
        </Text>
				<Button
					title="Press me"
					onPress={() =>
						Alert.alert(
							"Simple Button pressed",
							"Description",
							[
								{
									text: "Ask me later",
									onPress: () => console.log("Ask me later pressed"),
								},
								{
									text: "Cancel",
									onPress: () => console.log("Cancel Pressed"),
									style: "cancel",
								},
								{ text: "OK", onPress: () => console.log("OK Pressed") },
							],
							{ cancelable: false }
						)
					}
				/>
				<Button
					title="Report an item"
					onPress={() => navigation.navigate('Reporst', { name: 'Jane' })}
				/>
				<View style={{ height: 200, width: "100%" }} />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FCFFFC",
		alignItems: "center",
		justifyContent: "flex-end",
		color: "#fff",
	},
	box: {
		borderTopLeftRadius: 50,
		borderTopEndRadius: 50,
		backgroundColor: "#2D3A3A",
		padding: 30,
		bottom: 0,
		width: "97%",
	},
});
