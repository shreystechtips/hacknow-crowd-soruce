import * as React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	Alert,
	SafeAreaView,
} from "react-native";

// Select store using google api to seatch store

// Report what's in stock

// Report what's out of stock

// Add images

export default function ReportScreen({ navigation }) {
	return (
		<SafeAreaView>
			<View>
				<Button
					title="Home"
					onPress={() => navigation.navigate('Home', { name: 'Jane' })}
				/>
			</View>
		</SafeAreaView>

	);
}