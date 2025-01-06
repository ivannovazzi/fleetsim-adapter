import { Vehicle, ExportVehicle, MedicalType, VehicleStatus } from "../types";

export function isMedical(vehicle: Vehicle) {
  return [...Object.values(MedicalType) as string[]].includes(vehicle.vehicleTypeRef.value);
}

export function isOnShift(vehicle: Vehicle) {
  return !!vehicle._currentShift;
}

export function isOnline(vehicle: Vehicle) {
  return vehicle.isOnline && !vehicle._currentShift;
}

export function isOffline(vehicle: Vehicle) {
  return !vehicle.isOnline && vehicle._trackingType !== "UNTRACKED";
}

export function isUntracked(vehicle: Vehicle) {
  return vehicle._trackingType === "UNTRACKED";
}

export function getStatus(vehicle: Vehicle): VehicleStatus {
  if (isOnShift(vehicle)) {
    return VehicleStatus.ONSHIFT;
  }
  if (isOnline(vehicle)) {
    return VehicleStatus.ONLINE;
  }
  if (isOffline(vehicle)) {
    return VehicleStatus.OFFLINE;
  }
  if (isUntracked(vehicle)) {
    return VehicleStatus.UNTRACKED;
  }
  return VehicleStatus.UNKNOWN;
}

export function transformVehicles(vehicles: Vehicle[]): ExportVehicle[] {
  const medical = vehicles.filter(isMedical);
  return medical.map((vehicle) => ({
    id: vehicle.id,
    name: vehicle.callsign,
    status: getStatus(vehicle),
    position: [vehicle.longitude, vehicle.latitude],
  }));
}