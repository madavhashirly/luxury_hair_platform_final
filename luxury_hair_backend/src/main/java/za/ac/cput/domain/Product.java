package za.ac.cput.domain;

import jakarta.persistence.*;

import java.util.Arrays;
import java.util.Objects;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productId;

    private String hairTexture;     //brazilian, peruvian, raw, indian...
    private String hairStyle;       //bob, kinky curls, body wave, straight...
    private String hairSize;        //inches, 13x4?, 4x4?...
    private String hairColor;       //red? black? orange?
    private boolean hairStock;      //available or not??
    private double hairPrice;
    @Lob
    @Column(length = 10485760)
    private byte[] image;

    protected Product() {

    }

    public Product(Builder builder) {
        this.productId = builder.productId;
        this.hairTexture = builder.hairTexture;
        this.hairStyle = builder.hairStyle;
        this.hairSize = builder.hairSize;
        this.hairColor = builder.hairColor;
        this.hairStock = builder.hairStock;
        this.hairPrice = builder.hairPrice;
        this.image = builder.image;
    }

    public long getProductId() {
        return productId;
    }

    public String getHairTexture() {
        return hairTexture;
    }

    public String getHairStyle() {
        return hairStyle;
    }

    public String getHairSize() {
        return hairSize;
    }

    public String getHairColor() {
        return hairColor;
    }

    public boolean isHairStock() {
        return hairStock;
    }

    public double getHairPrice() {
        return hairPrice;
    }

    public byte[] getImage() {
        return image;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return hairStock == product.hairStock && Double.compare(hairPrice, product.hairPrice) == 0 && Objects.equals(productId, product.productId) && Objects.equals(hairTexture, product.hairTexture) && Objects.equals(hairStyle, product.hairStyle) && Objects.equals(hairSize, product.hairSize) && Objects.equals(hairColor, product.hairColor) && Objects.deepEquals(image, product.image);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, hairTexture, hairStyle, hairSize, hairColor, hairStock, hairPrice, Arrays.hashCode(image));
    }

    @Override
    public String toString() {
        return "Product{" +
                "productId=" + productId +
                ", hairTexture='" + hairTexture + '\'' +
                ", hairStyle='" + hairStyle + '\'' +
                ", hairSize='" + hairSize + '\'' +
                ", hairColor='" + hairColor + '\'' +
                ", hairStock=" + hairStock +
                ", hairPrice=" + hairPrice +
                ", image=" + Arrays.toString(image) +
                '}';
    }

    public static class Builder {

        private long productId;
        private String hairTexture;
        private String hairStyle;
        private String hairSize;
        private String hairColor;
        private boolean hairStock;
        private double hairPrice;
        private byte[] image;

        public Builder setProductId(long productId) {
            this.productId = productId;
            return this;
        }

        public Builder setHairTexture(String hairTexture) {
            this.hairTexture = hairTexture;
            return this;
        }

        public Builder setHairStyle(String hairStyle) {
            this.hairStyle = hairStyle;
            return this;
        }

        public Builder setHairSize(String hairSize) {
            this.hairSize = hairSize;
            return this;
        }

        public Builder setHairColor(String hairColor) {
            this.hairColor = hairColor;
            return this;
        }

        public Builder setHairStock(boolean hairStock) {
            this.hairStock = hairStock;
            return this;
        }

        public Builder setHairPrice(double hairPrice) {
            this.hairPrice = hairPrice;
            return this;
        }

        public Builder setImage(byte[] image) {
            this.image = image;
            return this;
        }

        public Builder copy(Product product) {
            this.productId = product.productId;
            this.hairTexture = product.hairTexture;
            this.hairStyle = product.hairStyle;
            this.hairSize = product.hairSize;
            this.hairColor = product.hairColor;
            this.hairStock = product.hairStock;
            this.hairPrice = product.hairPrice;
            this.image = product.image;
            return this;
        }

        public Product build() {
            return new Product(this);
        }
    }
}

