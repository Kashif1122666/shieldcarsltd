import React from 'react';
import { VehicleForm } from '../../components/admin/VehicleForm';
import { carService } from '../../services/carService';
export const AdminAddCarPage = () => {
    const handleCreate = async (data) => {
        await carService.createCar(data);
    };
    return (<VehicleForm onSubmit={handleCreate} title="Add New Vehicle" subtitle="Register an acquisition into the Shield Cars Ltd inventory catalog." submitButtonText="Publish to Inventory"/>);
};
