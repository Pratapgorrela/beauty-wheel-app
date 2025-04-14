import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";
import RideBottomSheetView from "@/components/RideBottomSheetView";

const Home = () => {
	const { setUserLocation, setUserInitialLocation, resetUserLocation } =
		useLocationStore();
	const [hasPermissions, setHasPermissions] = useState(false);
	const bottomSheetRef = useRef<BottomSheet>(null);

	useEffect(() => {
		const requestLocation = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setHasPermissions(false);
				return;
			}
			const location = await Location.getCurrentPositionAsync()!;
			const address: Location.LocationGeocodedAddress[] =
				await Location.reverseGeocodeAsync({
					latitude: location.coords.latitude!,
					longitude: location.coords.longitude!,
				});

			setUserInitialLocation({
				latitude: location.coords.latitude!,
				longitude: location.coords.longitude!,
				address: `${address?.[0]?.formattedAddress?.split(",")?.[1]}, ${address?.[0]?.city}`,
			});

			setUserLocation({
				latitude: location.coords.latitude!,
				longitude: location.coords.longitude!,
				address: `${address?.[0]?.formattedAddress?.split(",")?.[1]}, ${address?.[0]?.city}`,
			});
		};
		requestLocation();
	}, []);

	// const handleSignOut = () => {
	// 	signOut();
	// 	router.replace("/(auth)/sign-in");
	// };

	const handleDestinationPress = (location: {
		latitude: number;
		longitude: number;
		address: string;
	}) => {
		setUserLocation(location);
	};

	const handleCrearAddress = () => {
		resetUserLocation();
	};

	return (
		<SafeAreaView className="bg-general-500 p-1">
			<GoogleTextInput
				icon={icons.search}
				containerStyle="bg-white shadow-md shadow-neutral-300"
				handlePress={handleDestinationPress}
				handleClear={handleCrearAddress}
			/>

			<View className="h-full">
				<View className="flex flex-row items-center bg-transparent h-[420px]">
					<Map />
				</View>
				<RideBottomSheetView bottomSheetRef={bottomSheetRef} />
			</View>
		</SafeAreaView>
	);
};

export default Home;
