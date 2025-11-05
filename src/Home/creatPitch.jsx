import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatPitch = () => {
  const [Data, setData] = useState({
    title: "",
    description: "",
    industry: "",
    length: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

   try {
  const docRef = await addDoc(collection(db, "pitchData"), {
    title: Data.title,
    description: Data.description,
    industry: Data.industry,
    length: Data.length,
    createdAt: new Date(),
  });

      console.log("✅ Pitch added with ID:", docRef.id);
      alert("Pitch added successfully ✅");

      // Navigate to generated pitch page
      navigate(`/generatedPitch/${docRef.id}`);

      // Clear form
      setData({ title: "", description: "", industry: "", length: "" });
    } catch (error) {
      console.error("❌ Error adding pitch:", error);
      alert("Error adding pitch ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1f242d] flex flex-col justify-center items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Create Pitch</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-8 bg-[#10101a] rounded-2xl shadow-lg w-full max-w-md gap-4"
      >
        <input
          type="text"
          name="title"
          value={Data.title}
          onChange={handleInputChange}
          placeholder="Pitch Title"
          className="p-3 border border-gray-400 text-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <textarea
          name="description"
          value={Data.description}
          onChange={handleInputChange}
          placeholder="Pitch Description"
          rows="3"
          className="p-3 border border-gray-400 text-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        ></textarea>

        <input
          type="text"
          name="industry"
          value={Data.industry}
          onChange={handleInputChange}
          placeholder="Industry (e.g. Tech, Fashion, Finance)"
          className="p-3 border border-gray-400 text-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          type="text"
          name="length"
          value={Data.length}
          onChange={handleInputChange}
          placeholder="Pitch Length (e.g. Short, Medium, Long)"
          className="p-3 border border-gray-400 text-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-[#10101a] p-3 rounded-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#7cf03d] hover:bg-[#5fb92f] text-[#10101a] cursor-pointer"
          }`}
        >
          {loading ? "Adding..." : "Add Pitch"}
        </button>
      </form>
    </div>
  );
};

export default CreatPitch;
