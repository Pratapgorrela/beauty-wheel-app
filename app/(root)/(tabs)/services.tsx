import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ServiceProps } from "@/types/type";
import { SERVICES } from "@/constants/services";

export default function Services() {
	const [selectedServices, setSelectedServices] = useState<number[]>([]);

	const toggleServiceSelection = (serviceId: number) => {
		if (selectedServices.includes(serviceId)) {
			setSelectedServices(selectedServices.filter((id) => id !== serviceId));
		} else {
			setSelectedServices([...selectedServices, serviceId]);
		}
	};

	const getTotalPrice = () => {
		return selectedServices
			.map((id) => SERVICES.find((service) => service?.id === id))
			.reduce(
				(sum, service) => sum + parseInt(service?.price?.substring(1)!),
				0
			);
	};

	const renderServiceCard = (service: ServiceProps) => {
		const isSelected = selectedServices.includes(service.id);
		return (
			<TouchableOpacity
				key={service.id}
				style={[styles.serviceCard, isSelected && styles.selectedCard]}
				onPress={() => toggleServiceSelection(service.id)}>
				<Image source={{ uri: service.image }} style={styles.serviceImage} />
				<View style={styles.serviceInfo}>
					<View style={styles.serviceHeader}>
						<Text style={styles.serviceName}>{service.name}</Text>
						<View style={styles.checkboxContainer}>
							{isSelected ? (
								<View style={styles.checkboxChecked}>
									<Ionicons name="checkmark" size={18} color="#fff" />
								</View>
							) : (
								<View style={styles.checkboxUnchecked} />
							)}
						</View>
					</View>
					<Text style={styles.serviceDescription}>{service.description}</Text>
					<View style={styles.serviceMetaContainer}>
						<View style={styles.serviceMeta}>
							<Ionicons name="time-outline" size={16} color="#666" />
							<Text style={styles.serviceMetaText}>{service.duration}</Text>
						</View>
						<Text style={styles.servicePrice}>{service.price}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton}>
					<Ionicons name="arrow-back" size={24} color="#333" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Beauty Services</Text>
				<TouchableOpacity>
					<Ionicons name="filter-outline" size={24} color="#333" />
				</TouchableOpacity>
			</View>
			<View style={styles.searchContainer}>
				<View style={styles.searchBar}>
					<Ionicons name="search" size={20} color="#999" />
					<Text style={styles.searchPlaceholder}>Search services...</Text>
				</View>
			</View>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}>
				<Text style={styles.sectionTitle}>Available Services</Text>
				<View style={styles.servicesContainer}>
					{SERVICES.map((service) => renderServiceCard(service))}
				</View>
			</ScrollView>
			{selectedServices.length > 0 && (
				<View style={styles.bottomBar}>
					<View style={styles.selectedInfo}>
						<Text style={styles.selectedText}>
							{selectedServices.length}
							{selectedServices.length === 1 ? "service" : "services"}
							selected
						</Text>
						<Text style={styles.totalPrice}>${getTotalPrice()}</Text>
					</View>
					<TouchableOpacity style={styles.continueButton}>
						<Text style={styles.continueButtonText}>Continue</Text>
						<Ionicons name="arrow-forward" size={20} color="#fff" />
					</TouchableOpacity>
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#f8f9fa" },
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
		backgroundColor: "#fff",
	},
	backButton: { padding: 4 },
	headerTitle: { fontSize: 18, fontWeight: "600", color: "#333" },
	searchContainer: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: "#fff",
	},
	searchBar: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f1f3f4",
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 12,
	},
	searchPlaceholder: { marginLeft: 8, color: "#999", fontSize: 15 },
	scrollView: { flex: 1 },
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#333",
		marginTop: 16,
		marginBottom: 12,
		paddingHorizontal: 16,
	},
	servicesContainer: { paddingHorizontal: 16, paddingBottom: 100 },
	serviceCard: {
		flexDirection: "row",
		backgroundColor: "#fff",
		borderRadius: 12,
		marginBottom: 16,
		padding: 12,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	selectedCard: { borderWidth: 2, borderColor: "#5a31f4" },
	serviceImage: { width: 80, height: 80, borderRadius: 8 },
	serviceInfo: { flex: 1, marginLeft: 12 },
	serviceHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 4,
	},
	serviceName: { fontSize: 16, fontWeight: "600", color: "#333", flex: 1 },
	checkboxContainer: { marginLeft: 12 },
	checkboxUnchecked: {
		width: 22,
		height: 22,
		borderRadius: 22,
		borderWidth: 2,
		borderColor: "#ccc",
	},
	checkboxChecked: {
		width: 22,
		height: 22,
		borderRadius: 22,
		backgroundColor: "#5a31f4",
		alignItems: "center",
		justifyContent: "center",
	},
	serviceDescription: {
		fontSize: 13,
		color: "#666",
		lineHeight: 18,
		marginBottom: 8,
	},
	serviceMetaContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	serviceMeta: { flexDirection: "row", alignItems: "center" },
	serviceMetaText: { fontSize: 13, color: "#666", marginLeft: 4 },
	servicePrice: { fontSize: 16, fontWeight: "600", color: "#5a31f4" },
	bottomBar: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "#fff",
		padding: 16,
		borderTopWidth: 1,
		borderTopColor: "#eee",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		elevation: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: -4 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
	},
	selectedInfo: { flex: 1 },
	selectedText: { fontSize: 14, color: "#666" },
	totalPrice: { fontSize: 18, fontWeight: "700", color: "#333" },
	continueButton: {
		backgroundColor: "#5a31f4",
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	continueButtonText: { color: "#fff", fontWeight: "600", marginRight: 4 },
});
