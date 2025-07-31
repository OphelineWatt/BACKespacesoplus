import db from '../configuration/bd.js';

export const getCategory = () => {
    const getAllCategory = "SELECT id_category, label FROM category;";

    
    return db.query(getAllCategory);
}