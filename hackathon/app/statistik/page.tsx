"use client";

import React from "react";

export default function StatsPage() {
  const achievements = [
    { title: "Juara 1 Lomba Hackathon", description: "Hackathon Nasional 2024 di Jakarta" },
    { title: "Top 10 Finalis AI Challenge", description: "AI Competition 2023 di Bandung" },
    { title: "Best Project Award", description: "Proyek UAV di Kampus Telkom University" },
    { title: "Sertifikasi Flutter Developer", description: "Lulus sertifikasi dengan predikat Excellent" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">📊 Pencapaian & Prestasi</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold text-purple-700 mb-2">
              {achievement.title}
            </h2>
            <p className="text-gray-600">{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
