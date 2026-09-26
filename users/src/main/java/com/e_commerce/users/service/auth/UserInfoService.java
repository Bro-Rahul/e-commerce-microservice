package com.e_commerce.users.service.auth;

import com.e_commerce.users.model.UserInfo;
import com.e_commerce.users.model.Users;
import com.e_commerce.users.repo.UsersRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserInfoService implements UserDetailsService {

    private final UsersRepo usersRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = usersRepo.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email:" + username));

        return new UserInfo(user);
    }
}
