import { useAuth } from "@clerk/clerk-expo";
import {
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomButton from "./CustomButton";
import { images } from "@/constants";
import { Ionicons } from "@expo/vector-icons";

const CustomDrawerContent = (props: any) => {
	const { signOut } = useAuth();
	const { top, bottom } = useSafeAreaInsets();

	const handleSignOut = () => {
		signOut();
		router.replace("/(auth)/sign-up");
	};

	return (
		<View className="flex-1">
			<DrawerContentScrollView {...props} scrollEnabled={false}>
				<View className="p-5 border-b-[1px] mb-3 mt-3">
					<Image
						source={images.profileImage}
						className="w-20 h-20 self-center rounded-[40px]"
					/>
					<Text className="font-JakartaExtraBold self-center pt-2">Pratap</Text>
				</View>
				<View className="pt-2 gap-1">
					<DrawerItemList {...props} />
				</View>
			</DrawerContentScrollView>
			<View className={`pb-[${20 + bottom}px] flex`}>
				<CustomButton
					title=" logout"
					bgVariant="danger"
					onPress={handleSignOut}
					IconLeft={() => (
						<Ionicons name="log-out-outline" size={24} color={"#fff"} />
					)}
					className="!rounded-none text-md font-JakartaMedium"
				/>
			</View>
		</View>
	);
};
export default CustomDrawerContent;
