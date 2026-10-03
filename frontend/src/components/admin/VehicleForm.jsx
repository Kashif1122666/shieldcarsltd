import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonLoader } from '../common/Skeletons';
import { Upload, Plus, Trash2, ArrowLeft } from 'lucide-react';
const COMMON_FEATURES = [
    'Carbon Ceramic Brakes',
    'Panoramic Sunroof',
    '360 Surround View Camera',
    'Heads-Up Display (HUD)',
    'Heated & Ventilated Front Seats',
    'Burmester / Bang & Olufsen Premium Audio',
    'Active Sport Exhaust System',
    'Apple CarPlay & Android Auto',
    'Adaptive Air Suspension',
    'Paint Protection Film (PPF)',
    'Alcantara / Race-Tex Headliner',
    'Night Vision Assist',
];
export const VehicleForm = ({ initialData, onSubmit, title, subtitle, submitButtonText, }) => {
    const navigate = useNavigate();
    const [make, setMake] = useState(initialData?.make || '');
    const [model, setModel] = useState(initialData?.model || '');
    const [trim, setTrim] = useState(initialData?.trim || '');
    const [year, setYear] = useState(initialData?.year || new Date().getFullYear());
    const [price, setPrice] = useState(initialData?.price || 120000);
    const [originalPrice, setOriginalPrice] = useState(initialData?.originalPrice);
    const [mileage, setMileage] = useState(initialData?.mileage || 1500);
    const [condition, setCondition] = useState(initialData?.condition || 'Certified Pre-Owned');
    const [bodyType, setBodyType] = useState(initialData?.bodyType || 'Coupe');
    const [fuelType, setFuelType] = useState(initialData?.fuelType || 'Petrol');
    const [transmission, setTransmission] = useState(initialData?.transmission || 'Automatic');
    const [drivetrain, setDrivetrain] = useState(initialData?.drivetrain || 'AWD');
    const [engine, setEngine] = useState(initialData?.engine || '4.0L Twin-Turbo V8');
    const [power, setPower] = useState(initialData?.power || '550 hp');
    const [acceleration, setAcceleration] = useState(initialData?.acceleration || '0-60 in 3.4s');
    const [exteriorColor, setExteriorColor] = useState(initialData?.exteriorColor || 'Obsidian Black Metallic');
    const [interiorColor, setInteriorColor] = useState(initialData?.interiorColor || 'Black Nappa Leather');
    const [vin, setVin] = useState(initialData?.vin || `SCL${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
    const [stockNumber, setStockNumber] = useState(initialData?.stockNumber || `SCL-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
    const [description, setDescription] = useState(initialData?.description ||
        'Exceptional specification motorcar maintained meticulously in single private custody. Complete documented dealer service history, clean title, and fresh ceramic protection.');
    const [features, setFeatures] = useState(initialData?.features || ['Carbon Ceramic Brakes', 'Panoramic Sunroof', '360 Surround View Camera', 'Apple CarPlay & Android Auto']);
    const [customFeatureInput, setCustomFeatureInput] = useState('');
    // Image URLs
    const [images, setImages] = useState(initialData?.images && initialData.images.length > 0
        ? initialData.images
        : ['/images/hero_porsche_dark_1790972867748.jpg']);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [status, setStatus] = useState(initialData?.status || 'available');
    const [featured, setFeatured] = useState(initialData?.featured || false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const handleToggleFeature = (feat) => {
        setFeatures((prev) => prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]);
    };
    const handleAddCustomFeature = (e) => {
        e.preventDefault();
        if (!customFeatureInput.trim())
            return;
        if (!features.includes(customFeatureInput.trim())) {
            setFeatures([...features, customFeatureInput.trim()]);
        }
        setCustomFeatureInput('');
    };
    const handleAddImageUrl = (e) => {
        e.preventDefault();
        if (!newImageUrl.trim())
            return;
        setImages([...images, newImageUrl.trim()]);
        setNewImageUrl('');
    };
    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!make || !model || !price || !year) {
            setErrorMsg('Please complete required fields: Make, Model, Year, and Price.');
            return;
        }
        if (images.length === 0) {
            setErrorMsg('Please specify at least one image URL for the vehicle showcase.');
            return;
        }
        setIsSubmitting(true);
        setErrorMsg('');
        try {
            await onSubmit({
                stockNumber,
                make,
                model,
                trim: trim || undefined,
                year: Number(year),
                price: Number(price),
                originalPrice: originalPrice ? Number(originalPrice) : undefined,
                mileage: Number(mileage),
                condition,
                bodyType,
                fuelType,
                transmission,
                drivetrain,
                engine,
                power,
                acceleration,
                exteriorColor,
                interiorColor,
                vin,
                description,
                features,
                images,
                status,
                featured,
            });
            navigate('/admin/cars');
        }
        catch (err) {
            setErrorMsg(err.message || 'Failed to save vehicle.');
            setIsSubmitting(false);
        }
    };
    return (<form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header and Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div className="space-y-1">
          <button type="button" onClick={() => navigate('/admin/cars')} className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-2 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5"/>
            <span>Back to Inventory</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            {title}
          </h1>
          <p className="text-xs text-zinc-400">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" onClick={() => navigate('/admin/cars')} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-red-950/40">
            {isSubmitting ? <ButtonLoader text="Saving..."/> : submitButtonText}
          </button>
        </div>
      </div>

      {errorMsg && (<div className="p-4 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-300">
          {errorMsg}
        </div>)}

      {/* Section 1: Identification & Pricing */}
      <div className="bg-[#12151a] border border-zinc-800 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-zinc-800/80 pb-3">
          1. Vehicle Identification & Pricing
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Manufacturer (Make) *
            </label>
            <input type="text" required placeholder="e.g. Porsche, Ferrari, Aston Martin" value={make} onChange={(e) => setMake(e.target.value)} className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none"/>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Model *
            </label>
            <input type="text" required placeholder="e.g. 911 GT3, AMG GT, Range Rover SV" value={model} onChange={(e) => setModel(e.target.value)} className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none"/>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Trim / Edition Specification
            </label>
            <input type="text" placeholder="e.g. Weissach Package, Speed W12" value={trim} onChange={(e) => setTrim(e.target.value)} className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none"/>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Model Year *
            </label>
            <input type="number" required value={year} onChange={(e) => setYear(Number(e.target.value))} className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none tabular-nums"/>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Showroom Price (£) *
            </label>
            <input type="number" required value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none tabular-nums font-semibold"/>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Original / MSRP Price (£)
            </label>
            <input type="number" placeholder="Optional" value={originalPrice || ''} onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)} className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none tabular-nums"/>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Mileage (Miles) *
            </label>
            <input type="number" required value={mileage} onChange={(e) => setMileage(Number(e.target.value))} className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none tabular-nums"/>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Condition
            </label>
            <select value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none">
              <option value="Certified Pre-Owned">Certified Pre-Owned</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Body Architecture
            </label>
            <select value={bodyType} onChange={(e) => setBodyType(e.target.value)} className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none">
              <option value="Coupe">Coupe</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Convertible">Convertible</option>
              <option value="Wagon">Wagon</option>
              <option value="Sports">Sports</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Stock Identifier *
            </label>
            <input type="text" required value={stockNumber} onChange={(e) => setStockNumber(e.target.value)} className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-red-600 focus:outline-none"/>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              VIN *
            </label>
            <input type="text" required value={vin} onChange={(e) => setVin(e.target.value)} className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-red-600 focus:outline-none"/>
          </div>
        </div>
      </div>

      {/* Section 2: Mechanical & Performance Specs */}
      <div className="bg-[#12151a] border border-zinc-800 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-zinc-800/80 pb-3">
          2. Powertrain & Technical Specifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Engine Description
            </label>
            <input type="text" value={engine} onChange={(e) => setEngine(e.target.value)} placeholder="e.g. 4.0L Handcrafted Twin-Turbo V8" className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none"/>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Power Output
            </label>
            <input type="text" value={power} onChange={(e) => setPower(e.target.value)} placeholder="e.g. 577 hp @ 6,000 rpm" className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none"/>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              0-60 Acceleration
            </label>
            <input type="text" value={acceleration} onChange={(e) => setAcceleration(e.target.value)} placeholder="e.g. 0-60 mph in 3.1s" className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none"/>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Fuel & Propulsion
            </label>
            <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none">
              <option value="Petrol">Petrol</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
              <option value="Diesel">Diesel</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Transmission
            </label>
            <select value={transmission} onChange={(e) => setTransmission(e.target.value)} className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none">
              <option value="Automatic">Automatic</option>
              <option value="Dual-Clutch">Dual-Clutch</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Drivetrain
            </label>
            <select value={drivetrain} onChange={(e) => setDrivetrain(e.target.value)} className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none">
              <option value="AWD">AWD (All-Wheel Drive)</option>
              <option value="RWD">RWD (Rear-Wheel Drive)</option>
              <option value="FWD">FWD (Front-Wheel Drive)</option>
              <option value="4WD">4WD (Four-Wheel Drive)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Exterior Paint Finish
            </label>
            <input type="text" value={exteriorColor} onChange={(e) => setExteriorColor(e.target.value)} placeholder="e.g. Nardo Gray, Isle of Man Green" className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none"/>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Interior Upholstery
            </label>
            <input type="text" value={interiorColor} onChange={(e) => setInteriorColor(e.target.value)} placeholder="e.g. Black Race-Tex with Guards Red Stitching" className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none"/>
          </div>
        </div>
      </div>

      {/* Section 3: Description & Equipment Features */}
      <div className="bg-[#12151a] border border-zinc-800 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-zinc-800/80 pb-3">
          3. Narrative & Factory Options
        </h3>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Detailed Showroom Description
          </label>
          <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-[#181a22] border border-zinc-800 rounded-lg p-3 text-xs text-white focus:border-red-600 focus:outline-none leading-relaxed"/>
        </div>

        {/* Feature selector */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-zinc-300">
            Selected Features ({features.length})
          </label>
          <div className="flex flex-wrap gap-2">
            {COMMON_FEATURES.map((feat) => {
            const active = features.includes(feat);
            return (<button key={feat} type="button" onClick={() => handleToggleFeature(feat)} className={`px-2.5 py-1 text-xs rounded border transition-colors ${active
                    ? 'bg-red-600/20 border-red-500 text-white font-medium'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'}`}>
                  {feat} {active && '✓'}
                </button>);
        })}
          </div>

          {/* Add custom feature tag */}
          <div className="flex items-center gap-2 pt-2">
            <input type="text" placeholder="Add custom option or package..." value={customFeatureInput} onChange={(e) => setCustomFeatureInput(e.target.value)} className="bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white w-64 focus:border-red-600 focus:outline-none"/>
            <button type="button" onClick={handleAddCustomFeature} className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg flex items-center gap-1">
              <Plus className="w-3.5 h-3.5"/>
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section 4: Imagery Manager */}
      <div className="bg-[#12151a] border border-zinc-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            4. Vehicle Imagery & Gallery ({images.length} photos)
          </h3>
          <span className="text-[11px] text-zinc-400">
            First photo is used as the primary card cover.
          </span>
        </div>

        {/* Dropzone mockup */}
        <div className="border-2 border-dashed border-zinc-800 hover:border-zinc-700 rounded-xl p-6 text-center bg-zinc-900/40">
          <Upload className="w-8 h-8 text-zinc-500 mx-auto mb-2"/>
          <div className="text-xs font-semibold text-zinc-300">
            Image Dropzone (Connected to Backend Upload API Later)
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">
            Supports high-resolution PNG, JPG, or WebP. Or enter image URLs below:
          </p>

          <div className="flex items-center justify-center gap-2 max-w-md mx-auto mt-4">
            <input type="url" placeholder="Paste image URL (e.g. Cloudinary, local asset)..." value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} className="flex-1 bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:border-red-600 focus:outline-none"/>
            <button type="button" onClick={handleAddImageUrl} className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg">
              Add URL
            </button>
          </div>
        </div>

        {/* Thumbnails List */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((img, idx) => (<div key={idx} className="relative group aspect-[16/10] rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
              <img src={img} alt={`Car photo ${idx + 1}`} className="w-full h-full object-cover"/>
              {idx === 0 && (<span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                  Cover
                </span>)}
              <button type="button" onClick={() => handleRemoveImage(idx)} className="absolute top-2 right-2 p-1.5 rounded bg-black/70 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity" title="Remove photo">
                <Trash2 className="w-3.5 h-3.5"/>
              </button>
            </div>))}
        </div>
      </div>

      {/* Section 5: Status & Visibility */}
      <div className="bg-[#12151a] border border-zinc-800 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-zinc-800/80 pb-3">
          5. Dealership Status & Visibility
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Showroom Availability Status
            </label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-[#181a22] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-red-600 focus:outline-none">
              <option value="available">Available (Publicly Listed for Sale)</option>
              <option value="reserved">Reserved (Client Deposit Placed)</option>
              <option value="sold">Sold (Archived Transaction)</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-4 sm:pt-0">
            <input type="checkbox" id="featuredCar" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4 rounded text-red-600 bg-[#181a22] border-zinc-700 focus:ring-red-500 cursor-pointer"/>
            <label htmlFor="featuredCar" className="text-xs font-semibold text-white cursor-pointer select-none">
              Mark as Featured Vehicle (Displays prominently on Homepage showcase)
            </label>
          </div>
        </div>
      </div>

      {/* Footer Submit */}
      <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
        <button type="button" onClick={() => navigate('/admin/cars')} className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className="px-8 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-xl shadow-red-950/40">
          {isSubmitting ? <ButtonLoader text="Saving Vehicle..."/> : submitButtonText}
        </button>
      </div>
    </form>);
};
