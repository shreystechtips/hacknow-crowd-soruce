import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	Alert,
	SafeAreaView,
	ActivityIndicator,
	FlatList,
	TextInput,
	Image,
} from "react-native";
import googlePlaceSearch from "./ReportScreen/googlePlaceSearch.js";
import HeaderX from "../components/Header/HeaderX";

// Report what's in stock

// Report what's out of stock

// Add images

export default function ReportScreen({ navigation }) {
	const [storeName, setStoreName] = React.useState('');
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch('https://reactnative.dev/movies.json')
			.then((response) => response.json())
			.then((json) => setData(json.movies))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	return (
		<SafeAreaView>
			<View>
				<Button
					title="Home"
					onPress={() => navigation.navigate('Home', { name: 'Jane' })}
				/>
			</View>
			<View style={{ padding: 24, backgroundColor: 'blue' }}>
				<Text> Form Title </Text>
				{/* Select store using google api to seatch store based on nearby and name*/}
				<View>
					<TextInput
						placeholder="Enter the store"
						value={storeName}
						onChangeText={setStoreName}
					/>
				</View>
			</View>
			<View style={{ padding: 24 }}>
				{isLoading ? <ActivityIndicator /> : (
					<FlatList
						data={data}
						keyExtractor={({ id }, index) => id}
						renderItem={({ item }) => {
							// console.log(item);
							return <Text syle={{ colour: 'black' }}>{item.title}, {item.releaseYear}</Text>
						}}
					/>
				)}
			</View>
		</SafeAreaView>

	);
}