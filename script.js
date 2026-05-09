document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('header');
    var menuToggle = document.getElementById('menuToggle');
    var nav = document.getElementById('nav');
    var uploadForm = document.getElementById('uploadForm');
    var contactForm = document.getElementById('contactForm');
    var fileInput = document.getElementById('documentUpload');
    var fileUploadArea = document.getElementById('fileUploadArea');
    var fileList = document.getElementById('fileList');
    var submitBtn = document.getElementById('submitBtn');
    var submitBtnText = document.getElementById('submitBtnText');
    var submitIcon = document.getElementById('submitIcon');
    var formInfoText = document.getElementById('formInfoText');

    var whatsappIconPath = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z';

    var selectedFiles = [];

    function getDeliveryMethod() {
        var checked = document.querySelector('input[name="deliveryMethod"]:checked');
        return checked ? checked.value : 'whatsapp';
    }

    function updateSubmitButton() {
        var method = getDeliveryMethod();
        if (method === 'email') {
            submitBtnText.textContent = 'Submit & Send via Email';
            submitBtn.classList.remove('btn-whatsapp');
            submitBtn.classList.add('btn-email');
            submitIcon.innerHTML = '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor" stroke-width="2"/>';
            formInfoText.textContent = 'After submitting, your email app will open with a pre-filled message to our notary. Attach your scanned documents to the email before sending. We\'ll review and contact you with next steps.';
        } else {
            submitBtnText.textContent = 'Submit & Connect on WhatsApp';
            submitBtn.classList.remove('btn-email');
            submitBtn.classList.add('btn-whatsapp');
            submitIcon.innerHTML = '<path d="' + whatsappIconPath + '" fill="currentColor"/>';
            formInfoText.textContent = 'After submitting, you\'ll be redirected to WhatsApp where you can send your scanned documents directly to our notary for inspection. We\'ll review and contact you with next steps.';
        }
    }

    document.querySelectorAll('input[name="deliveryMethod"]').forEach(function (radio) {
        radio.addEventListener('change', updateSubmitButton);
    });

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
        var method = getDeliveryMethod();

        if (!name || !whatsapp || !service) {
            alert('Please fill in all required fields.');
            return;
        }

        var fileNames = selectedFiles.map(function (f) { return f.name; }).join(', ');

        if (method === 'email') {
            var subject = 'Document Inspection Request - ' + service;
            var body = 'Hi,\n\nI\'d like to use your notary services.\n\n';
            body += 'Name: ' + name + '\n';
            body += 'WhatsApp: ' + whatsapp + '\n';
            if (email) body += 'Email: ' + email + '\n';
            body += 'Service: ' + service + '\n';
            if (fileNames) body += 'Documents to attach: ' + fileNames + '\n';
            if (message) body += 'Details: ' + message + '\n';
            body += '\nPlease find my scanned documents attached to this email for inspection.\n';
            body += 'Please contact me on WhatsApp (' + whatsapp + ') with next steps.\n';

            var mailto = 'mailto:info@thenotaryguy.co.za'
                + '?subject=' + encodeURIComponent(subject)
                + '&body=' + encodeURIComponent(body);
            window.location.href = mailto;
        } else {
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
        }
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
