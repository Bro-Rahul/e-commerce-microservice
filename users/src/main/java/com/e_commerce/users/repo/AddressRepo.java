package com.e_commerce.users.repo;

import com.e_commerce.users.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepo extends JpaRepository<Address,String> {
}
