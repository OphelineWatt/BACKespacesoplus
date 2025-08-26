import db from '../configuration/bd.js';

export const getAllPlaces = () => {
    const getPlace = `SELECT id_place, name, address, website, phone_number, description, global_rating, status,latitude, longitude, label FROM places
        INNER JOIN category on id_category = category_id;`;

    return db.query(getPlace);
}

export const getValidatedPlace = () => {
    const getPlace = `SELECT id_place, name, address, website, phone_number, description, global_rating, status,latitude, longitude, label FROM places
        INNER JOIN category on id_category = category_id
        WHERE status = 'Validée';`;

    return db.query(getPlace);
}

export const newPlace = (placeData) => {
const addPlace = "INSERT INTO places (name, address, latitude, longitude, website, phone_number, description, global_rating, status, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'En attente', ?, ?);";

 return db.query(addPlace,[
    placeData.name,
    placeData.address,
    placeData.latitude,
    placeData.longitude,
    placeData.website,
    placeData.phone_number,
    placeData.description,
    placeData.global_rating,
    placeData.category_id,
    placeData.user_id
  ]);
}

export const updateStatus = (id_place, status) => {
    const update = "UPDATE places SET status = ? WHERE id_place = ?;";
    
    return db.query(update, [id_place, status]);
}

export const deletePlace = async (id_place) => {
    const del = "DELETE FROM places WHERE id_place = ?";
    const [result] = await db.query(del, [id_place]);
    return result;
}

export const getPlacesUser = (user_id) => {
    const getPlace = `SELECT id_place, name, address, status, label FROM places
        INNER JOIN category on id_category = category_id
        WHERE user_id = ?;`;

    return db.query(getPlace, [user_id]);
}


