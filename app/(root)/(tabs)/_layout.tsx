import "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { usePathname } from "expo-router";
import CustomDrawerContent from "@/components/CustomDrawerContent";
// import { SafeAreaView } from "react-native-safe-area-context";

const DrayerLayout = () => {
	const { user } = useUser();
	const path = usePathname();

	return (
		<GestureHandlerRootView>
			<Drawer drawerContent={CustomDrawerContent}>
				<Drawer.Screen
					name="home"
					options={{
						drawerLabel: () => (
							<Text
								className={`font-JakartaMedium !text-[${path === "/home" ? "#fff" : "#000"}]`}>
								Home
							</Text>
						),
						headerTitle: () => (
							<Text className={`text-2xl font-JakartaExtraBold`}>
								{user?.emailAddresses?.[0]
									? user?.emailAddresses?.[0]?.emailAddress?.split("@")?.[0]
									: "Pratap"}
							</Text>
						),
						drawerIcon: ({ size }) => (
							<Ionicons
								name="home-outline"
								size={size}
								color={path === "/home" ? "#fff" : "#000"}
							/>
						),
						drawerActiveBackgroundColor: "#000",
					}}
				/>
				<Drawer.Screen
					name="services"
					options={{
						drawerLabel: () => (
							<Text
								className={`font-JakartaMedium !text-[${path === "/services" ? "#fff" : "#000"}]`}>
								Services
							</Text>
						),
						headerTitle: "Beauty Services",
						drawerIcon: ({ size }) => (
							<Ionicons
								name="rocket"
								size={size}
								color={path === "/services" ? "#fff" : "#000"}
							/>
						),
						drawerActiveBackgroundColor: "#000",
					}}
				/>
				<Drawer.Screen
					name="orders"
					options={{
						drawerLabel: () => (
							<Text
								className={`font-JakartaMedium !text-[${path === "/orders" ? "#fff" : "#000"}]`}>
								Your Orders
							</Text>
						),
						headerTitle: "Orders",
						drawerIcon: ({ size }) => (
							<Ionicons
								name="bag-outline"
								size={size}
								color={path === "/orders" ? "#fff" : "#000"}
							/>
						),
						drawerActiveBackgroundColor: "#000",
					}}
				/>
				<Drawer.Screen
					name="profile"
					options={{
						drawerLabel: () => (
							<Text
								className={`font-JakartaMedium !text-[${path === "/profile" ? "#fff" : "#000"}]`}>
								Profile
							</Text>
						),
						headerTitle: "Profile",
						drawerIcon: ({ size }) => (
							<Ionicons
								name="person-outline"
								size={size}
								color={path === "/profile" ? "#fff" : "#000"}
							/>
						),
						drawerActiveBackgroundColor: "#000",
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
};

export default DrayerLayout;
