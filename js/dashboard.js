let requestsData = [];
let currentPage = 1;
const itemsPerPage = 7;
let totalPages = 0;
//get data here from the api >:(
fetch("../js/dashboard-data.json")
  .then((response) => response.json())
  .then((data) => {
    dashboardData = data;
    totalPages = Math.ceil(dashboardData.requests.length / itemsPerPage);
    renderRequests();
  })
  .catch((error) => console.error("Error fetching JSON:", error));
//the items for current page
function getPageItems(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return dashboardData.requests.slice(startIndex, endIndex);
}

// redering requests
function renderRequests() {
  const body = document.querySelector("tbody");
  const pageItems = getPageItems(currentPage);
  const accept = "approved";
  const reject = "rejected";
  const undecided = "pending";
  const pending = dashboardData.stats.pending;
  const total = dashboardData.stats.total;
  const accepted = dashboardData.stats.completed;
  const overdue = dashboardData.stats.overdue;
  const overDueStat = document.querySelector(".stat-info.overdue");
  const completedStat = document.querySelector(".stat-info.completed");
  const pendingStat = document.querySelector(".stat-info.pending");
  const totalStat = document.querySelector(".stat-info.total");
  overDueStat.innerHTML = `<span class="stat-label overdue">المتأخرة</span><span class="stat-value">${overdue}</span>`;
  completedStat.innerHTML = `<span class="stat-label completed">المكتملة</span><span class="stat-value">${accepted}</span>`;
  pendingStat.innerHTML = `<span class="stat-label pending">قيد الانتظار</span><span class="stat-value">${pending}</span>`;
  totalStat.innerHTML = `<span class="stat-label total">الكل</span><span class="stat-value">${total}</span>`;
  body.innerHTML = "";
  pageItems.forEach((request) => {
    statusDots = "";
    console.log(request.status);
    request.status.forEach((status) => {
      if (status === accept) {
        statusDots +=
          '<img class="status-dot green" src="../images/circle-accept.svg"></img>';
      } else if (status === reject) {
        statusDots +=
          '<img class="status-dot red" src="../images/circle-reject.svg"></img>';
      } else {
        statusDots +=
          '<img class="status-dot orange" src="../images/circle-undecided.svg"></img>';
      }
    });

    const card = `
    <tr>
                <td>${request.publishDate}</td>
                <td>${request.studentName}</td>
                <td>${request.activityDate}</td>
                <td>${request.organizer}</td>
                <td>
                  <div class="status-dots">
                    ${statusDots}
                  </div>
                </td>
                <td><a href="#" class="request-link">تفاصيل الطلب</a></td>
              </tr>
         
        `;
    body.innerHTML += card;
  });

  renderPagination();
}

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
