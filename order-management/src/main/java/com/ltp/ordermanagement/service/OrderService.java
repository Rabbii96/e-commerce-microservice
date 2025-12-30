package com.ltp.ordermanagement.service;

import com.ltp.ordermanagement.CartItem;
import com.ltp.ordermanagement.model.InventoryResponse;
import com.ltp.ordermanagement.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class OrderService {

    private final RestTemplate restTemplate;

    // In-memory cart store
    private final Map<Long, List<CartItem>> userCarts = new HashMap<>();

    @Value("${PRODUCT_INVENTORY_API_HOST}")
    private String productInventoryApiHost;

    @Value("${PRODUCT_CATALOG_API_HOST}")
    private String productCatalogApiHost;

    @Value("${SHIPPING_HANDLING_API_HOST}")
    private String shippingHandlingApiHost;

    @Autowired
    public OrderService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    // =============================
    // ADD TO CART
    // =============================
    public String addToCart(Long userId, Product product) {

        List<CartItem> cart = getUserCart(userId);

        // Check duplicate
        boolean exists = cart.stream()
                .anyMatch(item -> item.getProductId().equals(product.getId()));
        if (exists) {
            return "Product already exists in cart";
        }

        // Inventory check
        InventoryResponse inventory =
                restTemplate.getForObject(
                        productInventoryApiHost + "/api/inventory/" + product.getId(),
                        InventoryResponse.class
                );

        if (inventory == null || inventory.getQuantity() <= 0) {
            return "Product out of stock";
        }

        // Fetch product details
        Product productDetails =
                restTemplate.getForObject(
                        productCatalogApiHost + "/api/products/" + product.getId(),
                        Product.class
                );

        if (productDetails == null) {
            return "Product not found";
        }

        CartItem cartItem = new CartItem(
                productDetails.getId(),
                1,
                productDetails.getName(),
                productDetails.getDescription(),
                productDetails.getPrice(),
                productDetails.getCategory()
        );

        cart.add(cartItem);
        saveUserCart(userId, cart);

        return "Product added to cart";
    }

    // =============================
    // GET CART ITEMS
    // =============================
    public List<CartItem> getUserCart(Long userId) {
        return userCarts.getOrDefault(userId, new ArrayList<>());
    }

    // =============================
    // SUBTOTAL
    // =============================
    public double getCartSubtotal(Long userId) {
        return getUserCart(userId)
                .stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
    }

    // =============================
    // SHIPPING TOTAL
    // =============================
    public double getCartShippingTotal(Long userId) {

        return getUserCart(userId)
                .stream()
                .mapToDouble(item -> {
                    Product shipping =
                            restTemplate.getForObject(
                                    shippingHandlingApiHost +
                                            "/shipping-fee?product_id=" + item.getProductId(),
                                    Product.class
                            );
                    return shipping != null ? shipping.getShippingFee() : 0;
                })
                .sum();
    }

    // =============================
    // TOTAL
    // =============================
    public double getCartTotal(Long userId) {
        return getCartSubtotal(userId) + getCartShippingTotal(userId);
    }

    // =============================
    // PURCHASE
    // =============================
    public String purchaseCart(Long userId) {

        List<CartItem> cart = getUserCart(userId);

        for (CartItem item : cart) {
            restTemplate.postForObject(
                    productInventoryApiHost + "/api/order/" + item.getProductId(),
                    item.getQuantity(),
                    Void.class
            );
        }

        userCarts.remove(userId);
        return "Purchase completed successfully";
    }

    // =============================
    // SAVE CART
    // =============================
    private void saveUserCart(Long userId, List<CartItem> cart) {
        userCarts.put(userId, cart);
    }
}
