import Restaurant from '../models/Restaurant.js';

// Get all restaurants
export async function getAllRestaurants(req, res) {
  try {
    const { cuisine, search, sort } = req.query;
    const query = { isActive: true };

    if (cuisine) {
      query.cuisineType = { $regex: cuisine, $options: 'i' };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { cuisineType: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOption = {};
    if (sort === 'rating') {
      sortOption = { rating: -1 };
    } else if (sort === 'deliveryTime') {
      sortOption = { deliveryTime: 1 };
    }

    const restaurants = await find(query)
      .sort(sortOption)
      .populate('owner', 'name email');

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get restaurant by ID
export async function getRestaurantById(req, res) {
  try {
    const restaurant = await findById(req.params.id)
      .populate('owner', 'name email')
      .populate('reviews');

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create a new restaurant (admin/owner only)
export async function createRestaurant(req, res) {
  try {
    const {
      name,
      description,
      cuisineType,
      address,
      contact,
      openingHours,
      deliveryTime,
      minimumOrder,
      deliveryFee,
      imageUrl,
    } = req.body;

    const restaurant = new Restaurant({
      name,
      description,
      cuisineType,
      address,
      contact,
      openingHours,
      deliveryTime,
      minimumOrder,
      deliveryFee,
      imageUrl,
      owner: req.user._id,
    });

    const createdRestaurant = await restaurant.save();
    res.status(201).json(createdRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update restaurant (owner/admin only)
export async function updateRestaurant(req, res) {
  try {
    const restaurant = await findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Check if user is owner or admin
    if (restaurant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to update this restaurant' });
    }

    Object.assign(restaurant, req.body);
    const updatedRestaurant = await restaurant.save();

    res.json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get restaurants by owner
export async function getRestaurantsByOwner(req, res) {
  try {
    const restaurants = await find({ owner: req.user._id });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}