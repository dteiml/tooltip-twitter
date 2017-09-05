function getSelected() {
  if (window.getSelection) {
    return window.getSelection();
  } else if (document.getSelection) {
    return document.getSelection();
  } else {
    var selection = document.selection && document.selection.createRange();
    if (selection.text) {
      return selection.text;
    }
  }
}

document.getElementById('article').addEventListener('mousedown', function() {
  var tooltip = document.getElementById('tooltip--share');

  if (tooltip) {
    tooltip.style.display = 'none';
  }
});

document.getElementById('article').addEventListener('mouseup', function() {
  var selection = getSelected();
  if (!selection.isCollapsed) {
    var text = "'" + selection.toString() + "', via";
    var params = 'text=' + text + '&original_referrer=' + location.origin + '&url=' + location.href;
    var opts = '"height=250px, width=600px, top=100px, left=300px"';
    var href = 'javascript:window.open("https://twitter.com/share?' + params + '", "twitter", ' + opts + ');';
    
    var anchor = document.getElementById('share--twitter');
    if (anchor) {
      anchor.href = href;
    }

    var range = selection.getRangeAt(0);
    var rect = range.getBoundingClientRect();
    var top = rect.top - 24;
    var left = (rect.left + rect.right) / 2 - 30;

    var tooltip = document.getElementById('tooltip--share');
    if (tooltip) {
      tooltip.style.display = 'block';
      tooltip.style.top = top + 'px';
      tooltip.style.left = left + 'px';
    }
  }
});