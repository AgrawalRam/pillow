# pillow - implement rate limiter
Used queue of size X to limit request for 60 seconds 

To test:
1. run nodemon command in terminal
2. run for i in {1..3000}; do curl -i http://localhost:3000/rate_test; done in terminal

Note: use 14 version of node
