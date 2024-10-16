import axios from "axios";

const baseUrl = import.meta.env.VITE_BACK_END_URL;

const productService = {
    // Fetch all products
    getAllProducts: async () => {
        try {
            const response = await axios.get(`${baseUrl}/product/getall`);
            return response.data;
        } catch (error) {
            console.error("There was an error fetching the products:", error);
            throw error;
        }
    },

    // Fetch product image URL
    getProductImage: (productId) => `${baseUrl}/product/image/${productId}`,

    // Create product (with an image)
    createProduct: (productData) => {
        const formData = new FormData();
        Object.keys(productData).forEach((key) => {
            formData.append(key, productData[key]);
        });
        return axios.post(`${baseUrl}/product/create`, formData, {
            headers: {"Content-Type": "multipart/form-data"},
        });
    },

    // Fetch product by ID
    getProductById: async (productId) => {
        try {
            const response = await axios.get(`${baseUrl}/product/read/${productId}`);
            return response.data;
        } catch (error) {
            console.error(`There was an error fetching the product with ID ${productId}:`, error);
            throw error;
        }
    },

    // Update product (with an image)
    updateProduct: async (product) => {
        const formData = new FormData();

        // Append productId explicitly
        formData.append("productId", product.productId);

        // Append other product fields
        Object.keys(product).forEach((key) => {
            if (key !== "productId") { // Avoid appending productId again
                formData.append(key, product[key]);
            }
        });

        return axios.put(`${baseUrl}/product/update`, formData, {
            headers: {"Content-Type": "multipart/form-data"},
        });
    },

    // Delete product by ID
    deleteProduct: async (productId) => {

        await axios.delete(`${baseUrl}/product/delete/${productId}`);

    },

    // Convert BLOB to Base64 image URL for displaying
    getProductImageBase64: async (productId) => {
        try {
            const response = await axios.get(`${baseUrl}/product/image/${productId}`, {
                responseType: "blob", // Expecting binary data (image)
            });
            const blob = response.data;

            // Convert blob to base64
            const base64Image = await productService.convertBlobToBase64(blob);
            return base64Image;
        } catch (error) {
            console.error(`Error fetching or converting the image for product ${productId}:`, error);
            throw error;
        }
    },

    // Convert Blob to Base64
    convertBlobToBase64: (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob); // Convert blob to base64
        });
    },
};

export default productService;
