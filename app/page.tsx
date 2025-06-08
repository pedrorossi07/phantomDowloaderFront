"use client";

import { useState } from "react";
import { DownloadIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PhantomDownloader() {
  const [apiKey, setApiKey] = useState("");
  const [phantomId, setPhantomId] = useState("");
  const [loading, setLoading] = useState(false);

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
      const response = await fetch("http://localhost:8000/baixar/", {
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
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-8">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <h1 className="text-white text-3xl font-medium">
          PhantomBuster Downloader
        </h1>

        <div className="w-full space-y-6">
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
        </div>

        <Button
          className="w-full bg-[#3b5fe2] hover:bg-[#3252c7] text-white h-12 text-lg"
          onClick={baixarDados}
          disabled={loading}
        >
          <DownloadIcon className="mr-2 h-5 w-5" />
          {loading ? "Baixando..." : "Baixar Dados"}
        </Button>
      </div>
    </div>
  );
}
