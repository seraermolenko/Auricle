package com.example.auricle.audio;

import com.example.auricle.response.Response;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AudioService {
    public Response receiveAudio(@RequestBody MultipartFile file) {
        System.out.println("Data : " + file);
        return new Response(200, "Received audio");
    }
}
