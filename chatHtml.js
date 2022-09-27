const chatHtml = (title, key, token) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Chat | ${title}</title>
  <!-- Start of Zendesk Widget script -->
  <script id="ze-snippet"
    src="https://static.zdassets.com/ekr/snippet.js?key=${key}">
    </script>
  <!-- End of Zendesk Widget script -->
  <style type="text/css">html { background: #FFF; }</style>
</head>
<body>
<script type="text/javascript">
document.addEventListener( 'DOMContentLoaded', function( event ) {
  // zE('messenger', 'logoutUser');
  zE('messenger', 'loginUser', function (callback) {
    callback("${token}");
  });
  window.ReactNativeWebView.postMessage("message to outside");
  zE('messenger', 'open');
});
</script>
</body>
</html>`;

export default chatHtml;
