package ylab.springclinicbackend;

import java.util.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AppointmentRepository extends JpaRepository<Appointment,Long>{

     @Query(nativeQuery = true, 
    value = "SELECT A.appid, B.name AS docname, C.name as patname, A.date, A.time, A.service FROM appointments AS A INNER JOIN doctors as B ON (A.docid=B.docid) INNER JOIN patients AS C ON (A.patid=C.patid) ORDER BY A.appid ASC")
    Collection<AppointmentResponse> findAllWithName();


}
