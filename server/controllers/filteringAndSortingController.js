const Animal = require('../models/AnimalModel');

const filterAndSortPets = async (req, res) => {
    try {
        let query = {};

        // Destructure potential query parameters from the request
        const { minAge, maxAge, sex, animal_type, breed, color, area_of_adoption, sort } = req.query;


        // Age range filter (only using years)
        if (minAge || maxAge) {
            query['age.years'] = {};
            if (minAge) query['age.years'].$gte = parseInt(minAge);  // Filter for pets with age >= minAge in years
            if (maxAge) query['age.years'].$lte = parseInt(maxAge);  // Filter for pets with age <= maxAge in years
        }

        if (sex) {
            query.sex = sex;
        }

        if (animal_type) {
            query.animal_type = animal_type;
        }

        if (breed) {
            query.breed = breed;
        }

        if (color) {
            query.color = color;
        }

        if (area_of_adoption) {
            query.area_of_adoption = area_of_adoption;
        }

        // Initialize an empty object for sorting
        let sortOption = {};

        if (sort === 'newest') {
            sortOption = { createdAt: -1 }; // Sort descending
        } else if (sort === 'oldest') {
            sortOption = { createdAt: 1 };  // Sort ascending
        }

        // Execute the query with the dynamically built filter and sort options
        const animals = await Animal.find(query).sort(sortOption);
        
        res.status(200).json({ animals });
    } catch (error) {
        console.error('Error filtering and sorting pets:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    filterAndSortPets
};