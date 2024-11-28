const Animal = require('../models/AnimalModel');


// get all animals
const getAllAnimals = async (req, res) => {
    try {
        const animals = await Animal.find().populate('contact_user');
        res.status(200).json(animals);
    } catch (err) {
        res.status(400).json({mssg: 'error getting animal', err})
    }
}


// get a single animal
const getSingleAnimal = async (req, res) => {
    const { id } = req.params; // Assuming you are passing the animal_id as a route parameter

    try {
        const animal = await Animal.findOne({ animal_id: id }).populate('contact_user'); // Search by animal_id instead of _id
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.status(200).json({ animal });
    } catch (err) {
        res.status(400).json({ message: 'Error getting animal', err });
    }
};


// delete a animal
const deleteAnimal = async (req, res) => {
    const { id } = req.params; // Assuming you are passing the animal_id as a route parameter

    try {
        const animal = await Animal.findOneAndDelete({ animal_id: id }); // Delete by animal_id
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.status(200).json({ message: 'Animal deleted', animal });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting animal', err });
    }
};

// update a animal
const updateAnimal = async (req, res) => {
    const { id } = req.params; // Assuming you are passing the animal_id as a route parameter
    const updateData = req.body; // Data to update

    try {
        const animal = await Animal.findOneAndUpdate({ animal_id: id }, updateData, { new: true }); // Update by animal_id
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.status(200).json({ message: 'Animal updated', animal });
    } catch (err) {
        res.status(400).json({ message: 'Error updating animal', err });
    }
};

module.exports = {
    getAllAnimals,
    getSingleAnimal,
    deleteAnimal,
    updateAnimal,
}