package com.bc.backend_tienda.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bc.backend_tienda.demo.model.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Buscar productos por nombre (contiene)
    List<Product> findByNameContainingIgnoreCase(String name);

    // Buscar por categoría exacta
    List<Product> findByCategory(String category);

    // Buscar por rango de precio
    List<Product> findByPriceBetween(double min, double max);

    // Buscar por categoría y rango de precio
    List<Product> findByCategoryAndPriceBetween(String category, double min, double max);

    // Buscar por nombre y categoría
    List<Product> findByNameContainingIgnoreCaseAndCategory(String name, String category);

    // Buscar por nombre, categoría y rango de precio
    List<Product> findByNameContainingIgnoreCaseAndCategoryAndPriceBetween(
            String name, String category, double min, double max
    );

}
