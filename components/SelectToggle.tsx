import React, { useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";

const SelectToggle = ({
	options,
	onOptionChange,
}: {
	options: string[];
	onOptionChange: (value: string) => void;
}) => {
	const [selectedOption, setSelectedOption] = useState(options[0]);
	const handleToggle = (option: string) => {
		if (option !== selectedOption) {
			setSelectedOption(option);
			onOptionChange?.(option);
		}
	};

	return (
		<View className="w-full max-w-md mx-auto my-4">
			<View className="relative h-14 bg-gray-100 rounded-full p-1 flex-row">
				<View
					className={`absolute h-14 w-[46%] bg-white rounded-full shadow-md transition-all duration-100 ease-in-out ${
						selectedOption === options[0] ? "left-[2%]" : "left-[52%]"
					}`}
				/>
				{options?.map((option: string, index: number) => (
					<Pressable
						className="flex-1 justify-center items-center z-10"
						key={index}
						onPress={() => handleToggle(option)}>
						<Text
							key={index}
							className={`font-medium text-base ${
								selectedOption === option ? " text-pink-500" : "text-gray-400"
							}`}>
							{option}
						</Text>
					</Pressable>
				))}
			</View>
		</View>
	);
};

export default SelectToggle;
