package za.ac.cput.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import za.ac.cput.domain.Product;
import za.ac.cput.repository.ProductRepository;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService implements IProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getall() {
        return productRepository.findAll();
    }


    @Override
    public Product create(Product product) {
        return productRepository.save(product);
    }

    public Product createProduct(String hairTexture, String hairStyle, String hairSize,
                                 String hairColor, boolean hairStock, double hairPrice, MultipartFile image ) throws IOException {
        Product product =  new Product.Builder()
                .setHairTexture(hairTexture)
                .setHairStyle(hairStyle)
                .setHairSize(hairSize)
                .setHairColor(hairColor)
                .setHairStock(hairStock)
                .setHairPrice(hairPrice)
                .setImage(image.getBytes())
                .build();

        return productRepository.save(product);
    }

    @Override
    public Product read(Long productId) {
        return productRepository.findById(productId).orElse(null);
    }

    @Override
    public Product update(Product product) {
        return null;
    }


    public Product updateProduct(Long productId, String hairTexture, String hairStyle, String hairSize,
                                 String hairColor, boolean hairStock, double hairPrice, MultipartFile image) throws IOException {
        Product existingProduct = productRepository.findById(productId).orElse(null);
        if (existingProduct == null) {
            return null; // Or throw an exception
        }

        Product updatedProduct = new Product.Builder()
                .setProductId(existingProduct.getProductId()) // Ensure to retain the same ID
                .setHairTexture(hairTexture)
                .setHairStyle(hairStyle)
                .setHairSize(hairSize)
                .setHairColor(hairColor)
                .setHairStock(hairStock)
                .setHairPrice(hairPrice)
                .setImage(image != null ? image.getBytes() : existingProduct.getImage()) // Update image if new one provided
                .build();

        return productRepository.save(updatedProduct);
    }



    public boolean delete(long productId) {
        if (productRepository.existsById(productId)) {
            productRepository.deleteById(productId);
            return true;
        }
        return false;
    }



    public byte[] getProductImageById(long productId) {
        Product product = productRepository.findById(productId).orElse(null);
        if (product != null) {
            return product.getImage(); // Assuming getImage() returns a BLOB (byte[])
        }
        return null;
    }

   /* public Optional<Product> getProductImage(Long productId) {
        return productRepository.findById(productId);
    }
    public Optional<byte[]> getProductImageById(Long productId) {

        return getProductImage(productId).map(Product::getImage);
    }
*/

}
