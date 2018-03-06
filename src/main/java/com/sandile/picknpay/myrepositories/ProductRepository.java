/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sandile.picknpay.myrepositories;

import com.sandile.picknpay.mymodel.Product;
import java.util.ArrayList;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.RepositoryRestController;

/**
 *
 * @author User
 */
@RepositoryRestController
public interface ProductRepository  extends CrudRepository<Product, Integer>{
    
     @Transactional
     @Modifying
     @Query("Delete FROM Product p WHERE p.productID = :productID")
     public int deleteProduct(@Param("productID") int productId);
     
     @Transactional
     @Modifying
     @Query("Update Product p SET p.name =:name, p.category =:category, p.price =:price WHERE p.productID = :productID")
     public int updateProduct(@Param("productID") int pid, @Param("name") String name, @Param("category") String category, @Param("price") double price);
     
     @Query("SELECT p FROM Product p WHERE p.category = :category")
     public ArrayList<Product> findProductByCategory(@Param("category") String category);
     
}
