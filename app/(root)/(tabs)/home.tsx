import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";

const Home = () => {
	const { user } = useUser();
	const { signOut } = useAuth();
	// console.log("user", user);
	const { setUserLocation, setDestinationLocation } = useLocationStore();
	const [hasPermissions, setHasPermissions] = useState(false);

	useEffect(() => {
		const requestLocation = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setHasPermissions(false);
				return;
			}
			const location = await Location.getCurrentPositionAsync()!;
			const address = await Location.reverseGeocodeAsync({
				latitude: location.coords.latitude!,
				longitude: location.coords.longitude!,
			});

			setUserLocation({
				latitude: location.coords.latitude!,
				longitude: location.coords.longitude!,
				address: `${address?.[0]?.name}, ${address?.[0]?.region}`,
			});
		};
		requestLocation();
	}, []);

	const handleSignOut = () => {
		signOut();
		router.replace("/(auth)/sign-in");
	};

	const handleDestinationPress = () => {};

	return (
		<SafeAreaView className="bg-general-500 p-4">
			<View className="flex flex-row items-center justify-between my-5">
				<Text className="text-2xl font-JakartaExtraBold">
					Welcome, {user?.emailAddresses?.[0]?.emailAddress?.split("@")?.[0]} 👋
				</Text>
				<TouchableOpacity
					onPress={handleSignOut}
					className="justify-center items-center w-10 h-10 rounded-full bg-white">
					<Image source={icons.out} className="w-4 h-4" />
				</TouchableOpacity>
			</View>

			{/* <GoogleTextInput
				icon={icons.search}
				containerStyle="bg-white shadow-md shadow-neutral-300"
				handlePress={handleDestinationPress}
			/> */}

			<>
				<Text className="text-xl font-JakartaBold mt-5 mb-3">
					Your current location
				</Text>
				<View className="flex flex-row items-center bg-transparent h-[500px]">
					<Map />
				</View>
			</>
		</SafeAreaView>
	);
};

export default Home;
