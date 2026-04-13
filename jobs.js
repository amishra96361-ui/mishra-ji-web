const jobListElement = document.getElementById('job-list');
const searchInput = document.getElementById('job-search');
let jobsData = [];

function renderJobs(jobs) {
  if (!jobListElement) return;
  jobListElement.innerHTML = '';

  if (jobs.length === 0) {
    jobListElement.innerHTML = '<p class="empty-state">कोई जॉब नहीं मिली, खोज शब्द बदलें।</p>';
    return;
  }

  jobs.forEach((job) => {
    const card = document.createElement('article');
    card.className = 'job-card';
    card.innerHTML = `
      <div class="job-card-top">
        <h3>${job.title}</h3>
        <span class="job-badge">${job.department}</span>
      </div>
      <p class="job-meta">स्थान: ${job.location}</p>
      <p class="job-meta">अंतिम तिथि: ${job.lastDate}</p>
      <div class="job-footer">
        <a class="job-link" href="${job.applyUrl}" target="_blank" rel="noreferrer">आवेदन देखें</a>
      </div>
    `;
    jobListElement.appendChild(card);
  });
}

function filterJobs() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = jobsData.filter((job) => {
    return (
      job.title.toLowerCase().includes(query) ||
      job.department.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query)
    );
  });
  renderJobs(filtered);
}

fetch('jobs.json')
  .then((response) => response.json())
  .then((jobs) => {
    jobsData = jobs;
    renderJobs(jobsData);
  })
  .catch(() => {
    if (jobListElement) {
      jobListElement.innerHTML = '<p class="empty-state">जॉब लोड करने में समस्या आई।</p>';
    }
  });

if (searchInput) {
  searchInput.addEventListener('input', filterJobs);
}
