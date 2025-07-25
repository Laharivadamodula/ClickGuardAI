const suspiciousPatterns = [
  /free/i,
  /login/i,
  /offer/i,
  /click/i,
  /win/i,
  /@/,
  /bit\.ly/i,
  /amaz0n/i,
  /pypal/i,
  /account[-.]?verify/i,
  /secure[-.]?login/i,
  /claim[-.]?prize/i,
  /[a-z]+\.com\.free-offers/i,
];

// List of whitelisted known good domains
const safeDomains = [
  "google.com",
  "youtube.com",
  "facebook.com",
  "amazon.com",
  "apple.com",
  "microsoft.com",
  "netflix.com",
  "bbc.com",
  "instagram.com",
  "reddit.com"
];

let currentUrl = "";

function isSuspicious(url) {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\./, "");

    // Whitelist known safe domains
    if (safeDomains.includes(hostname)) {
      return false;
    }

    // Check suspicious patterns
    return suspiciousPatterns.some((pattern) => pattern.test(url));
  } catch (e) {
    return true; // Invalid URL format is suspicious
  }
}

function checkUrl() {
  const urlInput = document.getElementById('urlInput');
  const resultText = document.getElementById('resultText');
  const continueBtn = document.getElementById('continueBtn');
  const url = urlInput.value.trim();
  currentUrl = url;

  if (!url) {
    resultText.textContent = "❗ Please enter a URL.";
    resultText.style.color = "orange";
    continueBtn.disabled = true;
    return;
  }

  const suspicious = isSuspicious(url);
  if (suspicious) {
    resultText.textContent = "⚠️ This URL appears suspicious.";
    resultText.style.color = "#ff5252";
  } else {
    resultText.textContent = "✅ This URL seems safe.";
    resultText.style.color = "#00ffb2";
  }

  continueBtn.disabled = false;
}

function continueToUrl() {
  if (currentUrl) {
    window.open(currentUrl, '_blank');
  }
}
