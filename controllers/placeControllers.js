import dotenv from "dotenv";
import * as placeModels from "../models/placeModels.js"
import axios from "axios";

dotenv.config()

export const getAllPlaces = async (req, res) => {
    try {
        const motos = await placeModels.getAllPlaces();
        if (motos.length === 0) {
            return res.status(404).json({ message: "No motos found" });
        }
        res.status(200).json(motos);
    } catch (error) {
        console.error("Error fetching all motos:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

// Fonction pour effectuer le géocodage
async function geocodeAddress(address) {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: process.env.GEOCODING_API_KEY
      }
    });

    if (response.data.status === 'OK') {

        // récupération des donées
      const location = response.data.results[0].geometry.location;

      return {
        address: response.data.results[0].formatted_address,
        latitude: location.lat,
        longitude: location.lng
      };
    } else {
      throw new Error('Unable to geocode address');
    }
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
}
export const addPlace = async (req, res) => {
  
  try {
    const { name, address, website, phone_number, description, global_rating, category_id } = req.body;

      // Géocodage de l'adresse
    const geocodeData = await geocodeAddress(address);

    // Préparation des données pour l'insertion
    const placeData = {
      name,
      address: geocodeData.address,
      latitude: geocodeData.latitude,
      longitude: geocodeData.longitude,
      website,
      phone_number,
      description,
      global_rating,
      category_id
    };

    
    await placeModels.newPlace(placeData);

    res.status(201).json({ message: "lieu crée" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de l'enregistrement d'un lieu",
        error
      });
  }
};