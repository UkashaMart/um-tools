"use client";
import { useState } from "react";

function md5(input: string): string {
  function safeAdd(x: number, y: number) { const lsw = (x & 0xffff) + (y & 0xffff); return ((x >> 16) + (y >> 16) + (lsw >> 16)) << 16 | lsw & 0xffff; }
  function rol(n: number, c: number) { return n << c | n >>> 32 - c; }
  function cmn(q: number, a: number, b: number, x: number, s: number, t: number) { return safeAdd(rol(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b); }
  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn(b & c | ~b & d, a, b, x, s, t); }
  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn(b & d | c & ~d, a, b, x, s, t); }
  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn(b ^ c ^ d, a, b, x, s, t); }
  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn(c ^ (b | ~d), a, b, x, s, t); }
  const str = unescape(encodeURIComponent(input));
  const bin: number[] = [];
  for (let i = 0; i < str.length * 8; i += 8) bin[i >> 5] |= (str.charCodeAt(i / 8) & 0xff) << i % 32;
  bin[(str.length >> 2) + 1 & ~1 | (str.length & 3 ? 0 : 0)] = 0;
  bin[str.length >> 2] |= 0x80 << str.length % 4 * 8;
  bin[((str.length + 8 >> 6) + 1) * 16 - 2] = str.length * 8;
  let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
  for (let i = 0; i < bin.length; i += 16) {
    const [oa, ob, oc, od] = [a, b, c, d];
    a=ff(a,b,c,d,bin[i],7,-680876936);d=ff(d,a,b,c,bin[i+1],12,-389564586);c=ff(c,d,a,b,bin[i+2],17,606105819);b=ff(b,c,d,a,bin[i+3],22,-1044525330);
    a=ff(a,b,c,d,bin[i+4],7,-176418897);d=ff(d,a,b,c,bin[i+5],12,1200080426);c=ff(c,d,a,b,bin[i+6],17,-1473231341);b=ff(b,c,d,a,bin[i+7],22,-45705983);
    a=ff(a,b,c,d,bin[i+8],7,1770035416);d=ff(d,a,b,c,bin[i+9],12,-1958414417);c=ff(c,d,a,b,bin[i+10],17,-42063);b=ff(b,c,d,a,bin[i+11],22,-1990404162);
    a=ff(a,b,c,d,bin[i+12],7,1804603682);d=ff(d,a,b,c,bin[i+13],12,-40341101);c=ff(c,d,a,b,bin[i+14],17,-1502002290);b=ff(b,c,d,a,bin[i+15],22,1236535329);
    a=gg(a,b,c,d,bin[i+1],5,-165796510);d=gg(d,a,b,c,bin[i+6],9,-1069501632);c=gg(c,d,a,b,bin[i+11],14,643717713);b=gg(b,c,d,a,bin[i],20,-373897302);
    a=gg(a,b,c,d,bin[i+5],5,-701558691);d=gg(d,a,b,c,bin[i+10],9,38016083);c=gg(c,d,a,b,bin[i+15],14,-660478335);b=gg(b,c,d,a,bin[i+4],20,-405537848);
    a=gg(a,b,c,d,bin[i+9],5,568446438);d=gg(d,a,b,c,bin[i+14],9,-1019803690);c=gg(c,d,a,b,bin[i+3],14,-187363961);b=gg(b,c,d,a,bin[i+8],20,1163531501);
    a=gg(a,b,c,d,bin[i+13],5,-1444681467);d=gg(d,a,b,c,bin[i+2],9,-51403784);c=gg(c,d,a,b,bin[i+7],14,1735328473);b=gg(b,c,d,a,bin[i+12],20,-1926607734);
    a=hh(a,b,c,d,bin[i+5],4,-378558);d=hh(d,a,b,c,bin[i+8],11,-2022574463);c=hh(c,d,a,b,bin[i+11],16,1839030562);b=hh(b,c,d,a,bin[i+14],23,-35309556);
    a=hh(a,b,c,d,bin[i+1],4,-1530992060);d=hh(d,a,b,c,bin[i+4],11,1272893353);c=hh(c,d,a,b,bin[i+7],16,-155497632);b=hh(b,c,d,a,bin[i+10],23,-1094730640);
    a=hh(a,b,c,d,bin[i+13],4,681279174);d=hh(d,a,b,c,bin[i],11,-358537222);c=hh(c,d,a,b,bin[i+3],16,-722521979);b=hh(b,c,d,a,bin[i+6],23,76029189);
    a=hh(a,b,c,d,bin[i+9],4,-640364487);d=hh(d,a,b,c,bin[i+12],11,-421815835);c=hh(c,d,a,b,bin[i+15],16,530742520);b=hh(b,c,d,a,bin[i+2],23,-995338651);
    a=ii(a,b,c,d,bin[i],6,-198630844);d=ii(d,a,b,c,bin[i+7],10,1126891415);c=ii(c,d,a,b,bin[i+14],15,-1416354905);b=ii(b,c,d,a,bin[i+5],21,-57434055);
    a=ii(a,b,c,d,bin[i+12],6,1700485571);d=ii(d,a,b,c,bin[i+3],10,-1894986606);c=ii(c,d,a,b,bin[i+10],15,-1051523);b=ii(b,c,d,a,bin[i+1],21,-2054922799);
    a=ii(a,b,c,d,bin[i+8],6,1873313359);d=ii(d,a,b,c,bin[i+15],10,-30611744);c=ii(c,d,a,b,bin[i+6],15,-1560198380);b=ii(b,c,d,a,bin[i+13],21,1309151649);
    a=ii(a,b,c,d,bin[i+4],6,-145523070);d=ii(d,a,b,c,bin[i+11],10,-1120210379);c=ii(c,d,a,b,bin[i+2],15,718787259);b=ii(b,c,d,a,bin[i+9],21,-343485551);
    a=safeAdd(a,oa);b=safeAdd(b,ob);c=safeAdd(c,oc);d=safeAdd(d,od);
  }
  const hex = "0123456789abcdef";
  let out = "";
  for (let i = 0; i < 4; i++) { const n = [a,b,c,d][i]; for (let j = 0; j < 4; j++) { out += hex[(n >> j*8+4) & 0xf] + hex[(n >> j*8) & 0xf]; } }
  return out;
}

