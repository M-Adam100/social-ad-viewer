(async () => {

  const sponsoredTexts = ["Sponsored", "مُموَّل",
    "赞助内容",
    "贊助",
    "Sponzorováno",
    "Gesponsord",
    "May Sponsor",
    "Commandité",
    "Sponsorisé",
    "Gesponsert",
    "Χορηγούμενη",
    "ממומן",
    "प्रायोजित",
    "Hirdetés",
    "Bersponsor",
    "Sponsorizzato",
    "広告",
    "Sponsorowane",
    "Patrocinado",
    "Sponsorizat",
    "Реклама",
    "Sponzorované",
    "Publicidad",
    "Sponsrad",
    "ได้รับการสนับสนุน",
    "Sponsorlu",
    "Được tài trợ"
  ];

  function getTextFromElement(e) {
    return (e.innerText === "" ? e.dataset.content : e.innerText) || "";
  }



  function isHidden(e) {
    const style = window.getComputedStyle(e);
    if (style.display === "none" || style.opacity === "0" || style.fontSize === "0px" || style.visibility === "hidden" || style.position === "absolute") {
      return true;
    }
    return false;
  }

  function getTextFromContainerElement(e) {
    return e.dataset.content || Array.prototype.filter.call(e.childNodes, element => {
      return element.nodeType === Node.TEXT_NODE;
    })
      .map(element => {
        return element.textContent;
      })
      .join("");
  }

  function getVisibleText(e) {
    if (isHidden(e)) {
      return "";
    }
    const children = e.querySelectorAll(":scope > *");
    if (children.length !== 0) {
      return getTextFromContainerElement(e) + Array.prototype.slice.call(children)
        .map(getVisibleText)
        .flat()
        .join("");
    }
    return getTextFromElement(e);
  }

  const { number = null }  = await chrome.storage.local.get(['number']);

  setInterval(() => {
    const feed = document.querySelector('div[role="feed"]');
    const posts = [...feed?.querySelectorAll('[data-pagelet]:not([post-covered])')];
    if (posts.length) {
      posts.forEach(item => {
        const visibleText = getVisibleText(item);
        let comments = item.querySelector('div[aria-expanded="false"][role="button"][tabindex="0"]:not([aria-label])')?.innerText.split(' ')[0] || '0';
        if (comments.includes('K')) {
          comments = comments.split('K')[0];
          comments = Number(comments)*1000;
        } else comments = Number(comments);

        if (sponsoredTexts.every(sponsoredText => visibleText.indexOf(sponsoredText) === -1)) {
          item.style.display = "none";
          item.dataset.blocked = "normal";
          console.info(`Post Removed`, [item]);
        } else if (number && Number(number) > comments) {
          item.style.display = "none";
          item.dataset.blocked = "sponsored";
          console.info(`Ad Removed`, [item]);
        }
        item.setAttribute('post-covered', true);
      })

    
    }

  }, 300);


})()