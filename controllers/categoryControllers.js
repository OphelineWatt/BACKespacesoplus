import dotenv from "dotenv";
import * as categoryModels from "../models/categoryModels.js"

dotenv.config();

export const getAllCategory = async (req, res) => {
    try {
        const category = await categoryModels.getCategory();
        if (category.length === 0) {
            return res.status(404).json({ message: "pas de categories trouvé" });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error("Error fetching all category:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}