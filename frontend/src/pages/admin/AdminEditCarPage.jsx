import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VehicleForm } from '../../components/admin/VehicleForm';
import { carService } from '../../services/carService';
import { AdminLoading } from '../../components/common/Skeletons';
export const AdminEditCarPage = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!id)
            return;
        carService
            .getCarById(id)
            .then((data) => {
            setCar(data);
            setLoading(false);
        })
            .catch((err) => {
            console.error('Failed to load car for edit:', err);
            setLoading(false);
        });
    }, [id]);
    if (loading) {
        return <AdminLoading />;
    }
    if (!car) {
        return (<div className="p-8 text-center bg-[#12151a] rounded-xl border border-zinc-800">
        <h2 className="text-lg font-bold text-white mb-2">Vehicle Not Found</h2>
        <p className="text-xs text-zinc-400 mb-4">
          The requested vehicle identifier does not exist.
        </p>
        <Link to="/admin/cars" className="px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg">
          Return to Inventory
        </Link>
      </div>);
    }
    const handleUpdate = async (data) => {
        await carService.updateCar(car.id, data);
    };
    return (<VehicleForm initialData={car} onSubmit={handleUpdate} title={`Edit ${car.year} ${car.make} ${car.model}`} subtitle={`Updating specifications and showroom status for ${car.stockNumber}`} submitButtonText="Save Changes"/>);
};
