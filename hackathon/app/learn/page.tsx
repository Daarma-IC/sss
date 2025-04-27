"use client";

import { useEffect, useState } from "react";

export default function LearnPage() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("huruf");
  
  const API_KEY = "sk-f6f41de8b17a4887a5b1473e7d8b1a1d";
  const API_URL = "https://api.deepseek.com/v1/chat/completions";
  
  const categories = [
    { id: "huruf", name: "Huruf", icon: "🔤", color: "from-red-500 to-pink-500" },
    { id: "angka", name: "Angka", icon: "🔢", color: "from-blue-500 to-cyan-500" },
    { id: "warna", name: "Warna", icon: "🎨", color: "from-yellow-500 to-amber-500" },
    { id: "hewan", name: "Hewan", icon: "🦁", color: "from-green-500 to-emerald-500" }
  ];
  
  const parseQuestionData = (content) => {
    try {
      // Ini adalah parsing sederhana, bisa disesuaikan berdasarkan format output API
      const questionMatch = content.match(/Soal:(.+?)(?=Pilihan|$)/s);
      const optionsMatch = content.match(/Pilihan:(.+?)(?=Jawaban benar:|$)/s);
      const answerMatch = content.match(/Jawaban benar:(.+?)$/s);
      
      let questionText = questionMatch ? questionMatch[1].trim() : content;
      let parsedOptions = [];
      
      if (optionsMatch) {
        const optionsText = optionsMatch[1].trim();
        // Coba ekstrak opsi dari format seperti "A. Apple, B. Banana"
        const optionsPattern = /([A-Z])\.\s*([^,A-Z]+)(?:,|$)/g;
        let match;
        while ((match = optionsPattern.exec(optionsText)) !== null) {
          parsedOptions.push({
            id: match[1],
            text: match[2].trim()
          });
        }
        
        // Jika tidak berhasil, coba format lain atau bagi teks menjadi 2 opsi
        if (parsedOptions.length === 0) {
          const parts = optionsText.split(/[,;]/).filter(part => part.trim().length > 0);
          parsedOptions = parts.map((part, index) => ({
            id: String.fromCharCode(65 + index), // A, B, C, ...
            text: part.trim()
          }));
        }
      }
      
      // Jika masih tidak ada opsi yang ditemukan, buat dummy options
      if (parsedOptions.length === 0) {
        parsedOptions = [
          { id: "A", text: "Pilihan 1" },
          { id: "B", text: "Pilihan 2" }
        ];
      }
      
      let answer = answerMatch ? answerMatch[1].trim() : "";
      // Coba ekstrak huruf jawaban (A/B/dll) jika tersedia
      const letterMatch = answer.match(/^([A-Z])/);
      if (letterMatch) {
        answer = letterMatch[1];
      } else {
        // Jika tidak ada huruf, cari opsi yang teksnya cocok dengan jawaban
        const matchingOption = parsedOptions.find(option => 
          answer.includes(option.text) || option.text.includes(answer)
        );
        if (matchingOption) {
          answer = matchingOption.id;
        } else {
          // Jika masih tidak menemukan, gunakan opsi pertama sebagai default
          answer = parsedOptions[0]?.id || "A";
        }
      }
      
      return {
        question: questionText,
        options: parsedOptions,
        correctAnswer: answer
      };
    } catch (error) {
      console.error("Error parsing question data:", error);
      return {
        question: content,
        options: [
          { id: "A", text: "Pilihan 1" },
          { id: "B", text: "Pilihan 2" }
        ],
        correctAnswer: "A"
      };
    }
  };
  
  const fetchNewQuestion = async () => {
    setLoading(true);
    setSelectedAnswer(null);
    setShowResult(false);
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "user",
              content: `Buatkan satu soal edukasi balita tentang ${currentCategory} beserta 2 pilihan jawaban (A dan B), jawaban benar disebutkan. Format: Soal: [pertanyaan] Pilihan: A. [pilihan A], B. [pilihan B] Jawaban benar: [huruf jawaban benar]`,
            },
          ],
        }),
      });
      
      const data = await response.json();
      console.log("Hasil dari DeepSeek:", data);
      const message = data.choices[0].message.content;
      
      const parsedData = parseQuestionData(message);
      setQuestion(parsedData.question);
      setOptions(parsedData.options);
      setCorrectAnswer(parsedData.correctAnswer);
    } catch (error) {
      console.error("Gagal fetch dari DeepSeek API:", error);
      // Tampilkan pertanyaan dummy jika API gagal
      setQuestion("Manakah huruf pertama dari kata 'Apel'?");
      setOptions([
        { id: "A", text: "A" },
        { id: "B", text: "B" }
      ]);
      setCorrectAnswer("A");
    }
    
    setLoading(false);
  };
  
  useEffect(() => {
    fetchNewQuestion();
  }, [currentCategory]);
  
  const handleSelectAnswer = (optionId) => {
    setSelectedAnswer(optionId);
    setIsCorrect(optionId === correctAnswer);
    setShowResult(true);
  };
  
  const handleNextQuestion = () => {
    fetchNewQuestion();
  };
  
  const handleChangeCategory = (categoryId) => {
    if (categoryId !== currentCategory) {
      setCurrentCategory(categoryId);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center text-white mr-3">
              <span className="text-xl">🧠</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">AI Guru Balita</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors">
              Kembali ke Dashboard
            </button>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white">
              AB
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Category Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Pilih Kategori Soal</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                    currentCategory === category.id
                      ? `bg-gradient-to-br ${category.color} text-white shadow-md transform scale-105`
                      : "bg-white border border-gray-200 text-gray-700 hover:shadow-md"
                  }`}
                  onClick={() => handleChangeCategory(category.id)}
                >
                  <span className="text-3xl mb-2">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Progress Bar */}
            <div className="h-2 bg-gray-100">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 w-1/3"></div>
            </div>
            
            <div className="p-6 md:p-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-lg text-gray-700">Memuat pertanyaan dari AI Guru...</p>
                </div>
              ) : (
                <div>
                  {/* Question */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mr-3">
                        <span>❓</span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-800">Soal Untuk Kamu</h2>
                    </div>
                    <p className="text-lg text-gray-700 bg-yellow-50 p-4 rounded-xl border border-yellow-100">{question}</p>
                  </div>
                  
                  {/* Options */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Pilih Jawaban:</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {options.map((option) => (
                        <button
                          key={option.id}
                          className={`p-4 rounded-xl flex items-center justify-center transition-all text-lg font-medium 
                            ${
                              selectedAnswer === option.id
                                ? showResult
                                  ? isCorrect
                                    ? "bg-green-100 text-green-700 border-2 border-green-500"
                                    : option.id === correctAnswer
                                      ? "bg-green-100 text-green-700 border-2 border-green-500"
                                      : "bg-red-100 text-red-700 border-2 border-red-500"
                                  : "bg-blue-100 text-blue-700 border-2 border-blue-500"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          onClick={() => !showResult && handleSelectAnswer(option.id)}
                          disabled={showResult}
                        >
                          <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3">
                            {option.id}
                          </span>
                          {option.text}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Result and Next Button */}
                  {showResult && (
                    <div className="text-center">
                      <div className={`p-4 rounded-xl mb-4 ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
                        <p className={`text-xl font-bold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                          {isCorrect ? "Benar! 🎉" : "Ayo Coba Lagi! 💪"}
                        </p>
                        <p className={`${isCorrect ? "text-green-600" : "text-red-600"}`}>
                          {isCorrect
                            ? "Kamu pintar sekali!"
                            : `Jawaban yang benar adalah ${correctAnswer}`}
                        </p>
                      </div>
                      <button
                        className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                        onClick={handleNextQuestion}
                      >
                        Soal Berikutnya
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Tips Section */}
          <div className="mt-8 bg-white rounded-2xl shadow p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                <span>💡</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Tips untuk Orang Tua</h2>
            </div>
            <p className="text-gray-700">
              Dorong anak untuk menjawab dengan percaya diri. Jika jawaban salah, gunakan sebagai kesempatan
              belajar bersama. Puji usaha mereka, bukan hanya jawaban yang benar. Jadikan belajar sebagai 
              aktivitas yang menyenangkan dan tidak menekan.
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-4 px-6 shadow-inner">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <p className="text-gray-600">© 2025 AI Guru Balita</p>
          <div className="flex space-x-4">
            <button className="text-purple-600 hover:underline">Bantuan</button>
            <button className="text-purple-600 hover:underline">Kontak</button>
          </div>
        </div>
      </footer>
    </div>
  );
}