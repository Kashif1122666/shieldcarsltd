import express from 'express';
import Car from '../models/Car.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// GET /api/cars?search=&make=&bodyType=&condition=&fuelType=&transmission=&status=&minPrice=&maxPrice=&minYear=&maxYear=&sort=
router.get('/', async (req, res) => {
  try {
    const { search, make, bodyType, condition, fuelType, transmission, status, minPrice, maxPrice, minYear, maxYear, sort } = req.query;

    const filter = {};
    if (search) {
      const rx = new RegExp(String(search).trim(), 'i');
      filter.$or = [
        { make: rx },
        { model: rx },
        { trim: rx },
        { stockNumber: rx },
        { exteriorColor: rx },
      ];
    }
    if (make) filter.make = new RegExp(`^${make}$`, 'i');
    if (bodyType) filter.bodyType = new RegExp(`^${bodyType}$`, 'i');
    if (condition) filter.condition = new RegExp(`^${condition}$`, 'i');
    if (fuelType) filter.fuelType = new RegExp(`^${fuelType}$`, 'i');
    if (transmission) filter.transmission = new RegExp(`^${transmission}$`, 'i');
    if (status) filter.status = new RegExp(`^${status}$`, 'i');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (minYear || maxYear) {
      filter.year = {};
      if (minYear) filter.year.$gte = Number(minYear);
      if (maxYear) filter.year.$lte = Number(maxYear);
    }

    const sortMap = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      mileage_asc: { mileage: 1 },
      year_desc: { year: -1 },
      newest: { createdAt: -1 },
    };

    const cars = await Car.find(filter).sort(sortMap[sort] || sortMap.newest);
    res.set('Cache-Control', 'no-store');
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/cars/:id
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findOne({ $or: [{ id: req.params.id }, { stockNumber: new RegExp(`^${req.params.id}$`, 'i') }] });
    if (!car) return res.status(404).json({ message: 'Vehicle not found' });
    car.views = (car.views || 0) + 1;
    await car.save();
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/cars  (admin)
router.post('/', protect, async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.id) data.id = `scl-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    const car = await Car.create(data);
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/cars/:id  (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const car = await Car.findOneAndUpdate({ id: req.params.id }, req.body, { returnDocument: 'after', runValidators: true });
    if (!car) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(car);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/cars/:id  (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({ id: req.params.id });
    if (!car) return res.status(404).json({ message: 'Vehicle not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
