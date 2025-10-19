import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function GeneratedPitch() {
  const { pitchId } = useParams();
  const [pitch, setPitch] = useState(null);
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to generate pitch using Gemini API
  const handleGenerate = async (pitchData = pitch) => {
    if (!pitchData || loading) return;
    setLoading(true);

    try {
      const model = await genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
      Generate a ${pitchData.length || "short"} startup pitch.
      Title: ${pitchData.title}
      Description: ${pitchData.description}
      Industry: ${pitchData.industry}
      Make it catchy, professional, and clear.
      `;

      const result = await model.generateContent(prompt);

      let text = "⚠️ AI returned no text.";
      if (result.output_text) {
        text = result.output_text;
      } else if (result.response?.text) {
        text = await result.response.text();
      }

      setGenerated(text);

      // Save generated pitch to Firestore
      await updateDoc(doc(db, "pitchData", pitchId), {
        generatedPitch: text,
        generatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("AI Error:", err);
      alert("❌ Error generating pitch");
    } finally {
      setLoading(false);
    }
  };

  // Fetch pitch data from Firestore
  useEffect(() => {
    const fetchPitch = async () => {
      try {
        const docRef = doc(db, "pitchData", pitchId); // ✅ Fixed collection name
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const pitchData = { id: snap.id, ...snap.data() };
          setPitch(pitchData);

          // If pitch already generated, show it
          if (snap.data().generatedPitch) {
            setGenerated(snap.data().generatedPitch);
          } else {
            handleGenerate(pitchData); // Auto-generate if not exists
          }
        } else {
          alert("❌ Pitch not found!");
        }
      } catch (err) {
        console.error("Firestore fetch error:", err);
        alert("❌ Error fetching pitch!");
      }
    };

    if (pitchId) fetchPitch();
  }, [pitchId]);


  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6 font-[Poppins]">
      {pitch ? (
        <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 {pitch.title}</h2>

          <div className="space-y-2 text-gray-700 mb-6">
            <p>
              <span className="font-semibold">Description:</span> {pitch.description}
            </p>
            <p>
              <span className="font-semibold">Industry:</span> {pitch.industry}
            </p>
            <p>
              <span className="font-semibold">Length:</span> {pitch.length || "N/A"}
            </p>
          </div>

          {/* Generate Button */}
          {!generated && (
            <button
              onClick={() => handleGenerate()}
              disabled={loading}
              className={`w-full sm:w-auto bg-black text-white px-6 py-2 rounded-lg font-medium shadow-md transition duration-200 ${
                loading ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-800 active:scale-95"
              }`}
            >
              {loading ? "Generating..." : "Generate Pitch with AI"}
            </button>
          )}

          {/* Generated Pitch */}
          {generated && (
            <div className="mt-8 p-6 border border-gray-200 rounded-xl bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">✨ Generated Pitch</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{generated}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-600 text-lg font-medium mt-20">Loading pitch details...</div>
      )}
    </div>
  );
}
