# AWS EC2 Deploy Rehberi (t2.nano)

> ⚠️ t2.nano (512MB RAM) kullanıyoruz. Build LOCAL'de yapılacak!

## 1. EC2 Instance Oluştur

### AWS Console'da:
1. EC2 > Launch Instance
2. **Name:** tyt-ayt-app
3. **AMI:** Ubuntu Server 24.04 LTS
4. **Instance type:** t2.nano
5. **Key pair:** Yeni oluştur veya mevcut seç (SSH için gerekli)
6. **Security Group** ayarları:
   - SSH (22) - My IP
   - HTTP (80) - Anywhere
   - HTTPS (443) - Anywhere

## 2. EC2'ye Bağlan

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

## 3. Sunucu Kurulumu (t2.nano için minimal)

```bash
# Sistem güncelle
sudo apt update && sudo apt upgrade -y

# Swap ekle (512MB RAM için gerekli)
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Node.js 20 kur
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# PM2 kur (process manager)
sudo npm install -g pm2

# Nginx kur (reverse proxy)
sudo apt install -y nginx

# Certbot kur (SSL)
sudo apt install -y certbot python3-certbot-nginx

# Proje klasörü oluştur
sudo mkdir -p /var/www/tyt-ayt
sudo chown ubuntu:ubuntu /var/www/tyt-ayt
```

## 4. MongoDB Atlas (Zorunlu - t2.nano'da local MongoDB çalışmaz)

1. https://cloud.mongodb.com adresine git
2. Ücretsiz hesap oluştur
3. "Build a Database" > FREE tier seç
4. Provider: AWS, Region: eu-west-1 (veya yakın)
5. Cluster oluştur (2-3 dk bekle)
6. **Security > Database Access:** Kullanıcı oluştur (şifreyi not al)
7. **Security > Network Access:** Add IP > "Allow Access from Anywhere" (0.0.0.0/0)
8. **Database > Connect > Drivers:** Connection string'i kopyala

## 5. LOCAL'de Build ve Deploy

### İlk Kurulum (Local bilgisayarında):

```bash
cd tyt-ayt-nextjs

# Build yap
npm run build

# Dosyaları paketle
tar -czf deploy.tar.gz .next public package.json package-lock.json next.config.ts

# Sunucuya yükle
scp -i ~/.ssh/your-key.pem deploy.tar.gz ubuntu@EC2_IP:/var/www/tyt-ayt/

# Temizle
rm deploy.tar.gz
```

### Sunucuda (SSH ile bağlan):

```bash
ssh -i ~/.ssh/your-key.pem ubuntu@EC2_IP

cd /var/www/tyt-ayt
tar -xzf deploy.tar.gz
rm deploy.tar.gz

# Bağımlılıkları yükle (sadece production)
npm install --production
```

## 6. Environment Dosyası (Sunucuda)

```bash
nano /var/www/tyt-ayt/.env.local
```

İçeriği:
```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/tyt-ayt-study
NEXTAUTH_SECRET=BURAYA_GUCLU_SECRET_YAZ
NEXTAUTH_URL=https://yourdomain.com
```

Secret oluşturmak için (local'de çalıştır):
```bash
openssl rand -base64 32
```

## 7. PM2 ile Başlat

```bash
cd /var/www/tyt-ayt

# PM2 ile başlat
pm2 start npm --name "tyt-ayt" -- start

# Otomatik başlatma
pm2 startup
pm2 save

# Durumu kontrol et
pm2 status
pm2 logs tyt-ayt
```

## 8. Nginx Ayarları

```bash
sudo nano /etc/nginx/sites-available/tyt-ayt
```

İçeriği:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Aktifleştir:
```bash
sudo ln -s /etc/nginx/sites-available/tyt-ayt /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 9. Domain Ayarları

### Route 53 veya DNS Provider'da:
1. A Record: yourdomain.com → EC2_PUBLIC_IP
2. A Record: www.yourdomain.com → EC2_PUBLIC_IP

### Elastic IP (Önerilen):
EC2 > Elastic IPs > Allocate > Associate with instance
(IP değişmesin diye)

## 10. SSL Sertifikası (HTTPS)

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Email gir, şartları kabul et. Otomatik yenileme:
```bash
sudo certbot renew --dry-run
```

## 11. Güvenlik

```bash
# Firewall
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable

# 3000 portunu kapat (nginx üzerinden erişim var)
# Security Group'tan Custom TCP 3000'i kaldır
```

## 12. Güncelleme (Sonraki Deploylar)

Local'de:
```bash
cd tyt-ayt-nextjs
npm run build
tar -czf deploy.tar.gz .next public package.json package-lock.json next.config.ts
scp -i ~/.ssh/your-key.pem deploy.tar.gz ubuntu@EC2_IP:/var/www/tyt-ayt/
rm deploy.tar.gz
```

Sunucuda:
```bash
cd /var/www/tyt-ayt
tar -xzf deploy.tar.gz
npm install --production
pm2 restart tyt-ayt
rm deploy.tar.gz
```

Veya tek komutla (deploy.sh scriptini düzenle ve çalıştır):
```bash
./deploy.sh
```

---

## Özet Komutlar

```bash
# Uygulama durumu
pm2 status
pm2 logs tyt-ayt

# Nginx durumu
sudo systemctl status nginx

# MongoDB durumu (local kurulumda)
sudo systemctl status mongod

# Yeniden başlat
pm2 restart tyt-ayt
sudo systemctl restart nginx
```

## Sorun Giderme

```bash
# Port kontrolü
sudo lsof -i :3000
sudo lsof -i :80

# Nginx hata logları
sudo tail -f /var/log/nginx/error.log

# Uygulama logları
pm2 logs tyt-ayt --lines 100
```
