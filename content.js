const selector = "SELECTOR_HERE";

const statusElement = () => {
  const el = document.querySelector(
    "#sidebar > div:nth-child(11) > div:nth-child(2)"
  );
  if (el) {
    return el.style["visibility"];
  } else {
    return "";
  }
};

const hideElement = () => {
  const el = document.querySelector(
    "#sidebar > div:nth-child(11) > div:nth-child(2)"
  );
  if (el) {
    el.style["visibility"] = "hidden";
    console.log(`hidden element: ${selector}`);
  } else {
    console.log(`Element not found: ${selector}`);
  }
};

const viewElement = () => {
  const el = document.querySelector(
    "#sidebar > div:nth-child(11) > div:nth-child(2)"
  );
  if (el) {
    el.style["visibility"] = "visible";
    console.log(`visible element: ${selector}`);
  } else {
    console.log(`Element not found: ${selector}`);
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.action);
  if (request.action === "toggle") {
    stat = statusElement();
    if (stat == "visible") {
      hideElement();
      sendResponse({ status: "hide" });
      return;
    } else if (stat == "hidden") {
      viewElement();
      sendResponse({ status: "view" });
      return;
    }

    sendResponse({ status: "nothing reason: " + stat });
  }
});

// 페이지가 완전히 로드되었을 때 실행
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", hideElement);
} else {
  hideElement();
}
