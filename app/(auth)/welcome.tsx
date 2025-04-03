import CustomButton from "@/components/CustomButton";
import { onboardingList } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Onboarding = () => {
	const swiperRef = useRef<Swiper>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const isLastSlide = activeIndex === onboardingList.length - 1;

	return (
		<SafeAreaView className="flex h-full items-center justify-between bg-white">
			<TouchableOpacity
				onPress={() => router.replace("/(auth)/sign-in")}
				className="w-full flex justify-end items-end p-5">
				<Text className="text-black text-md font-JakartaBold">Skip</Text>
			</TouchableOpacity>
			<Swiper
				ref={swiperRef}
				// loop={false}
				index={activeIndex}
				dot={<View className="w-8 h-1 mx-1 rounded-full bg-[#E2E8F0]" />}
				activeDot={<View className="w-8 h-1 mx-1 rounded-full bg-[#0286FF]" />}
				onIndexChanged={(index) => setActiveIndex(index)}
				autoplay={true}>
				{onboardingList.map((item, index) => (
					<View key={index}>
						<View
							key={item.id}
							className="flex items-center justify-center p-5">
							<Image
								source={item.image}
								className="w-full h-[300px]"
								resizeMode="contain"
							/>
							<Text>{item.title}</Text>
						</View>
						<Text className="text-lg font-JakartaSemiBold text-center mx-10 mt-3 text-[#858585]">
							{item.description}
						</Text>
					</View>
				))}
			</Swiper>
			<CustomButton
				title={isLastSlide ? "Get Started" : "Next"}
				onPress={() =>
					isLastSlide
						? router.replace("/(auth)/sign-up")
						: swiperRef.current?.scrollBy(1)
				}
				className="w-11/12 mt-10 p-3"
			/>
		</SafeAreaView>
	);
};

export default Onboarding;
