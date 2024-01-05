document.onreadystatechange = function () {
    if (document.readyState === "loading") {
      document.body.classList.add("loading");
    } else {
      document.body.classList.remove("loading");
    }
  };