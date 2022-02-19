certutil -f -encode data.txt encoded_w_certificate.txt
findstr /v CERTIFICATE encoded_w_certificate.txt > files/defaultData.txt
del /f encoded_w_certificate.txt