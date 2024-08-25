package ylab.springclinicbackend;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    @Query(nativeQuery = true, 
    value = "SELECT * FROM doctors")
    Collection<Doctor> findDoclist();
}
