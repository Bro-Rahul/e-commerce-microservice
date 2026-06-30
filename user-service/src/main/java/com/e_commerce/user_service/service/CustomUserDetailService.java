package com.e_commerce.user_service.service;

import com.e_commerce.user_service.model.UserPrincipal;
import com.e_commerce.user_service.model.Users;
import com.e_commerce.user_service.repo.UsersRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final UsersRepo repo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> optionalUser = repo.findByUsername(username);
        if(optionalUser.isEmpty())
            throw new UsernameNotFoundException("No Such user with this username exists ");
        Users user = optionalUser.get();
        return new UserPrincipal(user);
    }
}
