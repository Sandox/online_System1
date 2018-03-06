/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sandile.picknpay.myrepositories;

import com.sandile.picknpay.mymodel.Address;
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
public interface AddressRepository extends CrudRepository<Address, Integer>{
    @Query("SELECT a FROM Address a WHERE a.orderno = :orderno")
    public ArrayList<Address> findAddressByOrderNo(@Param("orderno") int orderNo);
    
    @Transactional
    @Modifying
    @Query("Delete FROM Address a WHERE a.orderno = :orderno")
    public int deleteAddress(@Param("orderno") int orderNo);
}
