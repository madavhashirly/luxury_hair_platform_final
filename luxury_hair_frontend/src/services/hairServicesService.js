import axios from 'axios';

export const createHairService = async (hairService) => {
    try {
        const response = await axios.post('http://localhost:8080/LuxuryHairVendingSystemDB/hair-services/save', hairService, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set correct Content-Type for form data
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating hair service:", error);
        throw error;
    }
};
