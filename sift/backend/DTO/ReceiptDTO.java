package com.sift.dto;

public class ReceiptDTO {
    private String vendor;
    private String date;
    private String amount;
    private String s3Key;

    // Getters and Setters
    public String getVendor() { return vendor; }
    public void setVendor(String vendor) { this.vendor = vendor; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getAmount() { return amount; }
    public void setAmount(String amount) { this.amount = amount; }

    public String getS3Key() { return s3Key; }
    public void setS3Key(String s3Key) { this.s3Key = s3Key; }
}
