package com.sift.controller;

import com.sift.model.Receipt;
import com.sift.repository.ReceiptRepository;
import com.sift.dto.ReceiptDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/receipts")
public class ReceiptController {

    @Autowired
    private ReceiptRepository receiptRepository;

    // POST /api/receipts/confirm
    @PostMapping("/confirm")
    public List<Receipt> saveReceipts(@RequestBody List<ReceiptDTO> receiptDTOs,
                                      @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject(); // from Cognito token

        List<Receipt> receipts = receiptDTOs.stream().map(dto -> {
            Receipt r = new Receipt();
            r.setVendor(dto.getVendor());
            r.setDate(dto.getDate());
            r.setAmount(dto.getAmount());
            r.setS3Key(dto.getS3Key());
            r.setUserId(userId);
            return r;
        }).collect(Collectors.toList());

        return receiptRepository.saveAll(receipts);
    }

    // GET /api/receipts/my
    @GetMapping("/my")
    public List<Receipt> getMyReceipts(@AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        return receiptRepository.findByUserId(userId);
    }
}
