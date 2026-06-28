"use client";

import { useState } from "react";
import JSZip from "jszip";

export default function ProductImageExtractor() {
  const [url, setUrl] = useState("");
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all | meta | gallery

  const handleExtract = async () => {
    setError("");
    setImages([]);
    setSelected(new Set());

    if (!url.trim()) {
      setError("Pehle URL daalo");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/extract-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Kuch error aaya");
      } else {
        setImages(data.images);
        setSelected(new Set(data.images.map((img) => img.url)));
      }
    } catch {
      setError("Page fetch nahi ho saka. URL check karo.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (imgUrl) => {
    const next = new Set(selected);
    if (next.has(imgUrl)) next.delete(imgUrl);
    else next.add(imgUrl);
    setSelected(next);
  };

  const downloadSingle = (imgUrl) => {
    const a = document.createElement("a");
    a.href = `/api/proxy-image?url=${encodeURIComponent(imgUrl)}`;
    a.download = imgUrl.split("/").pop().split("?")[0] || "image.jpg";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    const selectedImages = images.filter((img) => selected.has(img.url));

    for (let i = 0; i < selectedImages.length; i++) {
      try {
        const res = await fetch(
          `/api/proxy-image?url=${encodeURIComponent(selectedImages[i].url)}`
        );
        const blob = await res.blob();
        const name =
          selectedImages[i].url.split("/").pop().split("?")[0] ||
          `image-${i + 1}.jpg`;
        zip.file(name, blob);
      } catch {
        // skip failed image
      }
    }

    const content = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = "product-images.zip";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const filteredImages =
    filter === "all" ? images : images.filter((img) => img.type === filter);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "Cinzel, serif", color: "#F5C842" }}>
        Product Image Extractor
      </h1>
      <p className="text-gray-400 mb-6">
        Kisi bhi product page ka URL daalo, saari images nikal ke download karo.
      </p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://store.ukashamart.com/product/xyz"
          className="flex-1 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <button
          onClick={handleExtract}
          disabled={loading}
          className="px-6 py-2 rounded font-semibold"
          style={{ backgroundColor: "#D4A017", color: "#000" }}
        >
          {loading ? "Fetching..." : "Extract"}
        </button>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {images.length > 0 && (
        <>
          <div className="flex gap-2 mb-4">
            {["all", "meta", "gallery"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded text-sm ${
                  filter === f ? "bg-yellow-600 text-black" : "bg-gray-700 text-white"
                }`}
              >
                {f === "all" ? "All" : f === "meta" ? "Meta/OG" : "Gallery"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {filteredImages.map((img) => (
              <div
                key={img.url}
                className={`relative border rounded overflow-hidden cursor-pointer ${
                  selected.has(img.url) ? "border-yellow-400" : "border-gray-700"
                }`}
                onClick={() => toggleSelect(img.url)}
              >
                <img src={img.url} alt="" className="w-full h-32 object-cover" />
                <input
                  type="checkbox"
                  checked={selected.has(img.url)}
                  onChange={() => toggleSelect(img.url)}
                  className="absolute top-2 left-2 w-4 h-4"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadSingle(img.url);
                  }}
                  className="absolute bottom-1 right-1 text-xs bg-black/70 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={downloadZip}
            disabled={selected.size === 0}
            className="px-6 py-2 rounded font-semibold"
            style={{ backgroundColor: "#F5C842", color: "#000" }}
          >
            Download Selected ({selected.size}) as ZIP
          </button>
        </>
      )}
    </div>
  );
}