#  Sift – Smart Receipt Scanner & Organizer



## Project Overview
Sift built during the **2025 AWS Lambda Hackathon** is a full-stack, serverless web application designed to help users quickly digitize and organize paper receipts. With just a photo upload, the system automatically extracts key metadata — like vendor, total amount, and date — and sorts the docuemnts into corresponding folder locations.



When a user uploads a photo of a receipt, it’s stored in [Amazon S3](https://aws.amazon.com/s3/), triggering an [AWS Lambda](https://aws.amazon.com/lambda/) function that uses [Amazon Textract](https://aws.amazon.com/textract/) to extract relevant fields using OCR. The structured data is saved in [DynamoDB](https://aws.amazon.com/dynamodb/), while the original image remains accessible. The result is a clean interface for searching, filtering, and tracking expenses — all powered by a fully serverless backend.



##  Sample pages

<img src="./screenshots/home.png" alt="Sift homepage UI" width="700"/>

fig 1. Minimalist dashboard design for viewing and uploading receipts.

---

##  System Architecture

| Layer              | Technology                     |
|--------------------|---------------------------------|
| Frontend           | React + TypeScript + Material UI |
| Backend            | Spring Boot (Java) + REST API   |
| Authentication     | Cognito (JWT-based login)       |
| File Storage       | S3                              |
| Text Extraction    | Textract via Lambda             |
| Metadata Storage   | DynamoDB                        |
| Monitoring         | CloudWatch                      |
| Deployment         | Docker + GitHub Actions         |

---

##  Core Features

-  Upload or capture receipts directly from the web UI  
-  Automatic metadata extraction triggered via S3 uploads  
-  OCR-based parsing (vendor, total, date, items) with editable review screen  
-  Searchable archive with filters by vendor or date  
-  Summary dashboard for tracking recent spending (coming soon)  
-  Authenticated user sessions with Cognito + JWT



##  Install + Setup

```bash
git clone https://github.com/danielcoblentz/sift.git
cd sift
```


## Acknowlagements