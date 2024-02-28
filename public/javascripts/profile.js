// Dropdown menu
$(".dropdown").click(function () {
    $(this).attr("tabindex", 1).focus();
    $(this).toggleClass("active");
    $(this).find(".dropdown-menu").slideToggle(300);
  });
  $(".dropdown").focusout(function () {
    $(this).removeClass("active");
    $(this).find(".dropdown-menu").slideUp(300);
  });
  $(".dropdown .dropdown-menu li").click(function () {
    $(this).parents(".dropdown").find("span").text($(this).text());
    $(this).parents(".dropdown").find("input").attr("value", $(this).attr("id"));
  });
  /*End Dropdown Menu*/
  
  function clearInputFields() {
    document.querySelector("#name").value = "";
    document.querySelector("#product").value = "";
    document.querySelector("#soldTo").value = "";
    document.querySelector("#maxUsagePerDay").value = "";
    document.querySelector("#validFrom").value = "";
    document.querySelector("#validTill").value = "";
    document.querySelector("#uid").value = "";
    document.querySelector("#generatedBy").value = "";
    document.querySelector("#signedBy").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#passwd").value = "";
  }
  
  function CustomAlert() {
    this.alert = function (message, title) {
      document.querySelector(".alert_box").classList.add("active");
      let dialogoverlay = document.querySelector("#dialogoverlay");
      let alert_box = document.querySelector(".alert_box");
      let winH = window.innerHeight;
      let alert_title = alert_box.querySelector("h1");
      let alert_message = alert_box.querySelector("p");
  
      dialogoverlay.style.height = winH + "px";
      dialogoverlay.style.display = "block";
      alert_box.style.display = "block";
      alert_title.textContent = title;
      alert_message.textContent = message;
    };
  
    document
      .querySelector(".alert_box .close-btn")
      .addEventListener("click", function () {
        document.querySelector(".alert_box").classList.remove("active");
        dialogoverlay.style.display = "none";
        clearInputFields();
      });
  }
  
  function validateInput(event) {
    event.preventDefault();
  
    const nameRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
  
    const nameInput = document.querySelector("#name").value;
    const productInput = document.querySelector("#product").value;
    const soldToInput = document.querySelector("#soldTo").value;
    const validFromInput = document.querySelector("#validFrom").value;
    const validTillInput = document.querySelector("#validTill").value;
    const uidInput = document.querySelector("#uid").value;
    const generatedByInput = document.querySelector("#generatedBy").value;
    const signedByInput = document.querySelector("#signedBy").value;
    const emailInput = document.querySelector("#email").value;
    const passwdInput = document.querySelector("#passwd").value;
  
    let customAlert = new CustomAlert();
  
    if (nameInput === "") {
      customAlert.alert("Please enter your name.", "How can you be nameless!");
      return false;
    } else if (!nameRegex.test(nameInput)) {
      customAlert.alert(
        "Please provide a real and meaningful name.",
        "Invalid name!"
      );
      return false;
    }
  
    if (productInput === "") {
      customAlert.alert("Please select a product.", "Product Not Selected!");
      return false;
    }
  
    if (soldToInput === "") {
      customAlert.alert(
        "Please enter name of the company the license is sold to.",
        "Please Enter Buyer(Sold To) details!"
      );
      return false;
    }
  
    if (validFromInput === "") {
      customAlert.alert(
        "Please select a date that the licence starts from.",
        "Please select Starting Date!"
      );
      return false;
    }
  
    if (validTillInput === "") {
      customAlert.alert(
        "Please select a date that the licence is valid till.",
        "Please select Ending Date!"
      );
      return false;
    }
  
    if (uidInput === "") {
      customAlert.alert("UID is empty.", "Please enter UID!");
      return false;
    }
  
    if (generatedByInput === "") {
      customAlert.alert(
        "Please enter generator's email address.",
        "Generator's email is required!"
      );
      return false;
    } else if (!emailRegex.test(generatedByInput)) {
      customAlert.alert(
        "The e-mail address entered for Generator is invalid.",
        "Invalid Generator email address!"
      );
      return false;
    }
  
    if (signedByInput === "") {
      customAlert.alert(
        "Please enter Signer's email address.",
        "Signer's Email is required!"
      );
      return false;
    } else if (!emailRegex.test(signedByInput)) {
      customAlert.alert(
        "The e-mail address entered for Signer is invalid.",
        "Invalid Signer email address!"
      );
      return false;
    }
  
    if (emailInput === "") {
      customAlert.alert("Please enter your email address.", "Email is required!");
      return false;
    } else if (!emailRegex.test(emailInput)) {
      customAlert.alert(
        "The e-mail address entered is invalid.",
        "Invalid email address!"
      );
      return false;
    }
  
    if (passwdInput === "") {
      customAlert.alert("Please enter Password.", "Password is required!");
      return false;
    }
  
    return true;
  }
  
  function openForm(event) {
    const isValid = validateInput(event);
  
    if (isValid) {
      event.preventDefault();
  
      // Set the values of the hidden inputs to the corresponding values in the formData object
      document.querySelector("#nameInput").value = document.querySelector(
        "#name"
      ).value;
      document.querySelector("#productInput").value = document.querySelector(
        "#product"
      ).value;
      document.querySelector("#soldToInput").value = document.querySelector(
        "#soldTo"
      ).value;
      document.querySelector(
        "#maxUsagePerDayInput"
      ).value = document.querySelector("#maxUsagePerDay").value
        ? document.querySelector("#maxUsagePerDay").value
        : 0;
      document.querySelector("#validFromInput").value = document.querySelector(
        "#validFrom"
      ).value;
      document.querySelector("#validTillInput").value = document.querySelector(
        "#validTill"
      ).value;
      document.querySelector("#uidInput").value = document.querySelector(
        "#uid"
      ).value;
      document.querySelector("#generatedByInput").value = document.querySelector(
        "#generatedBy"
      ).value;
      document.querySelector("#signedByInput").value = document.querySelector(
        "#signedBy"
      ).value;
      document.querySelector("#emailInput").value = document.querySelector(
        "#email"
      ).value;
      document.querySelector("#passwdInput").value = document.querySelector(
        "#passwd"
      ).value;
  
      // To clear the input fields
      clearInputFields();
  
      // add a new entry to the browser's history
      history.pushState(null, null, location.href);
  
      // Hide the first form and display the OTP form
      document.querySelector("#lic_details_form").style.display = "none";
      document.querySelector("#otpForm").style.display = "block";
      document.querySelector("#otpForm").style.maxHeight = "250px";
      document.querySelector("#otpForm form").style.maxHeight = "250px";
      document.querySelector("#otpForm form").style.transform =
        "translate(-50%, 100%)";
      document.querySelector(".lic_details").style.height = "100vh";
      document.querySelector(".shape:last-child").style.bottom = "100px";
  
      window.addEventListener("popstate", function (event) {
        if (
          document.querySelector("#lic_details_form").style.display == "block"
        ) {
          history.pushState(null, null, location.href);
        }
      });
      return false;
    }
  }
  