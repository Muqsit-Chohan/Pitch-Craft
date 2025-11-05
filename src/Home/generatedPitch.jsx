import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI("AIzaSyCgDu7jxrzDacfpMmjxF0RTGayEJ3dmtWk");

export default function GeneratedPitch() {
  const { pitchId } = useParams();
  const [pitch, setPitch] = useState(null);
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to generate pitch using Gemini API
const handleGenerate = async (pitchData = pitch) => {
  if (!pitchData || loading) return;
  if (!pitchId) {
    alert("❌ Pitch ID missing — cannot save generated pitch!");
    return;
  }

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


  useEffect(() => {

     if (!pitchId) {
    console.warn("❌ pitchId missing!");
    return;
  }


    const fetchPitch = async () => {
      try {
        const docRef = doc(db, "pitchData", pitchId);
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
    <div className="min-h-screen bg-[#1f242d] flex flex-col items-center py-12 px-6 font-[Poppins]">
      {pitch ? (
        <div className="max-w-3xl w-full bg-[#1f242d] shadow-lg rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold flex gap-3 justify-center items-center text-gray-100 mb-4 uppercase underline decoration-[#7cf03d] underline-offset-4"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#75FB4C"><path d="M160-360q-50 0-85-35t-35-85q0-50 35-85t85-35v-80q0-33 23.5-56.5T240-760h120q0-50 35-85t85-35q50 0 85 35t35 85h120q33 0 56.5 23.5T800-680v80q50 0 85 35t35 85q0 50-35 85t-85 35v160q0 33-23.5 56.5T720-120H240q-33 0-56.5-23.5T160-200v-160Zm200-80q25 0 42.5-17.5T420-500q0-25-17.5-42.5T360-560q-25 0-42.5 17.5T300-500q0 25 17.5 42.5T360-440Zm240 0q25 0 42.5-17.5T660-500q0-25-17.5-42.5T600-560q-25 0-42.5 17.5T540-500q0 25 17.5 42.5T600-440ZM320-280h320v-80H320v80Zm-80 80h480v-480H240v480Zm240-240Z"/></svg> {pitch.title}</h2>

          <div className="space-y-2 text-gray-200 mb-6">
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
            <div className="mt-8 p-6 border border-gray-200 rounded-xl bg-[#10101a] text-white shadow-md">
              <h3 className="text-lg font-semibold text-gray-50 mb-3">✨ Generated Pitch</h3>
              <p className="text-gray-50 leading-relaxed whitespace-pre-line">{generated}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-600 text-lg font-medium mt-20">Loading pitch details...</div>
      )}
    </div>
  );
}
