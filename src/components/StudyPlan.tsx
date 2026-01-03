'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Calendar, CheckCircle2, Circle, Star, TrendingUp, Clock, Target, Flame, BarChart3, BookOpen, AlertTriangle, LogOut, User, Save } from 'lucide-react';
import { weeks, tytTopics, aytTopics, priorityColors, priorityLabels } from '@/lib/studyData';

export default function StudyPlan() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Load progress from DB
  useEffect(() => {
    if (session) {
      fetch('/api/progress')
        .then(res => res.json())
        .then(data => {
          if (data.checkedItems) {
            setCheckedItems(data.checkedItems);
          }
        })
        .catch(console.error);
    }
  }, [session]);

  // Save progress to DB
  const saveProgress = useCallback(async (items: Record<string, boolean>) => {
    setSaving(true);
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkedItems: items })
      });
      setLastSaved(new Date());
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  }, []);

  const toggleCheck = (id: string) => {
    const newItems = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(newItems);
    saveProgress(newItems);
  };

  const totalTasks = weeks.reduce((sum, week) => sum + week.days.length, 0);
  const completedTasks = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  const getWeekProgress = (weekNum: number) => {
    const weekTasks = weeks[weekNum - 1].days.length;
    let completed = 0;
    for (let i = 0; i < weekTasks; i++) {
      if (checkedItems[`w${weekNum}-d${i}`]) completed++;
    }
    return Math.round((completed / weekTasks) * 100);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-6 md:p-8 mb-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                <Target className="w-8 h-8 md:w-10 md:h-10" />
                TYT-AYT Matematik
              </h1>
              <p className="text-lg md:text-xl opacity-90">10 Haftalık Detaylı Çalışma Programı</p>
              <div className="flex items-center gap-2 mt-2 text-sm opacity-75">
                <User className="w-4 h-4" />
                <span>{session.user?.name}</span>
                {saving && <Save className="w-4 h-4 animate-pulse" />}
                {lastSaved && !saving && (
                  <span className="text-xs">Son kayıt: {lastSaved.toLocaleTimeString('tr-TR')}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 text-center min-w-[80px]">
                  <div className="text-xl md:text-2xl font-bold">{completedTasks}/{totalTasks}</div>
                  <div className="text-xs opacity-90">Tamamlanan</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 text-center min-w-[80px]">
                  <div className="text-xl md:text-2xl font-bold">%{progressPercent}</div>
                  <div className="text-xs opacity-90">İlerleme</div>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-colors"
                title="Çıkış Yap"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="mt-6 bg-white/20 rounded-full h-4 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Öncelik Açıklaması */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Öncelik Seviyeleri
          </h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(priorityLabels).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <span className={`${value.color} text-white text-xs px-2 py-1 rounded font-bold`}>
                  {value.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* TYT ve AYT Öncelik Haritaları */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-red-200">
            <h3 className="text-xl md:text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
              <Flame className="w-6 h-6 md:w-7 md:h-7" />
              TYT Öncelik Haritası
            </h3>
            <div className="space-y-3">
              {tytTopics.map((topic, idx) => (
                <div key={idx} className="p-3 md:p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-gray-800 text-sm md:text-base">{topic.name}</div>
                    <div className="flex gap-0.5">
                      {[...Array(topic.stars)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-red-500 text-red-500" />
                      ))}
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    <div className="flex gap-4">
                      <span>Çıkma: <span className="font-semibold">{topic.percentage}</span></span>
                      <span>Zorluk: {"⭐".repeat(topic.difficulty)}</span>
                    </div>
                    {topic.note && <div className="text-red-600 font-semibold mt-1">{topic.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200">
            <h3 className="text-xl md:text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 md:w-7 md:h-7" />
              AYT Öncelik Haritası
            </h3>
            <div className="space-y-3">
              {aytTopics.map((topic, idx) => (
                <div key={idx} className="p-3 md:p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-gray-800 text-sm md:text-base">{topic.name}</div>
                    <div className="flex gap-0.5">
                      {[...Array(topic.stars)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-purple-500 text-purple-500" />
                      ))}
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    <div className="flex gap-4">
                      <span>Çıkma: <span className="font-semibold">{topic.percentage}</span></span>
                      <span>Zorluk: {"⭐".repeat(topic.difficulty)}</span>
                    </div>
                    {topic.note && <div className="text-purple-600 font-semibold mt-1">{topic.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Haftalık Program */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
            <Calendar className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
            10 Haftalık Detaylı Program
          </h3>

          <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-6">
            {weeks.map((w) => {
              const weekProgress = getWeekProgress(w.week);
              return (
                <button
                  key={w.week}
                  onClick={() => setSelectedWeek(w.week)}
                  className={`relative px-2 md:px-4 py-2 md:py-3 rounded-lg font-bold transition-all text-sm md:text-base ${
                    selectedWeek === w.week
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : weekProgress === 100
                      ? 'bg-green-100 text-green-700 border-2 border-green-400'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {w.week}
                  {weekProgress > 0 && weekProgress < 100 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${weekProgress}%` }} />
                    </div>
                  )}
                  {weekProgress === 100 && (
                    <CheckCircle2 className="absolute -top-1 -right-1 w-4 h-4 text-green-600 bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {weeks.map((week) => (
            selectedWeek === week.week && (
              <div key={week.week} className="space-y-4">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 md:p-5 border-2 border-blue-300">
                  <h4 className="text-xl md:text-2xl font-bold text-blue-900 mb-1">Hafta {week.week}</h4>
                  <p className="text-lg md:text-xl text-blue-800">{week.title}</p>
                  <div className="mt-2 text-sm text-blue-700">
                    İlerleme: %{getWeekProgress(week.week)}
                  </div>
                </div>

                {week.days.map((day, idx) => {
                  const itemId = `w${week.week}-d${idx}`;
                  const isChecked = checkedItems[itemId];

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(itemId)}
                      className={`p-4 md:p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-xl ${
                        isChecked
                          ? 'bg-green-50 border-green-400 shadow-lg'
                          : `bg-white ${priorityColors[day.priority]}`
                      }`}
                    >
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="mt-1">
                          {isChecked ? (
                            <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-green-600" />
                          ) : (
                            <Circle className="w-6 h-6 md:w-7 md:h-7 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2 md:mb-3 flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-base md:text-lg font-bold text-gray-800">{day.day}</span>
                              {day.priority && priorityLabels[day.priority] && (
                                <span className={`${priorityLabels[day.priority].color} text-white text-xs px-2 py-0.5 rounded font-bold`}>
                                  {priorityLabels[day.priority].text}
                                </span>
                              )}
                            </div>
                            <div className="flex gap-1">
                              {'tytImportance' in day && day.tytImportance && (
                                <div className="flex gap-0.5">
                                  {[...Array(day.tytImportance)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-red-500 text-red-500" />
                                  ))}
                                </div>
                              )}
                              {'aytImportance' in day && day.aytImportance && (
                                <div className="flex gap-0.5">
                                  {[...Array(day.aytImportance)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-purple-500 text-purple-500" />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className={`text-lg md:text-xl font-bold mb-2 ${isChecked ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                            {day.topic}
                          </div>
                          <div className="text-sm md:text-base text-gray-700 flex items-center gap-2">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>{day.detail}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ))}
        </div>

        {/* Özet */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow-lg p-6 border-2 border-yellow-300 mb-8">
          <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            🔥 Sınavda En Yüksek Katkıyı Veren Konular
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                TYT&apos;de:
              </h4>
              <ol className="space-y-1 text-sm md:text-base">
                <li>1️⃣ Problemler – ⭐⭐⭐⭐⭐</li>
                <li>2️⃣ Geometri – ⭐⭐⭐⭐⭐</li>
                <li>3️⃣ Fonksiyonlar – ⭐⭐⭐⭐</li>
                <li>4️⃣ Denklem–Eşitsizlik – ⭐⭐⭐⭐</li>
              </ol>
            </div>
            <div>
              <h4 className="font-bold text-purple-700 mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                AYT&apos;de:
              </h4>
              <ol className="space-y-1 text-sm md:text-base">
                <li>1️⃣ Türev – ⭐⭐⭐⭐⭐</li>
                <li>2️⃣ İntegral – ⭐⭐⭐⭐⭐</li>
                <li>3️⃣ Fonksiyonlar – ⭐⭐⭐⭐⭐</li>
                <li>4️⃣ Trigonometri – ⭐⭐⭐⭐</li>
                <li>5️⃣ Analitik Geometri – ⭐⭐⭐⭐</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>TYT-AYT Matematik Çalışma Programı © 2026</p>
          <p className="mt-1">Başarılar! 🎯</p>
        </div>
      </div>
    </div>
  );
}
