const Attraction = require('../models/AttractionModel');

// get all attractions
const getAllAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find();
        res.status(200).json(attractions);
    } catch (err) {
        res.status(400).json({mssg: 'error getting attractions', err})
    }
}

// filter attractions
const filterAttractions = async (req, res) => {
    try {
        const { continents, countries, categories } = req.body;

        // Build the query object dynamically
        const filter = {};
       // Add conditions to the filter if they exist and are arrays
        if (Array.isArray(continents) && continents.length > 0) {
            filter.continent = { $in: continents };
        }
        if (Array.isArray(countries) && countries.length > 0) {
            filter.country = { $in: countries };
        }
        if (Array.isArray(categories) && categories.length > 0) {
            filter.category = { $in: categories };
        }

        // Find attractions with the dynamic filter
        const attractions = await Attraction.find(filter);
      
        res.status(200).json(attractions);
    } catch (err) {
        res.status(400).json({mssg: 'error getting attractions', err})
    }
}

// create a new attraction
const createAttraction = async (req, res) => {
    const {title,city,imageUrl,description,recommendations,category,country,continent} = req.body;

    try {
        const attraction = await Attraction.create({title,city,imageUrl,description,recommendations,category,country,continent});
        res.status(200).json({attraction});
    } catch (err) {
        res.status(400).json({mssg: 'error creating attraction', err})
    }
}


// // get all ducks
// const getAllDucks = async (req, res) => {
//     try {
//         const ducks = await RubberDuck.find();
//         res.status(200).json({ducks});
//     } catch (err) {
//         res.status(400).json({mssg: 'error getting ducks', err})
//     }
// }


// // get a random duck
// const getRandomDuck = async (req, res) => {
//     try {
//         const count = await RubberDuck.countDocuments();
//         const random = Math.floor(Math.random() * count);
//         const duck = await RubberDuck.findOne().skip(random);
//         res.status(200).json(duck);
//     } catch (error) {
//         res.status(400).json({ mssg: 'Error fetching random duck', err: error });
//     }
// };

// // get a single duck
// const getSingleDuck = async (req, res) => {
//     const {id} = req.params;

//     try {
//         const duck = await RubberDuck.findById(id);
//         res.status(200).json({duck});
//     } catch (err) {
//         res.status(400).json({mssg: 'error getting duck', err})
//     }
// }

// // create a new duck
// const createDuck = async (req, res) => {
//     const {name, color, imageUrl} = req.body;

//     try {
//         const duck = await RubberDuck.create({name, color, imageUrl});
//         res.status(200).json({duck});
//     } catch (err) {
//         res.status(400).json({mssg: 'error creating duck', err})
//     }
// }

// // delete a duck
// const deleteDuck = async (req, res) => {
//     const {id} = req.params;

//     try {
//         const duck = await RubberDuck.findByIdAndDelete(id);
//         res.status(200).json({duck});
//     } catch (err) {
//         res.status(400).json({mssg: 'error deleting duck', err})
//     }
// }

// // update a duck
// const updateDuck = async (req, res) => {
//     const {id} = req.params;
//     const {name, color, squeaks} = req.body;

//     try {
//         const duck = await RubberDuck.findByIdAndUpdate(id, {name, color, squeaks}, {new: true});
//         res.status(200).json({duck});
//     } catch (err) {
//         res.status(400).json({mssg: 'error updating duck', err})
//     }
// }



module.exports = {
    // getAllDucks,
    // getSingleDuck,
    // createDuck,
    // deleteDuck,
    // updateDuck,
    // getRandomDuck,
    getAllAttractions,
    filterAttractions,
    createAttraction,
}