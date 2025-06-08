import { useState } from "react";

export default function BaixarDados() {
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
    <div style={{ padding: 20 }}>
      <input
        type="password"
        placeholder="API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: 300 }}
      />
      <input
        type="text"
        placeholder="Phantom ID"
        value={phantomId}
        onChange={(e) => setPhantomId(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: 300 }}
      />
      <button onClick={baixarDados} disabled={loading}>
        {loading ? "Baixando..." : "Baixar Dados"}
      </button>
    </div>
  );
}
