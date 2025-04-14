import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { TabsAtom } from "./TabsAtom";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";

const RideBottomSheetView = ({
	bottomSheetRef,
}: {
	bottomSheetRef: React.RefObject<BottomSheetMethods>;
}) => {
	const { userAddress } = useLocationStore();

	if (!userAddress) {
		return null;
	}

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

	const ScheduleConetent = () => {
		// Get current date
		const currentDate = new Date();

		// Set initial time to 10:00 AM
		const initialTime = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			currentDate.getDate(),
			10, // 10 hours (10 AM)
			0, // 0 minutes
			0 // 0 seconds
			// AM
		);

		const [date, setDate] = useState(currentDate);
		const [time, setTime] = useState<Date | undefined>(initialTime);
		const [showDatePicker, setShowDatePicker] = useState(false);
		const [showTimePicker, setShowTimePicker] = useState(false);

		const formatDate = (value: Date) => {
			return value?.toLocaleDateString();
		};

		const formatTime = (value?: Date) => {
			return value?.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			});
		};

		return (
			<View className="p-2 flex gap-3">
				<Text className="text-lg font-JakartaSemiBold">Your Location</Text>
				<View className="flex flex-row py-2 rounded items-center">
					<Image
						source={icons.target}
						className="w-6 h-6 p-2"
						resizeMode="contain"
					/>
					<Text className="font-JakartaSemiBold">{userAddress}</Text>
				</View>
				<Text className="text-lg font-JakartaSemiBold">
					Please select Date & Time:
				</Text>
				<View className="flex flex-row gap-4">
					<TouchableOpacity
						onPress={() => setShowDatePicker(!showDatePicker)}
						className="flex flex-row p-1 gap-1 border-black border-[1px] rounded-[4px]">
						<Ionicons name="calendar" className="w-8 h-8" size={24} />
						<Text className="text-xl h-8 font-JakartaSemiBold">
							{formatDate(date)}
						</Text>
						{showDatePicker && (
							<DatePicker
								showDatePicker={showDatePicker}
								setShowDatePicker={setShowDatePicker}
								date={date}
								setDate={setDate}
							/>
						)}
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setShowTimePicker(!showTimePicker)}
						className="flex flex-row p-1 gap-1 border-black border-[1px] rounded-[4px]">
						<Ionicons name="time" className="w-8 h-8" size={24} />
						<Text className="text-xl h-8 font-JakartaSemiBold">
							{formatTime(time)}
						</Text>
						{showTimePicker && (
							<TimePicker
								showTimePicker={showTimePicker}
								setShowTimePicker={setShowTimePicker}
								time={time}
								setTime={setTime}
							/>
						)}
					</TouchableOpacity>
				</View>
				<CustomButton
					title="Select Services & Schedule"
					onPress={() => router.push("/(root)/(tabs)/services")}
					className="!w-[70%]"
				/>
			</View>
		);
	};

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
