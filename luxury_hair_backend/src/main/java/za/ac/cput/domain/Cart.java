package za.ac.cput.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.Objects;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "productId")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private UserLogin userLogin;

    private int quantity;

    protected Cart() {
       
    }

    private Cart(Builder builder) {
        this.cartId = builder.cartId;
        this.product = builder.product;
        this.userLogin = builder.userLogin;
        this.quantity = builder.quantity;
    }

    public Long getCartId() {
        return cartId;
    }

    public Product getProduct() {
        return product;
    }

    public UserLogin getUserLogin() {
        return userLogin;
    }

    public int getQuantity() {
        return quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cart cart = (Cart) o;
        return quantity == cart.quantity &&
                Objects.equals(cartId, cart.cartId) &&
                Objects.equals(product, cart.product) &&
                Objects.equals(userLogin, cart.userLogin);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cartId, product, userLogin, quantity);
    }

    @Override
    public String toString() {
        return
                "product=" + product +
                "cartId=" + cartId +
                ", userLogin=" + userLogin +
                ", quantity=" + quantity +
                '}';
    }

    public static class Builder {
        private Long cartId;
        private Product product;
        private UserLogin userLogin;
        private int quantity;

        public Builder setCartId(Long cartId) {
            this.cartId = cartId;
            return this;
        }

        public Builder setProduct(Product product) {
            this.product = product;
            return this;
        }

        public Builder setUserLogin(UserLogin userLogin) {
            this.userLogin = userLogin;
            return this;
        }

        public Builder setQuantity(int quantity) {
            this.quantity = quantity;
            return this;
        }

        public Builder copy(Cart cart) {
            this.cartId = cart.cartId;
            this.product = cart.product;
            this.userLogin = cart.userLogin;
            this.quantity = cart.quantity;
            return this;
        }

        public Cart build() {
            return new Cart(this);
        }
    }
}
