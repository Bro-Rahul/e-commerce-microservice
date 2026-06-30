package com.e_commerce.user_service.scheduler;

import com.e_commerce.user_service.service.OutBoxService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class EventScheduler {

    private final OutBoxService outBoxService;

    @Scheduled(fixedDelay = 2000)
    public void runScheduleTask(){
        try {
            outBoxService.sendPendingOutBoxRequests();
        }catch (Exception ex){
            System.out.println(ex.getMessage());
        }
    }
}
