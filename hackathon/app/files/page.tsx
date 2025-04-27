"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Materi {
  id: number;
  title: string;
  description: string;
  badge: "Premium" | "Gratis";
  price?: string;
  imgSrc: string;
}

const materiList: Materi[] = [
  {
    id: 1,
    title: "Mengenal Huruf ABC",
    description: "Belajar mengenal huruf dengan gambar interaktif.",
    badge: "Premium",
    price: "Rp 150.000",
    imgSrc: "/images/huruf.png",
  },
  {
    id: 2,
    title: "Berhitung 1–10",
    description: "Latihan angka dasar dengan permainan seru.",
    badge: "Gratis",
    imgSrc: "/images/angka.png",
  },
  {
    id: 3,
    title: "Mengenal Warna",
    description: "Pelajari warna dasar melalui kuis dan gambar.",
    badge: "Premium",
    price: "Rp 100.000",
    imgSrc: "/images/warna.png",
  },
  {
    id: 4,
    title: "Binatang & Suaranya",
    description: "Kenali binatang dan suara khasnya.",
    badge: "Gratis",
    imgSrc: "/images/binatang.png",
  },
];

export default function MateriPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
    <header className="flex items-center justify-between mb-8">
      <h1 className="text-4xl font-bold text-gray-800">📚 Materi Pilihan</h1>
      <Link href="/materi" className="text-purple-600 hover:underline">
        Lihat Semua →
      </Link>
    </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {materiList.map((m) => (
          <div key={m.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-40">
              <Image
                src={m.imgSrc}
                alt={m.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">{m.title}</h2>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    m.badge === "Premium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {m.badge}
                </span>
              </div>
              <p className="text-gray-600 text-sm flex-1">{m.description}</p>
              <div className="mt-4 flex items-center justify-between">
                {m.price && <span className="text-purple-600 font-semibold">{m.price}</span>}
                <Link href={`/materi/${m.id}`}>
                  <button className="text-white bg-purple-600 px-4 py-1 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                    Lihat Detail
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
