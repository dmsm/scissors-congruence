$(function () {
    var copyButton = document.getElementById('copy-link');
    var status = document.getElementById('copy-status');
    var fallback = document.getElementById('copy-fallback');
    var urlField = document.getElementById('share-url');
    var resetTimer;

    copyButton.addEventListener('click', function () {
        clearTimeout(resetTimer);
        var copy = navigator.clipboard && navigator.clipboard.writeText
            ? navigator.clipboard.writeText(urlField.value)
            : Promise.reject();
        copy.then(function () {
            fallback.hidden = true;
            copyButton.textContent = 'Link copied';
            status.textContent = 'Link copied to clipboard.';
            resetTimer = setTimeout(function () {
                copyButton.textContent = 'Copy link';
                status.textContent = '';
            }, 3000);
        }).catch(function () {
            status.textContent = 'Select and copy the link below.';
            fallback.hidden = false;
            urlField.focus();
            urlField.select();
        });
    });
});
