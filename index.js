const btn = document.querySelector('.ran_delete_btn');
const trash = document.querySelector('.ran_delete_btn .trash');

const originalTextHTML = btn.querySelector('.btn-text').innerHTML;

btn.addEventListener('click', () => {
  const letters = document.querySelectorAll('.ran_delete_btn .btn-text span');
  btn.classList.add('tilt');

  letters.forEach((letter, index) => {
    setTimeout(() => {
      const trashRect = trash.getBoundingClientRect();
      const letterRect = letter.getBoundingClientRect();
      const deltaX = trashRect.left + trashRect.width/2 - (letterRect.left + letterRect.width/2);
      const deltaY = trashRect.top + trashRect.height/2 - (letterRect.top + letterRect.height/2);
      letter.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.3)`;
      letter.style.opacity = '0';

      if(index === letters.length - 1){
        setTimeout(() => {
          btn.classList.remove('tilt');
          document.querySelector('.btn-text').remove();

          setTimeout(() => {
            const span = document.createElement('span');
            span.classList.add('btn-text');
            span.innerHTML = originalTextHTML;
            btn.insertBefore(span, trash);
          }, 3000);

        }, 500);
      }
    }, index * 150);
  });
});

 const searchContainer = document.getElementById('ransearchContainer');
  const searchIcon = document.getElementById('ransearchIcon');
  const searchInput = document.getElementById('ransearchInput');

  searchIcon.addEventListener('click', () => {
    searchContainer.classList.toggle('active');
    if (searchContainer.classList.contains('active')) {
      searchInput.focus();
    }
  });


  const logoutBtn = document.getElementById("ran_logoutBtn");

  logoutBtn.addEventListener("click", () => {
    logoutBtn.classList.toggle("closed");
  });




   const downloadBtn = document.getElementById('downloadBtn');
        const progressContainer = document.getElementById('progressContainer');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const parachute = document.getElementById('parachute');
        const completeMessage = document.getElementById('completeMessage');

        let isDownloading = false;

        downloadBtn.addEventListener('click', function() {
            if (isDownloading) return;
            
            isDownloading = true;
            downloadBtn.classList.add('downloading');
            downloadBtn.innerHTML = '<div class="download-icon"></div>Downloading...';
            
            // Show progress container and parachute
            progressContainer.classList.add('active');
            
            // Reset parachute position and make it visible
            parachute.style.top = '-100px';
            parachute.style.opacity = '1';
            parachute.classList.add('active');
            parachute.classList.add('swaying');
            
            // Start download simulation
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15; // Random increment for realistic feel
                
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    completeDownload();
                }
                
                // Update progress
                progressFill.style.width = progress + '%';
                progressText.textContent = Math.floor(progress) + '%';
                
                // Move parachute down based on progress
                const parachuteTop = -100 + (progress * 0.68); // Moves from -100px to 52px (touching progress bar line)
                parachute.style.top = parachuteTop + 'px';
                
            }, 200 + Math.random() * 300); // Random interval for realistic feel
        });

        function completeDownload() {
            // Remove swaying animation and ensure parachute is at final position
            parachute.classList.remove('swaying');
            parachute.style.top = '10px'; // Final position touching the progress bar
            
            setTimeout(() => {
                // Hide parachute and show complete message
                parachute.style.opacity = '0';
                completeMessage.classList.add('show');
                
                // Reset button after a delay
                setTimeout(() => {
                    resetDownload();
                }, 2000);
            }, 500);
        }

        function resetDownload() {
            isDownloading = false;
            downloadBtn.classList.remove('downloading');
            downloadBtn.innerHTML = '<div class="download-icon"></div>Download File';
            
            progressContainer.classList.remove('active');
            completeMessage.classList.remove('show');
            
            progressFill.style.width = '0%';
            progressText.textContent = '0%';
            
            parachute.classList.remove('active', 'swaying');
            parachute.style.top = '-100px';
            parachute.style.opacity = '0';
}