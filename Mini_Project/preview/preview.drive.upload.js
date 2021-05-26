document.querySelector('#btn-drive-upload').onclick = function() {
    if (!file) {
        fname.innerHTML = 'You did NOT record anything yet.';
        return;
    }

    this.disabled = true;

    fresolutions.innerHTML = fsize.innerHTML = fduration.innerHTML = browserCache.innerHTML = '';
    fname.innerHTML = 'Google.getAuthToken...';
    var fileContent = file; // As a sample, upload a text file.
    var file1 = new Blob([fileContent], {type: 'video/webm'});
    var metadata = {
        'name': '20178091', // Filename at Google Drive
        'mimeType': 'video/webm', // mimeType at Google Drive
        'parents': ['1a4TjhMmlIEGBWhSo4O6m8hpmxTSBSiJS'], // Folder ID at Google Drive
    };

    var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
        method: 'POST',
        headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
        body: form,
    }).then((res) => {
        return res.json();
    }).then(function(val) {
        console.log(val);
    });
    fname.innerHTML = 'Uploaded Successfully';
};