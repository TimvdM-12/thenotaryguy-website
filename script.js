document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const uploadForm = document.getElementById('uploadForm');
    const contactForm = document.getElementById('contactForm');
    const fileInput = document.getElementById('documentUpload');
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileList = document.getElementById('fileList');

    let selectedFiles = [];

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
        handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', function () {
        handleFiles(fileInput.files);
    });

    function handleFiles(files) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (file.size > 10 * 1024 * 1024) {
                alert('File "' + file.name + '" exceeds 10MB limit.');
                continue;
            }
            selectedFiles.push(file);
        }
        renderFileList();
    }

    function renderFileList() {
        fileList.innerHTML = '';
        selectedFiles.forEach(function (file, index) {
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
                '</div>' +
                '<button class="file-item-remove" data-index="' + index + '">&times;</button>';
            fileList.appendChild(item);
        });

        document.querySelectorAll('.file-item-remove').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var idx = parseInt(this.getAttribute('data-index'));
                selectedFiles.splice(idx, 1);
                renderFileList();
            });
        });
    }

    uploadForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var name = document.getElementById('fullName').value.trim();
        var whatsapp = document.getElementById('whatsappNumber').value.trim();
        var email = document.getElementById('email').value.trim();
        var service = document.getElementById('serviceType').value;
        var message = document.getElementById('message').value.trim();

        if (!name || !whatsapp || !service) {
            alert('Please fill in all required fields.');
            return;
        }

        var fileNames = selectedFiles.map(function (f) { return f.name; }).join(', ');

        var whatsappMsg = 'Hi, I\'d like to use your notary services.\n\n';
        whatsappMsg += '*Name:* ' + name + '\n';
        whatsappMsg += '*WhatsApp:* ' + whatsapp + '\n';
        if (email) whatsappMsg += '*Email:* ' + email + '\n';
        whatsappMsg += '*Service:* ' + service + '\n';
        if (fileNames) whatsappMsg += '*Documents:* ' + fileNames + '\n';
        if (message) whatsappMsg += '*Details:* ' + message + '\n';
        whatsappMsg += '\nI have ' + (selectedFiles.length || 'no') + ' document(s) ready to send for inspection.';

        var encoded = encodeURIComponent(whatsappMsg);
        window.open('https://wa.me/27767877637?text=' + encoded, '_blank');
    });

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

        var encoded = encodeURIComponent(whatsappMsg);
        window.open('https://wa.me/27767877637?text=' + encoded, '_blank');
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
