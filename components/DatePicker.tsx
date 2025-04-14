import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

const DatePicker = ({
	showDatePicker,
	setShowDatePicker,
	date,
	setDate,
}: {
	showDatePicker: boolean;
	setShowDatePicker: (value: React.SetStateAction<boolean>) => void;
	date: Date;
	setDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
	const onDateChnage = (
		{ type }: DateTimePickerEvent,
		selectedDate: Date | undefined
	) => {
		if (type === "set" && selectedDate) {
			setDate(() => selectedDate);
		}
		setShowDatePicker(Platform.OS === "ios");
	};

	return (
		<DateTimePicker
			mode={"date"}
			display={Platform.OS === "ios" ? "spinner" : "default"}
			value={date}
			onChange={onDateChnage}
			minimumDate={new Date()}
			maximumDate={new Date("2026-1-1")}
		/>
	);
};
export default DatePicker;
