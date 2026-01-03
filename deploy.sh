#!/bin/bash
# t2.nano Deploy Script - Local build, remote deploy

# Ayarlar - BUNLARI DEĞİŞTİR
EC2_IP="YOUR_EC2_IP"
KEY_PATH="~/.ssh/your-key.pem"
REMOTE_PATH="/var/www/tyt-ayt"

echo "🔨 Local build başlıyor..."
npm run build

echo "📦 Dosyalar hazırlanıyor..."
# Gerekli dosyaları paketle
tar -czf deploy.tar.gz \
  .next \
  public \
  package.json \
  package-lock.json \
  next.config.ts

echo "🚀 Sunucuya yükleniyor..."
scp -i $KEY_PATH deploy.tar.gz ubuntu@$EC2_IP:/tmp/

echo "📂 Sunucuda açılıyor..."
ssh -i $KEY_PATH ubuntu@$EC2_IP << 'EOF'
  cd /var/www/tyt-ayt
  tar -xzf /tmp/deploy.tar.gz
  npm install --production
  pm2 restart tyt-ayt || pm2 start npm --name "tyt-ayt" -- start
  rm /tmp/deploy.tar.gz
EOF

rm deploy.tar.gz
echo "✅ Deploy tamamlandı!"
