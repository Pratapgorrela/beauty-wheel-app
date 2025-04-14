import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
	Alert,
	Dimensions,
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
// import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
// import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
	const defaultVerificationState = {
		state: "default",
		error: "",
		code: "",
	};

	const { isLoaded, signUp, setActive } = useSignUp();
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	const [form, setForm] = useState({
		phoneNumber: "",
	});
	const [verification, setVerification] = useState(defaultVerificationState);

	const onSignUpPress = async () => {
		setVerification(() => defaultVerificationState);
		if (!isLoaded) return;
		try {
			await signUp.create({
				phoneNumber: `+91${form.phoneNumber}`,
			});
			await signUp.preparePhoneNumberVerification({ strategy: "phone_code" });
			setVerification({
				...verification,
				state: "pending",
			});
		} catch (err: any) {
			Alert.alert("Error", err?.errors?.[0]?.longMessage);
		}
	};

	const onPressVerify = async () => {
		if (!isLoaded) return;
		try {
			const completeSignUp = await signUp.attemptPhoneNumberVerification({
				code: verification.code,
			});
			if (completeSignUp.status === "complete") {
				// await fetchAPI("/(api)/user", {
				// 	method: "POST",
				// 	body: JSON.stringify({
				// 		name: form.name,
				// 		email: form.email,
				// 		clerkId: completeSignUp.createdUserId,
				// 	}),
				// });
				await setActive({ session: completeSignUp.createdSessionId });
				setVerification({
					...verification,
					state: "success",
				});
			} else {
				setVerification({
					...verification,
					error: "Verification failed. Please try again.",
					state: "pending",
				});
			}
		} catch (err: any) {
			setVerification({
				...verification,
				error: err.errors[0].longMessage,
				state: "pending",
			});
		}
	};

	return (
		<ImageBackground
			source={require("../../assets/images/bg-login.jpg")}
			className="flex-1 justify-center w-full h-full"
			resizeMode="cover">
			<ScrollView className="flex-1">
				<View className="flex-1 ">
					<View className="relative flex w-full h-[250px] justify-start pl-4 gap-2 pt-20">
						{/* <Image
							source={icons.logo}
							className="top-1 absolute items-center justify-center "
						/> */}
						<Text className="text-5xl text-[#180109b4] font-JakartaBold left-5 mb-8">
							BeauTiFy
						</Text>
						<Text className="text-3xl text-white font-JakartaBold left-5">
							Makeover
						</Text>
						<Text className="text-3xl text-white font-JakartaBold left-5">
							At your place
						</Text>
					</View>
					<View className="p-5">
						<InputField
							placeholder="Enter Phone Number"
							textContentType="telephoneNumber"
							value={form.phoneNumber}
							keyboardType="numeric"
							onChangeText={(value) => setForm({ ...form, phoneNumber: value })}
							isPhoneField={true}
						/>
						<CustomButton
							title="Continue"
							onPress={onSignUpPress}
							className="mt-6 "
							bgVariant="danger"
						/>
					</View>
					<ReactNativeModal
						isVisible={verification.state === "pending"}
						onBackdropPress={() =>
							setVerification({ ...verification, state: "default" })
						}
						onModalHide={() => {
							if (verification.state === "success") {
								setShowSuccessModal(true);
							}
						}}>
						<View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
							<Text className="font-JakartaExtraBold text-2xl mb-2">
								Verification
							</Text>
							<Text className="font-Jakarta mb-5">
								We've sent a verification code to +91{form.phoneNumber}
							</Text>
							<InputField
								label={"Code"}
								icon={icons.lock}
								placeholder={"12345"}
								value={verification.code}
								keyboardType="numeric"
								onChangeText={(code) =>
									setVerification(() => ({ ...verification, code }))
								}
							/>
							{verification.error && (
								<Text className="text-red-500 text-sm mt-1">
									{verification.error}
								</Text>
							)}
							<CustomButton
								title="Verify Phone Number"
								onPress={onPressVerify}
								className="mt-5"
							/>
						</View>
					</ReactNativeModal>

					<ReactNativeModal isVisible={showSuccessModal}>
						<View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
							<Image
								source={images.check}
								className="w-[110px] h-[110px] mx-auto my-5"
							/>
							<Text className="text-3xl font-JakartaBold text-center">
								Verified
							</Text>
							<Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
								You have successfully verified your account.
							</Text>
							<CustomButton
								title="Browse Home"
								onPress={() => {
									setShowSuccessModal(false);
									router.push(`/(root)/(tabs)/home`);
								}}
								className="mt-5"
								// bgVariant="success"
							/>
						</View>
					</ReactNativeModal>
				</View>
			</ScrollView>
		</ImageBackground>
	);
};

export default SignUp;
