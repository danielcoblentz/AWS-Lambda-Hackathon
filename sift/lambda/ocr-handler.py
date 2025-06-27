import boto3
import re
from datetime import datetime

s3 = boto3.client('s3')
textract = boto3.client('textract')

def extract_info_from_text(text):
    # Very basic extraction logic — can improve with regex models later
    year = re.search(r'20\d{2}', text)
    vendor = re.search(r'(Walmart|Target|Costco|Amazon|...custom...)', text, re.I)
    amount = re.search(r'\$?\d+\.\d{2}', text)
    
    return {
        'year': year.group() if year else str(datetime.now().year),
        'vendor': vendor.group().strip() if vendor else "UnknownVendor",
        'amount': amount.group() if amount else "0.00"
    }

def lambda_handler(event, context):
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        
        # Get the file from S3
        file_obj = s3.get_object(Bucket=bucket, Key=key)
        file_bytes = file_obj['Body'].read()
        
        # Use Textract to extract text
        response = textract.detect_document_text(Document={'Bytes': file_bytes})
        text = "\n".join([item['Text'] for item in response['Blocks'] if item['BlockType'] == 'LINE'])
        
        info = extract_info_from_text(text)
        year = info['year']
        vendor = info['vendor'].replace(" ", "_")  # Clean up folder name
        amount = info['amount']
        
        # Destination path
        dest_prefix = f"receipts/{year}/{vendor}/"
        filename = key.split('/')[-1]
        
        # Move the image
        s3.copy_object(Bucket=bucket, CopySource={'Bucket': bucket, 'Key': key}, Key=dest_prefix + filename)
        s3.delete_object(Bucket=bucket, Key=key)
        
        # Upload metadata
        metadata = {
            'original_file': filename,
            'vendor': vendor,
            'year': year,
            'amount': amount,
            'text': text
        }
        s3.put_object(
            Bucket=bucket,
            Key=dest_prefix + filename.replace('.jpg', '.json'),
            Body=str(metadata).encode('utf-8')
        )
        
        return {
            'statusCode': 200,
            'body': f"Receipt processed and moved to {dest_prefix}"
        }
