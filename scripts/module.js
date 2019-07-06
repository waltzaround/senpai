
  var Module = {
    preRun: [function() {
      Module.FS_createPreloadedFile('/', 'haarcascade_eye.xml', './scripts/haarcascade_eye.xml', true, false);
      Module.FS_createPreloadedFile('/', 'haarcascade_frontalface_default.xml', './scripts/haarcascade_frontalface_default.xml', true, false);
      Module.FS_createPreloadedFile('/', 'haarcascade_profileface.xml', './scripts/haarcascades_profileface.xml', true, false);
    }],
    _main: function() {opencvIsReady();}
  };