export interface DayData {
  day: string;
  topic: string;
  detail: string;
  priority: string;
  tytImportance?: number;
  aytImportance?: number;
}

export interface WeekData {
  week: number;
  title: string;
  days: DayData[];
}

export const weeks: WeekData[] = [
  {
    week: 1,
    title: "TYT Temel Kavramlar ve Sayılar",
    days: [
      { day: "Pazartesi", topic: "Temel Kavramlar - Bölünebilme", detail: "Bölünebilme kuralları, EKOK-EBOB. 40 soru çöz.", priority: "medium", tytImportance: 3 },
      { day: "Salı", topic: "Oran-Orantı Temelleri", detail: "Oran kavramı, doğru-ters orantı. 35 soru.", priority: "medium", tytImportance: 2 },
      { day: "Çarşamba", topic: "Üslü Sayılar", detail: "Üs kuralları, işlemler. 40 soru.", priority: "medium", tytImportance: 3 },
      { day: "Perşembe", topic: "Köklü Sayılar", detail: "Kök alma, işlemler. 35 soru.", priority: "medium", tytImportance: 3 },
      { day: "Cuma", topic: "Çarpanlara Ayırma", detail: "Ortak parantez, özdeşlikler. 35 soru.", priority: "medium", tytImportance: 2 },
      { day: "Cumartesi", topic: "Haftalık Karma Test", detail: "Temel konulardan 50 soru. Zaman: 80 dakika.", priority: "review" },
      { day: "Pazar", topic: "Hatalı Sorular Tekrarı", detail: "Yanlışları çöz, formülleri ezberle.", priority: "review" }
    ]
  },
  {
    week: 2,
    title: "TYT Denklemler ve Eşitsizlikler - Yüksek Öncelik",
    days: [
      { day: "Pazartesi", topic: "Birinci Dereceden Denklemler", detail: "Denklem çözme, parantez açma. 45 soru.", priority: "high", tytImportance: 4 },
      { day: "Salı", topic: "Mutlak Değer - ÖNEMLİ!", detail: "Mutlak değer denklemler. 40 soru.", priority: "critical", tytImportance: 4 },
      { day: "Çarşamba", topic: "Eşitsizlikler", detail: "Birinci derece eşitsizlikler. 35 soru.", priority: "high", tytImportance: 4 },
      { day: "Perşembe", topic: "Polinomlar (TYT)", detail: "Polinom işlemleri, bölme. 30 soru.", priority: "medium", tytImportance: 2 },
      { day: "Cuma", topic: "Kümeler ve Mantık", detail: "Küme işlemleri, mantık. 30 soru.", priority: "medium", tytImportance: 2 },
      { day: "Cumartesi", topic: "Denklem Özel Test", detail: "60 soru denklem ağırlıklı test.", priority: "review" },
      { day: "Pazar", topic: "Mutlak Değer Ekstra", detail: "Mutlak değeri özel çalış!", priority: "review" }
    ]
  },
  {
    week: 3,
    title: "TYT Fonksiyonlar - KRİTİK KONU! Çıkma: %8-10",
    days: [
      { day: "Pazartesi", topic: "Fonksiyon Tanımı", detail: "Fonksiyon kavramı, değer bulma. 40 soru.", priority: "critical", tytImportance: 5 },
      { day: "Salı", topic: "Fonksiyon Grafikleri - ÇOK ZOR!", detail: "Grafik okuma, yorumlama. 45 soru.", priority: "critical", tytImportance: 5 },
      { day: "Çarşamba", topic: "Fonksiyon İşlemleri", detail: "Toplam, fark, çarpım, bölüm. 40 soru.", priority: "critical", tytImportance: 5 },
      { day: "Perşembe", topic: "Ters ve Bileşke Fonksiyon", detail: "Ters fonksiyon, bileşke. 35 soru.", priority: "critical", tytImportance: 5 },
      { day: "Cuma", topic: "Fonksiyon Problemleri", detail: "Yorum gerektiren zor sorular. 30 soru.", priority: "critical", tytImportance: 5 },
      { day: "Cumartesi", topic: "Fonksiyon Özel Maratonu", detail: "70 soru sadece fonksiyonlar!", priority: "review" },
      { day: "Pazar", topic: "Grafik Yorumu Özel", detail: "Grafik sorularına özel odaklan.", priority: "review" }
    ]
  },
  {
    week: 4,
    title: "TYT Problemler - EN KRİTİK! Çıkma: %20-25",
    days: [
      { day: "Pazartesi", topic: "Yüzde Problemleri", detail: "Kar-zarar, artış-azalış. 50 soru.", priority: "critical", tytImportance: 5 },
      { day: "Salı", topic: "Yaş Problemleri", detail: "Yaş farkı, tablo yöntemi. 45 soru.", priority: "critical", tytImportance: 5 },
      { day: "Çarşamba", topic: "Sayı Problemleri", detail: "Basamak değerleri. 40 soru.", priority: "critical", tytImportance: 5 },
      { day: "Perşembe", topic: "Hareket Problemleri", detail: "Hız-yol-zaman, karşılaşma. 45 soru.", priority: "critical", tytImportance: 5 },
      { day: "Cuma", topic: "İşçi-Havuz Problemleri", detail: "İş-zaman, birlikte çalışma. 40 soru.", priority: "critical", tytImportance: 5 },
      { day: "Cumartesi", topic: "Problem Mega Maratonu", detail: "80 soru! TYT'nin omurgası!", priority: "review" },
      { day: "Pazar", topic: "Problem Stratejileri", detail: "Çözüm stratejilerini geliştir.", priority: "review" }
    ]
  },
  {
    week: 5,
    title: "TYT Geometri - KRİTİK! Çıkma: %18-20",
    days: [
      { day: "Pazartesi", topic: "Açılar ve Üçgenler", detail: "Açı türleri, üçgen açıları. 45 soru.", priority: "critical", tytImportance: 5 },
      { day: "Salı", topic: "Özel Üçgenler", detail: "İkizkenar, eşkenar, dik üçgen. 40 soru.", priority: "critical", tytImportance: 5 },
      { day: "Çarşamba", topic: "Dörtgenler", detail: "Kare, dikdörtgen, paralelkenar. 40 soru.", priority: "critical", tytImportance: 5 },
      { day: "Perşembe", topic: "Alan Hesaplamaları - ÖNEMLİ", detail: "Tüm şekillerde alan. 45 soru.", priority: "critical", tytImportance: 5 },
      { day: "Cuma", topic: "Çember ve Daire", detail: "Çevre, alan, yay. 35 soru.", priority: "critical", tytImportance: 5 },
      { day: "Cumartesi", topic: "Geometri Mega Test", detail: "70 soru! ÖSYM yorum tipi sorular!", priority: "review" },
      { day: "Pazar", topic: "Yorum Tipi Geometri Özel", detail: "Yorumlama gerektiren soruları çalış.", priority: "review" }
    ]
  },
  {
    week: 6,
    title: "TYT Tamamlama - Veri, İstatistik, Olasılık",
    days: [
      { day: "Pazartesi", topic: "Veri Analizi", detail: "Tablo-grafik okuma. 35 soru.", priority: "medium", tytImportance: 2 },
      { day: "Salı", topic: "İstatistik", detail: "Ortalama, mod, medyan. 30 soru.", priority: "medium", tytImportance: 2 },
      { day: "Çarşamba", topic: "Olasılık Temel", detail: "Basit olasılık. 35 soru.", priority: "medium", tytImportance: 3 },
      { day: "Perşembe", topic: "Olasılık - ÖSYM Tarzı", detail: "Zor olasılık soruları. 30 soru.", priority: "high", tytImportance: 3 },
      { day: "Cuma", topic: "TYT Zayıf Konular", detail: "Eksikleri belirle, çalış. 40 soru.", priority: "review" },
      { day: "Cumartesi", topic: "TYT Mini Denemesi 1", detail: "40 soru, gerçek sınav koşulları.", priority: "review" },
      { day: "Pazar", topic: "Deneme Analizi", detail: "Her soruyu detaylı incele.", priority: "review" }
    ]
  },
  {
    week: 7,
    title: "AYT Fonksiyonlar - KRİTİK! Çıkma: %10",
    days: [
      { day: "Pazartesi", topic: "AYT Fonksiyonlar İleri", detail: "Fonksiyon türleri. 35 soru.", priority: "critical", aytImportance: 5 },
      { day: "Salı", topic: "Fonksiyon Grafik (AYT) - ÇOK ZOR", detail: "Karmaşık grafikler. 30 soru.", priority: "critical", aytImportance: 5 },
      { day: "Çarşamba", topic: "Polinomlar (AYT)", detail: "Horner, kalan teoremi. 30 soru.", priority: "high", aytImportance: 4 },
      { day: "Perşembe", topic: "Karmaşık Sayılar - İşlem", detail: "i kavramı, işlemler. 25 soru.", priority: "high", aytImportance: 4 },
      { day: "Cuma", topic: "Karmaşık Sayılar - Grafik ZOR", detail: "Grafik yorumu. 25 soru.", priority: "high", aytImportance: 4 },
      { day: "Cumartesi", topic: "AYT Fonksiyon Özel", detail: "50 soru fonksiyon özel test.", priority: "review" },
      { day: "Pazar", topic: "Hafta Değerlendirme", detail: "Zor soruları tekrar et.", priority: "review" }
    ]
  },
  {
    week: 8,
    title: "AYT Trigonometri - KRİTİK! Çıkma: %10",
    days: [
      { day: "Pazartesi", topic: "Trigonometrik Oranlar", detail: "Sin, cos, tan. 35 soru.", priority: "critical", aytImportance: 5 },
      { day: "Salı", topic: "Toplam-Fark Formülleri - MUTLAKA", detail: "Toplam-fark. 40 soru.", priority: "critical", aytImportance: 5 },
      { day: "Çarşamba", topic: "Yarım Açı Formülleri", detail: "Yarım ve iki kat açı. 35 soru.", priority: "critical", aytImportance: 5 },
      { day: "Perşembe", topic: "Trigonometrik Denklemler", detail: "Trig. denklemler. 35 soru.", priority: "critical", aytImportance: 5 },
      { day: "Cuma", topic: "Trigonometri Problemleri", detail: "Karma zor sorular. 30 soru.", priority: "critical", aytImportance: 5 },
      { day: "Cumartesi", topic: "Trigonometri Mega Test", detail: "60 soru trigonometri özel!", priority: "review" },
      { day: "Pazar", topic: "Formül Ezberi", detail: "Tüm formülleri ezberle!", priority: "review" }
    ]
  },
  {
    week: 9,
    title: "AYT Türev - EN KRİTİK! Çıkma: %15",
    days: [
      { day: "Pazartesi", topic: "Türev Kuralları", detail: "Türev alma. 35 soru.", priority: "critical", aytImportance: 5 },
      { day: "Salı", topic: "Fonksiyon İnceleme - ANA TEMA", detail: "Artma-azalma. 40 soru.", priority: "critical", aytImportance: 5 },
      { day: "Çarşamba", topic: "Teğet-Normal - ANA TEMA", detail: "Teğet-normal denklem. 35 soru.", priority: "critical", aytImportance: 5 },
      { day: "Perşembe", topic: "Türev Grafik Yorumu", detail: "Grafik üzerinden türev. 35 soru.", priority: "critical", aytImportance: 5 },
      { day: "Cuma", topic: "Türev Uygulamaları", detail: "Optimizasyon. 30 soru.", priority: "critical", aytImportance: 5 },
      { day: "Cumartesi", topic: "Türev Mega Maratonu", detail: "70 soru! AYT'nin kralı!", priority: "review" },
      { day: "Pazar", topic: "Türev Zor Sorular", detail: "En zor soruları çöz.", priority: "review" }
    ]
  },
  {
    week: 10,
    title: "AYT İntegral, Analitik Geometri ve Deneme",
    days: [
      { day: "Pazartesi", topic: "İntegral - Belirsiz", detail: "İntegral alma. 35 soru.", priority: "critical", aytImportance: 5 },
      { day: "Salı", topic: "İntegral - Alan EN SIK", detail: "Alan hesaplama. 40 soru.", priority: "critical", aytImportance: 5 },
      { day: "Çarşamba", topic: "Analitik Geo - Doğru", detail: "Doğru denklemi. 35 soru.", priority: "critical", aytImportance: 5 },
      { day: "Perşembe", topic: "Analitik Geo - Çember SEÇİCİ", detail: "Çember denklemi. 35 soru.", priority: "critical", aytImportance: 5 },
      { day: "Cuma", topic: "Limit-Logaritma Tarama", detail: "Hızlı tarama. 40 soru.", priority: "high", aytImportance: 4 },
      { day: "Cumartesi", topic: "Tam AYT Denemesi 1", detail: "40 soru AYT, gerçek koşullar.", priority: "review" },
      { day: "Pazar", topic: "Final Değerlendirme", detail: "Tüm eksikleri kapat!", priority: "review" }
    ]
  }
];

