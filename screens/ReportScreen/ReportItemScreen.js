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
	Item,
	List,
	ListItem,
	TouchableHighlight,
	TouchableOpacity,
	Image,
	I18nManager,
	Animated
} from "react-native";
import Swiper from "./Swiper";
import { Swipeable, RectButton } from 'react-native-gesture-handler';
import AppleStyleSwipeableRow from './SwipeableItem';

const Row = ({ item }) => (
	<RectButton
		style={styles.rectButton}
		onPress={() => alert(item.name)}
	>
		<Text style={styles.fromText}>{item.name}</Text>
		<Text style={styles.dateText}>
			{item.category}
		</Text>
	</RectButton>
);

export default function ReportItemScreen({ navigation }) {
	const [isLoading, setLoading] = useState(false);
	const [data, setData] = useState({});

	useEffect(() => {
		setLoading(true)
		setData(["Item1", "Item2", "Item3"].reduce((map, item, index) => {
			const key = index;
			map[key] = {
				name: item,
				inStock: true,
				category: "Food"
			}
			return map;
		}, {}));
		setLoading(false);
	}, [])


	function setStock(swipeDir, id) {

		// Set stock based on 4 levels: None, Low, Medium, High
		// FOR now: 2 levels: 0, 1
		console.log(id)

		// let indexUpdate = 0;
		// let updateData = data.find( item => {indexUpdate++; return item.id === id});
		// const sameDataLeft = data.slice(0, indexUpdate);
		// const sameDataRight = data.slice(indexUpdate + 1, data.length);
		// console.log(updateData);
		// console.log(indexUpdate);
		// console.log(sameDataLeft);
		// console.log(sameDataRight);

		// Set state based on swipe
		switch (swipeDir) {
			case "SWIPE_LEFT":
				// Set stock to 0
				data[id].inStock = false;
				break;
			// updateData.inStock = false;
			case "SWIPE_RIGHT_0":
				// Set stock to low
				// updateData.inStock = true;
				data[id].inStock = true;
				break;
		}
		setData(data);
		// setData(sameDataLeft + updateData + sameDataRight);
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ padding: 24 }}>

				{isLoading ? <ActivityIndicator /> : (
					// console.log(data),
					<FlatList
						data={Object.keys(data)}
						// keyExtractor={({item}, index) => console.log(item)}
						renderItem={({ item }) =>
							// <Swiper title={data[item].name} render={data[item].inStock} handleSwipe={(swipe) => setStock(swipe, item)} />
							<AppleStyleSwipeableRow >
								{console.log(data[item])}
								<Row item={data[item]} />
								{/* <Text >Swipe Here</Text> */}
							</AppleStyleSwipeableRow>
						}
					/>
				)}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	leftAction: {
		flex: 1,
		backgroundColor: '#388e3c',
		justifyContent: 'flex-end',
		alignItems: 'center',
		flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse'
	},
	actionIcon: {
		width: 30,
		marginHorizontal: 10
	},
	rightAction: {
		alignItems: 'center',
		flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
		backgroundColor: '#dd2c00',
		flex: 1,
		justifyContent: 'flex-end'
	},
	rectButton: {
		flex: 1,
		height: 80,
		paddingVertical: 10,
		paddingHorizontal: 10,
		justifyContent: 'space-between',
		flexDirection: 'column',
		backgroundColor: 'white',
	},
	separator: {
		backgroundColor: 'rgb(200, 199, 204)',
		height: StyleSheet.hairlineWidth,
	},
	fromText: {
		fontWeight: 'bold',
		backgroundColor: 'transparent',
	},
	messageText: {
		color: '#999',
		backgroundColor: 'transparent',
	},
	dateText: {
		backgroundColor: 'transparent',
		position: 'absolute',
		right: 30,
		top: 10,
		color: '#999',
		fontWeight: 'bold',
	},
});