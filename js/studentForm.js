// Get all checkboxes with name "activityTypes"
const checkboxes = document.querySelectorAll('input[name="activityTypes"]');
const theOtherCheckbox = document.getElementById("other");
const otherTextBox = document.getElementById("otherTextBox");
const otherTextInput = document.getElementById("otherText");

// Add event listener to each checkbox
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      // Uncheck all other checkboxes
      checkboxes.forEach((otherCheckbox) => {
        if (otherCheckbox !== this) {
          otherCheckbox.checked = false;
          if (otherCheckbox == theOtherCheckbox) {
            otherTextBox.style.display = "none";
            otherTextInput.value = ""; // Clear the text box when unchecked
          }
        }
      });
    }
  });
});

// Show/hide text box when "Other" checkbox is clicked
theOtherCheckbox.addEventListener("change", function () {
  if (this.checked) {
    otherTextBox.style.display = "block";
    otherTextInput.focus(); // Automatically focus on the text box
  } else {
    otherTextBox.style.display = "none";
    otherTextInput.value = ""; // Clear the text box when unchecked
  }
});

document.querySelectorAll('input[type="file"]').forEach((input) => {
  input.addEventListener("change", function () {
    const uploadText = document.getElementById(this.id + "UploadText");
    const uploadBtn = document.getElementById(this.id + "UploadBtn");

    const file = this.files[0];
    const allowedTypes = ["image/png", "application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      uploadText.textContent = "نوع الملف غير مسموح";
      this.value = "";
      return;
    }

    uploadText.textContent = `تم رفع الملف: ${file.name}`;
  });
});