export const tytTopics = [
  { name: "Problemler", stars: 5, percentage: "20-25%", difficulty: 4, note: "TYT'nin omurgası!" },
  { name: "Geometri", stars: 5, percentage: "18-20%", difficulty: 4, note: "ÖSYM yorum tipi soruyor" },
  { name: "Fonksiyonlar", stars: 4, percentage: "8-10%", difficulty: 4, note: "Grafik yorumları zor" },
  { name: "Denklem-Eşitsizlik", stars: 4, percentage: "8%", difficulty: 3, note: "Mutlak değer önemli" },
  { name: "Üslü Sayılar", stars: 3, percentage: "3-4%", difficulty: 2, note: "" },
  { name: "Köklü Sayılar", stars: 3, percentage: "3-4%", difficulty: 2, note: "" },
  { name: "Olasılık", stars: 3, percentage: "3-4%", difficulty: 3, note: "ÖSYM ters köşe yapıyor" },
  { name: "Temel Kavramlar", stars: 3, percentage: "3-4%", difficulty: 2, note: "Kolay ama yorumlu" }
];

export const aytTopics = [
  { name: "Türev", stars: 5, percentage: "15%", difficulty: 5, note: "EN KRİTİK" },
  { name: "İntegral", stars: 5, percentage: "12%", difficulty: 5, note: "Alan hesapları en sık" },
  { name: "Fonksiyonlar", stars: 5, percentage: "10%", difficulty: 4, note: "ÖSYM'nin en kafa karıştırdığı" },
  { name: "Trigonometri", stars: 5, percentage: "10%", difficulty: 4, note: "Toplam-fark mutlaka sorulur" },
  { name: "Analitik Geometri", stars: 5, percentage: "10%", difficulty: 4, note: "Seçici sorular" },
  { name: "Olasılık-Kombinasyon", stars: 4, percentage: "10%", difficulty: 4, note: "Dizilim problemleri" },
  { name: "Limit", stars: 4, percentage: "8%", difficulty: 4, note: "Grafik yorumu klasik" },
  { name: "Polinomlar", stars: 4, percentage: "6%", difficulty: 3, note: "" },
  { name: "Logaritma", stars: 4, percentage: "5-6%", difficulty: 4, note: "" }
];

export const priorityColors: Record<string, string> = {
  critical: "bg-red-100 border-red-400",
  high: "bg-orange-100 border-orange-400",
  medium: "bg-yellow-100 border-yellow-400",
  review: "bg-blue-100 border-blue-400"
};

export const priorityLabels: Record<string, { text: string; color: string }> = {
  critical: { text: "KRİTİK", color: "bg-red-500" },
  high: { text: "YÜKSEK", color: "bg-orange-500" },
  medium: { text: "ORTA", color: "bg-yellow-500" },
  review: { text: "TEKRAR", color: "bg-blue-500" }
};
