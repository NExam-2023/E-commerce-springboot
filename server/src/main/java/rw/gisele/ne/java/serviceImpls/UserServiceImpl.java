package rw.gisele.ne.java.serviceImpls;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import rw.gisele.ne.java.exceptions.BadRequestException;
import rw.gisele.ne.java.exceptions.ResourceNotFoundException;
import rw.gisele.ne.java.models.User;
import rw.gisele.ne.java.repositories.IUserRepository;
import rw.gisele.ne.java.services.IUserService;

import java.util.*;

@Service
public class UserServiceImpl implements IUserService {

    private final IUserRepository userRepository;

    @Autowired
    public UserServiceImpl( IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User create(User user) {
        validateNewRegistration(user);

        return this.userRepository.save(user);
    }

    @Override
    public boolean isNotUnique(User user) {
        Optional<User> userOptional = this.userRepository.findByEmailOrPhoneNumber(user.getEmail(), user.getPhoneNumber());
        return userOptional.isPresent();
    }

    @Override
    public void validateNewRegistration(User user) {
        if (isNotUnique(user)) {
            throw new BadRequestException(String.format("User with email '%s' or phone number '%s' already exists", user.getEmail(), user.getPhoneNumber()));
        }
    }

    @Override
    public User getLoggedInUser() {
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() == "anonymousUser")
            throw new BadRequestException("You are not logged in, try to log in");

        String email;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }

        return userRepository.findByEmail(email).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", email));
    }
}
