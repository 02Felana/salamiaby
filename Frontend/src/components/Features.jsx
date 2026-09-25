import React, { useRef, useState } from "react";

export default function Features() {
  const featuresRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const [dialect, setDialect] = useState("sakalava");
  const [translation, setTranslation] = useState("");

  const handleTranslate = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texte_source: inputText, dialect }),
      });

      const data = await response.json();
      setTranslation(data.traduction || "Traduction non trouvée");
    } catch (error) {
      console.error("Erreur lors de la traduction :", error);
      setTranslation("Erreur lors de la traduction");
    }
  };

  return (
    <section id="features" ref={featuresRef} className="py-16 px-4 bg-white text-center">
      <h2 className="text-4xl font-bold text-green-800 mb-12">Démo</h2>

      <div className="max-w-4xl mx-auto bg-purple-50 p-10 rounded-2xl shadow-md">
        <h3 className="text-2xl font-semibold text-gray-600 mb-6">Détection de texte</h3>

        <textarea
          placeholder="Tapez le texte que vous voulez savoir"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full h-32 p-4 border border-purple-200 rounded-md resize-none bg-purple-100 placeholder-gray-700 text-gray-800 mb-6"
        ></textarea>

        <div className="mb-4">
          <select
            value={dialect}
            onChange={(e) => setDialect(e.target.value)}
            className="p-2 border rounded-md text-gray-800 bg-white"
          >
            <option value="sakalava">Sakalava</option>
            <option value="betsileo">Betsileo</option>
            <option value="tanala">Tanala</option>
            {/* Tu peux ajouter d'autres dialectes ici */}
          </select>
        </div>

        <div className="text-right">
          <button
            onClick={handleTranslate}
            className="bg-gradient-to-tl from-[#046638] to-[#99087E] hover:opacity-90 px-5 py-2 text-white rounded"
          >
            Commencer
          </button>
        </div>

        {translation && (
          <div className="mt-6 text-lg text-purple-700">
            <strong>Traduction :</strong> {translation}
          </div>
        )}
      </div>
    </section>
  );
}
