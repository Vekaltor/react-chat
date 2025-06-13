#!/usr/bin/sh
cd C:/Users/Kamil/Desktop/PROJECTS/react-chat
npm run build
scp -P 10240 -r build/* root@srv23.mikr.us:~/apps/react-chat/frontend
ssh root@srv23.mikr.us -p 10240 'sudo systemctl restart react-app.service'
