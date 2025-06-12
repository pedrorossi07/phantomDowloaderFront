"use client";

import { useState } from "react";
import { DownloadIcon, PlayCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PhantomDownloader() {
  const [apiKey, setApiKey] = useState("");
  const [phantomId, setPhantomId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const baixarDados = async () => {
    if (!apiKey || !phantomId) {
      alert("Preencha todos os campos");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("api_key", apiKey);
    formData.append("phantom_id", phantomId);

    try {
      const response = await fetch("https://phantomdownloaderback.onrender.com/baixar/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert("Erro: " + errorText);
        setLoading(false);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `resultado_${new Date().toISOString()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      alert("Erro ao baixar arquivo: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-8 space-y-8">
      <h1 className="text-white text-3xl font-medium text-center">
        PhantomBuster Downloader
      </h1>

      <div className="w-full max-w-md space-y-6">
        <Input
          type="text"
          placeholder="API Key"
          className="bg-[#333333] border-[#444444] text-gray-200 placeholder:text-gray-500 h-12"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Phantom ID"
          className="bg-[#333333] border-[#444444] text-gray-200 placeholder:text-gray-500 h-12"
          value={phantomId}
          onChange={(e) => setPhantomId(e.target.value)}
        />

        <Button
          className="w-full bg-[#3b5fe2] hover:bg-[#3252c7] text-white h-12 text-lg"
          onClick={baixarDados}
          disabled={loading}
        >
          <DownloadIcon className="mr-2 h-5 w-5" />
          {loading ? "Baixando..." : "Baixar Dados"}
        </Button>


        <Button
          className="w-full bg-transparent border border-white text-white hover:bg-white hover:text-black h-12 text-lg shadow-sm"
          onClick={() => setShowTutorial(!showTutorial)}
        >
          <PlayCircle className="mr-2 h-5 w-5" />
          {showTutorial ? "Esconder Tutorial" : "Ver Tutorial"}
        </Button>

      </div>

      {showTutorial && (
        <div className="mt-6 w-full max-w-2xl aspect-video">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/weopZLojYvQ"
            title="Tutorial do site"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
