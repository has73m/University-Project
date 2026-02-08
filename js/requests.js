let requestsData = [];
let currentPage = 1;
const itemsPerPage = 4;
let totalPages = 0;
//get data here from the api >:(
fetch("../js/mockRequestData.json")
  .then((response) => response.json())
  .then((data) => {
    requestsData = data;
    totalPages = Math.ceil(requestsData.length / itemsPerPage);
    renderRequests(); // 👈 NOW data exists
  })
  .catch((error) => console.error("Error fetching JSON:", error));

//the items for current page
function getPageItems(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return requestsData.slice(startIndex, endIndex);
}

// redering requests
function renderRequests() {
  const requestsList = document.querySelector(".requests-list");
  const pageItems = getPageItems(currentPage);

  requestsList.innerHTML = "";

  pageItems.forEach((request) => {
    const card = `
            <div class="request-card">
                <div class="request-header">
                    <h3 class="request-title">${request.activityName}</h3>
                    <a href="#" class="view-request-link" data-id="${request.id}">عرض الطلب</a>
                </div>
                <p class="request-date">${request.publishDate}</p>
            </div>
        `;
    requestsList.innerHTML += card;
  });

  renderPagination();
}

// render pagination buttons
function renderPagination() {
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";

  //  next button
  const nextBtn = document.createElement("button");
  nextBtn.className = "pagination-btn";
  nextBtn.textContent = "التالي";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderRequests();
    }
  });
  pagination.appendChild(nextBtn);

  // page number buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.className = `pagination-btn ${i === currentPage ? "active" : ""}`;
    pageBtn.textContent = i;
    pageBtn.addEventListener("click", () => {
      currentPage = i;
      renderRequests();
    });
    pagination.appendChild(pageBtn);
  }

  // previous buttons
  const prevBtn = document.createElement("button");
  prevBtn.className = "pagination-btn";
  prevBtn.textContent = "قبل";
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderRequests();
    }
  });
  pagination.appendChild(prevBtn);
}
