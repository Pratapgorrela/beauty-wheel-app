import { create } from "zustand";

import { DriverStore, LocationStore, MarkerData } from "@/types/type";

export const useLocationStore = create<LocationStore>((set) => ({
	userInitialLatitude: null,
	userInitialLongitude: null,
	userInitialAddress: null,
	userLatitude: null,
	userLongitude: null,
	userAddress: null,
	destinationLatitude: null,
	destinationLongitude: null,
	destinationAddress: null,
	setUserInitialLocation: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number;
		longitude: number;
		address: string;
	}) => {
		set(() => ({
			userInitialLatitude: latitude,
			userInitialLongitude: longitude,
			userInitialAddress: address,
		}));
	},

	setUserLocation: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number;
		longitude: number;
		address: string;
	}) => {
		set(() => ({
			userLatitude: latitude,
			userLongitude: longitude,
			userAddress: address,
		}));

		// if driver is selected and now new location is set, clear the selected driver
		const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
		if (selectedDriver) clearSelectedDriver();
	},

	setDestinationLocation: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number;
		longitude: number;
		address: string;
	}) => {
		set(() => ({
			destinationLatitude: latitude,
			destinationLongitude: longitude,
			destinationAddress: address,
		}));

		// if driver is selected and now new location is set, clear the selected driver
		const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
		if (selectedDriver) clearSelectedDriver();
	},

	resetUserLocation: () => {
		set(() => ({
			userLatitude: null,
			userLongitude: null,
			userAddress: null,
		}));
	},
}));

export const useDriverStore = create<DriverStore>((set) => ({
	drivers: [] as MarkerData[],
	selectedDriver: null,
	setSelectedDriver: (driverId: number) =>
		set(() => ({ selectedDriver: driverId })),
	setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers })),
	clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
}));