export default function MD5Client() {
  const [input, setInput] = useState("");
  const hash = input ? md5(input) : "";
  return (
    <div>
      <h1 style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: "#F5C842", marginBottom: ".2rem" }}>MD5 Hash Generator</h1>
      <p style={{ fontSize: ".78rem", color: "#9A8F78", marginBottom: "1rem" }}>Instantly generate MD5 hashes for text, ideal for file checksum verification and data integrity checks.</p>
      
      <div className="card" style={{ marginBottom: "1rem" }}>
        <textarea className="inp" rows={4} placeholder="Type your text here..." value={input} onChange={e => setInput(e.target.value)} style={{ resize: "vertical", marginBottom: ".75rem" }} />
        <div style={{ fontSize: ".62rem", color: "#D4A017", letterSpacing: "2px", textTransform: "uppercase", marginBottom: ".4rem" }}>MD5 Hash Result</div>
        <div className={`res-box${hash ? " ok" : ""}`} style={{ fontFamily: "monospace", fontSize: ".95rem", letterSpacing: 1 }}>{hash || "Your hash will appear here..."}</div>
        {hash && <button className="btn-outline" onClick={() => navigator.clipboard.writeText(hash)} style={{ marginTop: ".5rem" }}>Copy Hash</button>}
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>What is an MD5 Hash?</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78", lineHeight: 1.9 }}>
          <div style={{ marginBottom: ".5rem" }}>MD5 (Message Digest Algorithm 5) is a widely-used cryptographic hashing function that transforms any input into a unique 32-character hexadecimal string. Even minor changes in the input result in a completely different hash output.</div>
          <div style={{ padding: ".4rem .75rem", background: "rgba(212,160,23,.06)", borderRadius: 7, fontFamily: "monospace", fontSize: ".78rem" }}>
            <div style={{ color: "#9A8F78" }}>Input: "Hello"</div>
            <div style={{ color: "#F5C842" }}>MD5: 8b1a9953c4611296a827abf8c47804d7</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Common MD5 Use Cases</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: ".6rem" }}>
          {[["File Integrity", "Verify files post-download to ensure they are corruption-free."], ["Data Checksums", "Quickly detect data errors in transmission or storage."], ["Legacy Systems", "Support for older system databases and application workflows."], ["Authenticity Checks", "Basic digital signature validation for static assets."]].map(([t, d]) => (
            <div key={t} style={{ padding: ".6rem", background: "rgba(212,160,23,.05)", borderRadius: 7, borderLeft: "2px solid rgba(212,160,23,.3)" }}>
              <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>{t}</div>
              <div style={{ fontSize: ".74rem", color: "#9A8F78" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".5rem" }}>Security Warning</h2>
        <div style={{ fontSize: ".82rem", color: "#9A8F78", padding: ".5rem .75rem", background: "rgba(239,68,68,.06)", borderRadius: 7, borderLeft: "2px solid #ef4444" }}>
          MD5 is cryptographically broken and is not suitable for secure password storage. For modern security requirements, always use stronger algorithms like bcrypt or Argon2.
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#F5C842", marginBottom: ".75rem" }}>Frequently Asked Questions</h2>
        {[
          ["Is MD5 considered secure?", "No. Because it is cryptographically broken, MD5 should be reserved for checksums only and never used for password encryption."],
          ["Does the same input always result in the same hash?", "Yes. MD5 is deterministic, meaning the exact same input string will always yield the exact same 32-character hexadecimal hash output."],
          ["Can I reverse an MD5 hash back to the original text?", "No. MD5 is a one-way hash function. It is mathematically impossible to reconstruct the original input from the resulting hash string."]
        ].map(([q, a]) => (
          <div key={q} style={{ marginBottom: ".6rem", paddingBottom: ".6rem", borderBottom: "1px solid rgba(212,160,23,.1)" }}>
            <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#F0E6C8", marginBottom: ".2rem" }}>Q: {q}</div>
            <div style={{ fontSize: ".78rem", color: "#9A8F78" }}>A: {a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}