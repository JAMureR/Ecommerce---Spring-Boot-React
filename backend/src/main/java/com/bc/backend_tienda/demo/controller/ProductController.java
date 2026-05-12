package com.bc.backend_tienda.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bc.backend_tienda.demo.model.Product;
import com.bc.backend_tienda.demo.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;
    
    // GET ALL
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    // GET BY ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null);
    }

    // CREATE
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        Optional<Product> productOpt = productRepository.findById(id);

        if (productOpt.isPresent()) {
            Product product = productOpt.get();

            product.setName(updatedProduct.getName());
            product.setPrice(updatedProduct.getPrice());
            product.setCategory(updatedProduct.getCategory());
            product.setImage(updatedProduct.getImage());
            product.setDescription(updatedProduct.getDescription());

            return productRepository.save(product);
        }

        return null;
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return "Producto eliminado";
    }

    
    // Filtos
    // Filtro por nombre
    @GetMapping("/searchByName")
    public List<Product> searchByName(@RequestParam String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    // Filtro por categoría
    @GetMapping("/searchByCategory")
    public List<Product> searchByCategory(@RequestParam String category) {
        return productRepository.findByCategory(category);
    }

    // Filtro por precio
    @GetMapping("/searchByPrice")
    public List<Product> searchByPrice(@RequestParam double min, @RequestParam double max) {
        return productRepository.findByPriceBetween(min, max);
    }

    // Filtro combinado
    @GetMapping("/search")
    public List<Product> search(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ) {
        // Si vienen todos los parámetros, usamos método completo
        if(name != null && category != null && minPrice != null && maxPrice != null) {
            return productRepository.findByNameContainingIgnoreCaseAndCategoryAndPriceBetween(
                    name, category, minPrice, maxPrice
            );
        }
        // Nombre + categoría
        if(name != null && category != null) {
            return productRepository.findByNameContainingIgnoreCaseAndCategory(name, category);
        }
        // Categoría + precio
        if(category != null && minPrice != null && maxPrice != null) {
            return productRepository.findByCategoryAndPriceBetween(category, minPrice, maxPrice);
        }
        // Solo nombre
        if(name != null) {
            return productRepository.findByNameContainingIgnoreCase(name);
        }
        // Solo categoría
        if(category != null) {
            return productRepository.findByCategory(category);
        }
        // Solo precio
        if(minPrice != null && maxPrice != null) {
            return productRepository.findByPriceBetween(minPrice, maxPrice);
        }
        // Si no hay parámetros, devuelve todo
        return productRepository.findAll();
    }

}