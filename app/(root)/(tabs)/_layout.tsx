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
								className={`font-JakartaMedium text-md !text-[${path === "/home" ? "#fff" : "#000"}]`}>
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
						drawerIcon: () => (
							<Ionicons
								name="home-outline"
								size={24}
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
								className={`font-JakartaMedium text-md !text-[${path === "/services" ? "#fff" : "#000"}]`}>
								Services
							</Text>
						),
						headerTitle: "Beauty Services",
						drawerIcon: () => (
							<Ionicons
								name="rocket"
								size={24}
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
								className={`font-JakartaMedium text-md !text-[${path === "/orders" ? "#fff" : "#000"}]`}>
								Your Orders
							</Text>
						),
						headerTitle: "Orders",
						drawerIcon: () => (
							<Ionicons
								name="bag-outline"
								size={24}
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
								className={`font-JakartaMedium text-md !text-[${path === "/profile" ? "#fff" : "#000"}]`}>
								Profile
							</Text>
						),
						headerTitle: () => (
							<Text className="text-2xl font-bold text-gray-800">
								My Profile
							</Text>
						),
						drawerIcon: () => (
							<Ionicons
								name="person-circle-outline"
								size={24}
								color={path === "/profile" ? "#fff" : "#000"}
							/>
						),
						drawerActiveBackgroundColor: "#000",
					}}
				/>
				<Drawer.Screen
					name="wallet"
					options={{
						drawerLabel: () => (
							<Text
								className={`font-JakartaMedium text-md !text-[${path === "/wallet" ? "#fff" : "#000"}]`}>
								Wallet
							</Text>
						),
						headerTitle: "Wallet",
						drawerIcon: () => (
							<Ionicons
								name="wallet"
								size={24}
								color={path === "/wallet" ? "#fff" : "#000"}
							/>
						),
						drawerActiveBackgroundColor: "#000",
					}}
				/>
				<Drawer.Screen
					name="support"
					options={{
						drawerLabel: () => (
							<Text
								className={`font-JakartaSemiBold text-md !text-[${path === "/support" ? "#fff" : "#000"}]`}>
								Help
							</Text>
						),
						headerTitle: "Support",
						drawerIcon: () => (
							<Ionicons
								name="call-outline"
								size={24}
								color={path === "/support" ? "#fff" : "#000"}
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
