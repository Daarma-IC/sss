"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format hari dan bulan Bahasa Indonesia
  const hariIndonesia = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const bulanIndonesia = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const hari = hariIndonesia[currentTime.getDay()];
  const tanggal = currentTime.getDate();
  const bulan = bulanIndonesia[currentTime.getMonth()];
  const tahun = currentTime.getFullYear();
  const jam = currentTime.getHours().toString().padStart(2, '0');
  const menit = currentTime.getMinutes().toString().padStart(2, '0');

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-20 bg-white shadow-md flex flex-col items-center py-8 space-y-10">
        
        {/* Logo */}
        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center text-white">
          <span className="text-xl">🧠</span>
        </div>

        {/* Menu */}
        <div className="flex flex-col space-y-8 items-center">
          <Link href="/">
            <button className="w-12 h-12 hover:bg-yellow-100 text-gray-500 rounded-xl flex items-center justify-center transition-all duration-200">
              <span className="text-xl">🏠</span>
            </button>
          </Link>

          <Link href="/timer">
            <button className="w-12 h-12 hover:bg-blue-100 text-gray-500 rounded-xl flex items-center justify-center transition-all duration-200">
              <span className="text-xl">⏰</span>
            </button>
          </Link>

          <Link href="/files">
            <button className="w-12 h-12 hover:bg-green-100 text-gray-500 rounded-xl flex items-center justify-center transition-all duration-200">
              <span className="text-xl">📚</span>
            </button>
          </Link>

          <Link href="/statistik">
            <button className="w-12 h-12 hover:bg-purple-100 text-gray-500 rounded-xl flex items-center justify-center transition-all duration-200">
              <span className="text-xl">📊</span>
            </button> 
          </Link>

          <Link href="/learn">
            <button className="w-12 h-12 hover:bg-pink-100 text-gray-500 rounded-xl flex items-center justify-center transition-all duration-200">
              <span className="text-xl">💬</span>
            </button>
          </Link>
        </div>
        
        <div className="mt-auto">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
            <span className="text-xl">⚙️</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500">{hari}, {tanggal} {bulan} {tahun}</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Cari pelajaran..." 
                className="w-64 pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
            
            <div className="flex space-x-2 items-center">
              <span className="bg-yellow-100 w-10 h-10 flex items-center justify-center rounded-xl text-yellow-600">🔔</span>
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold">
                AB
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-2xl p-8 mb-8 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-6 left-10">
              <div className="w-20 h-20 rounded-full bg-red-500 opacity-20"></div>
            </div>
            <div className="absolute bottom-6 left-32">
              <div className="w-12 h-12 rounded-full bg-purple-900 opacity-20"></div>
            </div>
            <div className="absolute top-4 right-40">
              <div className="w-24 h-24 rounded-full bg-red-600 opacity-10"></div>
            </div>
            <div className="absolute top-10 left-40">
              <div className="w-16 h-48 bg-purple-900 opacity-10">
                {Array(12).fill(0).map((_, i) => (
                  <div key={i} className="h-1 mt-1 bg-purple-900"></div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-10 right-20 transform rotate-45">
              <div className="w-20 h-20 rounded-lg bg-red-600 opacity-10"></div>
            </div>
          </div>
          
          <div className="relative z-10 flex justify-between items-center">
            <div className="max-w-lg">
              <div className="flex items-center mb-2">
                <span className="text-4xl mr-2">👋</span>
                <h2 className="text-2xl font-bold text-purple-900">Selamat {jam < 12 ? 'Pagi' : (jam < 18 ? 'Siang' : 'Malam')}, Adik Kecil!</h2>
              </div>
              <p className="text-purple-800 text-lg mb-4">Mari kita belajar sambil bermain hari ini. Ada banyak materi menarik untuk kamu coba.</p>
              <Link href="/learn">
  <button className="bg-white text-purple-800 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center">
    <span className="mr-2">🚀</span> Mulai Belajar Sekarang
  </button>
</Link>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-2 text-center">
                <span className="text-purple-900 font-medium">Jam Belajar</span>
                <div className="text-3xl font-bold text-purple-900">{jam}:{menit}</div>
              </div>
              <div className="flex space-x-3">
                <span className="text-5xl">🎈</span>
                <span className="text-5xl">✨</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                <span className="text-2xl">📚</span>
              </div>
              <span className="text-gray-400 text-sm">+12% minggu ini</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">24</h3>
            <p className="text-gray-500">Materi Tersedia</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <span className="text-2xl">🎮</span>
              </div>
              <span className="text-gray-400 text-sm">+5% minggu ini</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">12</h3>
            <p className="text-gray-500">Permainan Edukatif</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white transition-all duration-300">
                <span className="text-2xl">⭐</span>
              </div>
              <span className="text-gray-400 text-sm">+8% minggu ini</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">34</h3>
            <p className="text-gray-500">Bintang Dikumpulkan</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-2xl shadow-md transform hover:scale-105 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-purple-700">
                <span className="text-2xl">🏆</span>
              </div>
              <span className="text-purple-200 text-sm">+3 baru</span>
            </div>
            <h3 className="text-3xl font-bold mb-1 text-white">8</h3>
            <p className="text-purple-200">Prestasi Diraih</p>
          </div>
        </div>
        
        {/* Content Sections */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Featured Learning */}
          <div className="col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Materi Pilihan</h2>
              <button className="text-purple-600 font-medium text-sm flex items-center hover:underline">
                Lihat Semua <span className="ml-1">→</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300">
                <div className="flex">
                  <div className="w-24 h-24 bg-blue-100 rounded-xl overflow-hidden mr-4 flex-shrink-0">
                    <img src="/api/placeholder/96/96" alt="Belajar Huruf" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-gray-800">Mengenal Huruf ABC</h3>
                      <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                        Premium
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-3">Belajar mengenal huruf dengan gambar dan suara yang interaktif</p>
                    <div className="flex justify-between items-center">
                      <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        Rp. 150.000
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-2">⭐⭐⭐⭐⭐</span>
                        <span>5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300">
                <div className="flex">
                  <div className="w-24 h-24 bg-green-100 rounded-xl overflow-hidden mr-4 flex-shrink-0">
                    <img src="/api/placeholder/96/96" alt="Belajar Angka" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-gray-800">Berhitung 1-10</h3>
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                        Gratis
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-3">Permainan berhitung sederhana untuk balita dengan animasi menarik</p>
                    <div className="flex justify-between items-center">
                      <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        Belajar Angka
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-2">⭐⭐⭐⭐</span>
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300">
                <div className="flex">
                  <div className="w-24 h-24 bg-pink-100 rounded-xl overflow-hidden mr-4 flex-shrink-0">
                    <img src="/api/placeholder/96/96" alt="Mengenal Warna" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-gray-800">Mengenal Warna-Warni</h3>
                      <span className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-xs font-medium">
                        Baru
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-3">Belajar mengenal berbagai warna dengan contoh benda sehari-hari</p>
                    <div className="flex justify-between items-center">
                      <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        Rp. 120.000
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-2">⭐⭐⭐⭐⭐</span>
                        <span>4.9</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Learning Progress */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Progres Belajar</h2>
              <button className="bg-purple-100 text-purple-600 text-xs font-medium px-3 py-1 rounded-full">
                Minggu Ini
              </button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
              <div className="flex flex-col items-center">
                <div className="w-36 h-36 rounded-full border-8 border-gray-100 relative mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Lingkaran latar belakang */}
                      <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
                      
                      {/* Lingkaran progres */}
                      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                        <div className="w-full h-full rounded-full border-8 border-yellow-400" 
                             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 0 65%)' }}></div>
                      </div>
                      
                      {/* Teks persentase */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-800">65%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">450 XP</h3>
                <p className="text-gray-500 text-sm">dari target 700 XP</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-bold text-lg mb-3">Prestasi Terakhir</h3>
              <div className="flex items-center p-3 bg-purple-50 rounded-xl mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mr-3">
                  <span className="text-xl">📝</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Menguasai Huruf A-Z</h4>
                  <p className="text-sm text-gray-500">2 hari yang lalu</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-yellow-50 rounded-xl">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 mr-3">
                  <span className="text-xl">🔢</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Berhitung 1-10</h4>
                  <p className="text-sm text-gray-500">5 hari yang lalu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Schedule Section */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Jadwal Belajar Hari Ini</h2>
              <div className="flex space-x-2">
                <button className="bg-yellow-400 text-white w-8 h-8 rounded-lg flex items-center justify-center shadow-sm">
                  ←
                </button>
                <button className="bg-yellow-400 text-white w-8 h-8 rounded-lg flex items-center justify-center shadow-sm">
                  →
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-red-50 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-lg font-bold text-red-600">09:00</p>
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Mengenal Huruf</h3>
                <p className="text-xs text-gray-500">30 menit</p>
                <div className="flex justify-end mt-3">
                  <button className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all">+</button>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-lg font-bold text-blue-600">10:30</p>
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Belajar Angka</h3>
                <p className="text-xs text-gray-500">45 menit</p>
                <div className="flex justify-end mt-3">
                  <button className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-all">+</button>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-lg font-bold text-green-600">13:00</p>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Mengenal Hewan</h3>
                <p className="text-xs text-gray-500">30 menit</p>
                <div className="flex justify-end mt-3">
                  <button className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all">+</button>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-lg font-bold text-purple-600">15:30</p>
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Bernyanyi</h3>
                <p className="text-xs text-gray-500">20 menit</p>
                <div className="flex justify-end mt-3">
                  <button className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-purple-500 hover:bg-purple-500 hover:text-white transition-all">+</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Aktivitas Popular</h2>
            
            <div className="space-y-4">
              <div className="flex bg-gray-50 p-3 rounded-xl">
                <img src="/api/placeholder/64/64" alt="Aktivitas 1" className="w-16 h-16 rounded-lg object-cover mr-3" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-800">Mengenal Binatang</h4>
                    <span className="text-sm text-yellow-600 font-medium">⭐ 4.9</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">Materi Interaktif</p>
                  <p className="text-sm font-medium text-yellow-600">Rp. 150.000</p>
                </div>
              </div>
              
              <div className="flex bg-gray-50 p-3 rounded-xl">
                <img src="/api/placeholder/64/64" alt="Aktivitas 2" className="w-16 h-16 rounded-lg object-cover mr-3" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-800">Belajar Warna</h4>
                    <span className="text-sm text-yellow-600 font-medium">⭐ 4.8</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">Game Edukatif</p>
                  <p className="text-sm font-medium text-yellow-600">Rp. 120.000</p>
                </div>
              </div>
              
              <div className="flex bg-gray-50 p-3 rounded-xl">
                <img src="/api/placeholder/64/64" alt="Aktivitas 3" className="w-16 h-16 rounded-lg object-cover mr-3" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-800">Lagu Anak</h4>
                    <span className="text-sm text-yellow-600 font-medium">⭐ 4.7</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">Musik & Video</p>
                  <p className="text-sm font-medium text-yellow-600">Rp. 100.000</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-4 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-medium rounded-xl hover:shadow-md transition-all duration-300">
              Lihat Semua Aktivitas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 