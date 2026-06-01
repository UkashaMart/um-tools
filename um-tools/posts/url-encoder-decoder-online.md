---
title: "Free Online URL Encoder Decoder — Encode Special Characters Instantly"
date: "2026-05-08"
excerpt: "Encode and decode URLs online for free. Convert special characters to URL-safe percent-encoded format. Essential tool for web developers and API work."
category: "Dev Tools"
---

# Free Online URL Encoder Decoder

When you include special characters in a URL, browsers automatically encode them into a percent-encoded format. Our free URL Encoder Decoder tool lets you manually encode or decode any URL or string instantly — no installation, no signup required.

## What Is URL Encoding?

URLs can only contain a limited set of characters defined by the RFC 3986 standard. Characters outside this set — such as spaces, symbols, and non-ASCII characters — must be converted into a safe format using **percent encoding**.

Each unsafe character is replaced with a `%` sign followed by its two-digit hexadecimal ASCII code. For example, a space becomes `%20` and the `@` symbol becomes `%40`.

## Common URL Encoding Reference

| Original Character | Encoded Value | Description |
|-------------------|--------------|-------------|
| Space | `%20` | Most common encoding |
| `@` | `%40` | Used in email addresses |
| `&` | `%26` | Query string separator |
| `=` | `%3D` | Key-value assignment |
| `+` | `%2B` | Plus sign |
| `/` | `%2F` | Path separator |
| `?` | `%3F` | Query string start |
| `#` | `%23` | Fragment identifier |
| `:` | `%3A` | Protocol separator |
| `,` | `%2C` | Comma |

## Practical Example

**Original URL with spaces and special characters:**
```
https://example.com/search?q=hello world&lang=en
```

**After URL encoding:**
```
https://example.com/search?q=hello%20world&lang=en
```

**Decoding example — convert back to readable form:**
```
Input:  https://example.com/path%2Fto%2Fpage%3Fid%3D42
Output: https://example.com/path/to/page?id=42
```

## When Do You Need URL Encoding?

- **API requests** — Query parameters with special characters must be encoded before sending
- **Search queries** — Search terms with spaces or symbols need encoding
- **Non-Latin text** — Arabic, Urdu, Chinese or any non-ASCII text in URLs
- **Form data submission** — Form values are URL-encoded before being sent to the server
- **Redirect URLs** — When embedding one URL inside another as a parameter
- **OAuth and authentication** — Tokens and keys often contain characters that need encoding

## URL Encoding vs Base64 Encoding

These two are often confused but serve different purposes:

| | URL Encoding | Base64 Encoding |
|--|-------------|----------------|
| Purpose | Make URLs safe | Encode binary data as text |
| Output | `%XX` format | Letters, numbers, `+`, `/` |
| Use case | Query strings, paths | Images, files, API payloads |
| Reversible | Yes | Yes |

Use URL encoding for URLs and query strings. Use [Base64 encoding](/tools/base64) for binary data or file content.

## How to Use the URL Encoder Decoder

1. Open the [URL Encoder Decoder tool](/tools/url-encoder)
2. Paste your URL or text in the input box
3. Click **Encode** to convert special characters to percent-encoded format
4. Click **Decode** to convert encoded text back to its original readable form
5. Copy the result with one click

## Frequently Asked Questions

**What is the difference between encoding a full URL and encoding a parameter?**
When encoding a full URL you should only encode the parameter values, not the entire URL. Encoding the full URL will also encode the `://` and `/` which breaks the URL structure.

**Why does a space sometimes appear as `+` instead of `%20`?**
In HTML form data (`application/x-www-form-urlencoded` format), spaces are encoded as `+`. In standard URL encoding (RFC 3986), spaces are encoded as `%20`. Our tool uses the standard `%20` format.

**Is my data sent to a server?**
No. All encoding and decoding happens entirely in your browser using JavaScript. Your data is never sent anywhere.

**Can I encode non-English text like Arabic or Urdu?**
Yes. Non-ASCII characters are first converted to their UTF-8 byte sequences and then each byte is percent-encoded. This is the correct way to include international text in URLs.

Try our free [URL Encoder Decoder](/tools/url-encoder) now — fast, private, and works entirely in your browser.