import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GoogleTextInput from "./GoogleTextInput";
import { BookingOptions, icons } from "@/constants";
import { useLocationStore } from "@/store";
import { TabsAtom } from "./TabsAtom";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import { BasicUsage } from "./DatePicker";
import { Ionicons } from "@expo/vector-icons";

const RideBottomSheetView = ({
	bottomSheetRef,
}: {
	bottomSheetRef: React.RefObject<BottomSheetMethods>;
}) => {
	const { userAddress } = useLocationStore();

	if (!userAddress) {
		return null;
	}

	const handleOptionChange = (option: any) => {
		console.log(`Selected option: ${option}`);
		// Handle the selected option (e.g., show date picker for scheduling)
	};

	const BookNowConetent = () => (
		<View className="p-2 flex gap-4">
			<Text className="text-lg font-JakartaSemiBold">Your Location</Text>
			<View className="flex flex-row py-2 rounded items-center">
				<Image
					source={icons.target}
					className="w-6 h-6 p-2"
					resizeMode="contain"
				/>
				<Text className="font-JakartaSemiBold">{userAddress}</Text>
			</View>
			<CustomButton
				title="Select Services & Book now"
				onPress={() => router.push("/(root)/(tabs)/services")}
				className="!w-[70%]"
			/>
		</View>
	);

	const ScheduleConetent = () => (
		<View className="p-2 flex gap-4">
			<Text className="text-lg font-JakartaSemiBold">Your Location</Text>
			<View className="flex flex-row py-2 rounded items-center">
				<Image
					source={icons.target}
					className="w-6 h-6 p-2"
					resizeMode="contain"
				/>
				<Text className="font-JakartaSemiBold">{userAddress}</Text>
			</View>
			{/* <Text className="font-JakartaSemiBold">Date & Time</Text> */}
			<View className="flex-1 items-center bg-[#fff] justify-center">
				<StatusBar hidden />
				<View className="w-[80%] h-12">
					<TouchableOpacity className="flex border-[#fafafa] h-12 border-r-8 bg-[#fafafa] justify-between text-lg flex-col items-center px-2 mt-1">
						<Text className="text-sm color-[#BDBDBD] h-12">12/12/2024</Text>
						<Ionicons name="calendar" size={24} color={"#BDBDBD"} />
					</TouchableOpacity>
				</View>
			</View>
			<CustomButton
				title="Select Services & Schedule"
				onPress={() => router.push("/(root)/(tabs)/services")}
				className="!w-[70%]"
			/>
		</View>
	);

	const tabs = [
		{
			title: "Book Now",
			icon: "checkmark-done-circle-outline",
			content: <BookNowConetent />,
		},
		{
			title: "Schedule",
			icon: "timer",
			content: <ScheduleConetent />,
		},
	];

	return (
		<BottomSheet ref={bottomSheetRef} snapPoints={["45%", "60%"]} index={0}>
			<BottomSheetView
				style={{
					flex: 1,
					paddingRight: 10,
					paddingLeft: 10,
				}}>
				<TabsAtom tabs={tabs} />
			</BottomSheetView>
		</BottomSheet>
	);
};
export default RideBottomSheetView;
