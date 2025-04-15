import { images } from "@/constants";
import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	SafeAreaView,
	TouchableOpacity,
	StatusBar,
	Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function FormField({
	label,
	value,
	onChangeText,
	editable = true,
	keyboardType = "default",
	autoCapitalize = "sentences",
	secureTextEntry = false,
	className = "",
}: any) {
	return (
		<View className="mb-4">
			<Text className="text-md font-JakartaSemiBold text-gray-600 mb-1">
				{label}
			</Text>
			<TextInput
				className={`bg-white border text-md font-JakartaSemiBold ${editable ? "border-gray-300" : "border-gray-200"} 
          rounded-lg px-4 py-3 text-gray-800 
          ${editable ? "" : "bg-gray-50"} ${className}`}
				value={value}
				onChangeText={onChangeText}
				editable={editable}
				keyboardType={keyboardType}
				autoCapitalize={autoCapitalize}
				secureTextEntry={secureTextEntry}
				placeholderTextColor="#9CA3AF"
			/>
		</View>
	);
}

const Profile = () => {
	const [profile, setProfile] = useState({
		profilePicture: images.profileImage,
		firstName: "Rana",
		lastName: "Pratap",
		email: "rana.pratap@gmail.com",
		phoneNumber: "+918886887129",
	});

	const [editing, setEditing] = useState(false);
	const [formData, setFormData] = useState({ ...profile });

	const pickImage = async () => {
		// const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		// if (status !== "granted") {
		// 	alert(
		// 		"Sorry, we need camera roll permissions to change your profile picture!"
		// 	);
		// 	return;
		// }
		// let result = await ImagePicker.launchImageLibraryAsync({
		// 	mediaTypes: ImagePicker.MediaTypeOptions.Images,
		// 	allowsEditing: true,
		// 	aspect: [1, 1],
		// 	quality: 0.5,
		// });
		// if (!result.canceled) {
		// 	setFormData({ ...formData, profilePicture: result.assets[0].uri });
		// }
	};

	const handleChange = (field: any, value: any) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleSave = () => {
		setProfile(formData);
		setEditing(false);
	};

	const handleCancel = () => {
		setFormData({ ...profile });
		setEditing(false);
	};

	return (
		<View className="flex-1 bg-gray-50 w-full h-[100px]">
			<View className="bg-white pt-12 pb-4 px-4 shadow">
				<View className="flex-row justify-end items-center">
					{!editing ? (
						<TouchableOpacity
							onPress={() => setEditing(true)}
							className="py-2 px-4 rounded-full bg-[#5a31f4]">
							<Text className="text-white font-medium">Edit</Text>
						</TouchableOpacity>
					) : (
						<View className="flex-row">
							<TouchableOpacity
								onPress={handleCancel}
								className="py-2 px-4 rounded-full bg-gray-300 mr-2">
								<Text className="text-gray-700 font-medium">Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={handleSave}
								className="py-2 px-4 rounded-full bg-[#5a31f4]">
								<Text className="text-white font-medium">Save</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>

			<ScrollView className="flex-1" contentContainerClassName="pb-12">
				{/* Profile Picture */}
				<View className="items-center mt-6 mb-6">
					<View className="relative">
						<Image
							source={profile.profilePicture}
							className="w-32 h-32 rounded-full"
						/>
						{editing && (
							<TouchableOpacity
								onPress={pickImage}
								className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full shadow">
								<Text className="text-white text-lg">📷</Text>
							</TouchableOpacity>
						)}
					</View>
					{!editing && (
						<Text className="mt-4 text-xl font-semibold text-gray-800">
							{profile.firstName} {profile.lastName}
						</Text>
					)}
				</View>

				<View className="px-4 mt-2 gap-3">
					<View className="flex flex-row gap-4">
						<FormField
							label="First Name"
							value={formData.firstName}
							onChangeText={(text: string) => handleChange("firstName", text)}
							editable={editing}
							className="w-[174px]"
						/>

						<FormField
							label="Last Name"
							value={formData.lastName}
							onChangeText={(text: string) => handleChange("lastName", text)}
							editable={editing}
							className="w-[174px]"
						/>
					</View>
					<FormField
						label="Phone Number"
						value={formData.phoneNumber}
						onChangeText={(text: string) => handleChange("phoneNumber", text)}
						editable={editing}
						keyboardType="phone-pad"
					/>

					<FormField
						label="Email"
						value={formData.email}
						onChangeText={(text: string) => handleChange("email", text)}
						editable={editing}
						keyboardType="email-address"
						autoCapitalize="none"
					/>
				</View>
			</ScrollView>
		</View>
	);
};

export default Profile;
