# file-upload
file-upload

This project creates API end points to upload csv files and process the values to return the top rated product details 

API End points 

1) api/csv/fileupload 
 Method : POST
  Request :
  file: attachment 
  
  Response: 
  {"top_product":"Massoub gift card","product_rating":" 5.0"}
  
  Status code:
  200 - Success
  400 - Bad Request
  500 - Unexpected Error
  
2) api/csv/serverstatus
Method : GET 
Response: 
API is up
  
  
  

