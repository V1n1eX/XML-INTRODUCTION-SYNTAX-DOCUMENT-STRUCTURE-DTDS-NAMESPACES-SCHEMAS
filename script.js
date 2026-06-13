const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<catalogue xmlns:cat="https://example.edu/catalogue">
  <book id="bk101" category="Web">
    <cat:title>XML Fundamentals</cat:title>
    <author>Amara Phiri</author>
    <year>2026</year>
    <price currency="USD">24.50</price>
  </book>
</catalogue>`;

const xmlInput = document.querySelector("#xmlInput");
const resultCard = document.querySelector("#resultCard");
const resultTitle = document.querySelector("#resultTitle");
const resultMessage = document.querySelector("#resultMessage");
const resetSample = document.querySelector("#resetSample");

function parseXml(xmlText) {
  if (!xmlText.trim()) {
    return {
      ok: false,
      empty: true,
      message: "Paste XML to begin checking."
    };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "application/xml");
  const error = doc.querySelector("parsererror");

  if (error) {
    return {
      ok: false,
      message: error.textContent.trim().replace(/\s+/g, " ")
    };
  }

  return { ok: true, doc };
}

function setValidation(result) {
  resultCard.classList.toggle("good", result.ok);
  resultCard.classList.toggle("bad", !result.ok && !result.empty);

  if (result.empty) {
    resultTitle.textContent = "Waiting for XML";
    resultMessage.textContent = result.message;
    return;
  }

  if (result.ok) {
    const root = result.doc.documentElement.nodeName;
    resultTitle.textContent = "Well-formed XML";
    resultMessage.textContent = `The parser found one root element: <${root}>. This is syntax-correct XML.`;
    return;
  }

  resultTitle.textContent = "Invalid XML syntax";
  resultMessage.textContent = result.message || "The parser could not read this XML.";
}

xmlInput.addEventListener("input", () => {
  setValidation(parseXml(xmlInput.value));
});

resetSample.addEventListener("click", () => {
  xmlInput.value = sampleXml;
  setValidation(parseXml(sampleXml));
});

xmlInput.value = sampleXml;
setValidation(parseXml(sampleXml));
