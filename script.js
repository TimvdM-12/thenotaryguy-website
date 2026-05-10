document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('header');
    var menuToggle = document.getElementById('menuToggle');
    var nav = document.getElementById('nav');
    var contactForm = document.getElementById('contactForm');
    var fileInput = document.getElementById('documentUpload');
    var fileUploadArea = document.getElementById('fileUploadArea');
    var fileList = document.getElementById('fileList');
    var formRedirect = document.getElementById('formRedirect');

    formRedirect.value = window.location.href.split('#')[0] + '#upload-success';

    window.addEventListener('scroll', function () {
        header.classList.toggle('scrolled', window.scrollY > 10);
    });

    menuToggle.addEventListener('click', function () {
        nav.classList.toggle('open');
        menuToggle.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            nav.classList.remove('open');
            menuToggle.classList.remove('open');
        });
    });

    fileUploadArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        fileUploadArea.classList.add('dragover');
    });

    fileUploadArea.addEventListener('dragleave', function () {
        fileUploadArea.classList.remove('dragover');
    });

    fileUploadArea.addEventListener('drop', function (e) {
        e.preventDefault();
        fileUploadArea.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            updateFileList(e.dataTransfer.files);
        }
    });

    fileInput.addEventListener('change', function () {
        updateFileList(fileInput.files);
    });

    function updateFileList(files) {
        fileList.innerHTML = '';
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var size = (file.size / 1024).toFixed(0);
            if (size > 1024) {
                size = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
            } else {
                size = size + ' KB';
            }

            var item = document.createElement('div');
            item.className = 'file-item';
            item.innerHTML =
                '<div class="file-item-info">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' +
                    '<span>' + file.name + ' (' + size + ')</span>' +
                '</div>';
            fileList.appendChild(item);
        }
    }

    if (window.location.hash === '#upload-success') {
        var successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' +
            '<h3>Documents Sent Successfully!</h3>' +
            '<p>We\'ve received your submission and will review your documents. We\'ll contact you on WhatsApp with next steps.</p>';
        var formEl = document.getElementById('uploadForm');
        formEl.parentNode.insertBefore(successDiv, formEl);
        formEl.style.display = 'none';
        document.getElementById('upload').scrollIntoView({behavior: 'smooth'});
        history.replaceState(null, '', window.location.pathname);
    }

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var name = document.getElementById('contactName').value.trim();
        var surname = document.getElementById('contactSurname').value.trim();
        var phone = document.getElementById('contactPhone').value.trim();
        var email = document.getElementById('contactEmail').value.trim();
        var message = document.getElementById('contactMessage').value.trim();

        if (!name || !surname || !phone || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        var whatsappMsg = 'Hi, I\'d like to enquire about your services.\n\n';
        whatsappMsg += '*Name:* ' + name + ' ' + surname + '\n';
        whatsappMsg += '*Phone:* ' + phone + '\n';
        if (email) whatsappMsg += '*Email:* ' + email + '\n';
        whatsappMsg += '*Message:* ' + message;

        window.location.href = 'https://wa.me/27767877637?text=' + encodeURIComponent(whatsappMsg);
    });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(function (link) {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { rootMargin: '-20% 0px -80% 0px' });

    document.querySelectorAll('section[id]').forEach(function (section) {
        observer.observe(section);
    });
});
