package ylab.springclinicbackend;

public interface AppointmentResponse {

    Long getAppid();
    String getDocname();
    String getPatname();
    String getDate();
    String getTime();
    String getService();
}
