/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sandile.picknpay.myrepositories;

import com.sandile.picknpay.mymodel.Category;
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
public interface CatagoryRepository extends CrudRepository<Category, Integer>{
   
    @Transactional
    @Modifying
    @Query("Delete FROM Category c WHERE c.name = :name")
    public int deleteCategory(@Param("name") String name);
}
