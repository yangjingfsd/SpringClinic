package ylab.springclinicbackend;

import java.util.Collections;

import org.apache.catalina.filters.CorsFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class SecurityConfig implements RepositoryRestConfigurer{

    private String theAllowedOrigins = "http://localhost:3000";

@Bean
public FilterRegistrationBean simpleCorsFilter() {  
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();  
    CorsConfiguration config = new CorsConfiguration();  
    config.setAllowCredentials(true); 
    // *** URL below needs to match the Vue client URL and port ***
    config.setAllowedOrigins(Collections.singletonList("http://localhost:3000")); 
    config.setAllowedMethods(Collections.singletonList("*"));  
    config.setAllowedHeaders(Collections.singletonList("*"));  
    source.registerCorsConfiguration("/**", config);  
    FilterRegistrationBean bean = new FilterRegistrationBean<>(new org.springframework.web.filter.CorsFilter(source));
    bean.setOrder(Ordered.HIGHEST_PRECEDENCE);  
    return bean;  
}   

    @Override
    public void configureRepositoryRestConfiguration (RepositoryRestConfiguration config, CorsRegistry cors){
         HttpMethod[] theUnsupportedActions ={
            HttpMethod.PATCH
         };

        config.exposeIdsFor(Appointment.class);

        disableHttpMethods(Appointment.class, config, theUnsupportedActions);

        cors.addMapping(config.getBasePath() + "/**")
            .allowedOrigins(theAllowedOrigins);
    }


        private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions){
        config.getExposureConfiguration()
        .forDomainType(theClass)
        .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
        .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }

}
