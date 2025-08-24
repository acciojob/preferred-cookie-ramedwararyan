//your JS code here. If required.
 function setCookie(name, value, days) {
      const d = new Date();
      d.setTime(d.getTime() + (days*24*60*60*1000));
      const expires = "expires="+ d.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Utility to get cookie by name
    function getCookie(name) {
      const cname = name + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(cname) === 0) {
          return c.substring(cname.length, c.length);
        }
      }
      return "";
    }

    // Apply saved preferences
    function applyPreferences() {
      const savedFontSize = getCookie("fontsize");
      const savedFontColor = getCookie("fontcolor");

      if (savedFontSize) {
        document.documentElement.style.setProperty("--fontsize", savedFontSize + "px");
        document.getElementById("fontsize").value = savedFontSize;
      }
      if (savedFontColor) {
        document.documentElement.style.setProperty("--fontcolor", savedFontColor);
        document.getElementById("fontcolor").value = savedFontColor;
      }
    }

    // Save preferences on form submit
    document.getElementById("preferences-form").addEventListener("submit", function(e) {
      e.preventDefault();

      const fontsize = document.getElementById("fontsize").value;
      const fontcolor = document.getElementById("fontcolor").value;

      // Save to cookies
      setCookie("fontsize", fontsize, 7);  // stored for 7 days
      setCookie("fontcolor", fontcolor, 7);

      // Apply immediately
      document.documentElement.style.setProperty("--fontsize", fontsize + "px");
      document.documentElement.style.setProperty("--fontcolor", fontcolor);
    });

    // On page load, apply saved preferences
    window.onload = applyPreferences;