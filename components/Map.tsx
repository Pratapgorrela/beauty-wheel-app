import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Platform,
	StyleSheet,
	Text,
	View,
} from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { icons } from "@/constants";
// import { useFetch } from "@/lib/fetch";
import {
	calculateDriverTimes,
	calculateRegion,
	generateMarkersFromData,
} from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/store";
import { Driver, MarkerData } from "@/types/type";
import { MOCK_DRIVERS } from "@/constants/drivers";

const directionsAPI = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

const Map = () => {
	const {
		userLongitude,
		userLatitude,
		destinationLatitude,
		destinationLongitude,
	} = useLocationStore();
	const [markers, setMarkers] = useState<MarkerData[]>([]);

	useEffect(() => {
		if (Array.isArray(MOCK_DRIVERS)) {
			if (!userLatitude || !userLongitude) return;

			const newMarkers = generateMarkersFromData({
				data: MOCK_DRIVERS,
				userLatitude,
				userLongitude,
			});

			setMarkers(newMarkers);
		}
	}, [userLatitude, userLongitude]);

	const region = calculateRegion({
		userLatitude,
		userLongitude,
		destinationLatitude,
		destinationLongitude,
	});

	if ((!userLatitude && !userLongitude) || !markers?.length)
		return (
			<View className="flex justify-between items-center w-full h-full">
				<ActivityIndicator size="small" color="#000" />
			</View>
		);

	return (
		<MapView
			provider={PROVIDER_DEFAULT}
			className="w-full rounded-2xl"
			tintColor="black"
			mapType={"standard"}
			showsPointsOfInterest={false}
			initialRegion={region}
			showsUserLocation={true}
			style={StyleSheet.absoluteFillObject}
			userInterfaceStyle="light">
			{markers?.map((marker, index) => (
				<Marker
					key={marker?.driver_id}
					coordinate={{
						latitude: marker.latitude,
						longitude: marker.longitude,
					}}
					title={marker.title}
					image={icons.marker}
				/>
			))}
		</MapView>
	);
};

export default Map;
