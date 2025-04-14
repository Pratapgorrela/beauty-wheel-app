import React, { useState, useRef } from "react";
import {
	View,
	Text,
	ScrollView,
	Pressable,
	Dimensions,
	Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AnimatedView = Animated.createAnimatedComponent(View);

// Get screen width for responsive calculations
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const TabsAtom = ({ tabs }: { tabs: any }) => {
	const [activeTab, setActiveTab] = useState(0);
	const scrollViewRef: any = useRef(null);
	const tabPositionX: any = useRef(new Animated.Value(0)).current;

	// Handle tab press
	const handleTabPress = (index: number) => {
		// Animate the indicator
		Animated.spring(tabPositionX, {
			toValue: index * (SCREEN_WIDTH / tabs.length),
			tension: 50,
			friction: 8,
			useNativeDriver: true,
		}).start();

		// Update active tab
		setActiveTab(index);

		// Scroll to show the selected tab content
		scrollViewRef.current?.scrollTo({
			x: index * SCREEN_WIDTH,
			animated: true,
		});
	};

	return (
		<View className="flex-1 bg-gray-50">
			{/* Tab Headers */}
			<View className="bg-white shadow-sm">
				<View className="flex-row relative border-b border-gray-100">
					{tabs.map((tab: any, index: number) => (
						<Pressable
							key={`tab-${index}`}
							className={`flex-1 py-3 items-center z-10`}
							onPress={() => handleTabPress(index)}>
							<View className="flex-row items-center">
								{tab.icon && (
									<Ionicons
										name={tab.icon}
										size={20}
										color={activeTab === index ? "#ed7a9e" : "#9ca3af"}
										style={{ marginRight: 6 }}
									/>
								)}
								<Text
									className={`text-base font-medium ${
										activeTab === index ? "text-pink-500" : "text-gray-400"
									}`}>
									{tab.title}
								</Text>
							</View>
						</Pressable>
					))}

					{/* Animated Indicator */}
					<AnimatedView
						className="absolute bottom-0 h-0.5 bg-pink-500 rounded-full"
						style={{
							width: SCREEN_WIDTH / tabs.length - 24,
							left: 12,
							transform: [{ translateX: tabPositionX }],
						}}
					/>
				</View>
			</View>

			{/* Tab Content */}
			<ScrollView
				ref={scrollViewRef}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={16}
				onMomentumScrollEnd={(event: any) => {
					const newIndex = Math.round(
						event.nativeEvent.contentOffset.x / SCREEN_WIDTH
					);
					if (newIndex !== activeTab) {
						handleTabPress(newIndex);
					}
				}}>
				{tabs.map((tab: any, index: any) => (
					<View
						key={`content-${index}`}
						style={{ width: SCREEN_WIDTH }}
						className="flex-1">
						{tab.content}
					</View>
				))}
			</ScrollView>
		</View>
	);
};
