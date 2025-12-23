document.addEventListener("DOMContentLoaded", function () {
  console.log("go.js loaded");
  
  const lang = document.documentElement.lang.toLowerCase();
  console.log("Language:", lang);

  const CONFIG = {
    "ru-pl": {
      "stonevegas": {
        partnerUrl: "https://stnvgs.fynkelto.com/?mid=271710_1861396",
        fakeUrl: "#stonevegas"
      },
       "winwin": {
        partnerUrl: "https://refpa712080.pro/L?tag=d_4921276m_64485c_&site=4921276&ad=64485",
        fakeUrl: "#winwin"
      },
       "starda": {
        partnerUrl: "https://strd-blcp21.com/c98205e1c",
        fakeUrl: "#starda"
      },
      "azurslot": {
        partnerUrl: "https://moy.auraodin.com/redirect.aspx?pid=152909&lpid=1670&bid=1716",
        fakeUrl: "#azurslot"
      },
      planbet: {
        partnerUrl: "https://plnbt.com/L?tag=d_4509095m_126130c_&site=4509095&ad=126130",
        fakeUrl: "#planbet"
      }
    }
  };

  const entry = CONFIG[lang];
  console.log("Entry config:", entry);
  
  if (!entry) {
    console.log("No entry found for language:", lang);
    return;
  }

  const isBot = () => {
    const ua = (navigator.userAgent||'').toLowerCase();
    return /bot|crawl|spider|headless|phantom|preview|wget|curl|python|node/.test(ua)
           || !!navigator.webdriver;
  };

  function getSlugFromHash(href) {
    if (!href) return '';
    const idx = href.indexOf('#');
    return idx >= 0 ? href.slice(idx + 1) : '';
  }

  document.addEventListener("click", function (e) {
    console.log("Click event triggered");
    // Проверяем, является ли цель ссылкой с атрибутом data-secure-link
    if (e.target.tagName === "A" && e.target.hasAttribute("data-secure-link")) {
      console.log("Clicked on a secure link");
      const hash = getSlugFromHash(e.target.getAttribute("href"));
      console.log("Hash:", hash);
      if (entry[hash]) {
        console.log("Found entry for hash:", hash);
        e.preventDefault();
        
        if (isBot()) {
          console.log("Bot detected, not redirecting");
          return;
        }
        
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
          console.log("Modifier key or non-left click detected, not redirecting");
          return;
        }
        
        console.log("Redirecting to:", entry[hash].partnerUrl);
        window.location.href = entry[hash].partnerUrl;
      } else {
        console.log("No entry found for hash:", hash);
      }
    }
  }, true);

  document.addEventListener("keydown", function (e) {
    console.log("Keydown event triggered, key:", e.key);
    if (e.key === "Enter" && document.activeElement.tagName === "A" && document.activeElement.hasAttribute("data-secure-link")) {
      console.log("Enter key pressed on a secure link");
      const hash = getSlugFromHash(document.activeElement.getAttribute("href"));
      console.log("Hash:", hash);
      if (entry[hash]) {
        console.log("Found entry for hash:", hash);
        e.preventDefault();
        
        if (isBot()) {
          console.log("Bot detected, not redirecting");
          return;
        }
        
        console.log("Redirecting to:", entry[hash].partnerUrl);
        window.location.href = entry[hash].partnerUrl;
      } else {
        console.log("No entry found for hash:", hash);
      }
    }
  });
});
