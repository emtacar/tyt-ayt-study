# TYT-AYT Matematik Çalışma Programı

Next.js + MongoDB + NextAuth.js ile kullanıcı girişli 10 haftalık çalışma programı.

## Özellikler

- ✅ Kullanıcı kayıt ve giriş sistemi
- ✅ MongoDB'de ilerleme kaydı
- ✅ 10 haftalık detaylı çalışma planı
- ✅ TYT ve AYT öncelik haritaları
- ✅ Çıkma ihtimalleri ve zorluk seviyeleri
- ✅ Mobil uyumlu tasarım

## Kurulum

### 1. Bağımlılıkları yükle
```bash
npm install
```

### 2. Environment değişkenlerini ayarla
`.env.local` dosyasını düzenle:

```env
# MongoDB - Local veya Atlas
MONGODB_URI=mongodb://localhost:27017/tyt-ayt-study

# NextAuth Secret - Üret: openssl rand -base64 32
NEXTAUTH_SECRET=your-super-secret-key

# NextAuth URL
NEXTAUTH_URL=http://localhost:3000
```

### 3. MongoDB'yi başlat
Local MongoDB için:
```bash
mongod
```

Veya MongoDB Atlas kullan (ücretsiz):
1. https://cloud.mongodb.com adresinden hesap oluştur
2. Cluster oluştur
3. Connection string'i `.env.local`'a yapıştır

### 4. Uygulamayı çalıştır
```bash
npm run dev
```

http://localhost:3000 adresinde açılacak.

## Deploy

### Vercel (Önerilen)
1. GitHub'a push et
2. Vercel'de import et
3. Environment variables ekle:
   - `MONGODB_URI` (MongoDB Atlas connection string)
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (deploy URL'in)

### Diğer Platformlar
```bash
npm run build
npm start
```

## Teknolojiler

- Next.js 16
- TypeScript
- Tailwind CSS
- MongoDB + Mongoose
- NextAuth.js
- Lucide React Icons
