package rw.gisele.ne.java.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import rw.gisele.ne.java.enums.EGender;
import rw.gisele.ne.java.enums.ERole;
import rw.gisele.ne.java.models.User;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class UserPrincipal implements UserDetails {

    private UUID id;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String email;

    private String nationalId;

    private EGender gender;

    private ERole role;

    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(Long id, String phoneNumber, String email, String name, ERole role, String password, List<GrantedAuthority> authorities) {
    }

    public static UserPrincipal create(User user) {

        List<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority(user.getRole().toString()));

        return new UserPrincipal(
                user.getId(),
                user.getPhoneNumber(),
                user.getEmail(),
                user.getName(),
                user.getRole(),
                user.getPassword(),
                authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
