package com.example.auricle.audio;

import com.example.auricle.response.Response;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AudioService {
    public Response receiveAudio(@RequestBody MultipartFile file) {
        try {

            return new Response(200, "Received audio");
        } catch (Exception e) {
            return new Response(500, e.getMessage());
        }
    }

    public Response sendAudio(MultipartFile file) {
        try {
            String url = "http://206.87.205.209/api/endpoint";
            return new Response(200, "Sent audio");
        } catch (Exception e) {
            return new Response(500, e.getMessage());
        }
    }
}
