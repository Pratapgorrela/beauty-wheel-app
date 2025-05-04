import { useState } from "react";
import SkeletonContent from "react-native-skeleton-content";

export default function SkeletonLoader() {
	const [isLoading, setLoading] = useState(true);
	return (
		<SkeletonContent
			containerStyle={{ flex: 1, width: 300 }}
			isLoading={isLoading}
			animationDirection="horizontalLeft"
			boneColor="#121212"
			highlightColor="#333333"
		/>
	);
}
