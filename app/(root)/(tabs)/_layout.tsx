import "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";

const DrayerLayout = () => {
	const { user } = useUser();

	return (
		<GestureHandlerRootView className="">
			<Drawer>
				<Drawer.Screen
					name="home"
					options={{
						drawerLabel: "Home",
						headerTitle: () => (
							<Text className="text-2xl font-JakartaExtraBold">
								{user?.emailAddresses?.[0]
									? user?.emailAddresses?.[0]?.emailAddress?.split("@")?.[0]
									: "Pratap"}
							</Text>
						),
						drawerIcon: ({ size, color }) => (
							<Ionicons name="home-outline" size={size} color={color} />
						),
					}}
				/>
				<Drawer.Screen
					name="services"
					options={{
						drawerLabel: "Services",
						headerTitle: "Beauty Services",
						drawerIcon: ({ size, color }) => (
							<Ionicons name="rocket" size={size} color={color} />
						),
					}}
				/>
				<Drawer.Screen
					name="orders"
					options={{
						drawerLabel: "Your Orders",
						headerTitle: "Orders",
						drawerIcon: ({ size, color }) => (
							<Ionicons name="bag-outline" size={size} color={color} />
						),
					}}
				/>
				<Drawer.Screen
					name="profile"
					options={{
						drawerLabel: "Profile",
						headerTitle: "Profile",
						drawerIcon: ({ size, color }) => (
							<Ionicons name="person-outline" size={size} color={color} />
						),
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
};

export default DrayerLayout;
