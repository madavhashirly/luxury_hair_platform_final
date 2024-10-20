import axios from 'axios';

export const createTipsService = {
    create: async (hairService) => {
        try {
            const response = await axios.post('http://localhost:8080/LuxuryHairVendingSystemDB/tips/create', hairService, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error creating hair service:", error);
            throw error;
        }
    },

    getImageBase64: async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/LuxuryHairVendingSystemDB/tips/get-with-image/${id}`, {
                responseType: 'blob',
            });
            const blob = response.data;
            const base64Image = await createTipsService.convertBlobToBase64(blob);
            return base64Image;
        } catch (error) {
            console.error(`Error fetching or converting the image for tip ID ${id}:`, error);
            throw error;
        }
    },

    convertBlobToBase64: (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    },
};
