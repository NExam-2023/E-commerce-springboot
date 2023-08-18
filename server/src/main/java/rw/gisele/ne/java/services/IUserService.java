package rw.gisele.ne.java.services;

import rw.gisele.ne.java.models.User;


public interface IUserService {

    User create(User user);

    boolean isNotUnique(User user);

    void validateNewRegistration(User user);

    User getLoggedInUser();

}