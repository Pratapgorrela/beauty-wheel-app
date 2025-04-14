import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

const TimePicker = ({
	showTimePicker,
	setShowTimePicker,
	time,
	setTime,
}: {
	showTimePicker: boolean;
	setShowTimePicker: (value: React.SetStateAction<boolean>) => void;
	time: Date | undefined;
	setTime: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) => {
	const onTimeChnage = (
		{ type }: DateTimePickerEvent,
		newTime?: Date | undefined
	) => {
		if (type === "set" && newTime) {
			setTime(() => newTime);
		}
		setShowTimePicker(Platform.OS === "ios");
	};

	return (
		<DateTimePicker
			mode={"time"}
			is24Hour={false}
			display={Platform.OS === "ios" ? "spinner" : "default"}
			value={time ? time : new Date()}
			onChange={onTimeChnage}
		/>
	);
};
export default TimePicker;
