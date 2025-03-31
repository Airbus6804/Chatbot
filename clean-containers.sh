sudo docker stop webapp-chatbot;
sudo docker stop api;
sudo docker stop redis;
sudo docker stop postgres;
sudo docker stop ollama;
sudo docker stop nginx;
sudo docker stop certbot;

sudo docker rm webapp-chatbot;
sudo docker rm api;
sudo docker rm redis;
sudo docker rm postgres;
sudo docker rm ollama;
sudo docker rm nginx;
sudo docker rm certbot;

#chmod +x ./clean-containers.sh