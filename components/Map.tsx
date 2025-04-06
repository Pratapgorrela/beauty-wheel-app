import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { Driver, MarkerData } from "@/types/type";
import { useDriverStore, useLocationStore } from "@/store";
import { calculateRegion } from "@/lib/map";

const directionsAPI = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

const Map = () => {
	const {
		userLongitude,
		userLatitude,
		destinationLatitude,
		destinationLongitude,
	} = useLocationStore();

	const region = calculateRegion({
		userLatitude,
		userLongitude,
		destinationLatitude,
		destinationLongitude,
	});

	if (!userLatitude || !region) return <Text>loaction is loading...</Text>;

	return (
		<MapView
			provider={PROVIDER_DEFAULT}
			className="w-full h-full rounded-2xl"
			tintColor="black"
			// mapType="mutedStandard"
			showsPointsOfInterest={false}
			initialRegion={region}
			showsUserLocation={true}
			userInterfaceStyle="light">
			<Text className="w-[1000px] h-full overflow-hidden">Map Test</Text>
		</MapView>
	);
};

export default Map;
