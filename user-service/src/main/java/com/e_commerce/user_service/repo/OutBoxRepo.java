package com.e_commerce.user_service.repo;

import com.e_commerce.user_service.model.OutBox;
import com.e_commerce.user_service.model.OutBoxStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface OutBoxRepo extends JpaRepository<OutBox, Integer> {
    List<OutBox> findByStatus(OutBoxStatus outBoxStatus);
}
