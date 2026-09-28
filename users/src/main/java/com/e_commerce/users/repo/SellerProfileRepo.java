package com.e_commerce.users.repo;

import com.e_commerce.users.model.SellerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerProfileRepo extends JpaRepository<SellerProfile,String> {
}
