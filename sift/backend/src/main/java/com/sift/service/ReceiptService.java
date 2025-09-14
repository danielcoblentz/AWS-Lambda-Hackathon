package com.sift.service;

import com.sift.dto.ReceiptDTO;
import com.sift.model.Receipt;
import com.sift.repository.ReceiptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceiptService {

    @Autowired
    private ReceiptRepository receiptRepository;

    public void saveReceipts(List<ReceiptDTO> dtos, String userId) {
        for (ReceiptDTO dto : dtos) {
            Receipt r = new Receipt();
            r.setVendor(dto.getVendor());
            r.setDate(dto.getDate());
            r.setAmount(dto.getAmount());
            r.setS3Key(dto.getS3Key());
            r.setUserId(userId);
            receiptRepository.save(r);
        }
    }

    public List<Receipt> getReceiptsForUser(String userId) {
        return receiptRepository.findByUserId(userId);
    }
}
