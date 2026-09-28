package com.e_commerce.users.repo;

import com.e_commerce.users.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepo extends JpaRepository<Users,String> {

    Optional<Users> findByEmail(String email);
}
