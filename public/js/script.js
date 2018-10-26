function userLoginInitiate(url){
    localStorage.setItem("tempURL", location.href);
    window.location = location.origin + url;
  }

